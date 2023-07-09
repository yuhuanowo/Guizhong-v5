const maxVol = client.config.opt.maxVol;
module.exports = async ({  inter, queue }) => { 
    if (!queue || !queue.isPlaying()) return inter.editReply({ content: `當前沒有播放音樂... 再試一次 ? ❌`, ephemeral: true });

    const vol = Math.floor(queue.node.volume + 5)

    if (vol > maxVol ) return inter.editReply({ content: `我無法再調高音量... 再試一次 ? ❌`, ephemeral: true })

    if (queue.node.volume === vol) return inter.editReply({ content: `您要更改的音量已經是當前的... 再試一次 ? ❌`, ephemeral: true });

    const success = queue.node.setVolume(vol);

    return inter.editReply({ content: success ? `音量已修改為 ${vol}/${maxVol}% 🔊` : `出了些問題 ${inter.member}... 再試一次 ? ❌`, ephemeral: true});
}