const Discord = require('discord.js');

module.exports = {
    name: "embed",
    description: "Post an embed",
    scope: "net_util_embed",
    options: [
        {
            name: "title",
            type: "STRING",
            description: "Embed title",
            required: true
        },
        {
            name: "description",
            type: "STRING",
            description: "The description of the embed",
            required: true
        }
    ],
    run: async(client, interaction, args) => {
        const title = interaction.options.getString("title");
        const description = interaction.options.getString("description");

        const embed = new Discord.MessageEmbed()
        .setTitle(title)
        .setDescription(description)

        interaction.reply({ embeds: [embed], ephemeral: false });
    }
}