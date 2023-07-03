import React from "react";
import { format } from "date-fns";
import { Card, Stack, Typography, useTheme } from "@mui/material";
import { useUser } from "hooks/useUser";

export interface IMessage {
  content?: string;
  type: "text" | "file" | "audio" | "video";
  createdAt: string;
  author: "string";
}

export const Message = ({ content, type, createdAt, author }: IMessage) => {
  const { user } = useUser();
  const timestamp = createdAt ? format(new Date(createdAt), "hh:mm") : "";
  const theme = useTheme();
  return (
    <Card
      sx={{
        height: "max-content",
        alignSelf: author === user?.displayName ? "end" : "start",
        my: 2,
        p: 2,

        width: "50%",
      }}
    >
      <Stack>
        <Typography
          color={
            author === user?.displayName ? "primary.main" : "secondary.main"
          }
        >
          {author}
        </Typography>
        <p>{content}</p>
        <Typography variant="button" sx={{ alignSelf: "end" }}>
          {timestamp}
        </Typography>
      </Stack>
    </Card>
  );
};
