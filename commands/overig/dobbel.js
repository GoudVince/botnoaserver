const discord = require('discord.js');

module.exports.run = async (client, message, args) => {
 
    var number =  Math.ceil( Math.random() *6);
 
 
 
    return message.channel.send(`🎲 Je hebt **${number}** gegooid`);
 
}
 
module.exports.help = {
    name: "dobbel",
    description: "gooit een getal tussen de 1 en 6",
    category: "fun"
}