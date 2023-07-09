const { EmbedBuilder } = require('discord.js');
module.exports = async ({ client, inter, queue }) => {
    if (!queue || !queue.isPlaying()) return inter.editReply({ content: `當前沒有播放音樂... 再試一次 ? ❌`, ephemeral: true });
    
    try {
        const search = await genius.songs.search(queue.currentTrack.title);

        const song = search.find(song => song.artist.name.toLowerCase() === queue.currentTrack.author.toLowerCase());
        if (!song) return inter.editReply({ content: `沒有找到歌詞for ${queue.currentTrack.title}... 再試一次 ? ❌`, ephemeral: true });
        const lyrics = await song.lyrics();
        const embeds = [];
        for (let i = 0; i < lyrics.length; i += 4096) {
            const toSend = lyrics.substring(i, Math.min(lyrics.length, i + 4096));
            embeds.push(new EmbedBuilder()
                .setTitle(`${queue.currentTrack.title} 的歌詞`)
                .setDescription(toSend)
                .setColor('#2f3136')
                .setTimestamp()
                .setFooter({ text: '可愛的歸終 ❤️', iconURL: inter.member.avatarURL({ dynamic: true }) })
            );
        }
        return inter.editReply({ embeds: embeds, ephemeral: true });
    } catch (error) {
        inter.editReply({ content: `錯誤!請聯繫YuhuanStudio! | ❌`, ephemeral: true });
    }
}