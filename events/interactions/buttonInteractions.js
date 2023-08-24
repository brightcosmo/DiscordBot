
module.exports = {
    name: "interactionCreate",

    async execute(interaction, client){
        if (!interaction.isButton()) return;

        const buttonCustomId = interaction.customId.split("_");
        const button = client.buttons.get(buttonCustomId[0]);
        
        if (!button) return;

        button.execute(interaction, client, buttonCustomId.slice(1))
    }
}