const
    discord = require("discord.js");

/**
 *
 * @description This function serves to create a discord client with the correct intents and presence data
 * @param {string} msg The custom status the bot will display
 * @param {discord.ActivityType} type The type (watching, playing, etc)
 * @param {discord.PresenceStatusData} status Dnd, invis, etc.
 * @returns {discord.Client}
 *
 */
function makeClient (type, msg, status) {
    let intents = discord.Intents.FLAGS;
    let client = new discord.Client({
        intents: [
            intents.DIRECT_MESSAGES,
            intents.GUILDS,
            intents.GUILD_MESSAGES,
            intents.GUILD_MESSAGE_REACTIONS,
            intents.GUILD_MEMBERS
        ],

        presence: {
            status,
            activities: [
                {
                    name: msg,
                    type: ` ${type}`
                }
            ]
        },

        allowedMentions: {parse: ["roles", "everyone", "users"]}
    });

    return client;
}

module.exports = makeClient;