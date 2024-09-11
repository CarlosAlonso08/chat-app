import { useAuthContext } from "../../context/AuthContext";
import { extractTime } from "../../utils/getTime";
import useConversation from "../../zustand/useConversation";

const Message = ({message}) => {
	const { authUser } = useAuthContext();
  const { selectedConversation } = useConversation();
  const fromMe = message.senderId === authUser.id;
  const formatedTime = extractTime(message.createdAt);
  const chatClassName = fromMe ? "chat-end" : "chat-start";
  const profilePic = fromMe ? authUser.profilePic : selectedConversation?.profilePic;
  const bubbleBgColor = fromMe ? "bg-blue-500" : "";
  const shakeClass = message.shouldShake ? "shake" : "";

  return (
    <div className={`chat ${chatClassName}`}>
      <div className="chat-image avatar">
        <div className="w-10 rounded-full">
          <img
            src={`${profilePic}`}
            alt="user avatar"
          />
        </div>
      </div>
      <div className={`chat-bubble ${bubbleBgColor} ${shakeClass}`}>{message.message}</div>
      <div className="chat-footer opacity-50"> {formatedTime}</div>
    </div>
  );
};

export default Message;
