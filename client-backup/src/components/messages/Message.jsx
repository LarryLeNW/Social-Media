import { useAuthContext } from "../../context/AuthContext";
import { extractTime } from "../../utils/extractTime";
import useConversation from "../../zustand/useConversation";
import TypingLoading from "../../assets/Images/typing.webp"

const Message = ({ message }) => {
  const { authUser } = useAuthContext();
  const { selectedConversation } = useConversation();
  const fromMe = message?.senderId === authUser?._id;
  const formattedTime = extractTime(message?.createdAt);
  const chatClassName = fromMe ? "chat-end" : "chat-start";
  const profilePic = fromMe
    ? authUser.profilePic
    : selectedConversation?.profilePic;
  const bubbleBgColor = fromMe ? "bg-blue-500" : "";

  const shakeClass = message?.shouldShake ? "shake" : "";

  return (
    <div className={`chat  ${chatClassName ? chatClassName : "chat-start"}`}>
      <div className="chat-image avatar">
        <div className="w-10 rounded-full">
          <img alt="Tailwind CSS chat bubble component" src={profilePic} />
        </div>
      </div>
      {message ? (
        <>
          <div
            className={`chat-bubble text-white ${bubbleBgColor} ${shakeClass} pb-2`}
          >
            {message.message}
          </div>
          <div className="chat-footer opacity-50 text-xs flex gap-1 items-center">
            {formattedTime}
          </div>
        </>
      ) : (
        <div className="chat-bubble text-white pb-2">
          <img
            src={TypingLoading}
            alt=""
            width={"40px"}
            height={"40px"}
            className="rounded"
          />
        </div>
      )}
    </div>
  );
};
export default Message;
