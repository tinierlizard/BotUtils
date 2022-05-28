const discord = require("discord.js");

function getFooter(int, footer){
    if (footer){
        if (footer == 'empty'){
            return ""
        } else {
            return footer
        }
    } else {
        return `Requested by: ${int.user.tag} | ${int.user.id}`
    }
}

function getColor(color){
    if (color == 'RED'){
        return [255,0,0]
    } else if (color == 'GREEN'){
        return [0,255,0]
    } else if (color == 'YELLOW'){
        return [255,255,0]
    } else if (color && typeof(color) == Array){
        return color
    }
}

function makeEmbed (int, options) {
    let embed = new discord.MessageEmbed({
        title: options.title,
        description: options.description,
        fields: options.fields || [],
    });
    embed.setColor(getColor(options.color));
    embed.setFooter({text: getFooter(int, options.footer)});

    return embed;
}

module.exports = makeEmbed;