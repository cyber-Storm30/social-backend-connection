import ConnectionModel from "../models/connection.model.js";
import axios from "axios";
import { BASE_URL } from "../config/connection.js";

// 1 -> Pending request
// 2 -> Accepted request
// 3 -> Deleted request

class ConnectionService {
  async sendRequest(senderId, receiverId) {
    try {
      const isReq = await ConnectionModel.findOne({
        $or: [
          {
            $and: [
              {
                sender: senderId,
              },
              {
                receiver: receiverId,
              },
            ],
          },
          {
            $and: [
              {
                sender: receiverId,
              },
              {
                receiver: senderId,
              },
            ],
          },
        ],
      });
      if (!isReq) {
        const newReq = new ConnectionModel({
          sender: senderId,
          receiver: receiverId,
          status: 1,
        });
        await axios.post(`${BASE_URL}/auth/add/connection`, {
          senderId,
          receiverId,
          status: "PENDING",
        });

        const savedReq = await newReq.save();
        return savedReq;
      } else {
        throw new Error("Request already exists");
      }
    } catch (err) {
      throw new Error(err);
    }
  }
  async acceptRequest(senderId, receiverId, body) {
    try {
      const isReq = await ConnectionModel.findOne({
        $and: [
          {
            sender: senderId,
          },
          {
            receiver: receiverId,
          },
        ],
      });
      if (isReq) {
        try {
          const updatedReq = await ConnectionModel.findOneAndUpdate(
            {
              $and: [
                {
                  sender: senderId,
                },
                {
                  receiver: receiverId,
                },
              ],
            },
            { $set: body },
            { new: true }
          );
          await axios.post(`${BASE_URL}/auth/add/connection`, {
            senderId,
            receiverId,
            status: "ACCEPT",
          });
          return updatedReq;
        } catch (err) {
          throw err;
        }
      } else {
        throw new error("No pending request found");
      }
    } catch (err) {
      throw err;
    }
  }
  async deleteRequest(senderId, receiverId, requestId) {
    try {
      // delete request code here
    } catch (err) {
      throw err;
    }
  }
  async getPendingRequests(receiverId) {
    try {
      let pendingRequests = await ConnectionModel.find({
        $and: [{ receiver: receiverId }, { status: 1 }],
      });
      const pendingRequestsWithDetails = await Promise.all(
        pendingRequests.map(async (pendingRequest) => {
          try {
            const userResponse = await axios.get(
              `${BASE_URL}/auth/user/${pendingRequest.sender}`
            );
            const userDetails = userResponse.data.data;
            console.log(userDetails);
            const pendingRequestWithDetails = {
              ...pendingRequest.toObject(),
              sender: userDetails,
            };
            return pendingRequestWithDetails;
          } catch (err) {
            return pendingRequest;
          }
        })
      );
      return pendingRequestsWithDetails;
    } catch (err) {
      throw err;
    }
  }
}

export default new ConnectionService();
