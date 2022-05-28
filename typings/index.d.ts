import { ActivityType, ApplicationCommandData, ApplicationCommandOptionData, ButtonInteraction, Client, CommandInteraction, ContextMenuInteraction, EmbedFieldData, Interaction, MessageEmbed, PresenceStatusData } from "discord.js";

// Types \\
interface CommandPermissionData {
    id: string,
    type: 'USER' | 'ROLE',
    permission: boolean
}

interface EmbedData {
    title: string,
    description: string,
    footer?: string,
    fields?: Array<EmbedFieldData>,
    color: Array<number> | "RED" | "YELLOW" | "GREEN"
}

export interface Command{
    name: string,
    /** Optional if type == 'CTX-*' */
    description?: string,
    type: 'NRML' | 'CTX-USR' | 'CTX-MSG',
    defaultPermission: boolean,
    /** Optional if defaultPermission == 'true' */
    permissions?: Array<CommandPermissionData>,
    options?: Array<ApplicationCommandOptionData>,
    enabled: boolean,
    execute(interaction : CommandInteraction | ContextMenuInteraction | ButtonInteraction, client : Client):null
}

// Classes \\
/** A class to handle logging commands to a certain channel in the server */
export class CommandLogger {
    /**
     * @param {string} channelId The ID of the log channel to send these logs to
     * @param {discord.Client} client The Bot's client
     */
    constructor(channelId: string, client: Client):Promise<null>

    log(int: CommandInteraction, title: string, desc: string, fields: Array<EmbedFieldData>):Promise<null>
}

/** A class to handle status updates in the terminal. */
export class Status {
    /**
     * @param {Object} cmd The command that this instance of stat should use (just use 'this')
     */
    constructor (cmd:CommandInteraction)
    /**
     * @description This method will update the console
     * @param {string} msg The message to update the console with
     */
    upd(msg: string):null
    /**
     * @description This method will send an error msg to the console
     * @param {string} msg The message to send to the console as an error
     */
    error(msg: string):null
}

// Functions \\
/**
 * A function to send the initial start message in the terminal.
 * @param client The Discord bot client
 * @param title The title to be printed at the beginning of the message
 * @param botVer The version this instance of the bot is on
 */
export function BotMessage(client: Client, title: string, botVer: string):null;

/**
 * This function serves to create slash commands from a directory of command files
 * @param {discord.Client} client
 * @param {string} directory
 */
export function CreateSlashes(client: Client, directory: string):Promise<Array<ApplicationCommandData>>;

/**
 * Using the provided parameters, this function makes a new discord embed and then returns it
 * @param {discord.CommandInteraction} int The command interaction from someone running the command
 * @param {EmbedData} options - An array of options for the embed
 */
export function Embed(int: CommandInteraction, options: EmbedData):MessageEmbed;

/**
 * Get the value of an option from some interaction
 * @param {disc.CommandInteraction} int 
 * @param {string} name The name of the option to find 
 */
export function GetOption(int: CommandInteraction, name: string):any;

/**
 * This function serves to create a discord client with the correct intents and presence data
 * @param {string} msg The custom status the bot will display
 * @param {discord.ActivityType} type The type (watching, playing, etc)
 * @param {discord.PresenceStatusData} status Dnd, invis, etc.
 * @returns {discord.Client}
 */
export function MakeClient(msg: string, type: ActivityType, status: PresenceStatusData):Client;

/**
 * Allows reading/writing from/to the bot's storage
 * @arg path The path for the storage json. 'def' = 'store.json'
 * @arg type Will this access be to read or write data
 * @arg index The index of the data being accessed
 * @arg val The value to write to the specified index, if writing data.
 */
export function Storage(path: string, type: 'read' | 'write', index: string, val?: string):any;

/**
 * Prompts the given user some questions, gets responses, and returns them.
 * @arg int The interaction of the command ran, needed to DM the user.
 * @arg questions An array of questions to ask the user
 * @returns User responses
 */
export function Prompt(int: CommandInteraction, questions: Array<string>):Array<string>;

/**
 * Updates commands and their given permissions.
 * @arg client The bot's client
 * @arg dir The directory for the commands folder
 */
export function Update(client: Client, dir: string):Promise<string>;

/**
 * 
 * @param defPerm The command's default permission
 * @param interaction The command interaction associated with this permission check
 * @param Perms An array of permission data
 */
export function PermCheck(defPerm: boolean, interaction: Interaction, Perms?:Array<CommandPermissionData>):boolean;