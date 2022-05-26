const Discord = require('discord.js');

module.exports = {
    name: "delete",
    description: "Delete a closed ticket",
    scope: "tickets_delete",
    run: async(client, interaction, args) => {
        const ticket = await client.Tickets.get(interaction.channel.id);
        if(!ticket) return interaction.reply({ embeds: [new Discord.MessageEmbed().setColor("RED").setDescription(`${client.config.botCross} This channel is not an active ticket.`)], ephemeral: true });
        if(ticket.TicketStatus == "open") return interaction.reply({ embeds: [new Discord.MessageEmbed().setColor("RED").setDescription(`${client.config.botCross} This ticket is not closed. Close it with \`/close\``)], ephemeral: true });

        await interaction.reply({ content: `Deleting ticket...`, ephemeral: true });
        await interaction.channel.delete();
    }
}