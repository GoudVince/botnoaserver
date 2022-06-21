const botConfig = require("../../botConfig.json");

module.exports.run = async (client, message, args) => {

try{

    var prefix = botConfig.prefix;

    var respone = "**Bot commands**\r\n\n";
    var info = "**__Informatie__**\r\n";
    var general = "**__Overig__**\r\n";
    var fun = "**__Fun__**\r\n";
    client.commands.forEach(command => {

        switch (command.help.category) {
  
            case "info":
                info += `${prefix}${command.help.name} - ${command.help.description}\r\n`;
                break;
            case "general":
                general += `${prefix}${command.help.name} - ${command.help.description}\r\n`;
                break;
            case "fun":
                fun += `${prefix}${command.help.name} - ${command.help.description}\r\n`;
                break;
        }

    });

    respone += info + general + fun;

    message.author.send(respone).then(() => {
        return message.reply("Alle commands kan je vinden in je privé berichten");
    }).catch(() => {
        return message.reply("Je privé berichten zijn uitgeschakeld je hebt dus geen bericht ontvangen")
    })
}catch (error) {
    message.reply("Er is iets misgegaan, sorry voor het ongemak");
}

}

module.exports.help = {
    name: "help",
    category: "info",
    description: "geeft alle commands"
}