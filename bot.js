const FILE_ORDERS = "orders.json";
const FILE_TOKEN = "token.key";
const FILE_CHAT_STATES = "chatstates.json";
const FILE_BLACKLIST = "blacklist.json";

const CHAT_STATE_ORDER = "order";
const CHAT_STATE_LOGIN = "yandexlogin";
const CHAT_STATE_NAME = "username";

const ORDER_STATE_DEFAULT = "Мёд еще в ульях, идут напряженные переговоры с пчелиными профсоюзами."; //#1
const ORDER_STATE_START = "Идут бои за рамки с сотами, мёд выкачивается, пчелы кусаются, с нашей стороны пока без потерь."; //#2
const ORDER_STATE_INPROGRESS = "Рамки уже отобраны и ждут погрузки, мёд разливается по банкам."; //#3
const ORDER_STATE_DELIVERY_START = "Всё упаковано и аккуратно разложено в багажнике. Завтра мёд поедет в Москву."; //#4
const ORDER_STATE_DELIVERY_M4 = "Ваш мёд несется по трассе М4 в багажнике машины"; //#5
const ORDER_STATE_DELIVERY_FINISH = "Мёд в Москве. В ближайшие рабочие дни будет в офисе"; //#6
const ORDER_STATE_DONE = "Мёд приехал. Проверьте рабочую почту, dsfox@ наверняка уже написал Вам письмо."; //#7

const ERROR_NO_ORDERS = "У Вас нет заказов. Чтобы сдалть заказ напишите мне /order"
    //const ERROR_NO_APPROVE = "Ваш заказ принят, но еще не подтвержден. Если что-то пойдет не так я напишу Вам"
const ERROR_DDOS = "Похоже, что Вы - робот или человек, который пытается заспамить меня. Придется Вас забанить :(";
const ERROR_BANNED = "Вы забанены :("

const TEXT_TEST = "мёду ннннада?";
const TEXT_QUEST_LOGIN = "Напишите Ваш логин на @yandex-team";
const TEXT_QUEST_NAME = "Ok. А как Вас зовут?";
const TEXT_START_ORDER = ", сколько литров и в каких банках? Если нужен мёд в сотах, то сколько рамок?";
const TEXT_ORDER_SUCCESS = "Спасибо за заказ. Я напишу Вам когда мёд будет в офисе. Если хотите подписаться на уведомления о процессе доставки - напишите мне /track, отписаться - /untrack"
const TEXT_WELCOME = "Привет! Я простой медовый бот. Умею принимать заказы на мёд в сотах и в банках, уведомлять Вас, когда он будет в офисе.\nДля общения со мной используйте команды:\n/start - Простыня, которую вы сейчас читаете\n/order - Диалог заказа.. У вас может быть только один активный заказ (per Telegram account). Если вы решили заказать еще - пишите еще раз /order с указанием всего, что Вам нужно\n/track - если у Вас уже есть заказ, то после этой комманды Вы будете получать в чатик информацию вроде «Ваш мёд выкачан», «Ваш мёд выехал в Москву» и т.п.\n/untrack - не будете получать никаких сообщений пока мёд не приедет в офис (default)\n/status - ну где там мой мёд?\n/info - Немного информации про мёд и пасеку\n/view - Посмотреть ваш текущий заказ\n/reset - удаляются все Ваши заказы, стирается вся история нашего общения\n";
const TEXT_INFO = "Вы можете заказывать мёд в 1л-1.5л-2л-3л-банках. Стоимость 1л - 600р. Вы так же можете заказать рамку с сотами. Как правило, в полной рамке около 3л мёда ± 0.5л. Поэтому стоимость рамки - 1800р. Рамка вручается в целофановом пакете. Хранить её лучше в холодильнике. Мёд не портится, но очень привлекает всяких насекомых, в первую очередь ос и пчёл.\nПасека, мёд с которой вы заказываете, находится здесь - https://yandex.ru/maps/-/CVTuJQ0u\nМёд пчёлы таскают с полевых цветов и близлежащих полей, на которых каждый год растут рандомные культурные растения. Мёд, выкачанный в июне - менее вязкий, более прозрачный, хуже кристаллизуется и пахнет пыльцой цветов. Августовский мёд более плотный, тёмный и быстрее начинает кристаллизоваться, даже при комнатной температуре.";
const TEXT_TRACK = "Вы подписались на уведомления.";
const TEXT_UNTRACK = "Вы отписались от уведомлений.";
const TEXT_RESET_COMPLETE = "Ваш заказ «%HONEY%» успешно удален. У Вас сейчас нет заказов.";
const TEXT_ADMIN_INFO = "/raw - вся база заказов в JSON\n/list - список заказов со статусами\n/new - новые (неподтвержденные заказы)\n/orders - список подтвержденных заказов\n/setstatus - обновить статус для всех заказов. Число от 1 до 7 или 0, чтобы ввести свою фразу\n/approve - подтверждение заказа\n/note - добавить комментарий к заказу\n/message - отправить личное сообщение\n/open - открытие сессии приема заказов\n/close - закрытие сесии приема заказов\n/end - прием заказов закончен. Будет показываться дефолтное сообщение\n/endmessage - установка произвольного сообщения в случае, когда прием заказов окончен";

const ADMIN = "dsfox";
const ADMIN_ID = 104410529;

var YaHoneyBot = require("node-telegram-bot-api");
var fs = require("fs");

