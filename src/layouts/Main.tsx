import React from "react";
import { Chats } from "components/Chats";
import { Chat } from "components/Chat";

export const MainLayout = () => {
  return (
    <>
      <Chats chats={[]} /> <Chat id="" messages={[]}></Chat>
    </>
  );
};
