const Discord = require('discord.js');
const moment = require('moment');

module.exports = {
    name: "user",
    description: "Returns information about a provided user",
    scope: "",
    options: [
        {
            name: "user",
            type: "USER",
            description: "Member to lookup",
            required: true
        },
    ],
    run: async(client, interaction, args) => {
        const member = interaction.options.getMember("user")
        const createdAt = moment.utc(member.user.createdAt).format('dddd, MMMM Do YYYY');
        const joinedAt = moment.utc(member.joinedAt).format('dddd, MMMM Do YYYY');
        const nickname = member.nickname || "Not Set";
        const avatar = member.user.displayAvatarURL({ dynamic: true }) || "Not Set";
        const highestRole = member.roles.highest || "No Role";

        const embed = new Discord.MessageEmbed()
        .setTitle(member.user.tag)
        .setThumbnail(avatar)
        .setColor("RANDOM")
        .addField("Username", `${member.user.tag}`, true)
        .addField("Nickname", `${nickname}`, true)
        .addField("Mention", `<@${member.user.id}>`, true)
        .addField("User ID", `${member.user.id}`, true)
        .addField("Joined Discord", `${createdAt}`, true)
        .addField("Joined Server", `${joinedAt}`, true)
        .addField("Highest Role", `${highestRole}`)
        .setFooter({ text: `Requested By ${interaction.user.tag}`, iconURL: interaction.user.displayAvatarURL({ dynamic: true }) })

        interaction.reply({ embeds: [embed], ephemeral: true });
    }
}