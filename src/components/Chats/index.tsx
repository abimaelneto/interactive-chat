import React, { PropsWithChildren } from "react";

import { List, ListItemButton, Stack, Typography } from "@mui/material";
import Link from "next/link";
import { IChat } from "components/Chat";
interface IChats {
  chats: IChat;
  selectedChat: string;
  handleSelectChat: Function;
}

export const Chats = ({ chats, selectedChat, handleSelectChat }: IChats) => {
  const handleCreateChat = () => {};
  return (
    <Stack>
      <Typography variant="h5">Chats</Typography>
      <List>
        {Object.values(chats).map((c) => (
          <Link href={`/chat/${c?.title}`}>
            <ListItemButton
              selected={c?.title === selectedChat}
              onClick={() => handleSelectChat(c?.title)}
            >
              {c?.title}
            </ListItemButton>
          </Link>
        ))}
        <button onClick={handleCreateChat}>New Chat</button>
      </List>
    </Stack>
  );
};
