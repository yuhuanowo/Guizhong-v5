const { EmbedBuilder } = require('discord.js');
const { useMainPlayer, useQueue  } = require('discord-player');

module.exports = {
    name: 'queue',
    description: '查看隊列中的歌曲',
    voiceChannel: true,

    execute({ client, inter }) {
        const player = useMainPlayer()

const queue = useQueue(inter.guild);

        if (!queue)
        {
            const enevt = new EmbedBuilder()
            .setTitle('當前沒有播放音樂... 再試一次 ? ❌')
            return inter.editReply({ embeds: [enevt] }, { ephemeral: true });
        } 

        if (!queue.tracks.toArray()[0]) 
        {
            const enevt2 = new EmbedBuilder()
            .setTitle('當前歌曲之後隊列中沒有音樂... 再試一次 ? ❌')
            return inter.editReply({ embeds: [enevt2] }, { ephemeral: true });
        }
        const methods = ['', '🔁', '🔂'];

        const songs = queue.tracks.size;

        const nextSongs = songs > 5 ? `和 **${songs - 5}** 首其他歌曲...` : `在播放列表中有 **${songs}** 首歌曲...`;

        const tracks = queue.tracks.map((track, i) => `**${i + 1}** - ${track.title} | ${track.author} (撥放用戶 : ${track.requestedBy.username})`)

        const embed = new EmbedBuilder()
        .setColor('#2f3136')
        .setThumbnail(inter.guild.iconURL({ size: 2048, dynamic: true }))
        .setAuthor({name: `伺服器隊列 - ${inter.guild.name} ${methods[queue.repeatMode]}`, iconURL: client.user.displayAvatarURL({ size: 1024, dynamic: true })})
        .setDescription(`當前撥放-> ${queue.currentTrack.title}\n\n${tracks.slice(0, 5).join('\n')}\n\n${nextSongs}`)
        .setTimestamp()
        .setFooter({ text: '可愛的歸終 ❤️', iconURL: inter.member.avatarURL({ dynamic: true })})

        inter.editReply({ embeds: [embed] });
    },
};