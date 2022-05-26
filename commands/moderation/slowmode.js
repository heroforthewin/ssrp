const Discord = require('discord.js');

module.exports = {
    name: "slowmode",
    description: "Set a channels slowmode limit",
    scope: "mod_slowmode",
    options: [
        {
            name: "channel",
            type: "CHANNEL",
            description: "The channel to set a slowmode for",
            required: true
        },
        {
            name: "interval",
            type: "INTEGER",
            description: "The limit of slowmode to set",
            choices: [
                { name: "0 Seconds", value: 0 },
                { name: "5 Seconds", value: 5 },
                { name: "10 Seconds", value: 10 },
                { name: "15 Seconds", value: 15 },
                { name: "30 Seconds", value: 30 },
                { name: "1 Minute", value: 60 },
                { name: "2 Minutes", value: 120 },
                { name: "5 Minutes", value: 300 },
                { name: "10 Minutes", value: 600 },
                { name: "15 Minutes", value: 900 },
                { name: "30 Minutes", value: 1800 },
                { name: "1 Hour", value: 3600 },
                { name: "2 Hours", value: 7200 },
                { name: "6 Hours", value: 21600 },
            ],
            required: true
        },
    ],
    run: async(client, interaction, args) => {
        const channel = interaction.options.getChannel("channel");
        const interval = interaction.options.getInteger("interval");

        await channel.setRateLimitPerUser(interval);
        return interaction.reply({ content: `${client.config.botTick} Set slowmode of ${interval}s for ${channel.toString()}`, ephemeral: true });
    }
}