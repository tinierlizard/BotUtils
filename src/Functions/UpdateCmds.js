const  
    discord = require('discord.js'),
    createSlashes = require('./CreateSlashes');

/**
 * 
 * @param {discord.Client} client 
 * @param {*} dir 
 * @returns 
 */
async function UpdPerms(client, dir){
    return new Promise(async (res)=>{
        await createSlashes(client, dir);
        res(true);
    });
}

module.exports = UpdPerms;