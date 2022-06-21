module.exports.run = async (client, message, args) => {

    // !clear aantal

    if (!message.member.permissions.has("MANAGE_MESSAGES")) return message.reply("U heeft geen toestemming voor dit command!");

    if (!args[0]) return message.reply("Type een getal hoeveel berichten u wilt verwijderen!");

    if (parseInt(args[0])){

        var amount = parseInt(args[0]) + 10;

        message.channel.bulkDelete(amount).then(() => {

            if(parseInt(args[0]) ==1){
                message.channel.send("Ik heb 1 bericht verwijderd!").then(msg => {
                    setTimeout(() => {
                       msg.delete(); 
                    }, 3000);
                });
            } else {
                message.channel.send(`Ik heb ${parseInt(args[0])} berichten verwijderd!`).then(msg => {
                    setTimeout(() => {
                       msg.delete(); 
                    }, 3000);
                });
            }

        }).catch(error => {
            return message.reply("Type een getal tussen de 0 en de 100!");
        });
    
    }else{
        return message.reply("Geef een getal op!");

    }
    

}

module.exports.help = {
    name: "clear",
    category: "info",
    description: "Verwijderd berichten"
}