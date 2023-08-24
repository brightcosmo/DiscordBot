/**
 * Represents the "help" slash command for the AmiBot Discord bot.
 * This command displays a help GUI providing information on how to use AmiBot.
 * @module commands/help
 */

const {
    CommandInteraction,
    Client,
    EmbedBuilder,
    ActionRowBuilder,
    ButtonBuilder,
    AttachmentBuilder,
    SlashCommandBuilder,
    ButtonStyle,
  } = require('discord.js');
const DESIGN = require('../structures/designs.json')
  
  module.exports = {
    data: new SlashCommandBuilder()
      .setName("emoji")
      .setDescription("Shows a list of current emojis"),

    
    async execute(interaction, client) {
        let content = "";
        for (const[key, value] of Object.entries(DESIGN)){
            content += `${value} : ${key}\n`;
        }
        interaction.reply({content, ephemeral: true})
    }
};