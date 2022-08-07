import React, { FC } from "react";
import "./Home.css";
import OnlineUsers from "../../components/onlineUsers/OnlineUsers";
import JoinRoom from "../../components/joinRoom/JoinRoom";

interface Iprops {
  socketId: any;
  joinedRoom: boolean;
  room: any;
  users: any;
  joinRoom: any;
  rooms: any;
  chatContainer: any;
  socket: any;
  setRooms: any;
}

const Home: FC<Iprops> = ({
  socketId,
  users,
  joinRoom,
  rooms,
  socket,
  setRooms
}: Iprops) => {
  return (
    <>
      <div className="homeView">
        <div className="homeViewContainer">
          <OnlineUsers users={users} socketId={socketId} />
          <JoinRoom joinRoom={joinRoom} rooms={rooms} socket={socket} setRooms={setRooms} />
        </div>
      </div>
    </>
  );
};

export default Home;
