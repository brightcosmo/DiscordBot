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

module.exports = {
  /**
   * The data for the "help" slash command.
   * This includes the name and description of the command.
   * @type {SlashCommandBuilder}
   */
  data: new SlashCommandBuilder()
    .setName("help2")
    .setDescription("Help GUI | All the information on how to use AmiBot"),

  /**
   * The function that will be executed when the "help" slash command is used.
   * param {CommandInteraction} interaction - The interaction object representing the slash command interaction.
   * param {Client} client - The Discord.js Client instance representing the bot.
   * returns {Promise<void>} - A promise that resolves once the command execution is completed.
   */
  async execute(interaction, client) {
    // Create an ActionRowBuilder to hold the interactive buttons
    const buttons = new ActionRowBuilder()
      .addComponents(
        // Add a ButtonBuilder representing Button 1
        new ButtonBuilder()
          .setCustomId("Button1")
          .setLabel("Label for Button 1")
          .setStyle(ButtonStyle.Primary)
      );

    // Reply to the interaction with the help GUI and the interactive buttons
    interaction.reply({ components: [buttons] });
  }
};
