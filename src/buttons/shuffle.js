const { EmbedBuilder } = require('discord.js');
module.exports = async ({ client, inter, queue }) => { 
    if (!queue || !queue.isPlaying()) return inter.editReply({ content: `當前沒有播放音樂... 再試一次 ? ❌`, ephemeral: true });

    if (!queue.tracks.toArray()[0]) return inter.editReply({ content: `當前一首音樂之後隊列中沒有音樂... 再試一次 ? ❌`, ephemeral: true });

        await queue.tracks.shuffle();

        const ShuffleEmbed = new EmbedBuilder()
        .setColor('#2f3136')
        .setAuthor({name: `隊列已打亂 ${queue.tracks.size} 首歌! ✅` })


       return inter.editReply({ embeds: [ShuffleEmbed], ephemeral: true});
}