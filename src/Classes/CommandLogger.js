const
    discord = require("discord.js"),
    storage = require("../Functions/ManageStorage"),
    embed = require('../Functions/Embed');

class Logger {

    constructor () {
    }

    init(channelId, int, client){
        return new Promise(async (res, err) => {
            let server = int.guild;
            this.channel = await server.channels.fetch(channelId);
            this.client = client;
            
            res(this)
        })
    }

    /**
     * 
     * @param {discord.CommandInteraction} int 
     * @param {string} title 
     * @param {string} desc 
     * @param {Array<discord.EmbedFieldData>} fields 
     */
    async log(int, title, desc, fields){
        // let e = embed(int, title, desc, [255,255,0], fields, 'empty');
        let e = embed(int, {
            title: title,
            description: desc,
            fields: fields,
            color: this.client.defaultColor,
            footer: 'empty'

        })
        await this.channel.send({embeds: [e], ephemeral: true});
    }

}

module.exports = Logger;