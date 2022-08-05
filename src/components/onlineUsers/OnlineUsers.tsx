import { FC } from "react";
import "./OnlineUsers.css";

interface Iprops {
  socketId: any;
  users: any;
}

const OnlineUsers: FC<any> = ({ users, socketId }: Iprops) => {
  console.log(users)
  return (
    <div className="OnlineUsers">
      <div className="OnlineUsersContainer">
        <h2 className="OnlineUsersHeading">Online Users:</h2>
        <ul className="OnlineUsersUsers">
          {users.map((user: any) => {
            return (
              <div className="user" key={user}>
                {user && user === socketId ? `ME` : user}
              </div>
            );
          })}
        </ul>
      </div>
    </div>
  );
};

export default OnlineUsers;
