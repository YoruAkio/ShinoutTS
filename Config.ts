export type Config = {
    /* Bot client id */
    clientId: string;
    /* guildId to test the slash commands */
    guildId: string;
    /* Send slash command into all server */
    slashGlobal: boolean;
    /* Database Url */
    databaseUrl: string;
    /* Bot prefix */
    prefix: string;
    /* Devs ID */
    devs: string[];
};

export const config: Config = {
    clientId: "965102016810594334",
    guildId: "963596898869051443",
    slashGlobal: true,
    databaseUrl: "",
    prefix: "-",
    devs: ["919841186246692886"],
};
