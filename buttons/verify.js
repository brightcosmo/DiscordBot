const {ChatInputCommandInteraction, EmbedBuilder} = require("discord.js");
const ROLES = require("../structures/roleid.json");
const DESIGN = require('../structures/designs.json');

module.exports = {
    data: {
        name: "verify",
    },
    /**
     * @param {ChatInputCommandInteraction} interaction
     */
    execute(interaction, client){
        const user = interaction.member;
        const verifyRole = user.roles.cache.has(ROLES.verify);
        const embed = new EmbedBuilder()
            .setColor(DESIGN.green)
            .setTimestamp();
        
        if (!verifyRole){
            interaction.member.roles.add(ROLES.verify);
            embed.setTitle("Role added").setDescription(`<@&${ROLES.verify}>`);
        }
        else{
            embed.setTitle("Role not added").setDescription("You already have this role.");
        }
        interaction.reply({embeds: [embed], ephemeral: true})
    }
}
