const Discord = require('discord.js');

module.exports = {
    name: "infraction",
    description: "Manage infractions for a user",
    options: [
        {
            name: "view",
            type: "SUB_COMMAND",
            description: "View details about a specified infraction",
            scope: "inf_view",
            options: [
                {
                    name: "inf_id",
                    type: "INTEGER",
                    description: "Infraction Id to view more information",
                    required: true
                }
            ]
        },
        {
            name: "edit",
            type: "SUB_COMMAND",
            description: "Edit infraction details",
            scope: "inf_edit",
            options: [
                {
                    name: "inf_id",
                    type: "INTEGER",
                    description: "Infraction Id to view more information",
                    required: true
                },
                {
                    name: "new_reason",
                    type: "STRING",
                    description: "The new reason for why the infraction was given",
                    required: true
                }
            ]
        },
        {
            name: "del",
            type: "SUB_COMMAND",
            description: "Delete an infraction",
            scope: "inf_del",
            options: [
                {
                    name: "inf_id",
                    type: "INTEGER",
                    description: "Infraction Id of infraction to delete",
                    required: true
                },
                {
                    name: "reason",
                    type: "STRING",
                    description: "The reason for deleting an infraction",
                    required: true
                },
            ]
        },
    ],
    run: async(client, interaction, args) => {
        const embed = new Discord.MessageEmbed();
        const command = interaction.options.getSubcommand();
        if (command === "view") {
            const infId = interaction.options.getInteger("inf_id");
            const inf = client.Infractions.get(infId);
            if(!inf) return interaction.reply({ content: `${client.config.botCross} Infraction not found`, ephemeral: true });

            embed.setTitle(`Infraction #${inf.InfractionId} - ${inf.InfractionType}`);
            embed.addField(`Member`, `${inf.User}`, true);
            embed.addField(`Staff`, `${inf.Staff}`, true);
            embed.addField(`Reason`, `${inf.Reason}`, true);
            embed.setFooter({ text: `Requested: ${interaction.user.tag}` });

            return interaction.reply({ embeds: [embed], ephemeral: true });
        } else if (command === "edit") {
            const infId = interaction.options.getInteger("inf_id");
            const reason = interaction.options.getString("new_reason");
            const inf = client.Infractions.get(infId);
            const oldRsn = inf.Reason;
            if(!inf) return interaction.reply({ content: `${client.config.botCross} Infraction not found` });

            inf.Reason = reason;
            client.Infractions.set(`${infId}`, inf);

            const logEmbed = new Discord.MessageEmbed()
            .setColor("PURPLE")
            .setTitle(`Infraction Updated: #${inf.InfractionId}`)
            .addField("Target User", `<@${inf.UserId}>`, true)
            .addField("Staff Member", `${inf.Staff}`, true)
            .addField("Update Reason", `${inf.Reason}`)
            .addField("Old Reason", `${oldRsn}`)
            .setTimestamp()
            client.SendLog("log_inf_updated", logEmbed, interaction.guild.id);

            embed.setDescription(`${client.config.botTick} Infraction #${infId} updated`);
            return interaction.reply({ embeds: [embed], ephemeral: true });
        } else if (command === "del") {
            const infId = interaction.options.getInteger("inf_id");
            const reason = interaction.options.getString("reason");
            const inf = client.Infractions.get(infId);

            client.DeletedInfractions.set(`${inf.InfractionId}`, {
                InfractionId: inf.InfractionId,
                InfractionType: inf.InfractionType,
                User: inf.User,
                UserId: inf.UserId,
                Staff: inf.Staff,
                Reason: inf.Reason,
                DeletedReason: reason
            });

            client.Infractions.delete(`${infId}`);

            const logEmbed = new Discord.MessageEmbed()
            .setColor("DARK_PURPLE")
            .setTitle(`Infraction Deleted: #${inf.InfractionId}`)
            .addField("Target User", `<@${inf.UserId}>`, true)
            .addField("Staff Member", `${inf.Staff}`, true)
            .addField("Deletion Reason", `${reason}`)
            .setTimestamp()
            client.SendLog("log_inf_removed", logEmbed, interaction.guild.id);

            embed.setDescription(`${client.config.botTick} Infraction #${infId} deleted`);
            return interaction.reply({ embeds: [embed], ephemeral: true });
        }
    }
}