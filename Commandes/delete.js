const Discord = require("discord.js");
const { isAdmin } = require("../utils/roles");
module.exports.run = async(client, interaction) =>{        
    if(!isAdmin(interaction.member) && message.author.id != 273756946308530176) return interaction.reply({content:"Tu peux pas CHEH",ephemeral:true});
    interaction.targetMessage.delete();
    interaction.reply({content:"Done",ephemeral:true})
};
module.exports.help = {
    name:"delete",
    cmd:"/delete",
    help:"[Admin] Supprime un message envoyé",
    message:true
}
