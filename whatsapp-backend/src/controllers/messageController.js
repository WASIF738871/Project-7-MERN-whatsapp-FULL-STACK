// importings
import messageModel from "../models/messageModle.js";
import Pusher from "pusher";

// handler function
const createNewMessage = async (req, res) => {
    try {
        req.body.createdAt =new Date().toUTCString();
        let {name, message, createdAt, received} = req.body;
        await messageModel.create(req.body);

        //using pusher to make mongoDB real time
        const pusher = new Pusher({
            appId: "1541691",
            key: "5bae0affad70967e94ca",
            secret: "b17dd0038d8e8dba1425",
            cluster: "ap2",
            useTLS: true
          });
       
        pusher.trigger("messages","inserted",
          {
            name: name,
            message:message,
            createdAt: createdAt,
            received: received
          }
          )
       
        return res.status(201).send({ status: true, message: "message is pushed in database", data:req.body });
    }
    catch (error) {
        return res.status(500).send({ status: false, message: error.message });
    }
}

const getMessages = async (req, res) => {
    try {
        let dbMessage = await messageModel.find({});
        return res.status(200).send({ status: true, message: "message is pushed in database", dbMessage });
    }
    catch (error) {
        return res.status(500).send({ status: false, message: error.message });
    }
}

//exporting the module
export default {
    createNewMessage,
    getMessages
};