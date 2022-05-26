const Discord = require('discord.js');

module.exports = {
    name: "purge",
    description: "Purges the chat with the specified message count",
    scope: "mod_purge",
    options: [
        {
            name: "message_count",
            type: "INTEGER",
            description: "Number of messages to purge",
            required: true
        }
    ],
    run: async(client, interaction, args) => {
        const count = interaction.options.getInteger("message_count");
        if(count > 100) return interaction.reply({ content: `${client.config.botCross} Incorrect usage!\nYou cannot clear more than 100 messages at a time`, ephemeral: true });
        if(count < 1) return interaction.reply({ content: `${client.config.botCross} Incorrect usage!\nYou need to delete atleast one message`, ephemeral: true });

        await interaction.channel.messages.fetch({ limit: count }).then(async msgs => await interaction.channel.bulkDelete(msgs));
        return interaction.reply({ content: `${client.config.botTick} Purged ${count} messages`, ephemeral: true });
    }
}