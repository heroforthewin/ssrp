const fs = require("fs");
const Discord = require('discord.js');

const ScopeArray = [
    {
        name: "Canned responses",
        value: "canned_.*"
    },
    {
        name: "Infraction commands",
        value: "inf_.*"
    },
    {
        name: "Moderation commands",
        value: "mod_.*"
    },
    {
        name: "Network Admin commands",
        value: "net_admin_.*"
    },
    {
        name: "Network Util commands",
        value: "net_util_.*"
    },
    {
        name: "Role Management commands",
        value: "role_.*"
    },
    {
        name: "Ticket Management commands",
        value: "tickets_.*"
    }
];

module.exports = {
    name: "perm",
    description: "Manage bot permissions",
    scope: "bot_admin_perms",
    options: [
        {
            name: "add",
            type: "SUB_COMMAND_GROUP",
            description: "fuck slash commands man",
            options: [
                {
                    name: "command",
                    type: "SUB_COMMAND",
                    description: "Add a specific command to the provided entity",
                    options: [
                        {
                            name: "mode",
                            type: "STRING",
                            description: "Specify whether you want to allow or deny the permission",
                            choices: [
                                {
                                    name: "Allow Permission",
                                    value: "allow"
                                },
                                {
                                    name: "Deny Permission",
                                    value: "deny"
                                }
                            ],
                            required: true
                        },
                        {
                            name: "type",
                            type: "STRING",
                            description: "Is the permission for a user or a role",
                            choices: [
                                {
                                    name: "User",
                                    value: "user"
                                },
                                {
                                    name: "Role",
                                    value: "role"
                                }
                            ],
                            required: true
                        },
                        {
                            name: "command",
                            type: "STRING",
                            description: "The command to allow (exact command name)",
                            required: true
                        },
                        {
                            name: "entity",
                            type: "MENTIONABLE",
                            description: "The user or role to apply the permission to",
                            required: true
                        },
                        {
                            name: "guild_id",
                            type: "NUMBER",
                            description: "The guild id to lock the permission set to",
                            required: false
                        }
                    ]
                },
                {
                    name: "category",
                    type: "SUB_COMMAND",
                    description: "Add a module of permissions to a specified entity",
                    options: [
                        {
                            name: "mode",
                            type: "STRING",
                            description: "Specify whether you want to allow or deny the permission",
                            choices: [
                                {
                                    name: "Allow Permission",
                                    value: "allow"
                                },
                                {
                                    name: "Deny Permission",
                                    value: "deny"
                                }
                            ],
                            required: true
                        },
                        {
                            name: "type",
                            type: "STRING",
                            description: "Is the permission for a user or a role",
                            choices: [
                                {
                                    name: "User",
                                    value: "user"
                                },
                                {
                                    name: "Role",
                                    value: "role"
                                }
                            ],
                            required: true
                        },
                        {
                            name: "scope",
                            type: "STRING",
                            description: "The category to allow permissions for a user",
                            choices: ScopeArray,
                            required: true
                        },
                        {
                            name: "entity",
                            type: "MENTIONABLE",
                            description: "The user or role to apply the permission to",
                            required: true
                        },
                        {
                            name: "guild_id",
                            type: "NUMBER",
                            description: "The guild id to lock the permission set to",
                            required: false
                        }
                    ]
                }
            ]
        },
        {
            name: "del",
            type: "SUB_COMMAND",
            description: "Remove permissions from an entity",
            options: [
                {
                    name: "perm_id",
                    type: "INTEGER",
                    description: "Permission ID to remove from bot",
                    required: true
                }
            ]
        }
    ],
    run: async(client, interaction, args) => {
        const embed = new Discord.MessageEmbed();
        const command = interaction.options.getSubcommand();
        if (command === "command") {
            const mode = interaction.options.getString("mode");
            const type = interaction.options.getString("type");
            const scope = interaction.options.getString("command");
            const entity = interaction.options.getMentionable("entity");
            const guildId = interaction.options.getNumber("guild_id") ?? interaction.guild.id;
            const id = await client.AddPerm(interaction, mode, type, scope, entity, guildId, 0); // 0 == command && 1 == category

            if (id == null) {
                embed.setColor("RED")
                embed.setDescription(`Error adding permission. Does the command provideded exist?`);
            } else {
                embed.setColor("GREEN")
                embed.setDescription(`Permission added with ID: ${id}`)
            }

            return interaction.reply({ embeds: [embed], ephemeral: true });
        } else if (command === "category") {
            const mode = interaction.options.getString("mode");
            const type = interaction.options.getString("type");
            const scope = interaction.options.getString("scope");
            const entity = interaction.options.getMentionable("entity");
            const guildId = interaction.options.getNumber("guild_id") ?? interaction.guild.id;
            const id = await client.AddPerm(interaction, mode, type, scope, entity, guildId, 1); // 0 == command && 1 == category);

            embed.setColor("GREEN")
            embed.setDescription(`Permission added with ID: ${id}`)

            return interaction.reply({ embeds: [embed], ephemeral: true });
        } else if (command === "del") {
            const id = interaction.options.getInteger("perm_id");

            if (await client.DelPerm(interaction, id)) {
                embed.setColor("GREEN")
                embed.setDescription(`${client.config.botTick} Permission #${id} has been removed.`)
                interaction.reply({ embeds: [embed], ephemeral: true });
            } else {
                embed.setColor("RED")
                embed.setDescription(`${client.config.botCross} Error removing permission #${id}. Does it exist?`)
                interaction.reply({ embeds: [embed], ephemeral: true });
            }
        }
    }
}