const Discord = require("discord.js");
module.exports.run = async(client, interaction) =>{        
     
    await interaction.reply(`<@${interaction.user.id}> doit le petit dej!`)

};
module.exports.help = {
    name:"dej",
    cmd:"/dej",
    help:"Dit qui doit ramener le petit dej",
    slash:true
}
