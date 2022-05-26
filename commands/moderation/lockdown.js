const Discord = require('discord.js');

module.exports = {
    name: "lockdown",
    description: "Toggle a channel lockdown",
    scope: "mod_lockdown",
    options: [
        {
            name: "channel",
            type: "CHANNEL",
            description: "The channel to toggle lockdown for",
            required: true
        },
        {
            name: "permission",
            type: "STRING",
            description: "Select the lockdown option for a channel",
            choices: [
                { name: "Enable Lockdown", value: "yes" },
                { name: "Disable Lockdown", value: "no" }
            ],
            required: true
        }
    ],
    run: async(client, interaction, args) => {
        const channel = interaction.options.getChannel("channel");
        const option = interaction.options.getString("permission");

        option == "yes"
            ? await channel.permissionOverwrites.edit(channel.guild.roles.everyone, { SEND_MESSAGES: false })
            : await channel.permissionOverwrites.edit(channel.guild.roles.everyone, { SEND_MESSAGES: true });

        return interaction.reply({ content: `${client.config.botTick} Lockdown for ${channel.toString()} has been ${(option == "yes" ? "enabled" : "disabled")}`, ephemeral: true });
    }
}