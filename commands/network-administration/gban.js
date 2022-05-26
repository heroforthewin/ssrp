const Discord = require('discord.js');

module.exports = {
    name: "gban",
    description: "Ban a user from all servers linked to a network",
    scope: "net_admin_gban",
    options: [
        {
            name: "user",
            type: "USER",
            description: "User to gban from servers",
            required: true
        },
        {
            name: "reason",
            type: "STRING",
            description: "The reason for gbanning a user",
            required: true
        }
    ],
    run: async(client, interaction, args) => {
        const user = interaction.options.getUser("user");
        const member = interaction.options.getMember("user");
        const reason = interaction.options.getString("reason");

        if (client.CheckHighest(interaction.member, member)) return interaction.reply({ content: `${client.config.botCross} The target user has a higher role than the command invoker. Aborting...`, ephemeral: true });

        const { value, network } = await client.GetNetwork(interaction);
        const embed = new Discord.MessageEmbed()
        .setTitle("Network Ban")
        .setColor("DARKER_GREY")
        .setThumbnail(interaction.guild.iconURL({ dynamic: true }))
        .setDescription(`You have been banned from ${value ? network.NetworkName : interaction.guild.name} for \`${reason}\``)

        await client.GetOrCreateUserAsync(user.id);
        await client.GlobalBan(interaction, user, reason, embed);
    }
}