import React, { createContext, useState, PropsWithChildren } from "react";

export const ChatContext = createContext({});

export const ChatProvider = ({ children }: PropsWithChildren) => {
  const [selectedChat, setSelectedChat] = useState<string | null>(null);
  const selectChat = (id: string) => {
    setSelectedChat(id);
  };
  const value = { selectedChat, selectChat };
  return <ChatContext.Provider value={value}>{children}</ChatContext.Provider>;
};
