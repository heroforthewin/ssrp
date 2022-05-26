const Discord = require('discord.js');

module.exports = {
    name: "perm-request",
    description: "Post a server embed",
    scope: "net_util_prm_req",
    options: [
        {
            name: "server",
            type: "STRING",
            description: "Server that you need permissions in",
            required: true
        },
        {
            name: "entity",
            type: "STRING",
            description: "List of User ID(s) and/or Role ID(s) that need permissions",
            required: true
        },
        {
            name: "permission",
            type: "STRING",
            description: "The permission(s) requested in the server",
            required: true
        },
        {
            name: "reason",
            type: "STRING",
            description: "The reason for needing these permissions",
            required: true
        },
    ],
    run: async(client, interaction, args) => {
        const permissionChannel = ""; // replace this value with the channel id of your perm-req channel
        const server = interaction.options.getString("server");
        const entity = interaction.options.getString("entity");
        const reason = interaction.options.getString("reason");
        const permission = interaction.options.getString("permission");

        const embed = new Discord.MessageEmbed()
        .setTitle("Permission Request")
        .setThumbnail(interaction.guild.iconURL({ dynamic: true }))
        .setDescription(`**Server:** ${server}\n**Entities:** ${entity}\n**Permission(s) Requested:** ${permission}\n**Reason for Request:** ${reason}`)
        .setFooter({ text: interaction.guild.name, iconURL: interaction.guild.iconURL({ dynamic: true }) });

        if (permissionChannel == "" || client.channels.cache.get(`${permissionChannel}`) == undefined) return interaction.reply({ content: `${client.config.botCross} Failed to send to channel. Does it exist?`, ephemeral: true });
        client.channels.cache.get(`${permissionChannel}`).send({ embeds: [embed] });
        await interaction.reply({ content: `${client.config.botTick} Sent permission request`, ephemeral: true });
    }
}