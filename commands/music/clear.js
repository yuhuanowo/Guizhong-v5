const { EmbedBuilder } = require('discord.js');
const { useMainPlayer, useQueue} = require('discord-player');

module.exports = {
    name: 'clear',
    description: '清除隊列中的所有音樂',
    voiceChannel: true,

    async execute({ inter }) {
const queue = useQueue(inter.guild);
        const player = useMainPlayer()

        if (!queue || !queue.isPlaying()){
            const enevt = new EmbedBuilder()
            .setTitle('當前沒有播放音樂... 再試一次 ? ❌')
            return inter.editReply({ embeds: [enevt] }, { ephemeral: true });
            }

        if (!queue.tracks.toArray()[1]) {
            const enevt2 = new EmbedBuilder()
            .setTitle('當前一首音樂之後隊列中沒有音樂...重試一次？ ❌')
            return inter.editReply({ embeds: [enevt2] }, { ephemeral: true });
            }
        await queue.tracks.clear();

        const ClearEmbed = new EmbedBuilder()
        .setAuthor({name: `隊列剛剛被清除 🗑️`})
        .setColor('#2f3136')
        
        inter.editReply({ embeds: [ClearEmbed] });

    },
};