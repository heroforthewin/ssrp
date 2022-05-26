const Discord = require('discord.js');

module.exports = {
    name: "add",
    description: "Add a user to the current ticket",
    scope: "tickets_add",
    options: [
        {
            name: "user",
            type: "USER",
            description: "User to add to ticket",
            required: true
        },
    ],
    run: async(client, interaction, args) => {
        const user = interaction.options.getMember("user");

        const ticket = await client.Tickets.get(interaction.channel.id);
        if(!ticket) return interaction.reply({ embeds: [new Discord.MessageEmbed().setColor("RED").setDescription(`${client.config.botCross} This channel is not an active ticket.`)], ephemeral: true });

        interaction.channel.permissionOverwrites.create(user, {
            VIEW_CHANNEL: true,
            SEND_MESSAGES: true
        });

        const embed = new Discord.MessageEmbed().setColor("GREEN").setDescription(`${client.config.botTick} Added ${user.toString()} to ticket`);
        return interaction.reply({ embeds: [embed], ephemeral: false });
    }
}