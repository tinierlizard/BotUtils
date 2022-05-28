const
    discord = require("discord.js"),
    storage = require("../Functions/ManageStorage"),
    embed = require('../Functions/Embed');

class Logger {

    constructor (channelId, client) {
        let server = client.guilds.fetch(storage('def', 'read', 'serverid'));
        this.channel = server.channels.fetch(channelId);
    }

    /**
     * 
     * @param {discord.CommandInteraction} int 
     * @param {string} title 
     * @param {string} desc 
     * @param {Array<discord.EmbedFieldData>} fields 
     */
    async log(int, title, desc, fields){
        let e = embed(int, title, desc, [255,255,0], fields, 'empty');
        await this.channel.send({embeds: [e], ephemeral: true});
    }

}

module.exports = Logger;