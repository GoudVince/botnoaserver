const client = require("../index").client
const Discord = require("discord.js");
const fs = require("fs")
const g = require('../giveaway.json')
const config = require("../botConfig.json");


client.on('messageCreate', async message => {

    let prefix = config.prefix;
    let messageArray = message.content.split(" ")
    let cmd = messageArray[0]
    let args = messageArray.slice(1);

    let commands = client.commands.get(cmd.slice(prefix.length)) || client.commands.get(client.aliases.get(cmd.slice(prefix.length)));
    if (commands) {
        if (!message.content.startsWith(prefix)) return
        commands.run(client, message, args, prefix);
    };



    //CREATE
    if(message.content.startsWith("!g create")){
        let channel = message.mentions.channels.first();
        let args = message.content.split(" ").slice(3).join(" ").split(",")
        let price = args[0];
        let duration = args[1];
        let winners = args[2];
        if(!channel) return message.channel.send({content:"Je hebt geen kanaal opgegeven"});
        if(!price) return message.channel.send({content:"Je hebt geen prijs gegeven"});
        if(!duration) return message.channel.send({content:"je hebt geen tijd gegeven"});
        if(!winners) winners = 1;

        if(!g[message.guild.id]){
            g[message.guild.id] = []
        }

        g[message.guild.id].push({
            "channel":channel.id,
            "price":price,
            "winners":winners,
            "end":0,
            "members":[],
            "mId":0,
            "ended":false
        })

        let currentG = g[message.guild.id][g[message.guild.id].length-1];

        if(duration.toLowerCase().includes("s")){
            duration = Number(duration.split("s")[0])*1000
        }else if(duration.toLowerCase().includes("m")){
            duration = Number(duration.split("m")[0])*1000*60
        }else if(duration.toLowerCase().includes("h")){
            duration = Number(duration.split("h")[0])*1000*60*60
        }else if(duration.toLowerCase().includes("d")){
            duration = Number(duration.split("d")[0])*1000*60*60*24
        }else{
            duration = Number(duration)*1000*60
        }

        currentG.end = new Date().getTime() + duration;

        let time = Date.parse(new Date(new Date().getTime() + duration))/1000

        let em = new Discord.MessageEmbed()
        .setAuthor({name: "🎉 GIVEAWAY 🎉"})
        .setTitle(price.toString())
        .setDescription("Druk op de knop om mee te doen aan de winactie.\n**Giveaway eindigt**: <t:"+time+":R>\nGemaakt door: <@!"+message.author.id+">")
        .setColor(config.color)
        .setFooter({text: currentG.members.length+" Deelnemers"} )
        .setTimestamp();

        let row = new Discord.MessageActionRow()
        .addComponents(
            new Discord.MessageButton()
            .setLabel("Join")
            .setStyle("PRIMARY")
            .setCustomId("Deelnemen")
        )

        channel.send({embeds:[em], components:[row]}).then(msg=>{
            currentG.mId = msg.id

            fs.writeFileSync('../giveaway.json', JSON.stringify(g))
        })

    }

    //END
    if (message.content.startsWith("!g end")) {

        if (!g[message.guild.id]) return message.channel.send({ content: "Er is geen weggeefactie bezig die je kunt beëindigen " })
        let away = message.content.split(" ").splice(2).join()
        let giveaway;

        if (g[message.guild.id].length < 1) return message.channel.send({ content: "Er is geen weggeefactie bezig die je kunt beëindigen" })

        if (!away) {
            giveaway = g[message.guild.id][g[message.guild.id].length - 1];

            g[message.guild.id][g[message.guild.id].length - 1].end = 0;
        } else {
            for (i = 0; i < g[message.guild.id].length; i++) {
                if (g[message.guild.id][i].mId == away) {
                    giveaway = g[message.guild.id][i];
                    g[message.guild.id][i].end = 0;
                    break;
                }
            }
        }

        if (!giveaway || giveaway.ended == true) return message.channel.send({ content: "De winactie is afgelopen of bestaat niet " })

        giveaway.end = 0

        message.channel.send({ content: "weggeefactie afgelopen" })

        fs.writeFileSync("../giveaway.json", JSON.stringify(g))

    }


    //delete
    if (message.content.startsWith("!g delete")) {

        if (!g[message.guild.id]) return message.channel.send({ content: "There is no giveaway in progress that you can end " });

        let away = message.content.split(" ").slice(2).join("")
        let giveaway;

        if (g[message.guild.id].length < 1) return message.channel.send({ content: "There is no giveaway in progress that you can end " })


        if (!away) {
            giveaway = g[message.guild.id][g[message.guild.id].length - 1];

            g[message.guild.id].splice(g[message.guild.id].length - 1, 1)
        } else {
            for (i = 0; i < g[message.guild.id].length; i++) {
                if (g[message.guild.id][i].mId == away) {
                    giveaway = g[message.guild.id][i];
                    g[message.guild.id].splice(i, 1)
                    break;
                }
            }
        }

        if (!giveaway) return message.channel.send({ content: "The giveaway does not exist" })

        message.channel.send({ content: "Giveaway removed" })

        fs.writeFileSync("../giveaway.json", JSON.stringify(g))


    }


    //RERROL
    if (message.content.startsWith("!g rerrol")) {

        if (!g[message.guild.id]) return message.channel.send({ content: "There is no giveaway in progress that you can end " });

        let away = message.content.split(" ").slice(2).join("")
        let giveaway;

        if (g[message.guild.id].length < 1) return message.channel.send({ content: "There is no giveaway in progress that you can end ." })

        if (!away) {
            giveaway = g[message.guild.id][g[message.guild.id].length - 1];

            if (g[message.guild.id][g[message.guild.id].length - 1].ended == false) return message.channel.send({ content: "The giveaway is not over yet." })
            if (g[message.guild.id][g[message.guild.id].length - 1].members.length < 1) return message.channel.send({ content: "The giveaway had no participants." })
            g[message.guild.id][g[message.guild.id].length - 1].ended = false;
            g[message.guild.id][g[message.guild.id].length - 1].end = 0;
        } else {
            for (i = 0; i < g[message.guild.id].length; i++) {
                if (g[message.guild.id][i].mId == away) {
                    giveaway = g[message.guild.id][i];

                    if (g[message.guild.id][i].ended == false) return message.channel.send({ content: "The giveaway is not over yet " })
                    if (g[message.guild.id][i].members.length < 2) return message.channel.send({ content: "The giveaway had no participants." })
                    g[message.guild.id][i].ended = false;
                    g[message.guild.id][i].end = 0;

                    break;
                }
            }
        }

        if (!giveaway) return message.channel.send({ content: "the giveaway does not exist" })

        message.channel.send({ content: "The winner will be drawn again." })

        fs.writeFileSync("../giveaway.json", JSON.stringify(g))

    }


})