var token = fs.existsSync(FILE_TOKEN) ? fs.readFileSync(FILE_TOKEN) : null;
var orders = fs.existsSync(FILE_ORDERS) ? JSON.parse(fs.readFileSync(FILE_ORDERS)) : {};
var chatStates = fs.existsSync(FILE_CHAT_STATES) ? JSON.parse(fs.readFileSync(FILE_CHAT_STATES)) : {};
var blaklist = fs.existsSync(FILE_BLACKLIST) ? JSON.parse(fs.readFileSync(FILE_BLACKLIST)) : {};

var ddosUsers = {};
var ddosRange = 1000; //time between messages, in ms
var ddosPlank = 8; //messages in a row
var banPeriod = 1000 * 60 * 60 * 2; //2 hours

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
    var lastUser = null;
    var lastDate = 0;

    //banned check
    Object.keys(blacklist).forEach(function(user) {
        if (user === messageUsr) {
            if ((messageDate - blacklist[user]) > banPeriod) {
                delete blaklist[messageUsr];
                //yep! no flush
            } else {
                answer(messageChatId, ERROR_BANNED);
                return;
            }
        }
    })

    //ddos check
    if (messageUsr === lastUser) {
        if ((messageDate - lastDate) < ddosRange) {
            if (!ddosUsers[messageUsr]) {
                ddosUsers[messageUsr] = ddosPlank;
            } else {
                ddosUsers[messageUsr]--;
                if (ddosUsers[messageUsr] <= 0) {
                    answer(messageChatId, ERROR_DDOS);
                    blaklist[messageUsr] = messageDate;
                    flush();
                }
            }
        } else if (ddosUsers[messageUsr]) {
            delete ddosUsers[messageUsr];
        }
    }

    //handle open user conversations
    if (typeof chatStates[messageUsr] === "string" && messageText.indexOf('/') != 0) {
        if (chatStates[messageUsr] === CHAT_STATE_LOGIN) {
            var order = {
                "telegramUsername": messageUsr,
                "orderId": messageDate,
                "yandexLogin": messageText,
                "state": ORDER_STATE_DEFAULT,
                "approved": false,
                "timestamp": messageDate,
                "laststamp": messageDate,
                "realName": null,
                "text": null,
                "note": null
            };
            orders[messageUsr] = order;
            chatStates[messageUsr] = CHAT_STATE_NAME;
            answer(messageChatId, TEXT_QUEST_NAME);
        } else if (chatStates[messageUsr] === CHAT_STATE_NAME) {
            var realName = messageText.charAt(0).toUpperCase() + messageText.substr(1);
            orders[messageUsr].realName = realName;
            orders[messageUsr].laststamp = messageDate;
            chatStates[messageUsr] = CHAT_STATE_ORDER;
            answer(messageChatId, realName + TEXT_START_ORDER);
        } else if (chatStates[messageUsr] === CHAT_STATE_ORDER) {
            orders[messageUsr].text = messageText;
            orders[messageUsr].laststamp = messageDate;
            delete chatStates[messageUsr];
            answer(messageChatId, TEXT_ORDER_SUCCESS);
            flush();
        }
    }

    if (messageUsr !== ADMIN) { //handle new user commands
        if (messageText === "/start") {
            answer(messageChatId, TEXT_WELCOME);
        } else if (messageText === "/test") {
            answer(messageChatId, TEXT_TEST);
        } else if (messageText === "/order") {
            chatStates[messageUsr] = CHAT_STATE_LOGIN;
            answer(messageChatId, TEXT_QUEST_LOGIN);
        } else if (messageText === "/track" || messageText === "/untrack") {
            if (orders[messageUsr]) {
                var enable = messageText === "/track";
                Object.keys(orders).forEach(function(order) {
                    if (order === messageUsr) {
                        order.track = enable;
                        answer(messageChatId, enable ? TEXT_TRACK : TEXT_UNTRACK);
                    }
                });
            } else {
                answer(messageChatId, ERROR_NO_ORDERS);
            }
        } else if (messageText === "/status") {
            if (orders[messageUsr]) {
                answer(messageChatId, orders[messageUsr].status);
            } else {
                answer(messageChatId, ERROR_NO_ORDERS);
            }
        } else if (messageText === "/info") {
            answer(messageChatId, TEXT_INFO);
        } else if (messageText === "/view") {
            if (orders[messageUsr]) {
                answer(messageChatId, orders[messageUsr].text);
            } else {
                answer(messageChatId, ERROR_NO_ORDERS);
            }
        } else if (messageText === "/reset") {
            if (orders[messageUsr]) {
                answer(messageChatId, TEXT_RESET_COMPLETE.replace("%HONEY%", orders[messageUsr].text));
                delete orders[messageUsr];
                flush();
            } else {
                answer(messageChatId, ERROR_NO_ORDERS);
            }
        }
    } else if(messageChatId === ADMIN_ID){ //handle ADMIN commands
        if (messageText === "/info") {

        }
    } else {
        answer(messageChatId, "Congratulations! Easter egg found. Take a cake!");
    }
    lastUser = messageUsr;
    lastDate = messageDate;

    console.log(msg);
});

function flush() {
    fs.writeFile(FILE_ORDERS, JSON.stringify(orders), function(err) {
        if (err) {
            return console.log(err)
        }
    });
    fs.writeFile(FILE_CHAT_STATES, JSON.stringify(chatStates), function(err) {
        if (err) {
            return console.log(err)
        }
    });
}

function answer(aChatId, aMessage) {
    bot.sendMessage(aChatId, aMessage);
}