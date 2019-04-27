//Dependências
const Discord = require('discord.js');



//Command Handler - Definido na linha 31 do bot.js
exports.run = async (client, message, args) => {

    //Apaga a mensagem
    message.delete()
    
    //Define que args[0] é rollData e exclui o "d" da mensagem
    let rollData = args[0].split("d")

    //Manda a mensagem caso não tenha args[0]
    if(!args[0])
    {
        var erro = new Discord.RichEmbed()
            .setTitle("Wrong Usage")
            .setDescription("Please, use **!r <dices>d<sides>**")
            .setFooter("More doubts? Please contact the server owner")

        message.channel.send(erro)

        return;
    }

    //Indica que se não estiver completo o total é 0
    let total = 0;

    //Define que rollData[0] tem que ser maior que 0
    for(let i = 0; i<rollData[0]; i++){
    //Define o dano dado
    total += Math.floor(Math.random() * rollData[1])
    }

    //Define a média do dano
    let avg = total/rollData[1]
    //Define por quanto vai dividir (é aleatório)
    let rand = Math.random()

    //Função para especificar o dano
    function dmg(rollData){
        if (rollData[0] >= 1 && rollData[0] <= 9) 
            return 0;

        if (rollData[0] >= 10 && rollData[0] <= 19) 
            return 1;
        
        if (rollData[0] >= 20 && rollData[0] <= 24) 
            return 2;
        
        if (rollData[0] >= 25 && rollData[0] <= 29) 
            return 3;
        
        if (rollData[0] >= 30 && rollData[0] <= 34)
            return 4;

        if (rollData[0] >= 35 && rollData[0] <= 39) 
            return 5;
        
        if (rollData[0] >= 40 && rollData[0] <= 44) 
            return 6;
        
        if (rollData[0] >= 45 && rollData[0] <= 49) 
            return 7;
        
        if (rollData[0] >= 50 && rollData[0] <= 54) 
            return 8;
        
        if (rollData[0] >= 55 && rollData[0] <= 59) 
            return 9;
        
        if (rollData[0] >= 60 && rollData[0] <= 64) 
            return 10;
        
        if (rollData[0] >= 65 && rollData[0] <= 69) 
            return 11;
        
        if (rollData[0] >= 70 && rollData[0] <= 74) 
            return 12;
        
        if (rollData[0] >= 75 && rollData[0] <= 79) 
            return 13;
        
        if (rollData[0] >= 80 && rollData[0] <= 84) 
            return 14;
    
        if (rollData[0] >= 85 && rollData[0] <= 89) 
            return 15;
    
        if (rollData[0] == 90) 
            return 16;
        
        if (rollData[0] == 91) 
            return 17;
        
        if (rollData[0] == 92) 
            return 18;
        
        if (rollData[0] == 93) 
            return 19;
        
        if (rollData[0] == 94) 
            return 20;
        
        if (rollData[0] == 95) 
            return 21;
        
        if (rollData[0] == 96) 
            return 22;
        
        if (rollData[0] == 97) 
            return 23;
        
        if (rollData[0] == 98) 
            return 24;
        
        if (rollData[0] == 99) 
            return 25;
        
        if (rollData[0] == 100) 
            return 26;
        
    }

    //Dano normal (90% de chance)
    if(rand < 0.9) {
        var resultado = new Discord.RichEmbed()
        .setTitle('Dice')
        .addField(`Numbers of dice rolled: ${rollData[0]}`, `!r **${rollData[0]}**d${rollData[1]}`)
        .addField(`Numbers of sides: ${rollData[1]}`, `!r ${rollData[0]}d**${rollData[1]}**`)
        .addField(`Damage given: ${dmg(rollData)}`, `${avg}`)
        .setURL("https://cdn.discordapp.com/attachments/568183511710826508/568187858616188952/image.png")
        .setFooter("Click on the title of this message to see the damage chart") 
        .setColor(0xFDFEFE)

        message.channel.send(resultado)
    }

    //Dano crítico (5% de chance)
    else if(rand < 0.95) {
        var critico = new Discord.RichEmbed()
        .setTitle('Critical Damage')
        .addField(`Numbers of dice rolled: ${rollData[0]}`, `!r **${rollData[0]}**d${rollData[1]}`)
        .addField(`Numbers of sides: ${rollData[1]}`, `!r ${rollData[0]}d**${rollData[1]}**`)
        .addField(`Damage given: ${dmg(rollData) * 2}`, `${total - avg}`)
        .setURL("https://cdn.discordapp.com/attachments/568183511710826508/568187858616188952/image.png")
        .setFooter("Click on the title of this message to see the damage chart") 
        .setColor(0xFDFEFE)

            
        message.channel.send(critico)
    }
    
    //Botch (5% de chance)
    else {
        var botcha = new Discord.RichEmbed()
        .setTitle('Botch')
        .addField(`rollData[1]+rollData[0]/2s of dice rolled: ${rollData[0]}`, 'rolls')
        .addField(`Numbers of sides: ${rollData[1]}`, 'sides')
        .addField(`Damage given: ${dmg(rollData) * 0 + 1}`, `Média = ${avg - rollData[0]}`)
        .setURL("https://cdn.discordapp.com/attachments/568183511710826508/568187858616188952/image.png")
        .setFooter("Click on the title of this message to see the damage chart") 
        .setColor(0xFDFEFE)


        message.channel.send(botcha)
    }

}