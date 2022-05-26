const Discord = require('discord.js');

module.exports = {
    name: "report",
    description: "Displays the template to report users",
    scope: "canned_report",
    run: async(client, interaction, args) => {
        const embed = new Discord.MessageEmbed()
        .setColor("DEFAULT")
        .setTitle(`Report Format`)
        .setThumbnail(interaction.guild.iconURL())
        .setDescription(`Your Name:\nTodays Date:\nMember:\nReason for Report:\nEvidence of Actions:\nAdditional Comments/Concerns:`)
        .setTimestamp()

        interaction.reply({ embeds: [embed], ephemeral: false });
    }
}