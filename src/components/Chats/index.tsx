import React from "react";

import { List, ListItemButton, Stack, Typography } from "@mui/material";

export const Chats = ({ chats = {}, selectedChat, handleSelectChat }: any) => {
  const handleCreateChat = () => {};
  return (
    <Stack>
      <Typography variant="h5">Chats</Typography>
      <List>
        {Object.entries(chats).map(([id, c]) => (
          <ListItemButton
            selected={id === selectedChat}
            onClick={() => handleSelectChat(id)}
          >
            {id}
          </ListItemButton>
        ))}
        <button onClick={handleCreateChat}>New Chat</button>
      </List>
    </Stack>
  );
};
