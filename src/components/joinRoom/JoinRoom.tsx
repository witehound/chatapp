import React, { FC } from "react";
import "./JoinRoom.css";

interface Iprops {
  joinRoom: any;
  rooms: any;
  createRoom: any;
}

const JoinRoom: FC<Iprops> = ({ joinRoom, rooms, createRoom }: Iprops) => {
  return (
    <div className="JoinRoom">
      <h2 className="rooms_heading">Available Rooms:</h2>

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
      <div className="btn-container">
        <button className="btn" onClick={() => createRoom()}>
          Create Room
        </button>
      </div>
    </div>
  );
};

export default JoinRoom;
