const Discord = require('discord.js');

module.exports = {
    name: "staff-app",
    description: "Displays the template for staff applications",
    scope: "canned_report",
    run: async(client, interaction, args) => {
        const embed = new Discord.MessageEmbed()
        .setColor("DEFAULT")
        .setTitle(`Staff Application`)
        .setThumbnail(interaction.guild.iconURL())
        .setDescription(`What is your name? (First name, Last Initial)\nWhy should we accept you on our staff team?\nDo you have any past experience? If so, what kind?\nWhat device do you use for discord?\nWhat position are you aiming for?`)
        .setTimestamp()

        interaction.reply({ embeds: [embed], ephemeral: false });
    }
}