const Discord = require('discord.js');

module.exports = {
    name: "remove",
    description: "Remove a user from the current ticket",
    scope: "tickets_remove",
    options: [
        {
            name: "user",
            type: "USER",
            description: "User to remove from ticket",
            required: true
        },
    ],
    run: async(client, interaction, args) => {
        const user = interaction.options.getMember("user");

        const ticket = await client.Tickets.get(interaction.channel.id);
        if(!ticket) return interaction.reply({ embeds: [new Discord.MessageEmbed().setColor("RED").setDescription(`${client.config.botCross} This channel is not an active ticket.`)], ephemeral: true });

        interaction.channel.permissionOverwrites.create(user, {
            VIEW_CHANNEL: false,
            SEND_MESSAGES: false
        });

        const embed = new Discord.MessageEmbed().setColor("GREEN").setDescription(`${client.config.botTick} Removed ${user.toString()} from ticket`);
        return interaction.reply({ embeds: [embed], ephemeral: false });
    }
}