import ClientEvent from "../../Components/ClientEvent.js";

export default new ClientEvent("ready", async (client) => {
  client.Logger.log("info", "Client", `${client.user?.tag} is ready`);
});
