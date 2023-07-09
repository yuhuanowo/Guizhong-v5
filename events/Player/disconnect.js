const { EmbedBuilder } = require('discord.js');

module.exports = (queue) => {

 const Disconnect = new EmbedBuilder()
    .setAuthor({name: `與語音通道斷開連接，清空隊列! ❌`})
    .setColor('#2f3136')

queue.metadata.send({ embeds: [Disconnect] })
}
