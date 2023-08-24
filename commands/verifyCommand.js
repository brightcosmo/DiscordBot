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
    .setName("verify")
    .setDescription("Verifies the player"), 

    async execute(interaction, client){
        const user = interaction.member;
        const embed = new EmbedBuilder()
            .setTitle("Verification")
            .setDescription("Click the button to verify your profile.")
            .setColor(DESIGN.green)
            .setTimestamp();
        
            var button = new ActionRowBuilder()
            .addComponents(
                new ButtonBuilder()
                    .setCustomId("verify")
                    .setLabel("verify")
                    .setStyle(ButtonStyle.Primary)
            )
        
        await interaction.reply({
            embeds: [embed],
            components: [button],
        })
    }
}