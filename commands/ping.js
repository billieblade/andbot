//Dependências
const Discord = require('discord.js');
const client = new Discord.Client();

//Command Handler - Definido na linha 31 do bot.js
exports.run = async (client, message, args) => {
    //Deleta a sua mensagem
    message.delete();

    //Manda qual é o ping do BOT
    message.channel.send(`Current latency is ${message.createdTimestamp - message.createdTimestamp}ms, while API's latency is ${Math.round(client.ping)}ms.`)
}