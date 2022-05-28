const
    chalk = require("chalk");

/**
 * @description Fancy, easy logging to the console.
 */
class stat {

    /**
     * @param {Object} cmd The command that this instance of stat should use
     */
    constructor (cmd) {
        this.active = cmd;
    }

    /**
     * @description This method will update the console
     * @param {string} msg The message to update the console with
     */
    upd (msg) {
        console.log(chalk.greenBright(`[${this.active}] ${msg}`));
    }

    /**
     * @description This method will send an error msg to the console
     * @param {string} msg The message to send to the console as an error
     */
    error (msg) {
        console.log(chalk.redBright(`[${this.active}] ${msg}`));
    }
}

module.exports = stat;