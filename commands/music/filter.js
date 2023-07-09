const { ApplicationCommandOptionType, EmbedBuilder } = require('discord.js');
const { useMainPlayer, useQueue  } = require('discord-player');

module.exports = {
    name: 'filter',
    description: '為您的曲目添加過濾器',
    voiceChannel: true,
    options: [
        {
            name: 'filter',
            description: '您要添加的過濾器',
            type: ApplicationCommandOptionType.String,
            required: true,
            choices: [...Object.keys(require("discord-player").AudioFilters.filters).map(m => Object({ name: m, value: m })).splice(0, 25)],
        }
    ],


    async execute({ inter }) {
const queue = useQueue(inter.guild);
        const player = useMainPlayer()

        if (!queue || !queue.isPlaying()) {
            const enevt = new EmbedBuilder()
            .setTitle('當前沒有播放音樂... 再試一次 ? ❌')
            return inter.editReply({ embeds: [enevt] }, { ephemeral: true });
            }
        const actualFilter = queue.filters.ffmpeg.getFiltersEnabled()[0];

        const infilter = inter.options.getString('filter');


        const filters = [];

        queue.filters.ffmpeg.getFiltersEnabled().map(x => filters.push(x));
        queue.filters.ffmpeg.getFiltersDisabled().map(x => filters.push(x));

        const filter = filters.find((x) => x.toLowerCase() === infilter.toLowerCase().toString());

        if (!filter) return inter.editReply({ content: `該過濾器不存在... 再試一次? ❌\n${actualFilter ? `過濾器當前處於活動狀態 ${actualFilter}.\n` : ''}可用過濾器列表s ${filters.map(x => `${x}`).join(', ')}.`, ephemeral: true });

        await queue.filters.ffmpeg.toggle(filter)

        const FilterEmbed = new EmbedBuilder()
        .setAuthor({name: `過濾器 ${filter} 已經 ${queue.filters.ffmpeg.isEnabled(filter) ? '啟用' : '關閉'} ✅\n*提醒!音樂越長，花費的時間就越長.*`})
        .setColor('#2f3136')

       return inter.editReply({ embeds: [FilterEmbed] });
    },
};