const { EmbedBuilder } = require('discord.js');
const { useMainPlayer, useQueue  } = require('discord-player');

module.exports = {
    name: 'stop',
    description: '停止播放歌曲',
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

        queue.delete();

        const StopEmbed = new EmbedBuilder()
        .setColor('#2f3136')
        .setAuthor({name: `音樂已停止撥放，下次見 ✅` })


       return inter.editReply({ embeds: [StopEmbed] });

    },
};