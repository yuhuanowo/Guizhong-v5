const ms = require('ms');
const {  ApplicationCommandOptionType, EmbedBuilder } = require('discord.js');
const { useMainPlayer, useQueue  } = require('discord-player');

module.exports = {
    name: 'seek',
    description: '在歌曲中快退或快進',
    voiceChannel: true,
    options: [
    {
        name: 'time',
        description: '您想跳過的時間o',
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

        const timeToMS = ms(inter.options.getString('time'));

        if (timeToMS >= queue.currentTrack.durationMS)
        {
            const enevt2 = new EmbedBuilder()
            .setTitle('指定的時間高於當前歌曲的總時間... 再試一次 ? ❌')
            return inter.editReply({ embeds: [enevt2] }, { ephemeral: true });
        }

        await queue.node.seek(timeToMS);

        const SeekEmbed = new EmbedBuilder()
        .setColor('#2f3136')
        .setAuthor({name: `當前歌曲的時間設置 **${ms(timeToMS, { long: true })}** ✅`})


        inter.editReply({ embeds: [SeekEmbed] });
    },
};