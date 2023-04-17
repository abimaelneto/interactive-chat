import { Button, TextField } from "@mui/material";
import { ChangeEvent, useState } from "react";
import { createChat } from "use-cases/createChat";

interface IChatInfo {
  createdBy: string;
  title: string;
  maxUsers?: number;
}

export default function New() {
  const [chatInfo, setChatInfo] = useState<IChatInfo>({
    title: "",
    createdBy: "abima",
  });

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setChatInfo((old) => ({ ...old, [name]: value }));
  };

  const handleCreateChat = () => {
    createChat(chatInfo);
  };
  return (
    <>
      <TextField
        value={chatInfo.title}
        onChange={handleChange}
        name="title"
        required
      />
      <TextField
        value={chatInfo.maxUsers}
        onChange={handleChange}
        name="maxUsers"
        type="number"
      />
      <Button onClick={handleCreateChat}>Save</Button>
    </>
  );
}
