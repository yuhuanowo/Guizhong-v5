const { EmbedBuilder } = require('discord.js');
const { useMainPlayer, useQueue  } = require('discord-player');

module.exports = {
    name: 'resume',
    description: '恢復播放歌曲',
    voiceChannel: true,

    execute({ inter }) {
        const player = useMainPlayer()

const queue = useQueue(inter.guild);

        if (!queue)
        {
            const enevt = new EmbedBuilder()
            .setTitle('當前沒有播放音樂... 再試一次 ? ❌')
            return inter.editReply({ embeds: [enevt] }, { ephemeral: true });
        }
        
        if(queue.node.isPlaying())
        {
            const enevt2 = new EmbedBuilder()
            .setTitle('該歌曲已經在播放... 再試一次 ? ❌')
            return inter.editReply({ embeds: [enevt2] }, { ephemeral: true });
        }

        const success = queue.node.resume();
        
        const ResumeEmbed = new EmbedBuilder()
        .setAuthor({name: success ? `當前音樂${queue.currentTrack.title} 已恢復 ✅` : `出了些問題${inter.member}... 再試一次 ? ❌` })
        .setColor('#2f3136')
        
        return inter.editReply({ embeds: [ResumeEmbed] });

    },
};
