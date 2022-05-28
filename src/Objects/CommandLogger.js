const
    discord = require("discord.js"),
    storage = require("../Functions/ManageStorage"),
    embed = require('../Functions/Embed');

class Logger {

    constructor () {}

    /**
     * @param {string} channelId The ID of the log channel to send these logs to
     * @param {discord.Client} client The Bot's client
     */
    init (channelId, client) {
        // eslint-disable-next-line no-async-promise-executor
        return new Promise(async (res)=>{
            let server = await client.guilds.fetch(storage('def', 'read', 'serverid'));
            this.channel = await server.channels.fetch(channelId);

            res();
        });
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