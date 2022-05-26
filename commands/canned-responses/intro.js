const Discord = require('discord.js');

module.exports = {
    name: "intro",
    description: "Display the introduction statement to the user",
    scope: "canned_intro",
    run: async(client, interaction, args) => {
        const Ticket = await client.Tickets.get(interaction.channel.id);
        if(!Ticket) return interaction.reply({ embeds: [new Discord.MessageEmbed().setColor("RED").setDescription(`${client.config.botCross} This channel is not an active ticket.`)], ephemeral: true });

        const embed = new Discord.MessageEmbed()
        .setThumbnail(interaction.guild.iconURL())
        .setDescription(`**Hello there! Thank you for opening a ticket. I am ${interaction.user.toString()} with ${interaction.guild.name}. What can I assist you with today?**`)

        interaction.reply({ embeds: [embed], ephemeral: false });
    }
}