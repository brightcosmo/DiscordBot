const {ChatInputCommandInteraction, EmbedBuilder} = require("discord.js");


module.exports = {
    data: {
        name: "Button1",
    },
    /**
     * @param {ChatInputCommandInteraction} interaction
     */
    execute(interaction, client){
        const embed = new EmbedBuilder()
            .setTitle("Embed1")
            .setDescription("Description")
            .setTimestamp();
            
        interaction.reply({embeds: [embed], ephemeral: true})
    }
}
