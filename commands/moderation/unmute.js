const Discord = require('discord.js');

module.exports = {
    name: "unmute",
    description: "Unmutes the given user",
    scope: "mod_unmute",
    options: [
        {
            name: "user",
            type: "USER",
            description: "User to unmute",
            required: true
        },
        {
            name: "reason",
            type: "STRING",
            description: "The reason for unmuting a member",
            required: true
        }
    ],
    run: async(client, interaction, args) => {
        const user = interaction.options.getUser("user");
        const member = interaction.options.getMember("user");
        const reason = interaction.options.getString("reason");

        if (client.CheckHighest(interaction.member, member)) return interaction.reply({ content: `${client.config.botCross} The target user has a higher role than the command invoker. Aborting...`, ephemeral: true });

        try {
            await client.GetOrCreateUserAsync(user.id);
            member.timeout(null, reason).then(async() => {
                let infractionId = await client.AddInfraction(interaction, "Unmute", user, reason);
                client.Users.push(user.id, infractionId, 'Unmutes');
    
                const successEmbed = new Discord.MessageEmbed()
                .setDescription(`${client.config.botTick} ${user.tag} (${user.id}) has been unmuted. Infraction Id: ${infractionId}`);
    
                return interaction.reply({ embeds: [successEmbed], ephemeral: false });
            }).catch(err => {
                return interaction.reply({ content: `Failed to unmute member: ${err}`, ephemeral: true });
            });
        } catch(err) {
            const embed = new Discord.MessageEmbed()
            .setDescription(`${client.config.botCross} Failed to unmute user: ${err}`);

            return interaction.reply({ embeds: [embed], ephemeral: true });
        }
    }
}