const { EmbedBuilder, ActionRowBuilder, ButtonBuilder } = require('discord.js');
const { useMainPlayer, useQueue } = require('discord-player');

module.exports = {
    name: 'nowplaying',
    description: '查看正在播放的內容!',
    voiceChannel: true,

    execute({ inter }) {
const queue = useQueue(inter.guild);
        const player = useMainPlayer()

        if (!queue) 
        {
            const enevt = new EmbedBuilder()
            .setTitle('當前沒有播放音樂... 再試一次 ? ❌')
            return inter.editReply({ embeds: [enevt] }, { ephemeral: true });
        }

        const track = queue.currentTrack;

        const methods = ['disabled', 'track', 'queue'];

        const timestamp = track.duration;

        const trackDuration = timestamp.progress == 'Infinity' ? 'infinity (live)' : track.duration;

        const progress = queue.node.createProgressBar();
        

        const embed = new EmbedBuilder()
        .setAuthor({ name: track.title,  iconURL: client.user.displayAvatarURL({ size: 1024, dynamic: true })})
        .setThumbnail(track.thumbnail)
        .setDescription(`音量 **${queue.node.volume}**%\n持續時間 **${trackDuration}**\n撥放進度 ${progress}\n循環模式 **${methods[queue.repeatMode]}**\n撥放用戶: ${track.requestedBy}`)
        .setFooter({ text: '可愛的歸終 ❤️', iconURL: inter.member.avatarURL({ dynamic: true })})
        .setColor('#2f3136')
        .setTimestamp()

        const saveButton = new ButtonBuilder()
        .setLabel('保存歌曲')
        .setCustomId(JSON.stringify({ffb: 'savetrack'}))
        .setStyle('Danger')

        const volumeup = new ButtonBuilder()
        .setLabel('音量增加')
        .setCustomId(JSON.stringify({ffb: 'volumeup'}))
        .setStyle('Primary')

        const volumedown = new ButtonBuilder()
        .setLabel('音量減小')
        .setCustomId(JSON.stringify({ffb: 'volumedown'}))
        .setStyle('Primary')

        const loop = new ButtonBuilder()
        .setLabel('循環模式')
        .setCustomId(JSON.stringify({ffb: 'loop'}))
        .setStyle('Danger')

        const resumepause = new ButtonBuilder()
         .setLabel('重新開始 & 暫停')
         .setCustomId(JSON.stringify({ffb: 'resume&pause'}))
         .setStyle('Success')



        const row = new ActionRowBuilder().addComponents(volumedown, saveButton, resumepause, loop, volumeup);

         inter.editReply({ embeds: [embed], components: [row] });
    },
};