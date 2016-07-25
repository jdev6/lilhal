let Discord = require("discord.js");
let fs = require("fs");
let read = require("read");

let bot = new Discord.Client();

let user, password;

let artificialIntelligenceResponses = ["Hmm.", "Yes.", "Interesting."]; //Intelligent responses to any kind of question

try {
    fs.statSync("login.txt");
    //File exists
    let login = fs.readFileSync("login.txt", "utf8");
    [user, password] = login.split("\n");
    runBot();

} catch(err) {
    //File doesn't exist
    read({
        prompt: "Enter your discord username/email: "
    }, (err, input) => {
        if (err) {
            console.log(err);
            process.exit(1);
        }

        user = input;
        read({
            prompt: "Enter your discord password here: ",
            silent: true
        }, (err, input) => {
            if (err) {
                console.log(err);
                process.exit(1);
            }

            password = input;
            runBot();
        });
    });
}

function runBot() {
    bot.login(user, password).then(() => {
        console.log("Logging succesful!");
    })
    .catch((err) => {
        console.log(err);
        process.exit(1);
    });

    bot.on("message", (msg) => {
        if (msg.isMentioned(bot.user) && msg.author.id !== bot.user.id) {
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