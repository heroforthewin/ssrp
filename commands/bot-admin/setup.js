const Discord = require("discord.js");

module.exports = {
    name: "setup",
    type: "SUB_COMMAND_GROUP",
    description: "Change server related settings",
    scope: "bot_admin_setup",
    options: [
        {
            name: "autorole",
            type: "SUB_COMMAND",
            description: "Set an autorole on server join",
            options: [
                {
                    name: "role",
                    type: "ROLE",
                    description: "Role to set for autorole",
                    required: true
                }
            ]
        },
        {
            name: "tickets",
            type: "SUB_COMMAND",
            description: "Setup ticket panels",
            options: [
                {
                    name: "reaction_channel",
                    type: "CHANNEL",
                    description: "The channel the ticket panel will be sent to",
                    required: true
                },
                {
                    name: "logging_channel",
                    type: "CHANNEL",
                    description: "The channel that will be used for ticket logs",
                    required: true
                },
                {
                    name: "tickets_category",
                    type: "CHANNEL",
                    description: "The category to be used for newly opened tickets",
                    required: true
                },
                {
                    name: "panel_header",
                    type: "STRING",
                    description: "The text to be displayed for the open panel title",
                    required: true
                },
                {
                    name: "panel_color",
                    type: "STRING",
                    description: "The color for the ticket panel",
                    choices: [
                        {
                            name: "Default",
                            value: "DEFAULT"
                        },
                        {
                            name: "Aqua",
                            value: "AQUA"
                        },
                        {
                            name: "Dark Aqua",
                            value: "DARK_AQUA"
                        },
                        {
                            name: "Green",
                            value: "GREEN"
                        },
                        {
                            name: "Dark Green",
                            value: "DARK_GREEN"
                        },
                        {
                            name: "Blue",
                            value: "BLUE"
                        },
                        {
                            name: "Dark Blue",
                            value: "DARK_BLUE"
                        },
                        {
                            name: "Purple",
                            value: "PURPLE"
                        },
                        {
                            name: "Dark Purple",
                            value: "DARK_PURPLE"
                        },
                        {
                            name: "Luminous Vivid Pink",
                            value: "LUMINOUS_VIVID_PINK"
                        },
                        {
                            name: "Dark Vivid Pink",
                            value: "DARK_VIVID_PINK"
                        },
                        {
                            name: "Gold",
                            value: "GOLD"
                        },
                        {
                            name: "Dark Gold",
                            value: "DARK_GOLD"
                        },
                        {
                            name: "Orange",
                            value: "ORANGE"
                        },
                        {
                            name: "Dark Orange",
                            value: "DARK_ORANGE"
                        },
                        {
                            name: "Red",
                            value: "RED"
                        },
                        {
                            name: "Dark Red",
                            value: "DARK_RED"
                        },
                        {
                            name: "Grey",
                            value: "GREY"
                        },
                        {
                            name: "Dark Grey",
                            value: "DARK_GREY"
                        },
                        {
                            name: "Darker Grey",
                            value: "DARKER_GREY"
                        },
                        {
                            name: "Light Grey",
                            value: "LIGHT_GREY"
                        },
                        {
                            name: "Navy",
                            value: "NAVY"
                        },
                        {
                            name: "Dark Navy",
                            value: "DARK_NAVY"
                        },
                        {
                            name: "Yellow",
                            value: "YELLOW"
                        }
                    ],
                    required: true
                },
                {
                    name: "open_message",
                    type: "STRING",
                    description: "The message to be displayed on newly opened tickets as the first message",
                    required: true
                },
                {
                    name: "ghost_ping",
                    type: "ROLE",
                    description: "The role to ping on a new opened ticket",
                    required: true
                },
                {
                    name: "ticket_name",
                    type: "STRING",
                    description: "The prefix of ticket channels",
                    required: false
                },
            ]
        },
    ],
    run: async(client, interaction, args) => {
        const command = interaction.options.getSubcommand();
        if (command === "autorole") {
            const role = interaction.options.getRole("role");
            await client.GetOrCreateGuildAsync(interaction.guild.id);
            await client.AddAutoRole(interaction, role);

            const embed = new Discord.MessageEmbed()
            .setColor("GREEN")
            .setDescription(`${client.config.botTick} Set ${role.toString()} as autorole`);

            return interaction.reply({ embeds: [embed], ephemeral: true });
        } else if (command === "tickets") {
            const reactChannel = interaction.options.getChannel("reaction_channel");
            const logChannel = interaction.options.getChannel("logging_channel");
            const category = interaction.options.getChannel("tickets_category");
            const panelHeader = interaction.options.getString("panel_header");
            const panelColor = interaction.options.getString("panel_color");
            const openMessage = interaction.options.getString("open_message");
            const ticketName = interaction.options.getString("ticket_name");
            const ghostPing = interaction.options.getRole("ghost_ping");

            if (category.type != "GUILD_CATEGORY") return interaction.reply({ embeds: [
                new Discord.MessageEmbed()
                .setColor("RED")
                .setDescription(`${client.config.botCross} Chosen ticket category is not type of discord category`)
            ], ephemeral: true });

            const panelButton = new Discord.MessageButton()
            .setEmoji("📩")
            .setStyle("PRIMARY")
            .setCustomId(`open_ticket`)
            .setLabel("Open New Ticket")

            const button = new Discord.MessageActionRow()
            .addComponents(panelButton);

            const reactionEmbed = new Discord.MessageEmbed()
            .setTitle(panelHeader)
            .setColor(panelColor)
            .setDescription(`Click the button below to open a new ticket`)
            .setTimestamp()

            const embed = new Discord.MessageEmbed()
            .setColor("GREEN")
            .setDescription(`Ticket panel \`${panelHeader}\` has been created and sent to ${reactChannel.toString()}`)

            const msg = await reactChannel.send({ embeds: [reactionEmbed], components: [button] });
            await client.AddTicketPanel(msg, logChannel, category, panelColor, openMessage, ticketName, ghostPing);
            await interaction.reply({ embeds: [embed], ephemeral: true });
        }
    }
}