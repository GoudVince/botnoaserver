const Discord = require('discord.js');
const client = require("../index").client
const { Permissions } = require('discord.js')
const db = require('quick.db')
const { createCmd } = require('../dataHandler');

client.on('guildMemberAdd', async (member) => {

    const channel = member.guild.channels.cache.find(x => x.id === '988132461252837406')
    if(channel === undefined) return

    const joinEmbed = new Discord.MessageEmbed()
        .setTitle("Welkom!")
        .setDescription(`Welkom in de **Noabently** Discord ${member} \n\n Check <#988132967522136095> voor alle regels waar je je aan moet houden in deze Discord.\n Veel plezier in de **NoaBently** Discord!`)
        .setColor("BLUE")
        .setThumbnail(member.user.displayAvatarURL({ size: 4096}))
     channel.send({ content: `${member}` , embeds: [joinEmbed] })

    const role = member.guild.roles.cache.find(x => x.id === '988126996729065503')
    member.roles.add(role).catch(() => {});

})