const { QueueRepeatMode, useMainPlayer, useQueue } = require('discord-player');
const { ApplicationCommandOptionType, EmbedBuilder } = require('discord.js');

module.exports = {
    name: 'loop',
    description: '啟用或禁用歌曲或整個隊列的循環',
    voiceChannel: true,
    options: [
        {
        name: 'action' ,
        description: '你想在循環中執行什麼操作',
        type: ApplicationCommandOptionType.String,
        required: true,
        choices: [
            { name: '啟用隊列循環', value: 'enable_loop_queue' },
            { name: '禁用循環', value: 'disable_loop'},
            { name: '啟用歌曲循環', value: 'enable_loop_song' },
            { name: '啟用自動播放', value: 'enable_autoplay' },
        ],
    }
    ],
    execute({ inter }) {
        const player = useMainPlayer()

const queue = useQueue(inter.guild);
        let BaseEmbed = new EmbedBuilder()
        .setColor('#2f3136')

        if (!queue || !queue.isPlaying()){
            const enevt = new EmbedBuilder()
            .setTitle('當前沒有播放音樂... 再試一次 ? ❌')
            return inter.editReply({ embeds: [enevt] }, { ephemeral: true });
        } 
        switch (inter.options._hoistedOptions.map(x => x.value).toString()) {
            case 'enable_loop_queue': {
                if (queue.repeatMode === QueueRepeatMode.TRACK) {
                    const enevt2 = new EmbedBuilder()
                    .setTitle('您必須先禁用歌曲循環 (/loop Disable) 再啟用隊列循環... 再試一次 ? ❌')
                    return inter.editReply({ embeds: [enevt2] }, { ephemeral: true });
                }
                const success = queue.setRepeatMode(QueueRepeatMode.QUEUE);
                
                BaseEmbed.setAuthor({ name: success ? `出了些問題 ${inter.member}... 再試一次? ❌` : `已啟用循環，整個隊列將無限重複 🔁` })

                return inter.editReply({ embeds: [BaseEmbed] });
                
            }
            case 'disable_loop': {
                if (queue.repeatMode === QueueRepeatMode.OFF) 
                {
                    const enevt2 = new EmbedBuilder()
                    .setTitle('您必須首先啟用循環模式（/loop Queue 或 /loop Song)... 再試一次 ? ❌')
                    return inter.editReply({ embeds: [enevt2] }, { ephemeral: true });
                }                
                const success = queue.setRepeatMode(QueueRepeatMode.OFF);

                BaseEmbed.setAuthor({ name: success ? `出了些問題 ${inter.member}... 再試一次 ? ❌` : `已禁用循環，隊列將不再重複 🔁`})

                return inter.editReply({ embeds: [BaseEmbed] });
                
            }
            case 'enable_loop_song': {
                if (queue.repeatMode === QueueRepeatMode.QUEUE) 
                {
                    const enevt2 = new EmbedBuilder()
                    .setTitle('您必須首先在循環模式下禁用當前音樂（/loopDisable)...再試一次 ? ❌ ')
                    return inter.editReply({ embeds: [enevt2] }, { ephemeral: true });
                }   
                
                const success = queue.setRepeatMode(QueueRepeatMode.TRACK);

                BaseEmbed.setAuthor({ name: success ? `出了些問題 ${inter.member}... 再試一次 ? ❌` : `已啟用循環，當前歌曲將無限重複（可以使用 /loop disable 結束循環)` })

                return inter.editReply({ embeds: [BaseEmbed] });
                
            }
            case 'enable_autoplay': {
                if (queue.repeatMode === QueueRepeatMode.AUTOPLAY) 
                {
                    const enevt2 = new EmbedBuilder()
                    .setTitle('您必須首先在循環模式下禁用當前音樂（/loopDisable）... 再試一次 ?  ❌')
                    return inter.editReply({ embeds: [enevt2] }, { ephemeral: true });
                }   
                const success = queue.setRepeatMode(QueueRepeatMode.AUTOPLAY);

                BaseEmbed.setAuthor({ name: success ? `出了些問題 ${inter.member}...再試一次? ❌` : `已啟用自動播放，隊列將自動撥放與當前歌曲類似的歌曲🔁` })

                return inter.editReply({ embeds: [BaseEmbed] });

            }
        }
       
    },
};