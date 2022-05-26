const Discord = require('discord.js');

module.exports = {
    name: "move",
    description: "Moves a ticket",
    scope: "tickets_move",
    options: [
        {
            name: "category",
            type: "CHANNEL",
            description: "Category to move the ticket to",
            required: true
        },
    ],
    run: async(client, interaction, args) => {
        const category = interaction.options.getChannel("category");
        const ticket = await client.Tickets.get(interaction.channel.id);
        if(!ticket) return interaction.reply({ embeds: [new Discord.MessageEmbed().setColor("RED").setDescription(`${client.config.botCross} This channel is not an active ticket.`)], ephemeral: true });
        if (category.type != "GUILD_CATEGORY") return interaction.reply({ embeds: [new Discord.MessageEmbed().setColor("RED").setDescription(`${client.config.botCross} Selected channel is not a category.`)], ephemeral: true });

        interaction.channel.setParent(category, { lockPermissions: false });
        return interaction.reply({ content: `${client.config.botTick} Ticket moved sucessfully`, ephemeral: true });
    }
}