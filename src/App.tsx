import { FC, useState, useEffect, useRef } from "react";
import "./App.css";
import io from "socket.io-client";
const socket = io("http://localhost:5000");
import Home from "./pages/home/Home";
import Chat from "./pages/chat/Chat";
import Header from "./components/Header/Header";

const App: FC<any> = () => {
  const [socketId, setSocketId] = useState<any>("");
  const [message, setMessage] = useState<string>("");
  const [users, setUsers] = useState([]);
  const [rooms, setRooms] = useState<any>([]);
  const [joinedRoom, setJoinedRoom] = useState<boolean>(false);
  const [room, setRoom] = useState<any>("");
  const [chat, setChat] = useState([]);


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
  }, [chat, rooms]);
 

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
            rooms={rooms}
            socket={socket}
            setRooms={setRooms}
            chatContainer={chatContainer}
            setJoinedRoom={setJoinedRoom}
            setRoom={setRoom}
            setChat={setChat}
          />
        )}
        {joinedRoom && (
          <Chat
            setMessage={setMessage}
            socketId={socketId}
            chat={chat}
            message={message}
            joinedRoom={joinedRoom}
            room={room}
            socket={socket}
            setRooms={setRooms}
            rooms={rooms}
          />
        )}
      </div>
    </>
  );
};

export default App;
