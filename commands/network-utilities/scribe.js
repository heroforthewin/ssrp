const exporter = require(`../../utils/exporter`);
const srs = require('secure-random-string');

module.exports = {
    name: "scribe",
    description: "Make a transcript of the current channel",
    scope: "net_util_scribe",
    run: async(client, interaction, args) => {
        const code = srs({ length: 40 });
        const transcriptLink = await exporter.export(client, interaction, code);
        await client.scribe(interaction, code);

        interaction.reply({ content: `${transcriptLink}`, ephemeral: true });
    }
}