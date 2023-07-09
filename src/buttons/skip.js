module.exports = async ({  inter, queue }) => { 
    if (!queue || !queue.isPlaying()) return inter.editReply({ content: `當前沒有播放音樂... 再試一次 ? ❌`, ephemeral: true });
    
    const success = queue.node.skip();

    return inter.editReply({ content: success ? `當前音樂 ${queue.currentTrack.title} 已跳過✅` : `出了些問題 ${inter.member}... 再試一次 ? ❌`, ephemeral: true});
}