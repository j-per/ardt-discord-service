const { Client, Intents } = require('discord.js');
const { getEspnData, embedData } = require('./get-espn-data');
require('dotenv').config();

const token = process.env.discord_token;


// Create a new client instance
const client = new Client({ intents: [Intents.FLAGS.GUILDS] });

// When the client is ready, run this code (only once)
client.once('ready', () => {
    console.log('Ready!');
});

client.on('interactionCreate', async interaction => {
    if (!interaction.isCommand()) return;

    const { commandName } = interaction;

    if (commandName === 'scores') {
        const espnData = await getEspnData();
        await interaction.reply(espnData);
    }
});

// Login to Discord with your client's token
client.login(token);