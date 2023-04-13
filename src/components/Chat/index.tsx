import React from "react";
import { IMessage, Message } from "../Message";

export interface IChat {
  id: string;
  messages: IMessage[];
}

export const Chat = ({ id, messages }: IChat) => {
  return (
    <>
      <p>CHAT {id}</p>
      {messages.map((m) => (
        <Message type={m.type} />
      ))}
    </>
  );
};
