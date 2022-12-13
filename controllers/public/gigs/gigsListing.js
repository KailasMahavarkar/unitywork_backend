const GigModel = require('../../../models/gigModel')

const gigListing = async (req, res) => {


    try {
        res.locals.controls.prev = 0;
        res.locals.controls.next = 0;
        res.locals.controls.total = 0;

        const { page, limit } = req.query;

        const options = {
            projection: {
                blog: 0,
            },
            page: parseInt(page, 10) || 1,
            limit: parseInt(limit, 10) || 10,

            sort: {
                createdAt: -1
            }
        }


        const gigs = await GigModel.paginate({}, options);

        res.locals.controls.prev = gigs.hasPrevPage ? gigs.prevPage : 0;
        res.locals.controls.next = gigs.hasNextPage ? gigs.nextPage : 0;
        res.locals.controls.total = gigs.totalDocs;
        res.locals.controls.limit = gigs.limit;


        return res.send({
            message: "Gigs fetched successfully",
            data: gigs.docs
        })
    } catch (error) {
        return res.status(500).send({
            message: "Server error",
            error: error.message
        })
    }

}


module.exports = gigListing