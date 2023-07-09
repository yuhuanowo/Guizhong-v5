const { ApplicationCommandOptionType, EmbedBuilder } = require('discord.js');
const { QueryType, useMainPlayer, useQueue } = require('discord-player');

module.exports = {
    name: 'search',
    description: '搜索曲目',
    voiceChannel: true,
    options: [
        {
            name: 'song',
            description: '您要搜索的歌曲',
            type: ApplicationCommandOptionType.String,
            required: true,
        }
    ],

    async execute({ client, inter }) {
        const player = useMainPlayer()

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

        const queue = await player.nodes.create(inter.guild, {
            metadata: inter.channel,
            spotifyBridge: client.config.opt.spotifyBridge,
            volume: client.config.opt.defaultvolume,
            leaveOnEnd: client.config.opt.leaveOnEnd,
            leaveOnEmpty: client.config.opt.leaveOnEmpty
        });
        const maxTracks = res.tracks.slice(0, 10);

        const embed = new EmbedBuilder()
        .setColor('#2f3136')
        .setAuthor({ name: `搜尋結果with ${song}`, iconURL: client.user.displayAvatarURL({ size: 1024, dynamic: true })})
        .setDescription(`${maxTracks.map((track, i) => `**${i + 1}**. ${track.title} | ${track.author}`).join('\n')}\n\n選擇以下選項 **1** 到 **${maxTracks.length}** 或者 **取消** ⬇️`)
        .setTimestamp()
        .setFooter({ text: '可愛的歸終 ❤️', iconURL: inter.member.avatarURL({ dynamic: true })})

        inter.editReply({ embeds: [embed] });

        const collector = inter.channel.createMessageCollector({
            time: 15000,
            max: 1,
            errors: ['time'],
            filter: m => m.author.id === inter.member.id
        });

        collector.on('collect', async (query) => {
            if (query.content.toLowerCase() === '取消') return inter.followUp({ content: `搜索已取消 ✅`, ephemeral: true }), collector.stop();

            const value = parseInt(query);
            if (!value || value <= 0 || value > maxTracks.length) return inter.followUp({ content: `響應無效，請嘗試一個介於 **1** 到 **${maxTracks.length}** 的數字 或者 **取消**... 再試一次 ? ❌`, ephemeral: true });

            collector.stop();

            try {
                if (!queue.connection) await queue.connect(inter.member.voice.channel);
            } catch {
                await player.deleteQueue(inter.guildId);
                const NoVoiceEmbed = new EmbedBuilder()
                .setTitle({ name: `無法加入語音頻道... 再試一次 ? ❌`})
                .setColor('#2f3136')
                return inter.followUp({ embeds: [NoVoiceEmbed] }, { ephemeral: true });
            }

            await inter.followUp(`正在加載您的搜索... 🎧`);

            queue.addTrack(res.tracks[query.content - 1]);

            if (!queue.isPlaying()) await queue.node.play();
        });

        collector.on('end', (msg, reason) => {
            if (reason === 'time')
            {
                const TimeOutEmbed = new EmbedBuilder()
                .setTitle({ name: `搜索超時 ${inter.member}... 再試一次 ? ❌`})
                .setColor('#2f3136')
                return inter.followUp({ embeds: [TimeOutEmbed] }, { ephemeral: true });
            }
        });
    },
};
