import { SlashCommand } from "../Types/Commands.js";

export default class {
  data!: SlashCommand.Data;
  kioRun!: SlashCommand.KioRun;

  setData(data: SlashCommand.Data) {
    this.data = data;
    return this;
  }

  setKioRun(kioRun: SlashCommand.KioRun) {
    this.kioRun = kioRun;
    return this;
  }
}
