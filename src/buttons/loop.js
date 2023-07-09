const { QueueRepeatMode } = require('discord-player');
module.exports = async ({  inter, queue }) => { 

    const methods = ['禁用', '歌曲', '隊列'];

    if (!queue || !queue.isPlaying()) return inter.editReply({ content: `當前沒有播放音樂...再試一次 ? ❌`, ephemeral: true });

    const repeatMode = queue.repeatMode

    if (repeatMode === 0) queue.setRepeatMode( QueueRepeatMode.TRACK)

    if (repeatMode === 1 ) queue.setRepeatMode( QueueRepeatMode.QUEUE)

    if (repeatMode === 2) queue.setRepeatMode( QueueRepeatMode.OFF)
    
    return inter.editReply({ content: `循環已設置為 **${methods[queue.repeatMode]}**.✅`})



}