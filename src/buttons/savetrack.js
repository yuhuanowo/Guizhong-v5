const { EmbedBuilder } = require('discord.js')

module.exports = async ({ inter, queue }) => {
    if (!queue || !queue.isPlaying()) return inter.editReply({ content: `當前沒有播放音樂... 再試一次 ? ❌`, ephemeral: true });

    inter.member.send({
        embeds: [
            new EmbedBuilder()
                .setColor('Red')
                .setTitle(`:arrow_forward: ${queue.currentTrack.title}`)
                .setURL(queue.currentTrack.url)
                .addFields(
                    { name: ':hourglass: 持續時間:', value: `\`${queue.currentTrack.duration}\``, inline: true },
                    { name: '歌曲作者:', value: `\`${queue.currentTrack.author}\``, inline: true },
                    { name: '觀看次數 :eyes:', value: `\`${Number(queue.currentTrack.views).toLocaleString()}\``, inline: true },
                    { name: '歌曲 URL:', value: `\`${queue.currentTrack.url}\`` }
                )
                .setThumbnail(queue.currentTrack.thumbnail)
                .setFooter({ text: `從伺服器-> ${inter.member.guild.name}`, iconURL: inter.member.guild.iconURL({ dynamic: false }) })
        ]
    }).then(() => {
        return inter.editReply({ content: `我已經私信給你發音樂名了 ✅`, ephemeral: true });
    }).catch(error => {
        return inter.editReply({ content: `無法給您發送私人消息... 再試一次 ? ❌`, ephemeral: true });
    });


}
