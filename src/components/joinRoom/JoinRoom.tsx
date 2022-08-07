import React, { FC } from "react";
import "./JoinRoom.css";

interface Iprops {
  rooms: any;
  socket: any;
  setRooms: any;
  setRoom: any;
  setJoinedRoom: any;
  setChat: any;
}

const JoinRoom: FC<Iprops> = ({ rooms, socket, setRooms, setRoom, setJoinedRoom, setChat }: Iprops) => {

  const createRoom = () => {
    socket.emit("createRoom");
    socket.on("getRoom", (room: any) => {
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
    <div className="JoinRoom">
      <div className="JoinRoomContainer">
        <h2 className="JoinRoomHeading">Available Rooms:</h2>
        <div className="joinRoomRoom">
          {rooms.length === 0 ? (
            <h3 className="no_rooms">No Rooms! Create a room !</h3>
          ) : (
            <ul className="rooms">
              {rooms.map((room: any) => {
                return (
                  <div key={room.id} onClick={() => joinRoom(room)}>
                    {room.id}
                  </div>
                );
              })}
            </ul>
          )}
        </div>

        <div className="joinRoomBtn">
          <button className="joinRoombtn" onClick={() => createRoom()}>
            Create Room
          </button>
        </div>
      </div>
    </div>
  );
};

export default JoinRoom;
