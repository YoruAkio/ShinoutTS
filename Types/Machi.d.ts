import type { Client, Collection } from "discord.js";
import { Command, SlashCommand } from "./Collections";
import { Logger } from "../Utils/Logger";

interface MachiTypes extends Client {
  commands: Collection<string, Command>;
  slashCommands: Collection<string, SlashCommand>;
  Logger: Logger;
}
