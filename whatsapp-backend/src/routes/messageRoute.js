// importing required stuff
import express from "express";
import messageController from "../controllers/messageController.js";

// instance of router
const router = express.Router();

//routes
router.post("/api/v1/messages/new", messageController.createNewMessage);

router.get("/api/v1/messages", messageController.getMessages);


// exporting modules here
export default router;