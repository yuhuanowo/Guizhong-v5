const { EmbedBuilder } = require('discord.js');
const { useMainPlayer, useQueue  } = require('discord-player');

module.exports = {
    name: 'shuffle',
    description: '隨機播放歌曲',
    voiceChannel: true,

    async execute({ inter }) {
        const player = useMainPlayer()

const queue = useQueue(inter.guild);

        if (!queue || !queue.isPlaying())
        {
            const enevt = new EmbedBuilder()
            .setTitle('當前沒有播放音樂... 再試一次 ? ❌')
            return inter.editReply({ embeds: [enevt] }, { ephemeral: true });
        }

        if (!queue.tracks.toArray()[0])
        {
            const enevt2 = new EmbedBuilder()
            .setTitle('當前一首音樂之後隊列中沒有音樂... 再試一次 ? ❌')
            return inter.editReply({ embeds: [enevt2] }, { ephemeral: true });
        }

        await queue.tracks.shuffle();

        const ShuffleEmbed = new EmbedBuilder()
        .setColor('#2f3136')
        .setAuthor({name: `隊列已打亂 ${queue.tracks.size} 首歌! ✅` })


       return inter.editReply({ embeds: [ShuffleEmbed] });
    },
};