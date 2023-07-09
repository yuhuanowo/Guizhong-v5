const { ApplicationCommandOptionType, EmbedBuilder } = require('discord.js');
const { useMainPlayer, useQueue  } = require('discord-player');

module.exports = {
    name: 'skipto',
    description: "跳到隊列中的特定歌曲",
    voiceChannel: true,
    options: [
        {
            name: 'song',
            description: '您要跳至的曲目的名稱/URL',
            type: ApplicationCommandOptionType.String,
            required: false,
        },
        {
            name: 'number',
            description: '歌曲在隊列中的位置',
            type: ApplicationCommandOptionType.Number,
            required: false,
        }
    ],

    async execute({ inter }) { 
        const player = useMainPlayer()

        const track = inter.options.getString('song');
        const number =  inter.options.getNumber('number')

const queue = useQueue(inter.guild);

        if (!queue || !queue.isPlaying())
        {
            const enevt = new EmbedBuilder()
            .setTitle('當前沒有播放音樂... 再試一次 ? ❌')
            return inter.editReply({ embeds: [enevt] }, { ephemeral: true });
        }

        if (!track && !number)
        {
            const enevt2 = new EmbedBuilder()
            .setTitle('您必須使用其中一個選項來跳轉到歌曲... 再試一次 ? ❌')
            inter.editReply({ embeds: [enevt2] }, { ephemeral: true });
        }
            if (track) {
                const track_skipto = queue.tracks.toArray().find((t) => t.title.toLowerCase() === track.toLowerCase() || t.url === track)
                if (!track_skipto)
                {
                    const enevt3 = new EmbedBuilder()
                    .setTitle('該曲目似乎不存在... 嘗試使用歌曲的URL或全名 ? ❌')
                    return inter.editReply({ embeds: [enevt3] }, { ephemeral: true });
                }
                queue.node.skipTo(track_skipto);
                return inter.editReply({ content: `跳轉到 ${track_skipto.title}  ✅` });
    }
    if (number) {
        const index = number - 1
        const trackname = queue.tracks.toArray()[index].title
        if (!trackname)
        {
            const enevt4 = new EmbedBuilder()
            .setTitle('該曲目似乎不存在... 再試一次 ? ❌')
            return inter.editReply({ embeds: [enevt4] }, { ephemeral: true });
        } 
        queue.node.skipTo(index);

        const skipToEmbed = new EmbedBuilder()
        .setAuthor({name: `跳轉到 ${trackname} ✅`})
        .setColor('#2f3136')
        
        inter.editReply({ embeds: [skipToEmbed] });
    }
         
    }
}
