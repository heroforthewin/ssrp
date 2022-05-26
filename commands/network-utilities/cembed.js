const Discord = require('discord.js');

module.exports = {
    name: "cembed",
    description: "Make a colored embed",
    scope: "net_util_cembed",
    options: [
        {
            name: "title",
            type: "STRING",
            description: "Embed title",
            required: true
        },
        {
            name: "description",
            type: "STRING",
            description: "The description of the embed",
            required: true
        },
        {
            name: "color",
            type: "STRING",
            description: "The color name of the embed",
            choices: [
                {
                    name: "Default",
                    value: "DEFAULT"
                },
                {
                    name: "Aqua",
                    value: "AQUA"
                },
                {
                    name: "Dark Aqua",
                    value: "DARK_AQUA"
                },
                {
                    name: "Green",
                    value: "GREEN"
                },
                {
                    name: "Dark Green",
                    value: "DARK_GREEN"
                },
                {
                    name: "Blue",
                    value: "BLUE"
                },
                {
                    name: "Dark Blue",
                    value: "DARK_BLUE"
                },
                {
                    name: "Purple",
                    value: "PURPLE"
                },
                {
                    name: "Dark Purple",
                    value: "DARK_PURPLE"
                },
                {
                    name: "Luminous Vivid Pink",
                    value: "LUMINOUS_VIVID_PINK"
                },
                {
                    name: "Dark Vivid Pink",
                    value: "DARK_VIVID_PINK"
                },
                {
                    name: "Gold",
                    value: "GOLD"
                },
                {
                    name: "Dark Gold",
                    value: "DARK_GOLD"
                },
                {
                    name: "Orange",
                    value: "ORANGE"
                },
                {
                    name: "Dark Orange",
                    value: "DARK_ORANGE"
                },
                {
                    name: "Red",
                    value: "RED"
                },
                {
                    name: "Dark Red",
                    value: "DARK_RED"
                },
                {
                    name: "Grey",
                    value: "GREY"
                },
                {
                    name: "Dark Grey",
                    value: "DARK_GREY"
                },
                {
                    name: "Darker Grey",
                    value: "DARKER_GREY"
                },
                {
                    name: "Light Grey",
                    value: "LIGHT_GREY"
                },
                {
                    name: "Navy",
                    value: "NAVY"
                },
                {
                    name: "Dark Navy",
                    value: "DARK_NAVY"
                },
                {
                    name: "Yellow",
                    value: "YELLOW"
                }
            ],
            required: true
        }
    ],
    run: async(client, interaction, args) => {
        const title = interaction.options.getString("title");
        const color = interaction.options.getString("color");
        const description = interaction.options.getString("description");

        const embed = new Discord.MessageEmbed()
        .setTitle(title)
        .setColor(color)
        .setDescription(description)
        .setFooter({ text: `${interaction.guild.name}` })

        interaction.reply({ embeds: [embed], ephemeral: false });
    }
}