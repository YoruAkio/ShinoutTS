import {
    ActivityType,
    Client,
    Collection,
    GatewayIntentBits,
    IntentsBitField,
    Partials,
    PermissionFlagsBits,
    REST,
    Routes,
} from "discord.js";
import { Config, config } from "../Config.js";
import { Logger } from "../Utils/Logger.js";
import { readdirSync } from "fs";
import { set, connect } from "mongoose";

export class Machi extends Client {
    commands: Collection<string, any> = new Collection();
    slashCommands: Collection<string, any> = new Collection();
    config: Config;
    Logger: Logger;

    constructor() {
        super({
            intents: [
                GatewayIntentBits.Guilds,
                GatewayIntentBits.GuildMembers,
                GatewayIntentBits.GuildMessages,
                GatewayIntentBits.GuildMessageReactions,
                GatewayIntentBits.MessageContent,
                GatewayIntentBits.DirectMessages,
                GatewayIntentBits.DirectMessageReactions,
            ],
            partials: [
                Partials.User,
                Partials.Channel,
                Partials.GuildMember,
                Partials.Reaction,
            ],
            presence: {
                status: "idle",
                afk: false,
                activities: [
                    {
                        name: "Machi watching the moon",
                        type: ActivityType.Watching,
                    },
                ],
            },
            allowedMentions: { repliedUser: false },
            closeTimeout: 60000,
        });
    }

    start() {
        if (!process.env.TOKEN)
            throw new Error(
                "Please specify the token and database url in Config.ts"
            );

        this.login(process.env.TOKEN)
            .then(() => {
                console.log(`Logged in as ${this.user?.tag}`);
            })
            .catch((err) => {
                console.error(err);
            });
        
        this.Logger = new Logger();
        this.config = config;
        // this.loadModules();
    }/* 
    loadModules() {
        this.loadEvents();
        this.loadCommands();
        this.loadSlashCommands();
    }
    loadEvents() {
        readdirSync("./Events").forEach((dir) => {
            const files = readdirSync(`./Events/${dir}`).filter((file) =>
                file.endsWith(".ts")
            );

            files.forEach((file) => {
                let event = require(`../Events/${dir}/${file}`);

                if (!event.name) return;

                if (event.once) {
                    this.once(event.name, (...args) =>
                        event.kioEventRun(...args)
                    );
                    console.log(`[Event] ${event.name} loaded as once`);
                } else {
                    this.on(event.name, (...args) =>
                        event.kioEventRun(...args)
                    );
                    console.log(`[Event] ${event.name} loaded`);
                }
            });
        });
    }
    loadCommands() {
        readdirSync("./Commands/Message").forEach((dir) => {
            const files = readdirSync(`./Commands/Message${dir}`).filter(
                (file) => file.endsWith(".ts")
            );

            files.forEach((file) => {
                let command = require(`../Commands/Message/${dir}/${file}`);

                if (!command.name) return;

                this.commands.set(command.name, command);
                console.log(`[Command] ${command.name} loaded`);
            });
        });
    }
    loadSlashCommands() {
        readdirSync("./Commands/Slash").forEach((dir) => {
            const files = readdirSync(`./Commands/Slash/${dir}`).filter(
                (file) => file.endsWith(".ts")
            );

            files.forEach((file) => {
                let commands = require(`../Commands/Slash/${dir}/${file}`);

                if (!commands.name) return;

                this.slashCommands.set(commands.name, commands);
                console.log(`[Slash] ${commands.name} loaded`);
            });
        });

        if (!this.config.clientId || !process.env.TOKEN || !this.config.guildId)
            return console.log(
                "No client id found, please specify it in Config.ts"
            );

        const rest = new REST({ version: "10" }).setToken(process.env.TOKEN);

        async () => {
            console.log("Started refreshing application (/) commands.");

            try {
                if (this.config.slashGlobal) {
                    await rest.put(
                        Routes.applicationCommands(this.config.clientId),
                        {
                            body: this.slashCommands.map((command) =>
                                command.data.toJSON()
                            ),
                        }
                    );
                } else {
                    await rest.put(
                        Routes.applicationGuildCommands(
                            this.config.clientId,
                            this.config.guildId
                        ),
                        {
                            body: this.slashCommands.map((command) =>
                                command.data.toJSON()
                            ),
                        }
                    );
                }

                console.log("Successfully reloaded application (/) commands.");
            } catch (error) {
                console.error(error);
            }
        };
    } */
}
