const Discord = require('discord.js');

module.exports.run = async (client, inter) => {

    if(!inter.member.permissions.has('KICK_MEMBERSS')){
        return await inter.reply({ content: 'jij hebt hier geen perms voor'})
    }

    const user = inter.options.getUser('gebruiker');

    setTimeout(() => {inter.guild.members.kick(user.id).catch(() => {})}, 1000)

    return await inter.reply(`${user} is succesvol gekickt`)

}

module.exports.help = {
    name: 'kick'
}