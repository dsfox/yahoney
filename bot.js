var YaHoneyBot = require("node-telegram-bot-api");
var fs = require("fs");
var token = fs.readFileSync("token.key");
var botOptions = {
    polling: true
};
var bot = new YaHoneyBot(token, botOptions);
bot.getMe().then(function(me) {
    console.log("Hello! My name is %s!", me.first_name);
    console.log("My id is %s.", me.id);
    console.log("And my username is @%s.", me.username);
});
bot.on("text", function(msg) {
    var messageChatId = msg.chat.id;
    var messageText = msg.text;
    var messageDate = msg.date;
    var messageUsr = msg.from.username;

    if (messageText === "/test") {
        sendMessageByBot(messageChatId, "мёду ннннада?");
    }
    console.log(msg);
});

function sendMessageByBot(aChatId, aMessage) {
    bot.sendMessage(aChatId, aMessage);
}