import React, { ChangeEvent, useState } from "react";

import { useEffect } from "react";
import { Box, Grid } from "@mui/material";
import { database } from "../../src/libs/firebase";
import { child, get, onValue, push, ref, update } from "firebase/database";
import { Chats } from "../../src/components/Chats";
import { Chat } from "../../src/components/Chat";
import { useRouter } from "next/router";

const rootRef = ref(database);
const dbChats = ref(database, "/chats");

export default function ChatPage() {
  const [chats, setChats] = useState({});

  const { query } = useRouter();
  const selectedChat = query.title as string;
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
      <Grid container>
        <Grid item md={4}>
          <Chats chats={chats} selectedChat={selectedChat} />
        </Grid>
        <Grid item md={8}>
          <Chat id={selectedChat} />
        </Grid>
      </Grid>
    </Box>
  );
}
