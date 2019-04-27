//OBS: Por favor, antes de utilizar o BOT insira o token na pasta config.json

//Dependencias
const Discord = require('discord.js');
const commando = require('discord.js');
const client = new Discord.Client();
const bot = new Discord.Client();
const config = require('./config.json');
const fs = require('fs')
const prefix = "!";
let xp = require("./xp.json");

//Avisa quando o BOT está pronto
client.on('ready', () => {
    console.log("Estou pronto!")
})

client.on('message', message => {

    //Ignora se a mensagem não tem o prefixo ("!")
    let args = message.content.slice(prefix.length).trim().split(' ');
    //Define que os comandos devem ser em letra minúscula
    let cmd = args.shift().toLowerCase();


    //Ignora a mensagem se foi enviada por outro BOBT
    if (message.author.bot) return;
    //Ignora se a mensagem não tem o prefixo("!")
    if (!message.content.startsWith(prefix)) return;

    try {

        //Deleta o cache da pasta commands
        delete require.cache[require.resolve(`./commands/${cmd}.js`)];


        //Define que os comandos estão guardados na pasta commands
        let commandFile = require(`./commands/${cmd}.js`);
        //Define que a pasta commands é executável com o BOT, mensagem e argumentos
        commandFile.run(client, message, args);

    } catch (e) {
        //Registra o erro no console e não desliga o BOT
        console.log(e.stack);
    }

});

client.on('message', message => {
//O XP é guardado no arquivo "xp.json"

//Define o ganho de XP
let xpAdd = Math.floor(Math.random() * 7) + 8;
//Registra no console a quantia de XP que o usuário recebeu
console.log(xpAdd);

//Se o usuário não tem XP, ele vai receber XP = 0 e LVL = 1
if(!xp[message.author.id])
{
    xp[message.author.id] = {
        xp: 0,
        level: 1
    };
}



//Define o XP necessário para o próximo LVL
let nxtLvl = xp[message.author.id].level * 300;
//Define o XP atual
let curxp = xp[message.author.id].xp;
//Define o LVL atual
let curlvl = xp[message.author.id].level;
xp[message.author.id].xp = curxp + xpAdd;
//Manda uma mensagem quando alguém passa para o próximo LVL
if(nxtLvl <= xp[message.author.id].xp){
    xp[message.author.id].level = curlvl + 1;
    let lvlup = new Discord.RichEmbed()
        .setTitle("Level up!")
        .setColor(0x000CFF)
        .addField(`Congrats ${message.author.username}!`, `You are now level ${curlvl + 1}`);

    message.channel.send(lvlup)

}
//Registra o XP na pasta "xp.json"
fs.writeFile("./xp.json", JSON.stringify(xp), (err) => {
    if(err) console.log(err)
});
});

//Recebe o cargo na hora que entra no servidor automaticamente
client.on('guildMemberAdd', member => {

    var newRole = member.guild.roles.find("name", "newcolonizer");
    member.addRole(newRole)
});

//Quando alguém entra no servidor ele notifica
client.on('guildMemberAdd', (guildMember) => {
    var BemVindo = new Discord.RichEmbed()
        .setTitle("WELCOME")
        .setThumbnail(guildMember.user.avatarURL)
        .setDescription(`Greetings, ` + guildMember.user.username + ` Welcome to Andromeda, check the #server-rules`)

    guildMember.guild.channels.find(c => c.name === 'general').sendEmbed(BemVindo)
});

//Mensagem de adeus quando o usuário sai.
client.on('guildMemberRemove', (guildMember) => {
    var Adeus = new Discord.RichEmbed()
        .setTitle("LEAVE")
        .setThumbnail(guildMember.user.avatarURL)
        .setDescription('Awwww, ' + guildMember.user.username + '. Left Andromeda.')

    guildMember.guild.channels.find(c => c.name === 'general').sendEmbed(Adeus)
});


//Login do BOT
client.login(config.token)