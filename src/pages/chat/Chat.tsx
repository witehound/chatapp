import { FC, useRef, useEffect } from "react";
import "./Chat.css";

interface Iprops {
  chat: any;
  socketId: any;
  message: string;
  setMessage: any;
  joinedRoom: any;
  room: any;
  socket: any;
  setRooms: any;
  rooms: any;
}

// useEffect(()=>{},[])

const Chat: FC<Iprops> = ({
  chat,
  socketId,
  room,
  message,
  setMessage,
  socket,
  setRooms,
  rooms,
  joinedRoom,
}: Iprops) => {
  const chatContainer = useRef<any>(null);

  useEffect(() => {
    chatContainer.current?.scrollIntoView({
      behavior: "smooth",
    });

    console.log("works");
  }, [chat, message]);

  const sendMessage = async () => {
    const payload = { message: message, room: room, socketId: socketId };
    await socket.emit("message", payload);
    socket.on("getAllRooms", (rooms: Iprops) => {
      setRooms(rooms);
    });

    setMessage("");

    socket.on("getAllRooms", (rooms: Iprops) => {
      setRooms(rooms);
    });

    socket.on("updateRooms", (rooms: Iprops) => {
      setRooms(rooms);
    });
  };

  return (
    <>
      <div className="chatContainer">
        <div className="chatDisplay" ref={chatContainer}>
          <ul className="chatList" id="chat-list" ref={chatContainer}>
            {chat.map((chat: any, idx: any) => (
              <div
                key={idx}
                className={chat.writer === socketId ? "chatMe" : "chatUser"}
              >
                <div
                  className={`sentChat ${
                    chat.writer === socketId && "sentChatMe"
                  }`}
                >
                  {chat.writer === socketId
                    ? `${chat.message}: ME*`
                    : `User (${chat.writer.slice(0, 5)}): ${chat.message}`}
                </div>
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
        <div className="chatBack">back</div>
      </div>
    </>
  );
};

export default Chat;
