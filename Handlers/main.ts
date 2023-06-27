import { MachiTypes } from "../Types/Machi.js";
import { config } from "../Config.js";
import { readdir } from "node:fs/promises";
import { join, dirname } from "node:path";
import { REST, Routes } from "discord.js";
import { fileURLToPath } from "node:url";
import { readdirSync } from "node:fs";

const __dirname = dirname(fileURLToPath(import.meta.url));

async function builder(commands: unknown[], client: MachiTypes) {
  const rest = new REST({ version: "10" }).setToken(
    process.env.TOKEN as string
  );

  client.Logger.log(
    "info",
    "Client",
    "Started refreshing application (/) commands."
  );

  try {
    await rest.put(
      Routes.applicationCommands(config.clientId),
      /* Storing the slash command only on specified guildId */
      // Routes.applicationGuildCommands(config.clientId, config.guildId),
      { body: commands }
    );

    client.Logger.log(
      "info",
      "Client",
      "Successfully reloaded application (/) commands."
    );
  } catch (error) {
    client.Logger.log("error", "Client", error);
  }
}

export default async (client: MachiTypes) => {
  const commands = [];

  try {
    const commandFiles = await readdir(
      join(__dirname, "../../Commands/Message")
    );

    for (const folders of commandFiles) {
      const folder = await readdir(
        join(__dirname, `../../Commands/Message/${folders}`)
      );

      for (const file of folder) {
        const command = await import(
          `../../Commands/Message/${folders}/${file}`
        );

        if (!command.default.name) return;

        client.commands.set(command.default.name, command.default);
        client.Logger.log(
          "info",
          "Client",
          `[Message] ${command.default.name} loaded`
        );
      }
    }

    const slashFiles = await readdir(join(__dirname, "../../Commands/Slash"));

    for (const folders of slashFiles) {
      const folder = await readdir(
        join(__dirname, `../../Commands/Slash/${folders}`)
      );

      for (const file of folder) {
        const command = await import(`../../Commands/Slash/${folders}/${file}`);

        if (!command.default.name) return;

        client.slashCommands.set(command.default.name, command.default);
        commands.push(command.default.data.toJSON());
        client.Logger.log(
          "info",
          "Client",
          `[Slash] ${command.default.name} loaded`
        );
      }
    }

    await builder(commands, client);

    const eventFiles = await readdir(join(__dirname, "../../Events"));

    for (const file of eventFiles) {
      const eventFolder = await readdir(
        join(__dirname, `../../Events/${file}`)
      );

      for (const event of eventFolder) {
        const e = await import(`../../Events/${file}/${event}`);

        client.on(e.default.name, (...args) =>
          e.default.kioEventRun(client, ...args)
        );
        client.Logger.log("info", "Client", `[Event] ${e.default.name} loaded`);
      }
    }
  } catch (error) {
    client.Logger.log("error", "Client", error);
  }
};
