const {ChatInputCommandInteraction, EmbedBuilder, ModalBuilder, TextInputBuilder, ActionRowBuilder, TextInputStyle, ActionRow} = require("discord.js");


module.exports = {
    data: {
        name: "test",
    },
    /**
     * @param {ChatInputCommandInteraction} interaction
     */
    async execute(interaction, client){
        const test = new ModalBuilder()
            .setTitle("Broadcast your message")
            .setCustomId("test");
        
        const input = new TextInputBuilder()
            .setCustomId("input")
            .setLabel("Enter your title")
            .setStyle(TextInputStyle.Short);
        
        const input2 = new TextInputBuilder()
            .setCustomId("input2")
            .setLabel("Enter your description")
            .setStyle(TextInputStyle.Paragraph);
        
        const modal_input = new ActionRowBuilder().addComponents(input)
        const modal_input2 = new ActionRowBuilder().addComponents(input2)

        test.addComponents(modal_input, modal_input2)

        await interaction.showModal(test)
    }
}
