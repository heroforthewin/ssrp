const Discord = require('discord.js');
const srs = require('secure-random-string');
const exporter = require(`../../utils/exporter`);

module.exports = {
    name: "close",
    description: "Closes an open ticket",
    scope: "tickets_close",
    options: [
        {
            name: "reason",
            type: "STRING",
            description: "Close reason",
            required: true
        },
    ],
    run: async(client, interaction, args) => {
        const reason = interaction.options.getString("reason");
        const ticket = await client.Tickets.get(interaction.channel.id);
        if(!ticket) return interaction.reply({ embeds: [new Discord.MessageEmbed().setColor("RED").setDescription(`${client.config.botCross} This channel is not an active ticket.`)], ephemeral: true });
        if(ticket.TicketStatus == "closed") return interaction.reply({ embeds: [new Discord.MessageEmbed().setColor("RED").setDescription(`${client.config.botCross} This ticket is already closed.`)], ephemeral: true });

        const code = srs({ length: 40 });
        const transcriptLink = await exporter.export(client, interaction, code);
        await interaction.channel.lockPermissions();
        await interaction.deferReply();

        setTimeout(async() => {
            const creator = interaction.guild.members.cache.get(ticket.Creator);
            const embed = new Discord.MessageEmbed()
            .setColor("GREEN")
            .setAuthor({ name: `${interaction.guild.name} Tickets`})
            .setTitle(`Ticket (#${ticket.TicketNo}) has been closed`)
            .addField(`Opened By`, `${creator.toString() ?? "Unknown"}`, true)
            .addField(`Closed By`, `${interaction.user.toString()}`, true)
            .addField("Transcript URL", `${transcriptLink}`)
            .addField(`Close Reason`, `${reason}`)
            .setFooter({ text: `${interaction.channel.name}`, iconURL: `${interaction.guild.iconURL({ dynamic: true })}` })

            if (creator) creator.user.send({ embeds: [embed] });

            const panel = await client.Panels.get(ticket.TicketPanel);
            const logChannel = client.channels.cache.get(panel.LogChannel);

            ticket.TicketStatus = 'closed'
            await client.Tickets.set(interaction.channel.id, ticket);
            logChannel.send({ embeds: [embed] });
            interaction.followUp({ content: `Transcript saved. Delete this channel with \`/delete\``, ephemeral: false });
        }, 5000);
    }
}