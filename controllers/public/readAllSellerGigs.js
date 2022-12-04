import UserModel from "../../models/userModel";
import GigModel from "../../models/gigModel";

const readAllSellerGigs = async (req, res) => {

    const tokenData = res.locals.tokenData
    const sellerId = tokenData._id;

    try {
        const user = await UserModel.findById({
            _id: sellerId
        })

        const userGigs = user.gigs;

        if (userGigs.length > 0) {
            // get gig meta from database
            const gigs = await GigModel.find({
                _id: {
                    $in: userGigs
                }
            }, {
                title: 1,
                thumbnail: 1,
                sellerId: 1,
                gigId: 1,
                status: 1,
                deliveryTime: 1,
                category: 1,
                tags: 1,
            })

            if (gigs) {
                return res.status(200).json({
                    status: "success",
                    message: "gigs fetched successfully",
                    data: gigs
                })
            }
        }



        return res.status(400).json({
            msg: "No gigs found",
            status: "failed"
        })

    } catch (error) {

        return res.status(500).send({
            message: "Error occured while fetching gigs"
        })
    }


}

export default readAllSellerGigs;