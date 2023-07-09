const { ApplicationCommandOptionType, EmbedBuilder } = require('discord.js');
const { QueryType, useMainPlayer, useQueue   } = require('discord-player');

module.exports = {
    name: 'playnext',
    description: "下一首你想播放的歌曲",
    voiceChannel: true,
    options: [
        {
            name: 'song',
            description: '下一首你想播放的歌曲',
            type: ApplicationCommandOptionType.String,
            required: true,
        }
    ],

    async execute({ inter }) {
        const player = useMainPlayer()

const queue = useQueue(inter.guild);

        if (!queue || !queue.isPlaying()) 
        {
            const enevt = new EmbedBuilder()
            .setTitle('當前沒有播放音樂... 再試一次 ? ❌')
            return inter.editReply({ embeds: [enevt] }, { ephemeral: true });
        }

        const song = inter.options.getString('song');

        const res = await player.search(song, {
            requestedBy: inter.member,
            searchEngine: QueryType.AUTO
        });

        if (!res || !res.tracks.length) 
        {
            const NoResultsEmbed = new EmbedBuilder()
            .setAuthor({ name: `未找到結果... 再試一次 ? ❌`})
            .setColor('#2f3136')
            return inter.editReply({ embeds: [NoResultsEmbed] });
        }

       if (res.playlist) 
       {
            const PlaylistEmbed = new EmbedBuilder()
            .setTitle('此命令不支持播放列表... 再試一次 ? ❌')
            return inter.editReply({ embeds: [PlaylistEmbed] }, { ephemeral: true });
        }

        queue.insertTrack(res.tracks[0], 0)

        const PlayNextEmbed = new EmbedBuilder()
        .setAuthor({name: `歌曲已插入隊列...接下來將播放 🎧` })
        .setColor('#2f3136')
        
        await inter.editReply({ embeds: [PlayNextEmbed] });


    }
}
