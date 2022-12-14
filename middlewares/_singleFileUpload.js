const { createReadStream } = require('streamifier');
const cloudinary = require('../cloudinary');


const _singleFileUpload = async (req, res, next) => {
    console.log("starting ... single upload --")
    try {

        let streamUpload = (req) => {
            // eslint-disable-next-line no-undef
            return new Promise((resolve, reject) => {
                let stream = cloudinary.uploader.upload_stream(
                    {
                        folder: "fynd",
                    },
                    (error, result) => {
                        if (result) {
                            resolve(result);
                        } else {
                            reject(error);
                        }
                    }
                );

                createReadStream(req.file.buffer)
                    .pipe(stream);
            });
        };

        const upload = async (req) => {
            return await streamUpload(req);
        }

        req.singleImage = await upload(req)

        console.log("leaving ... single upload --")
        next()

    } catch (error) {
        return res.status(500).json({
            msg: "Cloudinary Error Uploading Image",
            error: error.message,
            status: "exited"
        })
    }

};


module.exports = _singleFileUpload;