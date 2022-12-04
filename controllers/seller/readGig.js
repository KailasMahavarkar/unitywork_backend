import GigModel from "../../models/gigModel";
import { gigAJV, handleAJVError, ajv } from "../ajvHelper";



const readGIG = async (req, res) => {
    const data = req.body;
    const gigUUID = req.body.gigUUID;

    if (!gigAJV.gigRead(data)) {
        return res.send(handleAJVError(ajv));
    }


    try {
        if (gigUUID && typeof id === 'string') {

            // check if id exists in database (boolean)
            const gigInDB = await GigModel.exists()

            // check if gig id exists 
            // this check will be empty if gig id is not found
            if (gigInDB._id) {
                const tempGig = await GigModel.findById({
                    _id: gigUUID
                })
                return res.status(200).send({
                    message: "gig found in db",
                    status: "success",
                    data: tempGig
                })
            }

            // if gig is not found in db
            return res.status(400).send({
                message: "gig not found in db",
                status: "failed"
            })
        }

        // if id is incorrect
        return res.status(400).send({
            message: "gig-id is incorrect or malformed",
            status: "failed"
        })

    } catch (error) {
        return res.status(500).send({
            message: error.message || "gig read error (level: high)",
            status: "exited"
        })
    }


}

export default readGIG;