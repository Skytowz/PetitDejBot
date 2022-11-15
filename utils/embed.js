const { Colors } = require("discord.js");

module.exports = class Embed{

    type = "rich"
    title;
    color;
    description;
    fields=[];
    thumbnail;
    footer;
    image;
    author;
    url;

    setTitle(title){
        this.title=title;
        return this;
    }

    setDescription(description){
        this.description = description;
        return this;
    }

    setColor(color){
        this.color=color;
        return this;
    }
    
    addField(title,description){
        this.fields.push({name:title,value:description,inline:false});
        return this;
    }

    addFields(values){
        this.fields.push(...values);
        return this;
    }
    
    setThumbnail(image){
        this.thumbnail = {url:image};
        return this;
    }

    setFooter(text){
        this.footer = {text:text};
        return this;
    }

    setImage(url,height = 100,width = 100){
        this.image = {
            url:url,
            height:height,
            width:width
        };
        return this;
    }
    setVideo(url,height = 100,width = 100){
        this.video = {
            url:url,
            height:height,
            width:width
        };
        return this;
    }

    setAuthor(user){
        this.author = {
            name: user.username,
            iconURL: user.avatarURL(),
        }
        return this;
    }
    
    setAuthorNameUrl(name,url){
        this.author = {
            name:name,
            url: url,
        }
        return this;
    }

    setUrl(url){
        this.url = url;
        return this;
    }
}