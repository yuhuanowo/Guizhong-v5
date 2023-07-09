const ms = require('ms');
const {  EmbedBuilder } = require('discord.js');

module.exports = {
    name: 'ping',
    description: "獲取歸終的 ping!",
    async execute({ client, inter }) {
        const pingEmbed = new EmbedBuilder()
        .setAuthor({name: `🏓 Pong! ${client.ws.ping}ms`})
        .setColor('#2f3136')
        inter.editReply({ embeds: [pingEmbed] });
    },
};