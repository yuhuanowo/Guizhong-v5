const maxVol = client.config.opt.maxVol;
const { ApplicationCommandOptionType, EmbedBuilder } = require('discord.js');
const { useMainPlayer, useQueue  } = require('discord-player');

module.exports = {
    name: 'volume',
    description: '調整',
    voiceChannel: true,
    options: [
        {
            name: 'volume',
            description: '挑整的實際音量',
            type: ApplicationCommandOptionType.Number,
            required: true,
            minValue: 1,
            maxValue: maxVol
        }
    ],

    execute({ inter }) {
        const player = useMainPlayer()

const queue = useQueue(inter.guild);

        if (!queue)
        {
            const enevt = new EmbedBuilder()
            .setTitle('當前沒有播放音樂... 再試一次 ? ❌')
            return inter.editReply({ embeds: [enevt] }, { ephemeral: true });
        }
        const vol = inter.options.getNumber('volume')

        if (queue.node.volume === vol)
        {
            const enevt2 = new EmbedBuilder()
            .setTitle('音量已經是您想要的音量了... 再試一次 ? ❌')
            return inter.editReply({ embeds: [enevt2] }, { ephemeral: true });
        }

        const success = queue.node.setVolume(vol);

       return inter.editReply({ content: success ? `音量已修改為${vol}/${maxVol}% 🔊` : `出了些問題 ${inter.member}... 再試一次 ? ❌` });
    },
};