import { FC } from "react";
import "./Header.css";

interface Iprops {
  socketId: any;
  joinedRoom: boolean;
  room: any;
}

const Header: FC<Iprops> = ({ socketId, joinedRoom, room }: Iprops) => {
  return (
    <>
      <div className="headerContainer">
        <h1 className="headerTitle">Qik Chat</h1>
        <div className="userDetails">
          <h3> ME : {socketId}</h3>
          <h3 className="roomjoined">
            {joinedRoom === true
              ? `Room: ${room}`
              : "You are not joined in any room"}
          </h3>
        </div>
      </div>
    </>
  );
};

export default Header;
