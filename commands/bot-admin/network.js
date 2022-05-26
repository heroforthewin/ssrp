const Discord = require('discord.js');

module.exports = {
    name: "network",
    description: "Manage networks",
    scope: "bot_admin_networks",
    options: [
        {
            name: "create",
            type: "SUB_COMMAND",
            description: "Makes a new network",
            options: [
                {
                    name: "name",
                    type: "STRING",
                    description: "Name of the network",
                    required: true
                },
                {
                    name: "acronym",
                    type: "STRING",
                    description: "Network abbreviation",
                    required: true
                },
                {
                    name: "appeal_invite",
                    type: "STRING",
                    description: "Appeal Server Invite",
                    required: false
                },
                {
                    name: "default_paypal",
                    type: "STRING",
                    description: "PayPal email or paypal.me",
                    required: false
                },
                {
                    name: "currency_name",
                    type: "STRING",
                    description: "Example: USD",
                    required: false
                },
                {
                    name: "currency_prefix",
                    type: "STRING",
                    description: "Example: $",
                    required: false
                },
            ]
        },
        {
            name: "delete",
            type: "SUB_COMMAND",
            description: "Remove a join channel",
            options: [
                {
                    name: "network_id",
                    type: "INTEGER",
                    description: "Network ID to delete",
                    required: true
                },
            ]
        },
        {
            name: "join",
            type: "SUB_COMMAND",
            description: "Join a network",
            options: [
                {
                    name: "network_code",
                    type: "STRING",
                    description: "Network join code",
                    required: true
                }
            ]
        },
        {
            name: "leave",
            type: "SUB_COMMAND",
            description: "Leave the current network"
        }
    ],
    run: async(client, interaction, args) => {
        const embed = new Discord.MessageEmbed()
        const command = interaction.options.getSubcommand();
        if (command === "create") {
            const name = interaction.options.getString("name");
            const abbv = interaction.options.getString("acronym") ?? "UKN";
            const applInv = interaction.options.getString("appeal_invite") ?? "";
            const ppl = interaction.options.getString("default_paypal");
            const curName = interaction.options.getString("currency_name") ?? "USD";
            const curPre = interaction.options.getString("currency_prefix") ?? "$";
            const { netId, joinCode } = await client.CreateNetwork(interaction, name, abbv, applInv, ppl, curName, curPre);

            embed.setColor("GREEN");
            embed.setDescription(`${client.config.botTick} Network created:\n\nNetwork ID: \`${netId}\`\nJoin Code: \`${joinCode}\``);
            interaction.reply({ embeds: [embed], ephemeral: true });
        } else if (command === "delete") {
            const id = interaction.options.getInteger("network_id");

            if(await client.DeleteNetwork(interaction, id)) {
                embed.setColor("GREEN")
                embed.setDescription(`${client.config.botTick} Network #${id} has been removed.`)
                interaction.reply({ embeds: [embed], ephemeral: true });
            } else {
                embed.setColor("RED")
                embed.setDescription(`${client.config.botCross} Error deleting network #${id}. Does it exist?`)
                interaction.reply({ embeds: [embed], ephemeral: true });
            }
        } else if (command === "join") {
            const code = interaction.options.getString("network_code");
            const { value, netName } = await client.JoinNetwork(interaction, code);

            if (!value) {
                embed.setColor("RED");
                embed.setDescription(`${client.config.botCross} Error joining network. Make sure the server isn't apart of any other network or the network exists`);
                interaction.reply({ embeds: [embed], ephemeral: true });
            } else {
                embed.setColor("GREEN");
                embed.setDescription(`${client.config.botTick} Joined "${netName}"`);
                interaction.reply({ embeds: [embed], ephemeral: true });
            }
        } else if (command === "leave") {
            const { value, netName } = await client.LeaveNetwork(interaction);

            if (!value) {
                embed.setColor("RED");
                embed.setDescription(`${client.config.botCross} Error leaving network. Is the current server in any network?`);
                interaction.reply({ embeds: [embed], ephemeral: true });
            } else {
                embed.setColor("GREEN");
                embed.setDescription(`${client.config.botTick} Left "${netName}"`);
                interaction.reply({ embeds: [embed], ephemeral: true });
            }
        }
    }
}