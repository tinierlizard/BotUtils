const { CommandInteraction } = require("discord.js");

/**
 *
 * @param {boolean} defPerm The command's default permission (cmd.defaultPermission)
 * @param {Array} Perms OPTIONAL - An array of permission data
 * @param {CommandInteraction} interaction The command's interaction 
 * 
*/
function check (defPerm, interaction, Perms=[]) {
    return new Promise((res, rej) => {
        if (defPerm) return true;
        if (Perms.length < 1) return false;

        for (permData of Perms){
            console.log(permData);
            switch(permData.type){
                case 'USER':
                    console.log('in user');
                    if (interaction.user.id == permData.id) {
                        console.log('returning');
                        res( permData.permission )
                    };
                break;
                case 'ROLE':
                    console.log('in role');
                    let roles = interaction.member.roles.cache.map(role=>role);
                    roles.forEach(role => {
                        if (role.id == permData.id) {
                            res( permData.permission )
                        };
                    });
                break;
            }
        }
        console.log('returning false');
        res( false )
    });
}

module.exports = check;