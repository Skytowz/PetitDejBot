const Discord = require("discord.js");
module.exports.run = async(client, message, args) =>{        
    if(!message.member.permissions.has('ADMINISTRATOR') && message.author.id != 273756946308530176) return;
    if(!message.reference) return;
    message.channel.messages.fetch(message.reference.messageId)
    .then(message => {
        if(message.author.id != client.user.id) return;
        message.delete();
    })
    .catch(console.error);
};
module.exports.help = {
    name:"delete",
    cmd:"&delete",
    help:"[Admin] Supprime un message envoyé"
}
