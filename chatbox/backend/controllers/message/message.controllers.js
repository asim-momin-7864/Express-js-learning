// packages import
import jwt from "jsonwebtoken";

// modules import
import Conversation from "../../models/conversation/conversation.model.js";
import Message from "../../models/message/message.model.js";

export const sendMessageController = async (req, res) => {
  try {
    const { id: receiverId } = req.params;
    const senderId = req?.user?._id;
    const message = req.body.message;

    // find conversation exists between these users or not
    let conversation = await Conversation.findOne({
      participants: { $all: [senderId, receiverId] },
    });

    console.log("conversation =>", conversation);

    // if conversation not exist , they are talking first time
    if (!conversation) {
      conversation = await Conversation.create({
        participants: [senderId, receiverId],
      });
    }

    // create newMessage
    const newMessage = await Message.create({
      senderId,
      receiverId,
      message,
    });

    console.log("newMessage =>", newMessage);

    // if newMessage is creats
    if (newMessage) {
      await conversation.messages.push(newMessage._id);
    }

    //TODO: Socket.io functunality come here

    // * this is lower way , means not run parellaly
    // await newMessage.save(); // if it take 2s
    // await conversation.save();// then this have to wait for 2s

    //* parellal executing way
    await Promise.all[newMessage.save(), conversation.save()];

    res.status(200).json({
      message: newMessage?.message,
    });
  } catch (error) {
    console.log("Error in sendMessageController", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const getMessagesController = async (req, res) => {
  try {
    const { id: userToChatId } = req.params;
    const senderId = req.user._id;

    // check conversation exists
    const conversation =  await Conversation.findOne({
      participants: { $all: [senderId, userToChatId] },
    }).populate("messages");

     
    console.log("conversation => ",conversation);

    // if not exists
    if (!conversation) {
      return res.status(404).json({ error: "Conversation not exists" });
    }

    // if exists then access messages
    const messages = conversation?.messages;

    // if messages not exists
    if (messages.length == 0) {
      return res.status(404).json({ error: "No Messeages" });
    }

    // if messages exists then send to res
    res.status(200).json(messages);
  } catch (error) {
    console.log("Error in getMessagesController", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
