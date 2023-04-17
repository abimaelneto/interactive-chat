import React, { ChangeEvent, useState } from "react";

export default function Join() {
  const [chatId, setChatId] = useState("");
  const handleSetChatId = (e: ChangeEvent<HTMLInputElement>) =>
    setChatId(e.target.value);

  return <></>;
}
