import React from "react";
import { format } from "date-fns";
import { Card } from "@mui/material";
export interface IMessage {
  content?: string;
  type: "text" | "file" | "audio" | "video";
  createdAt: string;
  author: "string";
}

export const Message = ({ content, type, createdAt, author }: IMessage) => {
  const timestamp = createdAt ? format(new Date(createdAt), "hh:mm") : "";
  return (
    <Card
      sx={{
        alignSelf: author === "abima" ? "end" : "start",
        my: 2,
        backgroundColor: author === "abima" ? "primary.main" : "secondary.main",
        width: "50%",
      }}
    >
      <p>{content}</p>
      <p>Type: {type}</p>
      <p>{timestamp}</p>
    </Card>
  );
};
