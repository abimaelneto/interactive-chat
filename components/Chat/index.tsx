import React from "react";
import { IMessage, Message } from "../Message";

interface IChat {
  messages: IMessage[];
}

export const Chat = ({ messages }: IChat) => {
  return (
    <>
      {messages.map((m) => (
        <Message type={m.type} />
      ))}
    </>
  );
};
