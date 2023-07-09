module.exports = async ({ inter, queue }) => {
    if (!queue || !queue.isPlaying()) return inter.editReply({ content: `No music currently playing... try again ? ❌`, ephemeral: true });

    const resumed = queue.node.resume();
    let message = `當前音樂 ${queue.currentTrack.title} 已恢復 ✅`;
    
    if (!resumed) {
        queue.node.pause();
        message = `當前音樂 ${queue.currentTrack.title} 已暫停 ✅`;
    }

    return inter.editReply({
        content: message, ephemeral: true
    });
}