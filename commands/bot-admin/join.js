const Discord = require('discord.js');

module.exports = {
    name: "join",
    description: "Manage join channels",
    scope: "bot_admin_joins",
    options: [
        {
            name: "add",
            type: "SUB_COMMAND",
            description: "Set a new join channel",
            options: [
                {
                    name: "chan_type",
                    type: "STRING",
                    description: "Type of join message to send",
                    choices: [
                        {
                            name: "Message Channel",
                            value: "channel"
                        },
                        {
                            name: "DM Channel",
                            value: "dm"
                        }
                    ],
                    required: true
                },
                {
                    name: "message",
                    type: "STRING",
                    description: "Join message content",
                    required: true
                }
            ]
        },
        {
            name: "del",
            type: "SUB_COMMAND",
            description: "Remove a join channel",
            options: [
                {
                    name: "join_id",
                    type: "INTEGER",
                    description: "Join message ID to remove from config",
                    required: true
                },
            ]
        },
    ],
    run: async(client, interaction, args) => {
        const embed = new Discord.MessageEmbed()
        const command = interaction.options.getSubcommand();
        if (command === "add") {
            const type = interaction.options.getString("type");
            const message = interaction.options.getString("message");
            const id = await client.SetJoin(interaction, type, message);

            embed.setColor("GREEN")
            embed.setDescription(`Join added with ID: ${id}`)

            interaction.reply({ embeds: [embed], ephemeral: true });
        } else if (command === "del") {
            const id = interaction.options.getInteger("join_id");

            if (await client.DelJoin(id)) {
                embed.setColor("GREEN")
                embed.setDescription(`${client.config.botTick} Join #${id} has been removed.`)
                interaction.reply({ embeds: [embed], ephemeral: true });
            } else {
                embed.setColor("RED")
                embed.setDescription(`${client.config.botCross} Error removing join #${id}. Does it exist?`)
                interaction.reply({ embeds: [embed], ephemeral: true });
            }
        }
    }
}