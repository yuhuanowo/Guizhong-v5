const { EmbedBuilder } = require('discord.js');
const { useMainPlayer, useQueue  } = require('discord-player');

module.exports = {
    name: 'lyrics',
    description: '獲取當前曲目的歌詞',
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
        
        try {
        
        const search = await genius.songs.search(queue.currentTrack.title); 

        const song = search.find(song => song.artist.name.toLowerCase() === queue.currentTrack.author.toLowerCase());
        if (!song) 
            {
                const enevt2 = new EmbedBuild
                .setTitle('找不到歌詞... 再試一次 ? ❌')
                return inter.editReply({ embeds: [enevt2] }, { ephemeral: true });
            }
        const lyrics = await song.lyrics();
        const embeds = [];
        for (let i = 0; i < lyrics.length; i += 4096) {
            const toSend = lyrics.substring(i, Math.min(lyrics.length, i + 4096));
            embeds.push(new EmbedBuilder()
                .setTitle(`${queue.currentTrack.title}的歌詞`)
                .setDescription(toSend)
                .setColor('#2f3136')
                .setTimestamp()
                .setFooter({ text: '可愛的歸終 ❤️', iconURL: inter.member.avatarURL({ dynamic: true })})
                );
        }
        return inter.editReply({ embeds: embeds });

    } catch (error) {
            inter.editReply({ content: `錯誤!請聯繫YuhuanStudio! | ❌`, ephemeral: true });
    } 
    },
};

