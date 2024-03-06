import express from "express";
import ConnectionController from "../controllers/connection.controller.js";
const router = express.Router();

router.post("/send", ConnectionController.sendRequest);
router.post("/accept", ConnectionController.acceptRequest);
router.get("/pending/requests/:id", ConnectionController.getPendingRequests);

export default router;
