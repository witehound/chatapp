import { FC } from "react";
import "./Chat.css"

interface Iprops{
  chatContainer: any;
  chat: any;
  socketId: any;
  sendMessage: any;
  message: any;
  setMessage: any;
}

const Chat: FC<Iprops> = ({ chatContainer , chat, socketId, sendMessage, message, setMessage}: Iprops) => {
  return (
    <>
      <div className="chatContainer">
        <div className="chatDisplay">
        <ul className="chat-list" id="chat-list" ref={chatContainer}>
              {chat.map((chat: any, idx: any) => (
                <div
                  key={idx}
                  className={chat.writer === socketId ? "chat-me" : "chat-user"}
                >
                  {chat.writer === socketId
                    ? `${chat.message}: ME*`
                    : `User (${chat.writer.slice(0, 5)}): ${chat.message}`}
                </div>
              ))}
            </ul>
        </div>

        <form className="chatForm" onSubmit={(e) => e.preventDefault()}>
            <input
              type="text"
              placeholder="Your message ..."
              autoFocus
              onChange={(e) => {
                setMessage(e.target.value);
              }}
              value={message}
            />
            <button
              className="send_btn"
              type="submit"
              onClick={() => sendMessage()}
            >
              Send
            </button>
          </form>
        <div className="chatBack">
          back
        </div>
      </div>
    </>
  );
};

export default Chat;
