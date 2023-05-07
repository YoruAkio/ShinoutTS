import { Command } from "../Types/Commands.js";

export default class {
  data!: Command.Options;
  kioRun!: Command.KioRun;

  setData(data: Command.Options) {
    this.data = data;
    return this;
  }

  setKioRun(kioRun: Command.KioRun) {
    this.kioRun = kioRun;
    return this;
  }
}
