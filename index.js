require('dotenv').config()
const { token } = process.env
const { Client, GatewayIntentBits, Collection } = require('discord.js')
const fs = require('fs')
const client = new Client({ intents: GatewayIntentBits.Guilds })

client.commands = new Collection()
client.buttons = new Collection()
client.commandArray = []

const functionFolders = fs.readdirSync(`./functions`)
for (const folder of functionFolders) {
    const functionFiles = fs
        .readdirSync(`./functions/${folder}`)
        .filter(file => file.endsWith('.js'))
        for (const file of functionFiles) require(`./functions/${folder}/${file}`)(client)
}

client.handleEvents()
client.handleCommands()
client.handleComponents()
client.login(process.env.TOKEN)