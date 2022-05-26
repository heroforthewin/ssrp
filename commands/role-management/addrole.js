const Discord = require('discord.js');

module.exports = {
    name: "addrole",
    description: "Add a role to the given user",
    scope: "role_add",
    options: [
        {
            name: "user",
            type: "USER",
            description: "User to add role to",
            required: true
        },
        {
            name: "role",
            type: "ROLE",
            description: "Role to add to specified user",
            required: true
        },
    ],
    run: async(client, interaction, args) => {
        const member = interaction.options.getMember("user");
        const role = interaction.options.getRole("role");

        if (client.CheckHighest(interaction.member, member)) return interaction.reply({ content: `${client.config.botCross} The target user has a higher role than the command invoker. Aborting...`, ephemeral: true });
        member.roles.add([role.id]).then(() => {
            const embed = new Discord.MessageEmbed().setDescription(`${client.config.botTick} Role added to ${member.user.toString()}!`);
            return interaction.reply({ embeds: [embed], ephemeral: true });
        }).catch(e => {
            return interaction.reply({ content: `Error: ${e}`, ephemeral: true });
        });
    }
}