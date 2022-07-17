const
    fs = require('fs'),
    path = require('path'),
    discord = require('discord.js');

    function reacquire (a) {
        delete require.cache[require.resolve(a)];
        return require(a);
    }

/**
 * @param {discord.Client} client 
 * @param {string} directory 
 */
async function RegEvents(client, directory){
    return new Promise( res => {
        client.events = new discord.Collection();
        directory = path.resolve(directory);
        let files = fs.readdirSync(directory);

        for (let file of files){
            let event = reacquire(file);
            if (event.enabled){
                event.execute(client);
            }
        }
        
        res(true);
    })
}

module.exports = RegEvents;