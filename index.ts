require("dotenv").config();
require("module-alias/register");

import { Machi } from "./Structures/Machi";

export const client = new Machi();
client.start();
