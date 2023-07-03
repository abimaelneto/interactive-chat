import React, {
  ChangeEvent,
  SetStateAction,
  useContext,
  useEffect,
  useState,
} from "react";
import { IMessage, Message } from "../Message";
import { database } from "libs/firebase";
import {
  TextField,
  Button,
  Stack,
  InputAdornment,
  IconButton,
  Box,
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
import { UserContext } from "contexts/user";
import { grey } from "@mui/material/colors";

export interface IChat {
  id: string;
  title: string;
  maxUsers: number;
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
  const { user } = useContext(UserContext);
  const handleSendMessage = () => {
    const messageId = push(child(ref(database, `/chats/${id}`), "messages"));

    set(messageId, {
      type: "text",
      content: newMessage,
      createdAt: Date.now(),
      author: user?.displayName,
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
    <Stack
      sx={{ p: 2, height: "100vh", overflow: "hidden", background: grey[200] }}
    >
      <p>CHAT {id}</p>
      <Box sx={{ flex: 9, overflowY: "scroll" }}>
        <Stack sx={{ width: "100%" }}>
          {messages !== "empty" &&
            Object.keys(messages || {}).length > 0 &&
            Object.values(messages).map((m) => (
              <Message {...(m as IMessage)} />
            ))}
        </Stack>
      </Box>
      <Stack direction="row" sx={{ width: "100%", flex: 1 }}>
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
    </Stack>
  );
};
