const Discord = require('discord.js');

module.exports = {
    name: "log",
    description: "Manage channel logs",
    scope: "bot_admin_logs",
    options: [
        {
            name: "add",
            type: "SUB_COMMAND",
            description: "Add logs to the current channel",
            options: [
                {
                    name: "scope",
                    type: "STRING",
                    description: "The type of logs to send to the channel",
                    choices: [
                        {
                            name: "All Logs",
                            value: "log_.*"
                        },
                        {
                            name: "Message Logs",
                            value: "log_msg_.*"
                        },
                        {
                            name: "Warning Logs",
                            value: "log_warn_.*"
                        },
                        {
                            name: "Kick Logs",
                            value: "log_kick_.*"
                        },
                        {
                            name: "Ban Logs",
                            value: "log_ban_.*"
                        },
                        {
                            name: "Global Logs (gban, gunban)",
                            value: "log_gban_.*"
                        },
                        {
                            name: "Staff Logs",
                            value: "log_strike_.*"
                        },
                        {
                            name: "Infraction Logs",
                            value: "log_inf_.*"
                        },
                        {
                            name: "Channel Logs",
                            value: "log_channel_.*"
                        },
                        {
                            name: "Permission Logs",
                            value: "log_perm_.*"
                        }
                    ],
                    required: true
                },
                {
                    name: "guild_id",
                    type: "NUMBER",
                    description: "The guild id to retrieve logs from (or 0 for all guilds)",
                    required: false
                }
            ]
        },
        {
            name: "del",
            type: "SUB_COMMAND",
            description: "Remove logs from the current channel",
            options: [
                {
                    name: "log_id",
                    type: "INTEGER",
                    description: "Log ID to remove from bot",
                    required: true
                }
            ]
        },
    ],
    run: async(client, interaction, args) => {
        const embed = new Discord.MessageEmbed()
        const command = interaction.options.getSubcommand();
        if (command === "add") {
            const scope = interaction.options.getString("scope");
            const guildId = interaction.options.getNumber("guild_id") ?? interaction.guild.id;
            const id = await client.SetLog(interaction, scope, guildId);

            embed.setColor("GREEN")
            embed.setDescription(`Log added with ID: ${id}`)

            interaction.reply({ embeds: [embed], ephemeral: true });
        } else if (command === "del") {
            const id = interaction.options.getInteger("log_id");

            if (await client.DelLog(id)) {
                embed.setColor("GREEN")
                embed.setDescription(`${client.config.botTick} Log #${id} has been removed.`)
                interaction.reply({ embeds: [embed], ephemeral: true });
            } else {
                embed.setColor("RED")
                embed.setDescription(`${client.config.botCross} Error removing log #${id}. Does it exist?`)
                interaction.reply({ embeds: [embed], ephemeral: true });
            }
        }
    }
}