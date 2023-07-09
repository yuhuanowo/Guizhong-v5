const { EmbedBuilder } = require('discord.js');

module.exports = (queue, track) => {
    if (!client.config.app.ExtraMessages) return

    const audioTracksAdd = new EmbedBuilder()
    .setAuthor({name: `播放列表中的所有歌曲皆已添加到隊列中 ✅`})
    .setColor('#2f3136')

queue.metadata.send({ embeds: [audioTracksAdd] })

}
