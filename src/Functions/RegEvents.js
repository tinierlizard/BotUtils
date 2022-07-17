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
        console.log(directory);
        let files = fs.readdirSync(directory);

        for (let file of files){
            console.log(file);
            let event = reacquire(file);
            console.log(event);
            if (event.enabled){
                event.execute(client);
            }
        }
        
        res(true);
    })
}

module.exports = RegEvents;