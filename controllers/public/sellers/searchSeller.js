const UserModel = require("../../../models/userModel");

const searchSeller = async (req, res) => {
    const { query } = req.query;
    try {
        const sellers = await UserModel.find({
            $text: {
                $search: query
            }
        })

        if (!sellers) {
            return res.status(404).json({
                message: "Sellers not found",
                status: "failed"
            })
        }

        return res.status(200).json({
            message: "Sellers found",
            status: "success",
            data: sellers
        })

    } catch (error) {
        return res.status(500).json({
            message: "Search failed with error",
            error: error.message,
            status: "exited"
        })
    }

}

module.exports = searchSeller;