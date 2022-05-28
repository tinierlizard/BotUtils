const discord = require("discord.js");
const createEmbed = require("./Embed");

/**
 * @param {discord.CommandInteraction} int
 * @param {Array<string>} questions Questions to ask the user
 * @returns {Array<string>} The responses
 */
async function Prompt (int, questions) {
    
    // eslint-disable-next-line no-async-promise-executor
    return new Promise(async (res)=>{
        let repeat = true;
        async function Question (e, channel, quesCount) {
            await channel.send({embeds: [
                createEmbed(int, `Question: ${quesCount}`, e)
            ]});
            let response;
            await channel.awaitMessages({max: 1, time: 300000, errors: ["time"]}).then(collected => {
                response = collected.first().content;
            }).catch(collected => {
                response = "[NO RESPONSE - TIMEOUT]";
            });
    
            return response;
        }

        /**
         * 
         * @param {discord.DMChannel} channel 
         */
        async function GetClarification (responses, channel){
            return new Promise(async (res)=>{
                let embed = createEmbed(
                    int, 
                    "Look good?",
                    "These are the responses we collected, look good to you?"
                );
    
                for (let index in responses){
                    embed.addField(questions[index], responses[index]);
                }
    
                await channel.send({
                    embeds: [
                        embed
                    ],
                    components: [
                        new discord.MessageActionRow()
                            .addComponents(
                                new discord.MessageButton()
                                    .setCustomId("clarificationConfirm")
                                    .setLabel("Looks good!")
                                    .setStyle("SUCCESS"),
                                new discord.MessageButton()
                                    .setCustomId("clarificationDeny")
                                    .setLabel("Redo!")
                                    .setStyle("DANGER")
                            )
                    ]
                });

                let collector = channel.createMessageComponentCollector({time: 120000, max: 1});

                collector.on("collect", async i => {
                    if (i.customId === "clarificationConfirm"){
                        repeat = false;
                        i.update({
                            embeds:[
                                createEmbed(
                                    int,
                                    "Success",
                                    "Alright, I'll send your responses where they need to be sent! Have a good day!",
                                    [0,255,0]
                                )
                            ],
                            components: []
                        });

                        embed.setTitle("Psst...");
                        embed.setDescription("Here's a copy of the answers we collected, so you have 'em!");

                        await channel.send({embeds: [embed]});

                        res();
                    } else if (i.customId === "clarificationDeny") {
                        i.update({
                            embeds:[
                                createEmbed(
                                    int,
                                    "Failed",
                                    "Alright, I'll help you fix that! Just answer the same questions with your new answers, I'll do the rest!",
                                    [255,0,0]
                                )
                            ],
                            components: []
                        });
                        res();
                    }
                });
            });
        }

        const dm = await int.user.createDM();
        let responses = [];
        while (repeat){
            responses = [];
            for (let index in questions){
                let response = await Question(questions[index], dm, Number(index)+1);
                responses.push(response);
            }
            
            await GetClarification(responses, dm);
        }

        res(responses);
    });
}

module.exports = Prompt;