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
            .setTitle("Your")
            .setDescription("mother")
            .setTimestamp();
            
        interaction.reply({embeds: [embed], ephemeral: false})
    }
}
