const { EmbedBuilder } = require('discord.js');

module.exports = (queue, error) => {
    
    const ErrorEmbed = new EmbedBuilder()
    .setAuthor({name: `歸終出現意外錯誤，請立即檢查控制台!`, iconURL: track.thumbnail})
    .setColor('#EE4B2B')
    
queue.metadata.send({ embeds: [ErrorEmbed] })

console.log(`機器人發出錯誤 ${error.message}`);
}
