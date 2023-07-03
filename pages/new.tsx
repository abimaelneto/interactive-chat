import { Button, TextField } from "@mui/material";
import { UserContext } from "contexts/user";
import { useRouter } from "next/router";
import { ChangeEvent, useContext, useState } from "react";
import { createChat } from "use-cases/createChat";

interface IChatInfo {
  createdBy: string;
  title: string;
  maxUsers?: number;
}

export default function New() {
  const { user } = useContext(UserContext);
  const router = useRouter();
  const [chatInfo, setChatInfo] = useState<IChatInfo>({
    title: "",
    createdBy: user?.displayName || "",
  });

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setChatInfo((old) => ({ ...old, [name]: value }));
  };

  const handleCreateChat = async () => {
    const chatId = await createChat(chatInfo);
    if (chatId) router.push("/chat/" + chatId);
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
