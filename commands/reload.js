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
const {loadButtons} = require('../handlers/buttonHandler')
const {loadCommands} = require('../handlers/commandHandler')
const DESIGN = require('../structures/designs.json');

module.exports = {
    
    data: new SlashCommandBuilder()
        .setName("reload")
        .setDescription("Reload the bot files")
        .addStringOption(
            option => option
            .setName("type")
            .setDescription("Select the handler you want to reload.")
            .setRequired(true)
            .addChoices(
                {name: "commands", value: "commands"},
                {name: "buttons", value: "buttons"},
                {name: "events", value: "events"},
                {name: "functions", value: "functions"}
                )
        ),


    async execute(interaction, client){
        const eventEmbed = new EmbedBuilder()
        .setDescription(`Reloaded Events | ${DESIGN.tick}`)
        .setColor(DESIGN.green)
        .setTimestamp();

        const commandEmbed = new EmbedBuilder()
        .setDescription(`Reloaded Commands | ${DESIGN.tick}`)
        .setColor(DESIGN.green)
        .setTimestamp();

        const buttonEmbed = new EmbedBuilder()
        .setDescription(`Reloaded Buttons | ${DESIGN.tick}`)
        .setColor(DESIGN.green)
        .setTimestamp();

        const modalEmbed = new EmbedBuilder()
        .setDescription(`Reloaded Modals | ${DESIGN.tick}`)
        .setColor(DESIGN.green)
        .setTimestamp();

        const databaseEmbed = new EmbedBuilder()
        .setDescription(`Reloaded Database | ${DESIGN.tick}`)
        .setColor(DESIGN.green)
        .setTimestamp();

        const functionEmbed = new EmbedBuilder()
        .setDescription(`Reloaded functions| ${DESIGN.tick}`)
        .setColor(DESIGN.green)
        .setTimestamp();

        const {options} = interaction;
        const type = options.getString("type");

        switch (type){
            case "commands":{
                loadCommands(client);
                interaction.reply({
                    embeds: [commandEmbed],
                    ephemeral: true
                })
            }break
            case "buttons":{
                loadButtons(client);
                interaction.reply({
                    embeds: [buttonEmbed],
                    ephemeral: true
                })
            }break
            case "functions":{
                loadButtons(client);
                loadCommands(client);
                interaction.reply({
                    embeds: [functionEmbed],
                    ephemeral: true
                })
            }
        }
    }
}