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
const DESIGN = require('../structures/designs.json');

module.exports = {
    
    data: new SlashCommandBuilder()
        .setName("broadcast")
        .setDescription("Broadcast your message"),


    async execute(interaction, client){
        const test = new EmbedBuilder()
            .setDescription("Broadcast a message")
            .setColor("Blue");
        
        const testButton = new ActionRowBuilder()
            .addComponents(
                new ButtonBuilder()
                    .setCustomId("test")
                    .setLabel("Click here")
                    .setStyle(ButtonStyle.Primary),
            );
        
        interaction.reply({embeds: [test], components: [testButton]})
    }
}
