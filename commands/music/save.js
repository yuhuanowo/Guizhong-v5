const { EmbedBuilder } = require("discord.js");
const { useMainPlayer, useQueue  } = require('discord-player');

module.exports = {
    name: 'save',
    description: '保存當前曲目!',
    voiceChannel: true,

    async execute({ inter }) {
        const player = useMainPlayer()

const queue = useQueue(inter.guild);

        if (!queue)
        {
            const enevt = new EmbedBuilder()
            .setTitle('當前沒有播放音樂... 再試一次 ? ❌')
            return inter.editReply({ embeds: [enevt] }, { ephemeral: true });
        }

        inter.member.send({
            embeds: [
                new EmbedBuilder()
                    .setColor('#2f3136')
                    .setTitle(`:arrow_forward: ${queue.currentTrack.title}`)
                    .setURL(queue.currentTrack.url)
                    .addFields(
                        { name: ':hourglass: 持續時間:', value: `\`${queue.currentTrack.duration}\``, inline: true },
                        { name: '歌曲作者:', value: `\`${queue.currentTrack.author}\``, inline: true },
                        { name: '觀看次數 :eyes:', value: `\`${Number(queue.currentTrack.views).toLocaleString()}\``, inline: true },
                        { name: '歌曲 URL:', value: `\`${queue.currentTrack.url}\`` }
                    )
                    .setThumbnail(queue.currentTrack.thumbnail)
                    .setFooter({text:`從伺服器-> ${inter.member.guild.name}`, iconURL: inter.member.guild.iconURL({ dynamic: false })})
            ]
        }).then(() => {
            return inter.editReply({ content: `我已經私信給你發音樂名了 ✅`, ephemeral: true });
        }).catch(error => {
            return inter.editReply({ content: `無法向您發送私人消息...請重試 ? ❌`, ephemeral: true });
        });
    },
};