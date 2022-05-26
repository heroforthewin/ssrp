const Discord = require('discord.js');

module.exports = {
    name: "avatar",
    description: "Displays the provided users avatar",
    scope: "",
    options: [
        {
            name: "user",
            type: "USER",
            description: "Member to display avatar",
            required: true
        },
    ],
    run: async(client, interaction, args) => {
        const user = interaction.options.getUser("user")
        const embed = new Discord.MessageEmbed()
        .setColor("RANDOM")
        .setTitle("User Avatar")
        .setImage(`${user.displayAvatarURL({ dynamic: true })}`)
        .setDescription(`[Image Link](${user.displayAvatarURL({ dynamic: true })})`)
        .setFooter({ text: `${user.username}` })

        interaction.reply({ embeds: [embed], ephemeral: true });
    }
}