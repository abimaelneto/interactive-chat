import React, { ChangeEvent, SetStateAction, useEffect, useState } from "react";
import { IMessage, Message } from "../Message";
import { database } from "libs/firebase";
import {
  TextField,
  Button,
  Stack,
  InputAdornment,
  IconButton,
} from "@mui/material";
import { Attachment } from "@mui/icons-material";
import {
  DataSnapshot,
  child,
  get,
  onValue,
  push,
  ref,
  set,
} from "firebase/database";

export interface IChat {
  id: string;
}

const getMessages = (selectedChat: string, setMessages: Function) => {
  get(ref(database, `/chats/${selectedChat}`)).then((snapshot) => {
    if (snapshot.exists()) {
      const { messages } = snapshot.val();
      setMessages(messages);
    } else {
      console.log("No data available");
    }
  });
};

export const Chat = ({ id }: IChat) => {
  const [newMessage, setNewMessage] = useState("");
  const [messages, setMessages] = useState({});
  const chatRef = ref(database, "/chats/" + id + "/messages/");

  const handleSendMessage = () => {
    const messageId = push(child(ref(database, `/chats/${id}`), "messages"));

    set(messageId, {
      type: "text",
      content: newMessage,
      createdAt: Date.now(),
      author: "abima",
    })
      .then(() => {
        console.log("Message send");
      })
      .catch((err) => console.error(err));
    setNewMessage("");
  };
  const handleChangeNewMessage = (e: ChangeEvent<HTMLInputElement>) => {
    setNewMessage(e.target.value);
  };

  useEffect(() => {
    getMessages(id, setMessages);
    const unsubscribe = onValue(chatRef, (snap: DataSnapshot) => {
      if (snap.exists()) {
        setMessages(snap.val());
      }
    });
    return () => unsubscribe();
  }, [id]);
  return (
    <>
      <p>CHAT {id}</p>
      <Stack sx={{ width: "100%" }}>
        {messages !== "empty" &&
          Object.keys(messages || {}).length > 0 &&
          Object.values(messages).map((m) => <Message {...(m as IMessage)} />)}
      </Stack>
      <Stack direction="row" sx={{ width: "100%" }}>
        <TextField
          value={newMessage}
          onChange={handleChangeNewMessage}
          fullWidth
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton>
                  <Attachment />
                </IconButton>
              </InputAdornment>
            ),
          }}
        />
        <Button onClick={handleSendMessage}>Send</Button>
      </Stack>
    </>
  );
};
