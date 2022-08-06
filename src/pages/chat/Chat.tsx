import {FC} from "react";
interface Iprops{
  chatContainer: any;
}

const Chat: FC<Iprops> = ({ chatContainer}: Iprops) => {
  return (
    <>
      <h1 ref={chatContainer}>Chat</h1>
    </>
  );
};

export default Chat;
