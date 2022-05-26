const Discord = require('discord.js');

module.exports = {
    name: "mute",
    description: "Mutes the given user",
    scope: "mod_mute",
    options: [
        {
            name: "user",
            type: "USER",
            description: "User to mute",
            required: true
        },
        {
            name: "duration",
            type: "NUMBER",
            description: "The length to mute the user",
            choices: [
                { name: "60 Seconds", value: (1000 * 60 * 1) },
                { name: "5 Minutes", value: (1000 * 60 * 5) },
                { name: "10 Minutes", value: (1000 * 60 * 10) },
                { name: "1 Hour", value: (1000 * 60 * 60) },
                { name: "1 Day", value: (1000 * 60 * 60 * 24) },
                { name: "1 Week", value: (1000 * 60 * 60 * 24 * 7) },
            ],
            required: true
        },
        {
            name: "reason",
            type: "STRING",
            description: "The reason for muting a member",
            required: true
        }
    ],
    run: async(client, interaction, args) => {
        const user = interaction.options.getUser("user");
        const member = interaction.options.getMember("user");
        const duration = interaction.options.getNumber("duration");
        const reason = interaction.options.getString("reason");

        if (client.CheckHighest(interaction.member, member)) return interaction.reply({ content: `${client.config.botCross} The target user has a higher role than the command invoker. Aborting...`, ephemeral: true });

        try {
            await client.GetOrCreateUserAsync(user.id);
            member.timeout(duration, reason).then(async() => {
                let infractionId = await client.AddInfraction(interaction, "Mute", user, reason);
                client.Users.push(user.id, infractionId, 'Mutes');
    
                const successEmbed = new Discord.MessageEmbed()
                .setDescription(`${client.config.botTick} ${user.tag} (${user.id}) has been muted. Infraction Id: ${infractionId}`);
    
                return interaction.reply({ embeds: [successEmbed], ephemeral: true });
            }).catch(err => {
                return interaction.reply({ content: `Failed to mute member: ${err}`, ephemeral: true });
            })
        } catch(err) {
            const embed = new Discord.MessageEmbed()
            .setDescription(`${client.config.botCross} Failed to mute user: ${err}`);

            return interaction.reply({ embeds: [embed], ephemeral: true });
        }
    }
}