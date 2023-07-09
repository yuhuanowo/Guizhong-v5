const { EmbedBuilder } = require('discord.js');
const { useMainPlayer, useQueue  } = require('discord-player');
module.exports = {
    name: 'back',
    description: "回到之前的歌曲",
    voiceChannel: true,

    async execute({ inter }) {
        const player = useMainPlayer()

const queue = useQueue(inter.guild);
        if (!queue || !queue.node.isPlaying()) {
            const enevt = new EmbedBuilder()
            .setTitle('當前沒有播放音樂... 再試一次 ? ❌')
            return inter.editReply({ embeds: [enevt] }, { ephemeral: true });
            }
        if (!queue.history.previousTrack) {
            const enevt2 = new EmbedBuilder()
            .setTitle('之前沒有播放音樂... 再試一次 ? ❌')
            return inter.editReply({ embeds: [enevt2] }, { ephemeral: true });
            }
        await queue.history.back();

        const BackEmbed = new EmbedBuilder()
        .setAuthor({name: `播放上一首曲目 ✅`})
        .setColor('#2f3136')

        inter.editReply({ embeds: [BackEmbed] });
    },
};