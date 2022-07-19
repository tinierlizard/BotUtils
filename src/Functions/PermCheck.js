const { CommandInteraction } = require("discord.js");

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

    return new Promise((res, rej) => {
        for (permData of Perms){
            switch(permData.type){
                case 'USER':
                    if (interaction.user.id == permData.id) {
                        res( permData.permission )
                    };
                break;
                case 'ROLE':
                    let roles = interaction.member.roles.cache.map(role=>role);
                    roles.forEach(role => {
                        if (role.id == permData.id) {
                            res( permData.permission )
                        };
                    });
                break;
            }
        }
        res( false )
    });
}

module.exports = check;