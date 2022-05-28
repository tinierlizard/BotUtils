const disc = require("discord.js");

/**
 * 
 * @param {disc.CommandInteraction} int 
 * @param {string} name The name of the option to find 
 */
function GetOption(int, name){
    let options = int.options;

    return options.data.filter(opt => opt.name === name)[0].value;
}

module.exports = GetOption;