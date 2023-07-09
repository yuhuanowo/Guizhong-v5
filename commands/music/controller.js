const { ApplicationCommandOptionType, ActionRowBuilder, ButtonBuilder, EmbedBuilder, PermissionsBitField } = require('discord.js');

module.exports = {
    name: 'controller',
    description: "設定控制器頻道 ",
    voiceChannel: false,
    permissions: PermissionsBitField.Flags.ManageMessages,
    options: [
        {
            name: 'channel',
            description: '您要將其發送到的頻道',
            type: ApplicationCommandOptionType.Channel,
            required: true,
        }
    ],
    async execute({ inter, client }) { 
      let Channel = inter.options.getChannel('channel');
      if (Channel.type !== 0) {
        const embed = new EmbedBuilder()
        .setTitle('你必須將其發送到文字頻道..❌')  
        return inter.editReply({ embeds: [embed], ephemeral: true })
        }

    
      const embed = new EmbedBuilder()
       .setTitle('通過下面的按鈕控制您的音樂')
       .setImage(inter.guild.iconURL({ size: 4096, dynamic: true }))
       .setColor('#5000b8')
       .setTimestamp()
       .setFooter({ text: '可愛的歸終~❤️', iconURL: inter.member.avatarURL({ dynamic: true })})


         inter.editReply({ content: `發送控制器到 ${Channel}... ✅`, ephemeral: true})

         const back = new ButtonBuilder()
         .setLabel('上一首')
         .setCustomId(JSON.stringify({ffb: 'back'}))
         .setStyle('Primary')

         const skip = new ButtonBuilder()
         .setLabel('跳過')
         .setCustomId(JSON.stringify({ffb: 'skip'}))
         .setStyle('Primary')

         const resumepause = new ButtonBuilder()
         .setLabel('重新開始 & 暫停')
         .setCustomId(JSON.stringify({ffb: 'resume&pause'}))
         .setStyle('Danger')

         const save = new ButtonBuilder()
         .setLabel('儲存')
         .setCustomId(JSON.stringify({ffb: 'savetrack'}))
         .setStyle('Success')

         const volumeup = new ButtonBuilder()
         .setLabel('音量增加')
         .setCustomId(JSON.stringify({ffb: 'volumeup'}))
         .setStyle('Primary')

         const volumedown = new ButtonBuilder()
         .setLabel('音量減小')
         .setCustomId(JSON.stringify({ffb: 'volumedown'}))
         .setStyle('Primary')

         const loop = new ButtonBuilder()
         .setLabel('循環')
         .setCustomId(JSON.stringify({ffb: 'loop'}))
         .setStyle('Danger')

         const np = new ButtonBuilder()
         .setLabel('正在播放')
         .setCustomId(JSON.stringify({ffb: 'nowplaying'}))
         .setStyle('Secondary')
         
         const queuebutton = new ButtonBuilder()
         .setLabel('隊列')
         .setCustomId(JSON.stringify({ffb: 'queue'}))
         .setStyle('Secondary')

        const lyrics = new ButtonBuilder()
            .setLabel('歌詞')
            .setCustomId(JSON.stringify({ffb: 'lyrics'}))
            .setStyle('Primary')

        const shuffle = new ButtonBuilder()
            .setLabel('隨機播放')
            .setCustomId(JSON.stringify({ffb: 'shuffle'}))
            .setStyle('Success')

        const stop = new ButtonBuilder()
            .setLabel('停止')
            .setCustomId(JSON.stringify({ffb: 'stop'}))
            .setStyle('Danger')


         const row1 = new ActionRowBuilder().addComponents(back, queuebutton, resumepause, np, skip)
         const row2 = new ActionRowBuilder().addComponents(volumedown, loop, save, volumeup)
        const row3 = new ActionRowBuilder().addComponents(lyrics, shuffle, stop)


        Channel.send({ embeds: [embed], components: [row1, row2, row3] })

    },
}
