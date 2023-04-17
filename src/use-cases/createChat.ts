import { child, push, ref, update } from "firebase/database";
import { database, rootRef } from "libs/firebase";

interface CreateChat {
  createdBy: string;
  title: string;
  maxUsers?: number;
}

export const createChat = ({ createdBy, title, maxUsers }: CreateChat) => {
  const newChatId = push(child(ref(database), "chats")).key;
  if (!newChatId) return;

  const newChatKey = "/chats/" + newChatId;
  const updates = { [newChatKey]: { createdBy, title, maxUsers } };
  try {
    update(rootRef, updates);

    return newChatId;
  } catch (err) {
    console.error(err);
  }
};
