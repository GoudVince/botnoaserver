const Discord = require('discord.js');
const db = require('quick.db');

module.exports.run = async (client, message, args, prefix, member,) => {

    if(!message.member.permissions.has('ADMINISTRATOR')) return message.delete()
    
    const embed1 = args.join(" ")
    const embed = new Discord.MessageEmbed()
        .setDescription(`${embed1}`)
        .setColor('BLUE')

    message.channel.send({ embeds: [embed] }); message.delete()

}

module.exports.help = {
    name: 'announce',
    description: 'geeft een mededeling',
    category: 'general',
}