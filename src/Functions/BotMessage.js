/* eslint-disable no-unused-vars */

// Constants
const
    figlet = require("figlet"),
    {log} = console,
    print = function (color, str) {
        console.log(color(str));
    },
    discord = require("discord.js");

// Imports
const chalk = require("chalk");

/**
 *
 * @param {discord.Client} client The Discord bot client
 * @param {string} title The title to be printed at the beginning of the message
 * @param {string} botVer The version this instance of the bot is on
 *
 */

function BotMessage (client, title, botVer) {
    let c = client.user.createdAt;

    figlet(title, (e, d)=>{
        // Header (97, 232, 0)
        print(chalk.greenBright, d);

        // Divider
        log();
        print(chalk.redBright, "-------------------------------------------");
        log();

        // Bot related information
        print(chalk.cyan, `• Username             : ${client.user.tag}`);
        print(chalk.cyan, `• ID                   : ${client.user.id}`);
        print(chalk.cyan, `• Creation Date        : ${c.getMonth() + 1}/${c.getDate()}/${c.getFullYear()} | ${c.getHours()}${c.getMinutes()} MST`);

        // Divider
        log();
        print(chalk.redBright, "-------------------------------------------");
        log();

        // Actual Usage
        print(chalk.greenBright, `${title} online and ready.`);
        log("");
    });
}

module.exports = BotMessage;