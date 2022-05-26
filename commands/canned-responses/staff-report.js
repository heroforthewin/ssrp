const Discord = require('discord.js');

module.exports = {
    name: "staff-report",
    description: "Displays the template to report staff members",
    scope: "canned_staff_report",
    run: async(client, interaction, args) => {
        const embed = new Discord.MessageEmbed()
        .setColor("DEFAULT")
        .setTitle(`Report Format`)
        .setThumbnail(interaction.guild.iconURL())
        .setDescription(`Your Name:\nTodays Date:\nStaff Member:\nReason for Report:\nEvidence of Actions:\nAdditional Comments/Concerns:`)
        .setTimestamp()

        interaction.reply({ embeds: [embed], ephemeral: false });
    }
}