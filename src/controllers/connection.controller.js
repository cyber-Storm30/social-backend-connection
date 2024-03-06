import ConnectionService from "../services/connection.service.js";

class ConnectionController {
  async sendRequest(req, res) {
    try {
      const response = await ConnectionService.sendRequest(
        req.body.senderId,
        req.body.receiverId
      );
      res.status(200).json({
        success: true,
        message: "Request send succesfully",
        data: response,
      });
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  }
  async acceptRequest(req, res) {
    try {
      const response = await ConnectionService.acceptRequest(
        req.body.senderId,
        req.body.receiverId,
        req.body
      );
      res.status(200).json({
        success: true,
        message: "Request accepted succesfully",
        data: response,
      });
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  }
  async getPendingRequests(req, res) {
    try {
      const response = await ConnectionService.getPendingRequests(
        req.params.id
      );
      res.status(200).json({
        success: true,
        message: "Pending requests fetched succesfully",
        data: response,
      });
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  }
}

export default new ConnectionController();
