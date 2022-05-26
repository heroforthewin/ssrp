const Discord = require('discord.js');

module.exports = {
    name: "history",
    description: "View the history for a user",
    options: [
        {
            name: "user",
            type: "USER",
            description: "User to check history",
            required: true
        },
        {
            name: "deleted",
            type: "BOOLEAN",
            description: "View the deleted history?",
            required: true
        }
    ],
    run: async(client, interaction, args) => {
        const user = interaction.options.getUser("user");
        const del = interaction.options.getBoolean("deleted");
        const embed = new Discord.MessageEmbed()
        .setFooter({ text: `${user.username}'s ${(del ? "deleted " : "")}infractions`});

        await client.GetOrCreateUserAsync(user.id);
        const infractions = del ? await client.DeletedInfractions.array() : await client.Infractions.array();

        for (let infraction of infractions) {
            if (infraction.UserId == user.id) {
                await embed.addField(`Infraction #${infraction.InfractionId}`, `Type: \`${infraction.InfractionType}\`\nModerator: \`${infraction.Staff}\`\nReason: \`${infraction.Reason}\``);
            }
        }

        return interaction.reply({ embeds: [embed], ephemeral: true });
    }
}