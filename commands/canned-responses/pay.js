const Discord = require('discord.js');

module.exports = {
    name: "pay",
    description: "Send the user an \"invoice\" for their item",
    scope: "canned_pay",
    options: [
        {
            name: "amount",
            type: "NUMBER",
            description: "Payment amount WITHOUT the currency prefix",
            required: true
        },
    ],
    run: async(client, interaction, args) => {
        const amount = interaction.options.getNumber("amount");
        const { value, network } = await client.GetNetwork(interaction);
        const ticket = await client.Tickets.get(interaction.channel.id);
        if(!ticket) return interaction.reply({ embeds: [new Discord.MessageEmbed().setColor("RED").setDescription(`${client.config.botCross} This channel is not an active ticket.`)], ephemeral: true });

        const embed = new Discord.MessageEmbed()
        .setTitle(`Payment Information`)
        .setDescription(`**Please send ${network.DefaultCurrencyPrefix ?? "$"}${amount} ${network.DefaultCurrencyName ?? "USD"} to ${network.DefaultPaypal ?? "https://paypal.com/"}**\n\nMake sure to select the payment type as "Friends & Family".\n\n**Make sure you send a screenshot of the payment so we can verify it has been sent.**`)
        .setTimestamp()

        interaction.reply({ embeds: [embed], ephemeral: false });
    }
}