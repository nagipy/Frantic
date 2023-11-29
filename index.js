const fs = require("node:fs");
const path = require("node:path");
const { Client, GatewayIntentBits } = require("discord.js");
const { token } = require("./config.json");

const client = new Client({
  intents: [
    GatwayIntentBits.Guidls,
    GatwayIntentBits.GuildVoiceStates,
    GatwayIntentBits.GuildMembers
  ]
})

// Code file loading.
const logsPath = path.join(__dirname, "logs");
const logsFiles = fs.reddirSync(logsPath).filter(file => file.endsWith(".js"));

for (const file of logsFiles) {
  const log = require(`./logs/${file}`);

  client.on("ready", () => { log(client) });
}

// Bot status & ready message.
client.on("ready", () => {
  client.user.setStatus("idle")

  console.log(client.user.tag)
})

client.login(token)
