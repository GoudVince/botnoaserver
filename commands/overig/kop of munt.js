const discord = require('discord.js');

module.exports.run = async (client, message, args) => {
 
    var values = ["Kop", "Munt"];
 
    var result =  values[Math.floor( Math.random() *values.length)];
 
 
 
    return message.channel.send(`🌟 Je hebt **${result}** gegooid`);
 
}
 
module.exports.help = {
    name: "kopofmunt",
    description: "kiest kop of munt",
    category: "fun"
}