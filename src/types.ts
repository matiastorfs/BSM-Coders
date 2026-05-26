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
    id: number;
    name: string;
    email: string;
    password?: string;
    userIcon: string;
    data: data;
    friends?: string[];
}

export interface data {
  beschrijving?: string;
  xp?: number;
  achievements?: Achievement[];
  gamesPlayed?: number;
  fav?: number[];
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