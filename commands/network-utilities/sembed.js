const Discord = require('discord.js');

module.exports = {
    name: "sembed",
    description: "Post a server embed",
    scope: "net_util_sembed",
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
        .setThumbnail(interaction.guild.iconURL({ dynamic: true }))
        .setDescription(description)

        interaction.reply({ embeds: [embed], ephemeral: false });
    }
}