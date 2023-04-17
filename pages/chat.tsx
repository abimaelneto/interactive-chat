import React, { ChangeEvent, useState } from "react";

import { useEffect } from "react";
import { Box, Grid } from "@mui/material";
import { database } from "libs/firebase";
import { child, get, onValue, push, ref, update } from "firebase/database";
import { Chats } from "components/Chats";
import { Chat } from "components/Chat";

const rootRef = ref(database);
const dbChats = ref(database, "/chats");

export default function ChatPage() {
  const [chats, setChats] = useState({});
  const [chatId, setChatId] = useState("");
  const [selectedChat, setSelectedChat] = useState("");

  const getChats = () => {
    get(dbChats).then((snapshot) => {
      if (snapshot.exists()) {
        const chats = snapshot.val();
        setChats(chats);
      } else {
        console.log("No data available");
        setChats({});
      }
    });
  };

  const handleSetChatId = (e: ChangeEvent<HTMLInputElement>) =>
    setChatId(e.target.value);
  const handleSelectChat = (id: string) => {
    setSelectedChat(id);
  };

  const handleEnterExistingChat = () => setSelectedChat(chatId);

  const handleCreateChat = async () => {
    const newChatId = push(child(ref(database), "chats")).key;
    if (!newChatId) return;

    const newChatKey = "/chats/" + newChatId;
    const updates = { [newChatKey]: { messages: "empty" } };
    try {
      update(rootRef, updates);
      setSelectedChat(newChatId);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    getChats();
    onValue(dbChats, (snapshot) => {
      if (snapshot.exists()) {
        setChats(snapshot.val());
      }
    });
  }, []);

  return (
    <Box>
      <h1>Interactive Chat</h1>
      <button onClick={handleCreateChat}>New Chat</button>
      <h4>Enter chat code</h4>
      <input value={chatId} onChange={handleSetChatId} />
      <button onClick={handleEnterExistingChat}>Enter</button>
      <Grid container>
        <Grid item md={4}>
          <Chats
            chats={chats}
            selectedChat={selectedChat}
            handleSelectChat={handleSelectChat}
          />
        </Grid>
        <Grid item md={8}>
          <Chat id={selectedChat} />
        </Grid>
      </Grid>
    </Box>
  );
}
