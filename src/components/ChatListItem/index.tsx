import { ListItem } from "@mui/material";
import { IChat } from "components/Chat";
import { ChangeEvent, MouseEventHandler } from "react";

interface IChatListItem {
  id: string;
  handleSelectChat: Function;
}

export const ChatListItem = ({
  id,
  handleSelectChat,
  ...rest
}: IChatListItem) => {
  return <ListItem onClick={() => handleSelectChat(id)}>{id}</ListItem>;
};
