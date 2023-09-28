/**
 * Imports the discord.js library and sets up the bot (client)
 */
require("dotenv").config();
const {Collection, Client, Partials} = require("discord.js");
const {User, Message, GuildMember, ThreadMember} = Partials;
const { loadEvents } = require('./handlers/eventHandler');
const { loadButtons } = require('./handlers/buttonHandler');
const { loadModals } = require('./handlers/modalHandler');

const client = new Client({
    intents: 131071,
    partials: [User, Message, GuildMember, ThreadMember],
});

const token = process.env.token;

// Collections
client.events = new Collection();
client.commands = new Collection();
client.buttons = new Collection();
client.modals = new Collection();

// Loaded stuff
loadEvents(client);
loadButtons(client);
loadModals(client);

client.login(token);