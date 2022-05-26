const Discord = require('discord.js');

module.exports = {
    name: "complete",
    description: "Display the completed template to a user",
    scope: "canned_complete",
    options: [
        {
            name: "user",
            type: "USER",
            description: "User for the completed embed",
            required: true
        },
    ],
    run: async(client, interaction, args) => {
        const user = interaction.options.getUser("user")
        const ticket = await client.Tickets.get(interaction.channel.id);
        if(!ticket) return interaction.reply({ embeds: [new Discord.MessageEmbed().setColor("RED").setDescription(`${client.config.botCross} This channel is not an active ticket.`)], ephemeral: true });

        const embed = new Discord.MessageEmbed()
        .setTitle(`Customer ID: ${user.id}`)
        .setThumbnail(interaction.guild.iconURL())
        .setDescription(`**Make sure to leave some feedback in our feedback channel. We take your input very seriously as it helps better our company and network.**`)
        .setFooter({ text: `Thank you for choosing ${interaction.guild.name}` })

        interaction.reply({ embeds: [embed], ephemeral: false });
    }
}