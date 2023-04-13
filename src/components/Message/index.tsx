import React from "react";

export interface IMessage {
  content?: string;
  type: "text" | "file" | "audio" | "video";
}

export const Message = ({}: IMessage) => {
  return <div></div>;
};
