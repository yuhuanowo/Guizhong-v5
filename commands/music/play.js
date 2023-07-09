const { QueryType, useMainPlayer, useQueue } = require('discord-player');
const { ApplicationCommandOptionType, EmbedBuilder } = require('discord.js');

module.exports = {
    name: 'play',
    description: "播放一首歌！",
    voiceChannel: true,
    options: [
        {
            name: 'song',
            description: '你想播放的歌曲',
            type: ApplicationCommandOptionType.String,
            required: true,
        }
    ],

    async execute({ inter, client }) {
        const player = useMainPlayer()

        const song = inter.options.getString('song');
        const res = await player.search(song, {
            requestedBy: inter.member,
            searchEngine: QueryType.AUTO
        });
        const NoResultsEmbed = new EmbedBuilder()
            .setAuthor({ name: `未找到結果... 再試一次 ? ❌`})
            .setColor('#2f3136')

        if (!res || !res.tracks.length) return inter.editReply({ embeds: [NoResultsEmbed] });

        const queue = await player.nodes.create(inter.guild, {
            metadata: inter.channel,
            spotifyBridge: client.config.opt.spotifyBridge,
            volume: client.config.opt.volume,
            leaveOnEmpty: client.config.opt.leaveOnEmpty,
            leaveOnEmptyCooldown: client.config.opt.leaveOnEmptyCooldown,
            leaveOnEnd: client.config.opt.leaveOnEnd,
            leaveOnEndCooldown: client.config.opt.leaveOnEndCooldown,
        });

        try {
            if (!queue.connection) await queue.connect(inter.member.voice.channel);
        } catch {
            await player.deleteQueue(inter.guildId);

            const NoVoiceEmbed = new EmbedBuilder()
                .setAuthor({ name: `無法加入語音頻道... 再試一次 ? ❌`})
                .setColor('#2f3136')

            return inter.editReply({ embeds: [NoVoiceEmbed] });
        }

            const playEmbed = new EmbedBuilder()
                .setAuthor({ name: `正在加載您的 ${res.playlist ? '播放列表' : '歌曲'} 到隊列... ✅`})
                .setColor('#2f3136')
                
            await inter.editReply({ embeds: [playEmbed] });


        res.playlist ? queue.addTrack(res.tracks) : queue.addTrack(res.tracks[0]);

        if (!queue.isPlaying()) await queue.node.play();
    },
};
