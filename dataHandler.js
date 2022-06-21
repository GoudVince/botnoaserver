const discord = require("discord.js")
const { Permissions } = require('discord.js')
 
 
async function createCmd(client, guildId) {
    const data = [
        {
            name: 'echo',
            description: 'Stuur wat ik zeg',
            options: [{
                name: 'text',
                type: 'STRING',
                description: 'voer de text in die wordt terug gestuurd',
                required: true
            }]
        },
        {
            name: 'ban',
            description: 'verban een gebruiker',
            options: [{
                name: 'gebruiker',
                description: 'geef een gebruiker op die je wilt verbannen',
                type: 'USER',
                required: true,
            }]
        },
        {
            name: 'kick',
            description: 'kick een gebruiker',
            options: [{
                name: 'gebruiker',
                description: 'geef een gebruiker op die je wilt kicken',
                type: 'USER',
                required: true
            }]
        },
        {
            name: 'clear',
            description: 'verwijder berichten in je server',
            options: [
                {
                    name: 'aantal-berichten',
                    type: 'NUMBER',
                    required: true,
                    description: 'voer het aantal berichten in dat je wilt verwijderen'
                }
            ]
        },
        {
            name: 'rename',
            description: 'geef een ticket een andere naam',
            options: [
                {
                    name: 'nieuwe-naam',
                    description: 'voer de nieuwe naam voor de ticket in!',
                    type: 'STRING',
                    required: true
                }
            ]
        },
        {
            name: 'add',
            description: 'voeg een gebruiker of rol toe aan de ticket',
            options: [
                {
                    name: 'genruiker-of-rol',
                    description: 'vermeld de gebruiker of rol die je wilt toevoegen',
                    type: 'MENTIONABLE',
                    required: true
                }
            ]
        },
        {
            name: 'remove',
            description: 'verwijder een gebruiker of rol uit de ticket',
            options: [
                {
                    name: 'genruiker-of-rol',
                    description: 'verwijder de gebruiker of rol die je wilt verwijderen',
                    type: 'MENTIONABLE',
                    required: true
                }
            ]
        },
        {
            name: 'suggestie',
            description: 'stuur een suggestie',
            options: [
                {
                    name: 'jouw-idee',
                    description: 'vul hier je suggestie in!',
                    type: 'STRING',
                    required: true,
 
                }
            ]
        },
        {
            name: 'review',
            description: 'stuur een review',
            options: [{
                name: 'aantal-sterren',
                description: 'voer hier het aantal sterren in! **(Max 5)**',
                type: 'NUMBER',
                required: true,
 
            },
            {
                name: 'jouw-review',
                description: 'vul hier de text in!',
                required: true,
                type: 'STRING'
            }]
        },
        {
            name: 'rr',
            description: 'maak een reactie button',
            options: [
                {
                    name: 'kanaal',
                    description: 'vermeld het kanaal waar de reactie button moet komen!',
                    type: 'CHANNEL',
                    required: true,
 
                },
                {
                    name: 'rol',
                    description: 'vermeld de rol die mensen moeten ontvangen!',
                    type: 'ROLE',
                    required: true
                }
            ]
        },
        {
            name: 'help',
            description: 'ontvang ons help command',
            options: [
                {
                    name: 'categorie',
                    description: 'kies een categorie',
                    type: 'STRING',
                    required: true,
                    choices: [
                        {
                            name: 'Ticket commands',
                            description: 'krijg een lijst met ticket commands',
                            value: 'tickets'
                        },
                        {
                            name: 'Moderatie Commands',
                            description: 'krijg een lijst met moderatie commands',
                            value: 'moderatie'
                        },
                        {
                            name: 'Burger commands',
                            description: 'krijg een lijst met burger commands',
                            value: 'commands'
                        },
                    ]
                }
            ]
        },
        {
           name: 'transcript',
           description: 'View a transcript of a particular channel'
        },
 
        {
            name: 'botinfo',
            description: 'krijg onze bot info'
        },
        {
            name: 'ticketpanel',
            description: 'plaats een ticket panel'
        },
        {
            name: 'ping',
            description: 'kijk hoeveel ms de bot heeft'
        },
        {
            name: "play",
            description: "song u want to play either a link or a song name",
            options: [{
                name: "song",
                description: 'Play a song',
                type: 'STRING',
                required: true,
            }]
        },
        {
            name: "getqueue",
            description: "Shows the queue",
        },
        {
            name: "pause",
            description: "pause the song",
        },
        {
            name: "resume",
            description: "resume the song",
        },
        {
            name: 'removequeue',
            description: 'Removes a song from the queue',
            options: [{
                name: "number",
                description: 'which number wants to get rid of',
                type: 'STRING',
                required: true,
            }]
        },
        {
            name: 'skip',
            description: 'skips the song'
        },
        {
            name: 'stop',
            description: 'Stops the music of the bot and disconnects'
        },
        {
            name: 'volume',
            description: 'Changes the volume of the music',
            options: [{
                name: 'volume',
                description: 'The new volume of the music',
                type: 'STRING',
                required: true
            }]
        }
 
 
    ]
 
    await client.guilds.cache.get(guildId)?.commands.set(data); console.error();
 
}
 
module.exports = { createCmd }