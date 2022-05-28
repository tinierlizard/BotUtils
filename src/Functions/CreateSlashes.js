const
    fs = require("fs"),
    path = require("path"),
    discord = require("discord.js"),
    Storage = require("../Functions/ManageStorage");

// Create reacquire function in order to reload commands to take into account new commands and/or new permissions
function reacquire (mod) {
    delete require.cache[require.resolve(mod)];
    return require(mod);
}

/**
 *
 * @description This function serves to create slash commands from a directory of command files
 * @param {discord.Client} client
 * @param {string} directory
 *
 */

async function CreateSlashes (client, directory) {
    return new Promise(async (res)=>{
        directory = path.resolve(directory);
        let files = fs.readdirSync(directory);
        let
            toRet = [],
            inner = [],
            toAdd = {};
        client.commands = new discord.Collection();

        for (let file of files) {
            let command = reacquire(`${directory}/${file}`);
            toAdd = {};
            if (command.enabled){
                switch(command.type){
                    case 'NRML':
                        /** @type {discord.ApplicationCommandData} */
                        toAdd = {
                            name: command.name,
                            description: command.description,
                            type: 'CHAT_INPUT',
                            options: command.options || [],
                            defaultPermission: command.defaultPermission
                        };
                        break
                    case 'CTX-USR':
                        /** @type {discord.ApplicationCommandData} */
                        toAdd = {
                            name: command.name,
                            description: null,
                            type: 'USER',
                            defaultPermission: command.defaultPermission
                        };
                        break
                    case 'CTX-MSG':
                        /** @type {discord.ApplicationCommandData} */
                        toAdd = {
                            name: command.name,
                            description: null,
                            type: 'MESSAGE',
                            defaultPermission: command.defaultPermission
                        };
                        break
                }
    
                client.commands.set(command.name, command.execute);
                toRet.push(toAdd);
                if (command.defaultPermission == false){
                    toAdd.permissions = command.permissions;
                }
                inner.push(toAdd);
            }
        }
        
        await client.application.commands.set(toRet, (client.isDev) ? (Storage("def", "read", "devserverid")) : (Storage("def", "read", "serverid")));
        res(inner);
    });
}

module.exports = CreateSlashes;