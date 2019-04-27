//Dependências
const Discord = require('discord.js');
const client = new Discord.Client();

//Command Handler - Definido na linha 31 do bot.js
exports.run = async (client, message, args) => {
    //Deleta a sua mensagem
    message.delete();

    //Manda a mensagem no chat em que o autor digitou "!help" informando que foi enviado no privado
    message.channel.send(`Hello ${message.author.username}, sent you a DM with all information you need.`);

    //Manda a mensagem com os comandos no privado
    var Help = new Discord.RichEmbed()
        .setTitle("Help")
        .setColor("RANDOM")
        .addField('Commands:', "**!ping:** Calculate the BOT's latency\n**!purge <number>:** Delete <number> messages\n**!r <dices>d<sides>:** Roll <dices> with <sides>\n**!help:** I think you know how to use this one\n**!say <message>:** Say whatever you want!\n**!xp:** Shows your current XP level")
        .setFooter('Still have some doubts? Contact the server owner for more information')
        .setImage(message.author.avatarURL)

    message.author.send(Help)
}