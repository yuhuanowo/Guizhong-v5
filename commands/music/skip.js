const { EmbedBuilder } = require('discord.js');
const { useMainPlayer, useQueue  } = require('discord-player');

module.exports = {
    name: 'skip',
    description: '跳過當前歌曲',
    voiceChannel: true,

    execute({ inter }) {
        const player = useMainPlayer()

const queue = useQueue(inter.guild);

         if (!queue || !queue.isPlaying())
         {
                const enevt = new EmbedBuilder()
                .setTitle('當前沒有播放音樂... 再試一次 ? ❌')
                return inter.editReply({ embeds: [enevt] }, { ephemeral: true });
         }

        const success = queue.node.skip();

        const SkipEmbed = new EmbedBuilder()
        .setColor('#2f3136')
        .setAuthor({name: success ? `當前音樂 ${queue.currentTrack.title} 已跳過✅` : `出了些問題 ${inter.member}... 再試一次 ? ❌` })


       return inter.editReply({ embeds: [SkipEmbed] });

    },
};