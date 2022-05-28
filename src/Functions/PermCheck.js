const { CommandInteraction } = require("discord.js");
const Storage = require('./ManageStorage')

/**
 *
 * @param {boolean} defPerm The command's default permission (cmd.defaultPermission)
 * @param {Array} Perms OPTIONAL - An array of permission data
 * @param {CommandInteraction} interaction The command's interaction 
 * 
*/
function check (defPerm, interaction, Perms=[]) {
    if (defPerm) return true;
    if (Perms.length < 1) return false;

    for (permData of Perms){
        switch(permData.type){
            case 'USER':
                if (interaction.user.id == permData.id) return permData.permission;
            break;
            case 'ROLE':
                for (role of interaction.member.roles.cache.values){
                    if (role.id == permData.id) return permData.permission;
                }
            break;
        }
    }

    return false;
}

module.exports = check;