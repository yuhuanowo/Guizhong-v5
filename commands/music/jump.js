const { ApplicationCommandOptionType, EmbedBuilder } = require('discord.js');
const { useMainPlayer, useQueue } = require('discord-player');

module.exports = {
    name: 'jump',
    description: "跳轉到隊列中的特定歌曲",
    voiceChannel: true,
    options: [
        {
            name: 'song',
            description: '您要跳轉到的歌曲的名稱/URL',
            type: ApplicationCommandOptionType.String,
            required: false,
        },
        {
            name: 'number',
            description: '這首歌在隊列中的位置是',
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
                const track_to_jump = queue.tracks.toArray().find((t) => t.title.toLowerCase() === track.toLowerCase() || t.url === track)
                if (!track_to_jump) return inter.editReply({ content: `找不到 ${track} ${inter.member}... 嘗試使用歌曲的網址或全名 ? ❌`, ephemeral: true });
                queue.node.jump(track_to_jump);
                return inter.editReply({ content: `跳轉到 ${track_to_jump.title}  ✅` });
    }
    if (number) {
        const index = number - 1
        const trackname = queue.tracks.toArray()[index].title
        if (!trackname) {
            const enevt3 = new EmbedBuilder()
            .setTitle('該曲目似乎不存在... 再試一次 ? ❌')
            return inter.editReply({ embeds: [enevt3] }, { ephemeral: true });
        }
        queue.node.jump(index);

        const JumpEmbed = new EmbedBuilder()
        .setAuthor({name: `跳轉到 ${trackname} ✅`})
        .setColor('#2f3136')
        
        inter.editReply({ embeds: [JumpEmbed] });
    }
         
    }
}
