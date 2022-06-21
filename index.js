const botConfig = require ("./botConfig.json")
const fs = require ("fs")
const { Client, Intents, Collection, MessageEmbed } = require("discord.js");
const Discord = require('discord.js');
const { fstat, fsync } = require("fs");
const client = new Client({
    intents: [Intents.FLAGS.GUILD_PRESENCES,32767, Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MEMBERS, Intents.FLAGS.GUILD_MESSAGES,Intents.FLAGS.GUILD_VOICE_STATES, Intents.FLAGS.GUILD_MESSAGE_REACTIONS, Intents.FLAGS.GUILD_EMOJIS_AND_STICKERS, Discord.Intents.FLAGS.GUILDS,
    Discord.Intents.FLAGS.GUILD_VOICE_STATES,
    Discord.Intents.FLAGS.GUILD_PRESENCES,
    Discord.Intents.FLAGS.GUILD_MEMBERS,
  ], allowedMentions: { parse: ['users', 'roles'] }
});
 
 
 
client.on("ready", () => {
    console.log((`${client.user.username} is klaar voor gebruik`))
    client.user.setActivity("iedereen", { type: 'WATCHING' });
 
});
 
 
 
 
client.commands = new Discord.Collection();
client.aliases = new Discord.Collection();
client.events = new Discord.Collection();
client.SlashCmd = new Discord.Collection();
module.exports.client = client
 
//commandHandler
fs.readdirSync('./commands/').forEach(dir => {
    fs.readdir(`./commands/${dir}`, (err, files) => {
        if (err) throw err;
 
        var jsFiles = files.filter(f => f.split(".").pop() === "js")
 
        jsFiles.forEach(file => {
            var fileGet = require(`./commands/${dir}/${file}`);
            console.log(`De file ${fileGet.help.name}.js ✅ is geladen`)
 
            try {
                client.commands.set(fileGet.help.name, fileGet); -
 
                    fileGet.help.aliases.forEach(alias => {
                        client.aliases.set(alias, fileGet.help.name);
                    })
            } catch (err) {
                return console.log(err);
            }
        });
    });
});
 
//slash commands
fs.readdirSync('./slashcommands/').forEach(dir => {
    fs.readdir(`./slashcommands/${dir}`, (err, files) => {
        if (err) throw err;
 
        var jsFiles = files.filter(f => f.split(".").pop() === "js")
 
        jsFiles.forEach(file => {
            var fileGet = require(`./slashcommands/${dir}/${file}`);
           console.log(`De file ${fileGet.help.name}.js ✅ is geladen`)
 
            if (fileGet.help.name === err) {
                return console.log(`De file ${fileGet.help.name}.js ❌ is niet geladen!!!!!`)
            }
 
            try {
                client.SlashCmd.set(fileGet.help.name, fileGet);
            } catch (err) {
                return console.log(err);
            }
        });
    });
});
 
 
//eventHandler
fs.readdirSync(`./event/`).forEach(dir => {
    var jsFiles = fs.readdirSync('./event/').filter(f => f.split(".").pop() === "js");
    jsFiles.forEach(event => {
        const eventGet = require(`./event/${event}`)
 
        try {
            client.events.set(eventGet.name, eventGet)
        } catch (err) {
            return console.log(err)
        }
    })
})
 
 
client.on('messageCreate', async message => {
 
    if (message.author.bot) return;
 
    var prefix = "!"
    var messageArray = message.content.split(" ")
    var cmd = messageArray[0]
 
    if (message.content.startsWith(prefix)) return;
 
    const commandData = client.commands.get(cmd.slice(prefix.length))
 
    if (!commandData) return console.log()
 
    var args = messageArray.slice(1);
 
    try {
 
        await commandData.run(client, message, args)
 
    } catch (error) {
        console.log(err)
    }
 
})
 
 
client.login(process.env.token);