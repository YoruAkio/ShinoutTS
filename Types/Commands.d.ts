import {
  ChatInputCommandInteraction,
  Message,
  SlashCommandBuilder,
} from "discord.js";
import { MachiTypes } from "./Machi";

export namespace Command {
  export interface Options {
    name: string;
    description: string;
    aliases?: string[];
  }

  export type KioRun = (
    client: Machi,
    message: Message,
    args: string[]
  ) => unknown;
}

export namespace SlashCommand {
  export type Data = SlashCommandBuilder | object | unknown;

  export type KioRun = (
    client: Machi,
    interaction: ChatInputCommandInteraction
  ) => unknown;
}
