import {
  Client,
  CommandInteraction,
  Message,
  SlashCommandBuilder,
} from "discord.js";
import { MachiTypes } from "../Machi";

declare interface Comand {
  data: {
    name: string;
    description: string;
    aliases: string[];
  };
  kioRun: (client: Machi, message: Message, args: string[]) => unknown;
}

declare interface SlashCommand {
  data: SlashCommandBuilder;
  kioRun: (Client: Machi, interaction: CommandInteraction) => unknown;
}

export { Comand, SlashCommand };
