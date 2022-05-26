module.exports = {
    name: "restart",
    description: "Restart the bot process",
    scope: "bot_admin_restart",
    run: async(client, interaction, args) => {
        await interaction.reply({ content: `${client.config.botLoad} Bot restarting...`, ephemeral: true });
        process.exit(0);
    }
}