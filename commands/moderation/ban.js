const Discord = require('discord.js');

module.exports = {
    name: "ban",
    description: "Bans a user from the current guild",
    scope: "mod_ban",
    options: [
        {
            name: "user",
            type: "USER",
            description: "User to ban",
            required: true
        },
        {
            name: "reason",
            type: "STRING",
            description: "The reason for banning a member",
            required: true
        }
    ],
    run: async(client, interaction, args) => {
        const user = interaction.options.getUser("user");
        const member = interaction.options.getMember("user");
        const reason = interaction.options.getString("reason");

        if (client.CheckHighest(interaction.member, member)) return interaction.reply({ content: `${client.config.botCross} The target user has a higher role than the command invoker. Aborting...`, ephemeral: true });

        const embed = new Discord.MessageEmbed()
        .setTitle("New Ban")
        .setColor("DARKER_GREY")
        .setThumbnail(interaction.guild.iconURL({ dynamic: true }))
        .setDescription(`You have been banned from ${interaction.guild.name} for \`${reason}\``)

        user.send({ embeds: [embed] }).catch(err => interaction.channel.send(`Failed to DM member`));

        try {
            await client.GetOrCreateUserAsync(user.id);
            await interaction.guild.members.ban(user, { reason: `Ban: ${reason}` }).catch(e => { return interaction.reply({ content: `${client.config.botCross} Failed to ban user : ${e}`, ephemeral: true }) });

            const infractionId = await client.AddInfraction(interaction, "Ban", user, reason);
            const logEmbed = new Discord.MessageEmbed()
            .setColor("RED")
            .setTitle(`User Banned: ${interaction.guild.name} (${interaction.guild.id})`)
            .addField("Target User", `<@${user.id}>`, true)
            .addField("Staff Member", `<@${interaction.user.id}>`, true)
            .addField("Ban Reason", `${reason}`)
            .setTimestamp()

            client.SendLog("log_ban_added", logEmbed, interaction.guild.id);
            client.Users.push(user.id, infractionId, 'Bans');

            const successEmbed = new Discord.MessageEmbed()
            .setDescription(`${client.config.botTick} ${user.tag} (${user.id}) has been banned from the server. Infraction Id: ${infractionId}`);

            return interaction.reply({ embeds: [successEmbed], ephemeral: false });
        } catch(err) {
            const embed = new Discord.MessageEmbed()
            .setDescription(`${client.config.botCross} Failed to ban user: ${err}`);

            return interaction.reply({ embeds: [embed], ephemeral: true });
        }
    }
}