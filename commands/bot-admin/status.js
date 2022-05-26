const Discord = require("discord.js");

module.exports = {
    name: "status",
    type: "SUB_COMMAND_GROUP",
    description: "Manage the custom rotational statuses",
    scope: "bot_admin_status",
    options: [
        {
            name: "add",
            type: "SUB_COMMAND",
            description: "Add a custom status",
            options: [
                {
                    name: "type",
                    type: "STRING",
                    description: "The status type",
                    choices: [
                        {
                            name: "Playing",
                            value: "PLAYING"
                        },
                        {
                            name: "Watching",
                            value: "WATCHING"
                        },
                        {
                            name: "Listening To",
                            value: "LISTENING"
                        }
                    ],
                    required: true
                },
                {
                    name: "message",
                    type: "STRING",
                    description: "The status description",
                    required: true
                }
            ]
        },
        {
            name: "remove",
            type: "SUB_COMMAND",
            description: "Remove a custom status",
            options: [
                {
                    name: "status_id",
                    type: "INTEGER",
                    description: "Active status id",
                    required: true
                }
            ]
        },
        // {
        //     name: "list",
        //     type: "SUB_COMMAND",
        //     description: "List all statuses"
        // }
    ],
    run: async(client, interaction, args) => {
        const command = interaction.options.getSubcommand();
        if (command === "add") {
            const id = await client.AddStatus(interaction.options.getString("type"), interaction.options.getString("message"));
            const embed = new Discord.MessageEmbed()
            .setColor("GREEN")
            .setDescription(`${client.config.botTick} Added status with ID: ${id}`);

            return interaction.reply({ embeds: [embed], ephemeral: true });
        } else if (command === "remove") {
            await client.Statuses.delete(interaction.options.getInteger("status_id"));

            const embed = new Discord.MessageEmbed()
            .setColor("GREEN")
            .setDescription(`${client.config.botTick} Status #${interaction.options.getInteger("status_id")} has been removed`);

            return interaction.reply({ embeds: [embed], ephemeral: true });
        }/* else if (command === "list") {
            return interaction.reply({ content: "This feature is under development... Check back soon!", ephemeral: true });
        }*/
    }
}