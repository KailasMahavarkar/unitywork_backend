import GigModel from "../../models/gigModel";


const deleteGIG = async (req, res) => {

    // get gigId from url
    const gigId = req.params.gigId;

    if (!gigId) {
        return res.status(400).json({
            message: "Gig ID is required",
            status: "failed"
        })
    }

    try {
        const deleteResult = await GigModel.findByIdAndDelete(gigId);
        if (deleteResult) {
            return res.status(200).json({
                message: "Gig deleted successfully",
                status: "success"
            })
        }

        return res.status(400).json({
            message: "Gig not found",
            status: "failed"
        })
    } catch (error) {
        return res.status(500).json({
            message: error.message || "Some error occurred while deleting the Gig.",
            status: "error"
        })
    }


}

export default deleteGIG;