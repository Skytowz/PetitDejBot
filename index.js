const { Client, Collection, GatewayIntentBits,  REST, Routes, ApplicationCommand, ContextMenuCommandBuilder, ApplicationCommandType } = require('discord.js');
const fs = require('fs');
const SlashCommand = require('./utils/slashCommand');
require('dotenv').config();


const rest = new REST({ version: '10' }).setToken(process.env.ENV == "DEV" ? process.env.TOKEN_DEV : process.env.TOKEN);


const client = new Client({ intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.DirectMessages,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.GuildEmojisAndStickers,
    GatewayIntentBits.GuildMessageReactions,
    GatewayIntentBits.MessageContent,
    GatewayIntentBits.GuildVoiceStates
]});

Array.prototype.sample = function(){
    if(this.length == 1) return this[0];
    return this[Math.floor(Math.random()*this.length)];
}

client.on("rateLimit", data => {
    if (data.timeout > 1000) process.kill(1)
})


if(process.env.ENV == "DEV"){
    client.login(process.env.TOKEN_DEV);
}else if(process.env.ENV == "PROD"){
    client.login(process.env.TOKEN);
}

client.commands = new Collection();

const commands = [];

// const appCommand = new ContextMenuCommandBuilder().setName('chad').setType(ApplicationCommandType.Message);
// 
// commands.push(appCommand);

const addList = (name,commande, object)  => {
    if(!commande.help.noHelp || object) {
        client.commands.set(name, commande);
        if(commande.help.slash || object?.slash){
            commands.push(new SlashCommand()
                .setName(name)
                .setDescription(object?.help ?? commande.help.help)
                .setOption(commande.help.args ?? []))
        }
        if(commande.help.user || object?.user){
            commands.push( new ContextMenuCommandBuilder()
                .setName(name)
                .setType(ApplicationCommandType.User))
        }
        if(commande.help.message || object?.message){
            commands.push( new ContextMenuCommandBuilder()
                .setName(name)
                .setType(ApplicationCommandType.Message))
        }
    }
}
(async () => {
    fs.readdir("./Commandes/", async(error,f) => {
        //Recupération des commandes classiques
        const commandes = f.filter(f => f.split(".").pop() === "js");
        if(commandes.length <= 0) return console.log("Aucune commande classique trouvé");
        commandes.forEach((f) => {
            const commande = require(`./Commandes/${f}`);
            if(typeof commande.help.name == "object") commande.help.name.forEach((name) => addList(name,commande))
            else addList(commande.help.name,commande);    
        });

        //Initialisation des commandes dans l'
        try {
            console.log('Started refreshing application (/) commands.');
            await rest.put(Routes.applicationCommands(process.env.ENV=="DEV"?process.env.APP_ID_DEV:process.env.APP_ID), { body: commands });
            console.log('Successfully reloaded application (/) commands.');
        } catch (error) {
            console.error(error);
        }
    });
  })();



fs.readdir("./Events/", (error, f) => {
    if(error) console.log(error);
    console.log(`${f.length} events en chargement`);

    f.forEach((f) =>{
        const events = require(`./Events/${f}`);
        const event = f.split(".")[0];

    client.on(event, events.bind(null, client));
    })
})