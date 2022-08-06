import { FC, useState, useEffect, useRef } from "react";
import "./App.css";
import io from "socket.io-client";
const socket = io("http://localhost:5000");
import Home from "./pages/home/Home";
import Chat from "./pages/chat/Chat";
import Header from "./components/Header/Header";
interface headerProps {
  socketId: any;
  joinedRoom: boolean;
  room: any;
}

const App: FC<any> = () => {
  const [socketId, setSocketId] = useState<any>("");
  const [message, setMessage] = useState("");
  const [users, setUsers] = useState([]);
  const [rooms, setRooms] = useState<any>([]);
  const [joinedRoom, setJoinedRoom] = useState<boolean>(false);
  const [room, setRoom] = useState<any>("");
  const [chat, setChat] = useState([]);
  const [showEmoji, setShowEmoji] = useState(false);

  // scroll
  const chatContainer = useRef<any>(null);

  useEffect(() => {
    socket.on("me", (id) => {
      setSocketId(id);
    });

    socket.on("disconnect", () => {
      socket.disconnect();
    });

    socket.on("getAllUsers", (users) => {
      setUsers(users);
    });
    // Real time
    socket.on("updateUsers", (users) => {
      setUsers(users);
    });

    socket.on("getAllRooms", (rooms) => {
      setRooms(rooms);
      for (let a of rooms) {
        if (a.id === room) {
          setChat(a.chat);
        }
      }
    });
    // Real time
    socket.on("updateRooms", (rooms) => {
      setRooms(rooms);
      for (let a of rooms) {
        if (a.id === room) {
          setChat(a.chat);
        }
      }
    });

    // Rooms

    if (joinedRoom === true) {
      chatContainer.current.scrollIntoView({
        behavior: "smooth",
        block: "end",
      });
    }
  }, [chat, rooms]);

  const sendMessage = async () => {
    const payload = { message: message, room: room, socketId: socketId };
    await socket.emit("message", payload);
    socket.on("getAllRooms", (rooms) => {
      setRooms(rooms);
    });
    setMessage("");

    chatContainer.current.scrollIntoView({
      behavior: "smooth",
      block: "end",
    });

    socket.on("getAllRooms", (rooms) => {
      setRooms(rooms);
    });

    socket.on("updateRooms", (rooms) => {
      setRooms(rooms);
    });

    console.log(rooms);
  };

  const createRoom = () => {
    socket.emit("createRoom");
    socket.on("getRoom", (room) => {
      setRooms([...rooms, room]);
    });
  };

  const joinRoom = (room: any) => {
    socket.emit("joinRoom", room);
    setRoom(room.id);
    setJoinedRoom(true);
    setChat(room.chat);
  };

  return (
    <>
      <div className="App">
        <Header socketId={socketId} joinedRoom={joinedRoom} room={room} />
        {!joinedRoom && (
          <Home
            socketId={socketId}
            joinedRoom={joinedRoom}
            room={room}
            users={users}
            joinRoom={joinRoom}
            rooms={rooms}
            createRoom={createRoom}
            chatContainer={chatContainer}
          />
        )}
        {joinedRoom && <Chat chatContainer={chatContainer}/>}
      </div>

      {/* <h1 className="main_heading">Chat App</h1>
      <h1 className="my_socket">Me: {socketId}</h1>
      <h3 className="roomjoined">
        {joinedRoom === true
          ? `Room: ${room}`
          : "You are not joined in any room"}
      </h3>

      {joinedRoom && (
        <>
          <div className="chat-container">
            <ul className="chat-list" id="chat-list" ref={chatContainer}>
              {chat.map((chat: any, idx) => (
                <li
                  key={idx}
                  className={chat.writer === socketId ? "chat-me" : "chat-user"}
                >
                  {chat.writer === socketId
                    ? `${chat.message}: ME*`
                    : `User (${chat.writer.slice(0, 5)}): ${chat.message}`}
                </li>
              ))}
            </ul>
          </div>

          <form className="chat-form" onSubmit={(e) => e.preventDefault()}>
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
              className="emoji_btn"
              type="button"
              onClick={() => setShowEmoji(!showEmoji)}
            >
              Emoji
            </button>
            <button
              className="send_btn"
              type="submit"
              onClick={() => sendMessage()}
            >
              Send
            </button>
          </form>
        </>
      )} */}
    </>
  );
};

export default App;
