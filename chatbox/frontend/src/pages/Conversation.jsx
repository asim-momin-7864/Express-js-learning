import { MdOutlineArrowBackIos } from "react-icons/md";
import { BiDotsVerticalRounded } from "react-icons/bi";
import { BsFillSendFill } from "react-icons/bs";
import { useEffect, useRef, useState } from "react";
import Home from "./Home";
import { useSelector, useDispatch } from "react-redux";
import {
  sendMessage,
  getMessages,
} from "../features/conversation/conversationAPI.js";
import { PiChatsBold } from "react-icons/pi";
import { MdOutlineWavingHand } from "react-icons/md";
import MessageBubble from "../components/MessageBubble.jsx";
import { useNavigate } from "react-router-dom";
import useIsMobile from "../hook/useIsMobile";
import { useParams } from "react-router-dom";
import { selectConversationById } from "../features/conversation/conversationAPI.js";

const Conversation = () => {
  const navigate = useNavigate();
  const isMobile = useIsMobile();

  // params
  const { id } = useParams(); // 🆔 user id from URL

  // dispatch
  const dispatch = useDispatch();

  // use selector
  const { messages, selectedConversation } = useSelector(
    (state) => state.conversation
  );
  console.log(" messages at conversation.jsx =>", messages);
  console.log(" selectedConversation =>", selectedConversation);

  // current user
  const { user } = useSelector((state) => state.auth);

  // local
  const [newMessage, setNewMessage] = useState("");

  // handle new message form local
  const handleNewMessageLocal = (e) => {
    e.preventDefault();
    setNewMessage(e.target.value);
  };

  useEffect(() => {
    if (id) {
      dispatch(selectConversationById(id)); // 🔁 you create this function
    }
  }, [id]);

  // useEffect(() => {
  //   if (isMobile && !selectedConversation?._id) {
  //     navigate("/"); // go back to Home to select a chat
  //   } else {
  //     navigate("/conversation");
  //   }
  // }, [isMobile, selectedConversation?._id, navigate]);

  const bottomBlankSpace = useRef(null);

  // need manually reload page
  // useEffect(() => {
  //   dispatch(getMessages());
  // }, [dispatch ,selectedConversation?._id]);

  // getMessages after every 5 sec

  // useEffect(() => {
  //   if (!selectedConversation?._id) return; // if conversation is not selected then below code wont run ( its guards it)

  //   // fetch immediately, then every 5 seconds
  //   dispatch(getMessages());
  //   const intervalId = setInterval(() => {
  //     dispatch(getMessages());
  //   }, 2500);

  //   return () => clearInterval(intervalId);
  // }, [dispatch, selectedConversation?._id]);

  useEffect(() => {
    // Add a robust guard here:
    if (!selectedConversation || !selectedConversation._id) {
      console.log("No conversation selected, not fetching messages.");
      return; // Guard against dispatching if no valid conversation is selected
    }

    // fetch immediately, then every 5 seconds
    dispatch(getMessages());
    const intervalId = setInterval(() => {
      dispatch(getMessages());
    }, 2500);

    return () => clearInterval(intervalId);
  }, [dispatch, selectedConversation?._id]); // Dependency on selectedConversation?._id is good

  // 💬 useEffect Summary:
  //
  // - Runs when a conversation is selected or changed (triggered by selectedConversation._id).
  // - Immediately dispatches getMessages() to fetch the initial chat.
  // - Then sets up a setInterval to dispatch getMessages() every 5 seconds (polling for new messages).
  // - This interval keeps running as long as the component is mounted and the same conversation is active.
  // - When the conversation changes or component unmounts:
  //     👉 the cleanup function runs: clearInterval(intervalId)
  //     👉 this prevents multiple intervals from stacking up or leaking.
  //
  // ✅ Ensures consistent, periodic message fetching with clean resource management.

  // when new messsage arrive , page shoud scroll to bottom to new message (move to bottomBlankSpace component)
  useEffect(() => {
    bottomBlankSpace.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // handleSendMessageGlobal

  const handleSendMessageGlobal = (e) => {
    e.preventDefault();
    dispatch(sendMessage(newMessage));
    setNewMessage("");
  };

  return (
    <div className="flex-none lg:flex w-full gap-x-5">
      <div className="hidden lg:block w-4/12">
        <Home />
      </div>
      <div className="overflow-hidden flex flex-col h-[100dvh] w-full lg:w-8/12">
        {selectedConversation && selectedConversation?._id ? (
          <>
            {/* navbar  */}
            <nav className="h-13 bg-[#957fef] flex justify-between items-center px-3">
              <div>
                <MdOutlineArrowBackIos size={22} />
              </div>
              <div>
                <BiDotsVerticalRounded size={25} />
              </div>
            </nav>

            {/* middle chat section , fixed outer layer */}
            <div className="flex-1 overflow-y-auto container mx-auto">
              {/* inner longer container which overflow scroll   */}
              <div className="h-auto flex flex-col">
                {/* upper profile picture and name of other user  */}
                <div className="flex flex-col justify-center items-center gap-y-2 mt-5">
                  <img
                    className="mask mask-circle w-20"
                    src={`${selectedConversation?.profileUrl}`}
                  />
                  <p className="font-medium">
                    {selectedConversation?.fullName}
                  </p>
                </div>

                {/* chat bubles containing container  */}
                <div className="flex-1 mt-15 flex flex-col">
                  {messages.length > 0 ? (
                    messages.map((msg) => (
                      <MessageBubble message={msg} key={msg._id} />
                    ))
                  ) : (
                    <p className="text-center">
                      {" "}
                      Send Message to Start conversation{" "}
                    </p>
                  )}
                  <div className="h-15" ref={bottomBlankSpace}></div>
                </div>
              </div>
            </div>

            {/* typing section / input bar  */}
            <form
              onSubmit={handleSendMessageGlobal}
              className="h-20 flex justify-center items-center px-3 "
            >
              <input
                type="text"
                placeholder="Enter Message"
                className="w-full rounded-s-full text-lg h-13 px-5 outline-0 text-black border-0 bg-gray-100"
                name="message"
                onChange={handleNewMessageLocal}
                value={newMessage}
              />
              <button
                type="submit"
                className="btn rounded-e-full rounded-s-none h-13 bg-gray-100 border-0 outline-0 "
              >
                <BsFillSendFill size={23} color={"#7161ef"} />
              </button>
            </form>
          </>
        ) : (
          <>
            <div className="w-full h-full flex justify-center items-center">
              <div className="flex flex-col justify-center items-center">
                <h1>
                  <PiChatsBold size={70} />
                </h1>
                <h1 className="text-3xl font-bold">{`Hello! 👋 ${user?.fullName}`}</h1>
                <h1 className="text-3xl font-bold">
                  Select a Chat to start Messaging
                </h1>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Conversation;
