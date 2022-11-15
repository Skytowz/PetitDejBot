const { Colors } = require("discord.js");
const fs = require("fs");
const Embed = require("../utils/embed");
module.exports.run = async(client, interaction) =>{        
    const help = new Embed()
        .setColor(Colors.DarkPurple)
        .setTitle('Help')
        .setThumbnail("https://cdn.discordapp.com/attachments/683663363653238794/685227026617073719/cry.gif");
    await fs.readdir("./Commandes/",(error,f) => {
        if(error) console.log(error);
        const fun = f.filter(f => f.split(".").pop() === "js"); 
        fun.forEach(v => {
            const commande = require(`./${v}`);
            help.addField(commande.help.cmd,"> "+commande.help.help);
            //console.log(commande.help.cmd,commande.help.help);
        })
        interaction.reply({embeds:[help]});
    });

};
module.exports.help = {
    name:"help",
    cmd:'/help',
    help:"Appelle l'aide",
    slash:true
}
