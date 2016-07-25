let Discord = require("discord.js");
let fs = require("fs");
let bot = new Discord.Client();

let user, password;

let artificialIntelligenceResponses = [ //Intelligent responses to any kind of question
    "Hmm.",
    "Yes.",
    "Interesting.",
    "I don't think so.",
    "Maybe.",
    "Who knows."
];

try {
    let token = fs.readFileSync("token.txt", {encoding: 'ascii'});
    //File exists
    runBot(token);

} catch(err) {
    console.log(err);
}

function runBot(token) {
    bot.loginWithToken(token, (err, token) => {
        if (err) {
            console.log("Logging error: " + err);
            process.exit(1);
        }
        console.log("Logging succesful!")
    });

    bot.on("message", (msg) => {
        if ((msg.server === null /*Direct message*/) || (msg.isMentioned(bot.user) && msg.author.id !== bot.user.id /*Mentioned*/)) {
            console.log("Pinged by " + msg.author.name);
            let response = generateAdvancedArtificialIntelligenceResponse();
            console.log("Response: " + response);
            msg.reply(response, (err) => {
                if (err)
                    console.log(err);
            });
        }
    });
}

function generateAdvancedArtificialIntelligenceResponse() {
    //Generate an advanced artifical intelligence response to any kind of question
    return artificialIntelligenceResponses[Math.floor(Math.random() * artificialIntelligenceResponses.length)];
}
