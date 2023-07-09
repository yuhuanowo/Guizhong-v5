const { EmbedBuilder } = require('discord.js');
const { useMainPlayer, useQueue } = require('discord-player');

module.exports = {
    name: 'history',
    description: '查看隊列的歷史記錄',
    voiceChannel: false,

    async execute({ inter }) {
const queue = useQueue(inter.guild);
        const player = useMainPlayer()

        if (!queue || queue.history.tracks.toArray().length == 0) 
            {
            const enevt = new EmbedBuilder()
            .setTitle('尚未播放音樂...❌')
            return inter.editReply({ embeds: [enevt] }, { ephemeral: true });
            }

        const tracks = queue.history.tracks.toArray();
        console.log(tracks)
        let description = tracks
            .slice(0, 20)
            .map((track, index) => { return `**${index + 1}.** [${track.title}](${track.url}) by ${track.author}` })
            .join('\r\n\r\n');

        let HistoryEmbed = new EmbedBuilder()
            .setTitle(`歷史紀錄 - ${queue.history.tracks.toArray().length} songs`)
            .setDescription(description)
            .setColor('#2f3136')
            .setTimestamp()
            .setFooter({ text: '可愛的歸終~❤️', iconURL: inter.member.avatarURL({ dynamic: true })})


        inter.editReply({ embeds: [HistoryEmbed] });

    },
};