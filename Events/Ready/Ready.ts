module.exports = {
  name: "ready",
  once: true,
  async kioEventRun(client) {
    client.Logger.log("info", "Client", `${client.user?.tag} is ready`);
  },
};
