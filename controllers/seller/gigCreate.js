const GigModel = require("../../models/gigModel");
const UserModel = require("../../models/userModel");
const { gigAJV, handleAJVError } = require("../ajvHelper");
const { v4: uuidv4 } = require('uuid');


const gigCreate = async (req, res) => {

    const tokenData = res.locals.tokenData
    const sellerId = tokenData._id;

    const bodyData = {
        title: req.body.title,
        description: req.body.description,
        price: req.body.price,
        deliveryTime: req.body.deliveryTime,
        category: req.body.category,
        images: req.body.images,
        tags: req.body.tags,

        status: "draft",
        gigId: uuidv4()
    }


    if (!gigAJV.gigCreate(bodyData)) {
        return handleAJVError(res);
    }

    // console.log(sellerId);

    // console.log({
    //     ...bodyData,
    //     sellerId: sellerId,
    //     status: 'draft',
    //     reviews: [],
    //     images: [],

    //     orders: []
    // })

    const gig = new GigModel({
        ...bodyData,
        sellerId: sellerId,
        status: 'draft',
        reviews: [],
        orders: []
    });



    try {
        const savedGig = await gig.save();
        const savedGigId = savedGig?._id;

        // link the gig with user account
        const user = await UserModel.findOne({
            _id: sellerId
        })

        // console.log(await UserModel.findById({
        //     _id: sellerId
        // }));

        // check if user exists
        if (user?._id) {
            user.gigs.push(savedGigId)
            await user.save()
            return res.status(200).json({
                message: `New Gig with id ${savedGigId} is created`,
                status: "success"
            })
        }

        // if user is not found
        return res.status(400).json({
            message: "User not found",
            status: "failed"
        })


    } catch (error) {
        return res.status(500).send({
            message: error.message || "Some error occurred while creating the Gig.",
            status: "error"
        })
    }

}

module.exports = gigCreate;
