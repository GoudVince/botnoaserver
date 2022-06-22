const discord = require('discord.js');

module.exports.run = async (client, message, args) => {
 
    if(!args[0]) return message.reply("Gebruik !sps <steen, papier of schaar>");
 
    var options = ["steen", "papier", "schaar"];
 
    var result =  options[Math.floor( Math.random() *options.length)];
 
    switch(args[0].toUpperCase()) {
 
        case "STEEN":
 
            switch(result){
 
                case "steen":
 
                    message.channel.send(`Ik heb ${result} 🗿, het is gelijkspel`);
 
                    break;
 
                case "papier":
 
                    message.channel.send(`Ik heb ${result} 🗒, Ik win`);
 
                    break;
 
                case "schaar":
 
                    message.channel.send(`Ik heb ${result} ✂, Jij wint`);
 
                    break;
 
            }
 
            break;
 
        case "PAPIER":
 
            switch(result){
 
                case "steen":
 
                    message.channel.send(`Ik heb ${result} 🗿, Jij wint`);
 
                    break;
 
                case "papier":
 
                    message.channel.send(`Ik heb ${result} 🗒, Het is gelijkspel`);
 
                    break;
 
                case "schaar":
 
                    message.channel.send(`Ik heb ${result} ✂, Ik win`);
 
                    break;
 
            }
 
            break;
 
        case "SCHAAR":
 
            switch(result){
 
                case "steen":
 
                    message.channel.send(`Ik heb ${result} 🗿, Ik win`);
 
                    break;
 
                case "papier":
 
                    message.channel.send(`Ik heb ${result} 🗒, Jij wint`);
 
                    break;
 
                case "schaar":
 
                    message.channel.send(`Ik heb ${result} ✂, Het is geleikspel`);
 
                    break;
 
            }
 
            break;
 
        default:
 
            return message.channel.send("Gebruik steen, papier of schaar")
    }
 
}
 
module.exports.help = {
    name: "sps",
    description: "kiest steen, papier of schaar",
    category: "fun"
}