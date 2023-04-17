// Import the functions you need from the SDKs you need
import { initializeApp, getApps, getApp } from "firebase/app";
import { getDatabase, ref } from "firebase/database";
import config from "./config.js";

const app = getApps().length < 1 ? initializeApp(config()) : getApp();

export const database = getDatabase(app);
export const rootRef = ref(database);
export const dbChats = ref(database, "/chats");
