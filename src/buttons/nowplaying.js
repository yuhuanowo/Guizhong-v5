const { EmbedBuilder } = require('discord.js');
module.exports = async ({ client, inter, queue }) => { 
    if (!queue || !queue.isPlaying()) return inter.editReply({ content: `當前沒有播放音樂... 再試一次? ❌`, ephemeral: true });

    const track = queue.currentTrack;

    const methods = ['禁用', '歌曲', '隊列'];

    const timestamp = track.duration;
    
    const trackDuration = timestamp.progress == 'Infinity' ? 'infinity (live)' : track.duration;

    const progress = queue.node.createProgressBar();
    

    const embed = new EmbedBuilder()
    .setAuthor({ name: track.title,  iconURL: client.user.displayAvatarURL({ size: 1024, dynamic: true })})
    .setThumbnail(track.thumbnail)
    .setDescription(`音量 **${queue.node.volume}**%\n持續時間 **${trackDuration}**\n撥放進度 ${progress}\n循環模式 **${methods[queue.repeatMode]}**\n撥放用戶 : ${track.requestedBy}`)
    .setFooter({ text: '可愛的歸終 ❤️', iconURL: inter.member.avatarURL({ dynamic: true })})
    .setColor('ff0000')
    .setTimestamp()

    inter.editReply({ embeds: [embed], ephemeral: true });
}
