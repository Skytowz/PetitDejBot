const Discord = require("discord.js");
module.exports.run = async(client, message, args) =>{        
     
    await message.channel.send(`<@${message.author.id}> doit le petit dej!`)

};
module.exports.help = {
    name:"dej",
    cmd:"&dej",
    help:"Dit qui doit ramener le petit dej"
}
