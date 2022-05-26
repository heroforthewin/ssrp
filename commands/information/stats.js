const Discord = require('discord.js');

module.exports = {
    name: "stats",
    description: "Returns important statistics about the bot",
    scope: "",
    run: async(client, interaction, args) => {
        const days = Math.floor(client.uptime / 86400000);
        const hours = Math.floor(client.uptime / 3600000) % 24;
        const minutes = Math.floor(client.uptime / 60000) % 60;
        const seconds = Math.floor(client.uptime / 1000) % 60;
        const uptime = `${days}d, ${hours}h, ${minutes}m, ${seconds}s`

        const embed = new Discord.MessageEmbed()
        .setAuthor({ name: client.user.tag, iconURL: client.user.displayAvatarURL() })
        .setColor("RANDOM")
        .setTitle("Bot Stats")
        .addField("Bot Version", client.botVersion, true)
        .addField("Ping", `${client.ws.ping}ms`, true)
        .addField("Uptime", `${uptime}`, true)
        .addField("Command Count", `${client.slashCommands.size}`, true)
        .addField("Guild Count", `${client.guilds.cache.size}`, true)
        .addField("User Count", `${await client.users.cache.size}`, true)
        .setFooter({ text: "Powered by synapse-hosting.com" })

        interaction.reply({ embeds: [embed], ephemeral: true });
    }
}