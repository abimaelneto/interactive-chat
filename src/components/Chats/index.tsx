import React from "react";
import { Chat, IChat } from "../Chat";

interface IChats {
  chats: IChat[];
}

export const Chats = ({ chats = [] }: IChats) => {
  const handleCreateChat = () => {};
  return (
    <>
      {chats.map((c) => (
        <Chat {...c} />
      ))}
      <button onClick={handleCreateChat}>New Chat</button>
    </>
  );
};
