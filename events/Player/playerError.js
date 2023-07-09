const { EmbedBuilder } = require('discord.js');

module.exports = (queue, error) => {
    
    const ErrorEmbed = new EmbedBuilder()
    .setAuthor({name: `機器人出現意外錯誤，請立即檢查控制台!`, iconURL: track.thumbnail})
    .setColor('#EE4B2B')

queue.metadata.send({ embeds: [ErrorEmbed] })

console.log(`播放器發出錯誤 ${error.message}`);
}
