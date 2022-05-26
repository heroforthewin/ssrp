const Discord = require('discord.js');

module.exports = {
    name: "warn",
    description: "Gives the provided user a warning",
    scope: "mod_warn",
    options: [
        {
            name: "user",
            type: "USER",
            description: "User to warn",
            required: true
        },
        {
            name: "reason",
            type: "STRING",
            description: "The reason for warning a member",
            required: true
        }
    ],
    run: async(client, interaction, args) => {
        const user = interaction.options.getUser("user");
        const member = interaction.options.getMember("user");
        const reason = interaction.options.getString("reason");

        if (client.CheckHighest(interaction.member, member)) return interaction.reply({ content: `${client.config.botCross} The target user has a higher role than the command invoker. Aborting...`, ephemeral: true });

        const embed = new Discord.MessageEmbed()
        .setTitle("New Warning")
        .setColor("DARKER_GREY")
        .setThumbnail(interaction.guild.iconURL({ dynamic: true }))
        .setDescription(`You have been warned by ${interaction.user.toString()} for \`${reason}\``)

        user.send({ embeds: [embed] }).catch(err => interaction.channel.send(`Failed to DM member`));

        try {
            await client.GetOrCreateUserAsync(user.id);

            let infractionId = await client.AddInfraction(interaction, "Warning", user, reason);
            const logEmbed = new Discord.MessageEmbed()
            .setColor("GREEN")
            .setTitle(`User Warned: ${interaction.guild.name} (${interaction.guild.id})`)
            .addField("Target User", `<@${user.id}>`, true)
            .addField("Staff Member", `<@${interaction.user.id}>`, true)
            .addField("Warn Reason", `${reason}`)
            .setTimestamp()

            client.SendLog("log_warn_added", logEmbed, interaction.guild.id);
            client.Users.push(user.id, infractionId, "Warnings");

            const successEmbed = new Discord.MessageEmbed()
            .setDescription(`${client.config.botTick} ${user.tag} (${user.id}) has been warned. Infraction Id: ${infractionId}`);

            return interaction.reply({ embeds: [successEmbed], ephemeral: false });
        } catch(err) {
            const embed = new Discord.MessageEmbed()
            .setDescription(`${client.config.botCross} Failed to warn user: ${err}`);

            return interaction.reply({ embeds: [embed], ephemeral: true });
        }
    }
}