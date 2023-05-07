import * as dotenv from "dotenv"
dotenv.config();

import { Machi } from "./Structures/Machi.js";
import Handlers from "./Handlers/main.js";

export const client = new Machi();
client.start();

Handlers(client);
