const {
    Client,
    ModalSubmitInteraction,
    EmbedBuilder,
  } = require("discord.js");


  module.exports = {
    name: "interactionCreate",
    /**
     * @param {Client} client
     * @param {ModalSubmitInteraction} interaction
     */
  
    async execute(interaction, client) {
      try {
        if (!interaction.isModalSubmit()) return;
        const Modal = client.modals.get(interaction.customId);

        if (!Modal)
          return interaction.reply({
            embeds: [
              new EmbedBuilder().setColor("Red").setDescription("Missing Modal"),
            ],
            ephemeral: true,
          });
  
        if (
          Modal.permission &&
          !interaction.member.permissions.has(Modal.permission)
        )
          return interaction.reply({
            embeds: [
              new EmbedBuilder()
                .setColor("RED")
                .setDescription(
                  ":no_entry_sign:Missing Permission:no_entry_sign:\n:invalid: You do not have the required permission"
                ),
            ],
            ephemeral: true,
          });
  
        if (
          Modal.ownerOnly &&
          interaction.member.id !== interaction.guild.ownerId
        )
          return interaction.reply({
            embeds: [
              new EmbedBuilder()
                .setColor("BLUE")
                .setDescription(
                  " Your are not the Server Owner :serverowner:"
                ),
            ],
            ephemeral: true,
          });
        let dev;
        if (Modal.developers === true)
          dev = interaction.user.id !== "294688313376374788"
          const hyo = interaction.user.id !== "741351545169248276"
          const cosmo = interaction.user.id !== "238358119904706560"
          const cosmoalt = interaction.user.id !== "549157253756878849"
        if (dev && hyo && cosmo && cosmoalt)
          return interaction.reply({
            embeds: [
              new EmbedBuilder()
                .setColor("BLUE")
                .setThumbnail(
                  "https://cdn.discordapp.com/attachments/1063004547267690547/1063004841670098945/6587-early-verified-bot-developer-a.gif"
                )
                .setDescription(
                  ":Developer: Your are not the **Developer**"
                ),
            ],
            ephemeral: true,
          });
  
        Modal.execute(interaction, client);
      } catch (err) {
        console.log(err);
      }
    },
  };
  