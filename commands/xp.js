//Dependências
const Discord = require('discord.js');
const client = new Discord.Client();
let xp = require("../xp.json")

//Command Handler - Definido na linha 31 do bot.js
exports.run = async (client, message, args) => {
    //Deleta a sua mensagem
    message.delete();

    //Define o xp se o autor da mensagem não tem
    if(!xp[message.author.id]){
        xp[message.author.id] = {
            xp: 0,
            level: 1
        };
    }
    //Define o XP atual
    let curxp = xp[message.author.id].xp;
    //Define o LVL atual
    let curlvl = xp[message.author.id].level;
    //Define o XP necessário para o próximo LVL
    let nxtLvlXp = curlvl * 300;
    //Define a quantidade de XP que o autor da mensagem precisa para passar para o próximo LVL
    let difference = nxtLvlXp - curxp

    //Mensagem mostrando tudo para o autor
    let lvlEmbed = new Discord.RichEmbed()
        .setAuthor(message.author.username)
        .setColor(0x000CFF)
        .addField("Level", curlvl, true)
        .addField("XP", curxp, true)
        .setFooter(`${message.author.username}, you need ${difference} xp until level up.`, message.author.displayAvatarURL);

    message.channel.send(lvlEmbed)
}