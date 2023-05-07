import { ClientEvents } from "discord.js";
import { MachiTypes } from "../Types/Machi.js";

export default class<K extends keyof ClientEvents> {
  constructor(
    name: K,
    kioEventRun: (client: MachiTypes, ...args: ClientEvents[K]) => unknown
  ) {
    this.name = name;
    this.kioEventRun = kioEventRun;
  }
  name;
  kioEventRun;
}
