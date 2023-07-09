module.exports = async ({  inter, queue }) => { 
    if (!queue || !queue.isPlaying()) return inter.editReply({ content: `當前沒有播放音樂...再試一次 ? ❌`, ephemeral: true });

    if (!queue.history.previousTrack) return inter.editReply({ content: `之前沒有播放音樂 ${inter.member}... 再試一次 ? ❌`, ephemeral: true });

    await queue.history.back();

    inter.editReply({ content:`播放**上一個**歌曲 ✅`, ephemeral: true});
}
