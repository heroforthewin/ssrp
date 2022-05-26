const Discord = require('discord.js');

module.exports = {
    name: "removerole",
    description: "Remove a role to the given user",
    scope: "role_remove",
    options: [
        {
            name: "user",
            type: "USER",
            description: "User to remove role from",
            required: true
        },
        {
            name: "role",
            type: "ROLE",
            description: "Role to remove from specified user",
            required: true
        },
    ],
    run: async(client, interaction, args) => {
        const member = interaction.options.getMember("user");
        const role = interaction.options.getRole("role");

        if (client.CheckHighest(interaction.member, member)) return interaction.reply({ content: `${client.config.botCross} The target user has a higher role than the command invoker. Aborting...`, ephemeral: true });
        member.roles.remove([role.id]).then(() => {
            const embed = new Discord.MessageEmbed().setDescription(`${client.config.botTick} Role removed from ${member.user.toString()}!`);
            return interaction.reply({ embeds: [embed], ephemeral: true });
        }).catch(e => {
            return interaction.reply({ content: `Error: ${e}`, ephemeral: true });
        });
    }
}