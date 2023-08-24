const {
    ChatInputCommandInteraction,
    EmbedBuilder,
} = require("discord.js");

module.exports = {
    name: "interactionCreate",

    /**
     * 
     * @param {ChatInputCommandInteraction} interaction
     */
    async execute(interaction, client){
        if (!interaction.isChatInputCommand()) return;

        const command = client.commands.get(interaction.commandName);

        const errorEmbed = new EmbedBuilder()
            .setTitle("Error")
            .setDescription("Command is outdated")
            .setTimestamp();
        
        if (!command) return interaction.reply({ 
            embeds: [errorEmbed],
            ephemeral: true
        });
        command.execute(interaction, client);

        if (interaction.isButton()){
            const {buttons} = client;
            const {customID} = interaction;
            const button = buttons.get(customID);
            if (!button) return new Error("This button file does not exist.");
            try {
                await button.execute(interaction, client);
            } catch(Error){
                console.log(Error);
            }
        }
        else return;
    }
}