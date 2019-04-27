//Dependências
const Discord = require('discord.js');

//Command Handler - Definido na linha 31 do bot.js
exports.run = async (client, message, args) => {

    //Deleta a sua mensagem
    message.delete()
    
    //Define o erro se não tem o que o BOT falar
    if(!args.length)
    {
        var erro = new Discord.RichEmbed()
            .setTitle("Wrong Usage")
            .setTitle(message.author.username + ', use "!say <your text>" then I can say something!')
        message.channel.send(erro)
    }

    //Manda a mensagem que você definiu
    message.channel.send(args)
}