module.exports = {
    name: "gunban",
    description: "Unban a user from all servers linked to a network",
    scope: "net_admin_gunban",
    options: [
        {
            name: "user_id",
            type: "STRING",
            description: "User ID to unban globally",
            required: true
        },
        {
            name: "reason",
            type: "STRING",
            description: "The reason for gunbanning a user",
            required: true
        }
    ],
    run: async(client, interaction, args) => {
        const user = await client.users.fetch(interaction.options.getString("user_id")).catch(() => {});
        const reason = interaction.options.getString("reason");

        if (!user) return interaction.reply({ content: `${client.config.botCross} The specified user does not exist`, ephemeral: true });

        await client.GetOrCreateUserAsync(user.id);
        await client.GlobalUnban(interaction, user, reason);
    }
}