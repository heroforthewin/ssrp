const Discord = require('discord.js');

module.exports = {
    name: "role",
    description: "Display information about the provided role",
    scope: "",
    options: [
        {
            name: "role",
            type: "ROLE",
            description: "Role to display information for",
            required: true
        },
    ],
    run: async(client, interaction, args) => {
        const role = interaction.options.getRole("role")
        const embed = new Discord.MessageEmbed()
        .setColor(role.color)
        .addField(`Role Name`, `${role.toString()}`, true)
        .addField(`Role ID`, `${role.id}`, true)
        .addField(`Color`, `${role.hexColor}`, true)
        .addField(`Hoisted`, `${role.hoist}`, true)
        .addField(`Mentionable`, `${role.mentionable}`, true)
        .addField(`Created At`, `${role.createdAt}`, true)

        interaction.reply({ embeds: [embed], ephemeral: true });
    }
}