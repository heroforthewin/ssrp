const Discord = require('discord.js');

module.exports = {
    name: "appeal",
    description: "Displays the template to appeal discipline",
    scope: "canned_appeal",
    run: async(client, interaction, args) => {
        const embed = new Discord.MessageEmbed()
        .setColor("DEFAULT")
        .setTitle(`Appeal Format`)
        .setThumbnail(interaction.guild.iconURL())
        .setDescription(`Your Name:\nInfraction Date:\nInfraction Id:\nServer:\nStaff Member:\nReason for Infraction:\nWhy should your infraction be removed:\nDo you agree with this infraction:\nAre you being truthful?`)
        .setFooter({ text: `If your appeal gets denied, you cannot appeal it for another 7 days` })
        .setTimestamp()

        interaction.reply({ embeds: [embed], ephemeral: false });
    }
}