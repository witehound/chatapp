import React, { FC } from "react";
import "./Home.css";
import Header from "../../components/Header/Header";
import OnlineUsers from "../../components/onlineUsers/OnlineUsers";
import JoinRoom from "../../components/joinRoom/JoinRoom";

interface Iprops {
  socketId: any;
  joinedRoom: boolean;
  room: any;
  users: any;
  joinRoom: any;
  rooms: any;
  createRoom: any;
  chatContainer: any;
}

const Home: FC<Iprops> = ({
  socketId,
  joinedRoom,
  room,
  users,
  joinRoom,
  rooms,
  createRoom,
  chatContainer
}: Iprops) => {
  return (
    <>
      <Header socketId={socketId} joinedRoom={joinedRoom} room={room} />
      {!joinedRoom && (
        <div className="homeView">
          <div className="homeViewContainer">
            <OnlineUsers users={users} socketId={socketId} />

            <JoinRoom
              joinRoom={joinRoom}
              rooms={rooms}
              createRoom={createRoom}
            />
          </div>
        </div>
      )}{
        joinedRoom && (<h1 ref={chatContainer}>hey</h1>)
      }
    </>
  );
};

export default Home;
