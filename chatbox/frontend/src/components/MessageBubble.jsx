import { useSelector, useDispatch } from "react-redux";

const MessageBubble = ({ message }) => {
  // current user
  const { user } = useSelector((state) => state.auth);

  // isFromMe switch to differenciate Messages
  const isFromMe = user._id == message.senderId;
  console.log("isFromeMe =>", isFromMe);

  const time = new Date(message.createdAt).toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
  });

  return (
    <div className={`chat ${isFromMe ? "chat-end" : "chat-start"}`}>
      <div className="chat-header">
        <time className="text-xs opacity-50">{`${time} ago`}</time>
      </div>
      <div
        className={`chat-bubble ${isFromMe ? "bg-[#dec0f1]" : "bg-gray-300"}`}
      >
        {message.message}
      </div>

      {/*<div className="chat-footer opacity-50">Seen</div>*/}
    </div>
  );
};

export default MessageBubble;
