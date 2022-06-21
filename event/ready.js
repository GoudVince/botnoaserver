const Discord = require('discord.js')
const { client } = require('../index'); 
const { createCmd } = require('../dataHandler')

client.on('ready', () => {
    createCmd(client, '988035898748846110')
})