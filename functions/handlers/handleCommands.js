const { REST } = require('@discordjs/rest')
const { Routes } = require('discord-api-types/v9')
const fs = require('fs')
require('dotenv').config()

module.exports = (client) => {
    client.handleCommands = async () => {
        const commandFolder = fs.readdirSync('./commands/')
        for (const folder of commandFolder) {
            const commandFiles = fs
                .readdirSync(`./commands/${folder}`)
                .filter(file => file.endsWith('.js'))

            const { commands, commandArray } = client
            for (const file of commandFiles) {
                const command = require(`../../commands/${folder}/${file}`)
                commands.set(command.data.name, command);
                commandArray.push(command.data.toJSON());
            }
        }

        const clientID = process.env.clientID
        const rest = new REST({ version: "9" }).setToken(process.env.TOKEN)
        try {
            console.log('Started refreshing application (/) commands.');

            await rest.put(Routes.applicationCommands(clientID), {
                body: client.commandArray,
            })
            console.log('Successfully reloaded application (/) commands.')
        } catch (error) {
            console.error(error)
        }
    }
}