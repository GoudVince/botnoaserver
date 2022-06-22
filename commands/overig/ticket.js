const discord = require('discord.js');

module.exports.run = async (client, message, args) => {

    const categoryID = "989214429340110919";

    var userName = message.author.username;

    var userDiscriminator = message.author.discriminator;

    var reason = args.join(" ");
    if(!reason) return message.channel.send("Gelieve een reden mee geven");
    
    var ticketBestaat = false;

    message.guild.channels.cache.forEach((channel) => {

        if(message.name == userName.toLowerCase() + "-" + userDiscriminator) {

            message.channel.send("Je hebt al een ticket aangemaakt!");

            ticketBestaat = true;

            return;

         }

    });

    if(ticketBestaat) return;

    message.guild.channels.create(userName.toLowerCase() + "-" + userDiscriminator, {type: "text"}).then((createdChan) => {

        createdChan.setParent(categoryID).then((settedParent) => {

            message.channel.send('✅ Ticket aangemaakt.'); 

            settedParent.send({embeds: [embedParent] });

        }).catch(err =>{
            message.channel.send('❌ er is iets mis gegaan');
        })
    }).catch(err =>{
        message.channel.send('❌ er is iets mis gegaan');
    });

}

module.exports.help = {
    name: 'ticket',
    description: 'Maak een ticket aan',
    category: 'info',
}