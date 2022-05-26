const Discord = require('discord.js');

module.exports = {
    name: "dm",
    description: "Send a DM to a user",
    scope: "net_util_dm",
    options: [
        {
            name: "user",
            type: "USER",
            description: "The user to send a DM to",
            required: true
        },
        {
            name: "message",
            type: "STRING",
            description: "The message to send to the provided user",
            required: true
        },
    ],
    run: async(client, interaction, args) => {
        const user = interaction.options.getUser("user");
        const msg = interaction.options.getString("message");

        const embed = new Discord.MessageEmbed()
        .setTitle("New DM!")
        .setDescription(`${msg}`)
        .setFooter({ text: `Message sent by ${interaction.user.tag} (${interaction.user.id})` });

        user.send({ embeds: [embed] });
        interaction.reply({ content: `${client.config.botTick} Sent DM to user`, ephemeral: true });
    }
}