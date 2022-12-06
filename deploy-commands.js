const { SlashCommandBuilder } = require('discord.js')
const { REST, Routes } = require('@discordjs/rest')

const commands = [
    new SlashCommandBuilder().setName('ping').setDescription('Replies with pong!'),
].map(command => command.toJSON())

const rest = new REST ({ version: '10' }).setToken(process.env.TOKEN)

rest.put(Routes.applicationGuildCommands('clientID'), {body: commands})
    .then(() => console.log('commands registered'))
    .catch(console.error)


