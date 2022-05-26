const Discord = require('discord.js');

module.exports = {
    name: "rename",
    description: "Rename a ticket channel",
    scope: "tickets_rename",
    options: [
        {
            name: "new_name",
            type: "STRING",
            description: "New name for a ticket channel",
            required: true
        },
    ],
    run: async(client, interaction, args) => {
        const newName = interaction.options.getString("new_name");
        const ticket = await client.Tickets.get(interaction.channel.id);
        if(!ticket) return interaction.reply({ embeds: [new Discord.MessageEmbed().setColor("RED").setDescription(`${client.config.botCross} This channel is not an active ticket.`)], ephemeral: true });

        await interaction.channel.setName(`${newName}-${ticket.TicketNo}`);
        return interaction.reply({ content: `${client.config.botTick} Renamed ticket`, ephemeral: true });
    }
}