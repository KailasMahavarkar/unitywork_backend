const GigModel = require("../../../models/gigModel");


const searchGigs = async (req, res) => {
    const query = req.query.query

    let parsedQuery = ""

    // check if query string contains '+'
    if (query.includes('+')) {
        const queryArray = query.split('+');
        parsedQuery = queryArray.join(' ');
    }

    // search gig by text matching in database
    try {
        const gigs = await GigModel.find(
            {
                $text: {
                    $search: parsedQuery || query
                }
            }, {
            blog: 0
        })


        return res.send({
            message: "Gigs fetched successfully",
            data: gigs
        })
    }
    catch (error) {
        return res.status(500).send({
            message: "Server error",
            error: error.message
        })
    }
}

module.exports = searchGigs;
