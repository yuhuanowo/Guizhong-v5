const { EmbedBuilder } = require('discord.js');

module.exports = (queue, track) => {
    if (!client.config.app.ExtraMessages) return

    const audioTrackAdd = new EmbedBuilder()
    .setAuthor({name: `歌曲 ${track.title} 已添加到隊列中e ✅`, iconURL: track.thumbnail})
    .setColor('#2f3136')

queue.metadata.send({ embeds: [audioTrackAdd] })

}
