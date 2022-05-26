const Discord = require('discord.js');

module.exports = {
    name: "server",
    description: "Returns information about the current server",
    scope: "",
    run: async(client, interaction, args) => {
        const embed = new Discord.MessageEmbed()
        .setTitle(interaction.guild.name)
        .setThumbnail(interaction.guild.iconURL({ dynamic: true }))
        .setColor("RANDOM")
        .addField("Server ID", `${interaction.guild.id}`, true)
        .addField("Owner", `<@${interaction.guild.ownerId}>`, true)
        .addField("Server Stats", `Channels: \`${interaction.guild.channels.cache.size}\` | Roles: \`${interaction.guild.roles.cache.size}\` | Emojis: \`${interaction.guild.emojis.cache.size}\``)
        .addField("Server Boosts", `Level: \`${interaction.guild.premiumTier}\` | Boosts: \`${interaction.guild.premiumSubscriptionCount || 0}\``)
        .setFooter({ text: `Requested By ${interaction.user.tag}`, iconURL: interaction.user.displayAvatarURL({ dynamic: true }) })

        let features = interaction.guild.features;
        if (interaction.guild.features.length > 0) embed.addField("Server Features", features.join(", "))

        interaction.reply({ embeds: [embed], ephemeral: true });
    }
}