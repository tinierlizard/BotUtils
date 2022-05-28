const discord = require("discord.js");

/**
 * @description Using the provided parameters, this function makes a new discord embed and then returns it
 * @param {discord.CommandInteraction} int The command interaction from someone running the command
 * @param {string} title Some title for the embed
 * @param {string} desc Some description for the embed
 * @param {Array<int>} color OPTIONAL - An array with three values, R, G, and B
 * @param {Array<discord.EmbedFieldData} fields OPTIONAL - An array of fields to be added to your embed
 * @param {string} footer OPTIONAL - Some string to put at the bottom of your message
 * @returns {discord.MessageEmbed}
 */
function makeEmbed (int, title, desc, color, fields, footer) {
    let embed = new discord.MessageEmbed({
        title: title,
        description: desc,
        color: color || [133, 231, 255],
        fields: fields || [],
        footer: (footer && footer != 'empty') ? (footer) : (`Requested by: ${int.user.tag} | ${int.user.id}`)
    })

    return embed;
}

module.exports = makeEmbed;