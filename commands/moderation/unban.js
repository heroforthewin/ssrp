const Discord = require('discord.js');

module.exports = {
    name: "unban",
    description: "Unbans a user from the current guild",
    scope: "mod_unban",
    options: [
        {
            name: "user_id",
            type: "STRING",
            description: "User to unban",
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
        const user = await client.users.fetch(interaction.options.getString("user_id")).catch(() => {});
        const reason = interaction.options.getString("reason");

        try {
            await client.GetOrCreateUserAsync(interaction.options.getString("user_id"));
            await interaction.guild.members.unban(interaction.options.getString("user_id"), { reason: `Unban: ${reason}` }).catch(e => { return interaction.reply({ content: `${client.config.botCross} Failed to unban user : ${e}`, ephemeral: true }) });

            const infractionId = await client.AddInfraction(interaction, "Unban", user, reason);
            const logEmbed = new Discord.MessageEmbed()
            .setColor("DARK_RED")
            .setTitle(`User Unbanned: ${interaction.guild.name} (${interaction.guild.id})`)
            .addField("Target User", `<@${interaction.options.getString("user_id")}>`, true)
            .addField("Staff Member", `<@${interaction.user.id}>`, true)
            .addField("Unban Reason", `${reason}`)
            .setTimestamp()

            client.SendLog("log_ban_removed", logEmbed, interaction.guild.id);
            client.Users.push(interaction.options.getString("user_id"), infractionId, 'Unbans');

            const successEmbed = new Discord.MessageEmbed()
            .setDescription(`${client.config.botTick} ${user.tag} (${interaction.options.getString("user_id")}) has been unbanned from the server. Infraction Id: ${infractionId}`);

            return interaction.reply({ embeds: [successEmbed], ephemeral: false });
        } catch(err) {
            const embed = new Discord.MessageEmbed()
            .setDescription(`${client.config.botCross} Failed to unban user: ${err}`);

            return interaction.reply({ embeds: [embed], ephemeral: true });
        }
    }
}