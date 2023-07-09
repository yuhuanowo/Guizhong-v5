const { ApplicationCommandOptionType, EmbedBuilder } = require('discord.js');
const { useMainPlayer, useQueue  } = require('discord-player');

module.exports = {
    name: 'remove',
    description: "從隊列中刪除歌曲",
    voiceChannel: true,
    options: [
        {
            name: 'song',
            description: '您要刪除的曲目的名稱/URL',
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

        const number =  inter.options.getNumber('number')
        const track = inter.options.getString('song');

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
            .setTitle('您必須使用其中一個選項來刪除歌曲... 再試一次 ? ❌')
            inter.editReply({ embeds: [enevt2] }, { ephemeral: true });
        }

        const BaseEmbed = new EmbedBuilder()
        .setColor('#2f3136')


        if (track) {
            const track_to_remove = queue.tracks.toArray().find((t) => t.title === track || t.url === track);
            if (!track_to_remove) 
            {
                const enevt3 = new EmbedBuilder()
                .setTitle('該曲目似乎不存在... 嘗試使用歌曲的URL或全名 ? ❌')
                return inter.editReply({ embeds: [enevt3] }, { ephemeral: true });
            }
            queue.removeTrack(track_to_remove);
            BaseEmbed.setAuthor({name: `已從列隊中刪除 ${track_to_remove.title}  ✅` })

            return inter.editReply({ embeds: [BaseEmbed] });
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

            queue.removeTrack(index);

            BaseEmbed.setAuthor({name: `已從隊列中刪除 ${trackname} ✅` })

            return inter.editReply({ embeds: [BaseEmbed] });
        }


         
    }
}
