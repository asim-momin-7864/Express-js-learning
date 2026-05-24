// module import
import User from "../../models/user/user.model.js";

export const allContactsController = async (req, res) => {
  try {
    const currentUserId = req.user._id;

    // fetch all contacts
    const allContacts = await  User.find({
      _id: { $ne: currentUserId }, // this line for we dont want to send our self data (if we are not keeping self chat feature )
    }).select("-password");

    // send all contacts
    res.status(200).json(allContacts);

  } catch (error) {
    console.error("Error in allContactsController", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
