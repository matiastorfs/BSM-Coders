import { ObjectId } from "mongodb";

export interface Game {
  id: number;
  title: string;
  thumbnail: string;
  short_description: string;
  game_url: string;
  genre: string;
  platform: string;
  publisher: string;
  developer: string;
  release_date: string;
}

export interface User {
    _id?: ObjectId;
    name: string;
    email: string;
    password?: string;
    userIcon: string;
}

export interface Forum {
  id: number;
  title: string;
  description: string;
  messages: number;
  last_message_in_days: number;
}

export interface Achievement {
  title: string;
  description: string;
}

export interface Rank {
  id: number;
  name: string;
  description: string;
  xp: number;
}

export interface FlashMessage {
    type: "error" | "success";
    message: string;
}