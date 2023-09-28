const { ChatInputCommandInteraction, Client, EmbedBuilder } = require('discord.js');


module.exports = {
    data: {
        name: 'test'
    },
    
    /**
     * @param {ChatInputCommandInteraction} interaction
     * @param {Client} client
     */
    async execute(interaction, client) {
        const input = interaction.fields.getTextInputValue("input");
        const input2 = interaction.fields.getTextInputValue("input2");

        const embed = new EmbedBuilder()
        .setTitle(input)
        .setDescription(input2 + `\n\nSubmitted by <@${interaction.user.id}>`)
        .setTimestamp()
        .setColor("Blue")

        interaction.reply({
            embeds: [embed]
        })
    }
};