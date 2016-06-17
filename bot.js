const FILE_ORDERS = "orders.json";
const FILE_TOKEN = "token.key";
const FILE_CHAT_STATES = "chatstates.json";
const FILE_SETTINGS = "settings.json";

const DEFAULT_SETTINGS = { "open": false, subscribers: {}, talks: {}, users: {} };

const CHAT_STATE_ORDER = "order";
const CHAT_STATE_REORDER = "reorder";
const CHAT_STATE_ADMIN_REORDER = "adminreorder";
const CHAT_STATE_LOGIN = "yandexlogin";
const CHAT_STATE_NAME = "username";
const CHAT_STATE_SETSTATUS_QUEST = "setstatus1";
const CHAT_STATE_SETSTATUS_CUSTOM = "setstatus2";
const CHAT_STATE_CLOSE_SEASON = "seasonclose";
const CHAT_STATE_RESET = "orderreset";

const PRIVATE_CHAT_STATE_WAIT_FOR_ANSWER = "privateanswer";

const CHAT_CONVERSATION_YES = ["y", "yes", "ok", "ок", "да", "д", "хорошо", "yep", "ага"];
const CHAT_CONVERSATION_NO = ["n", "no", "not", "нет", "не", "н", "", " ", "nope"];

const ORDER_STATE_CUSTOM = "Произвольный текст, который будет выставлен как текущий статус для всех заказов.";
const ORDER_STATE_DEFAULT = "Мёд еще в ульях, идут напряженные переговоры с пчелиными профсоюзами."; //#1
const ORDER_STATE_START = "Идут бои за рамки с сотами, мёд выкачивается, пчелы кусаются, с нашей стороны пока без потерь."; //#2
const ORDER_STATE_INPROGRESS = "Рамки уже отобраны и ждут погрузки, мёд разливается по банкам."; //#3
const ORDER_STATE_DELIVERY_START = "Всё упаковано и аккуратно разложено в багажнике. Завтра мёд поедет в Москву."; //#4
const ORDER_STATE_DELIVERY_M4 = "Ваш мёд в багажнике машины несется по трассе М4"; //#5
const ORDER_STATE_DELIVERY_FINISH = "Мёд в Москве. В ближайшие рабочие дни будет в офисе"; //#6
const ORDER_STATE_DONE = "Мёд приехал. Проверьте рабочую почту, dsfox@ наверняка уже написал Вам письмо."; //#7
const orderSates = [ORDER_STATE_CUSTOM, ORDER_STATE_DEFAULT, ORDER_STATE_START, ORDER_STATE_INPROGRESS, ORDER_STATE_DELIVERY_START, ORDER_STATE_INPROGRESS, ORDER_STATE_DELIVERY_START, ORDER_STATE_DELIVERY_M4, ORDER_STATE_DELIVERY_FINISH, ORDER_STATE_DONE];

const ERROR_NO_ORDERS = "У Вас нет заказов. Чтобы сделать заказ напишите мне /order"
const ERROR_SETSTATUS_QUEST = "Нет такого статуса, давай попробуем еще раз.";
const ERROR_YID_NOT_FOUND = "Никаких заказов от %s не поступало :(";
const ERROR_APROOVE_NOTE = "Заказ %s найден, но к нему нет никакой заметки :( Давай попробуем еще раз.";
const ERROR_DIRECT_MESSAGE_SENT = "Заказ %s найден, но что-то не так с сообщением :( Давай попробуем еще раз.";
const ERROR_OPEN_SEASON = "Сезон приема заказов уже открыт.";
const ERROR_CLOSE_SEASON = "Сезон приема заказов уже закрыт.";
const ERROR_EMPTY_LIST = "Список пуст :(";
const ERROR_SEASON_CLOSED = "Сезон приема закзазов закрыт. Вы можете подписаться на открытие сезона - /subscribe или связаться с dsfox@ чтобы узнать подробности.";
const ERROR_SUBSCRIBE = "Вы уже подписаны на уведомления.";
const ERROR_UNSUBSCRIBE = "Вы и так отписаны от уведомлений.";
const ERROR_UNKONOWN_CMD = ["Это не похоже на одну из моих команд. Может Вы опечатались?", "Я очень простой бот. Я понимаю только ограниченый набор команд. Чтобы их посмотреть, напишите мне /start", "Я всего лишь бот :( если Вам нужно что-то обсудить - напишите или позвоните dsfox@. Я же понимаю только ограниченный набор команд.", "Что? Я не знаю такой команды :("];
const ERROR_ADMIN_ORDER = "Не могу распарсить строчку заказа. Посмотри на неё еще раз. Всё ок?";

const TEXT_DONE = "Вот и хорошо ...";
const TEXT_WAT = " А?";
const TEXT_TEST = "мёду ннннада?";
const TEXT_QUEST_LOGIN = "Напишите Ваш логин на @yandex-team";
const TEXT_QUEST_NAME = "Ok. А как Вас зовут?";
const TEXT_START_ORDER = ", сколько литров и в каких банках? Если нужен мёд в сотах, то сколько рамок?";
const TEXT_ORDER_SUCCESS = "Спасибо за заказ. Я напишу Вам когда мёд будет в офисе. Если хотите подписаться на уведомления о процессе доставки - напишите мне /track, отписаться - /untrack";
const TEXT_ADMIN_ORDER_SUCCESS = "Заказ добавлен";
const TEXT_ADMIN_REORDER_SUCCESS = "Заказ обновлен";
const TEXT_ORDER_EXIST = "У Вас уже есть заказ: %s\nУдалить его? Будем делать новый?";
const TEXT_ADMIN_ORDER_EXIST = "У него уже есть заказ %s\nЗаменить на новый?";
const TEXT_WELCOME = "Привет! Я медовый бот.\nСтоимость 1л мёда - 600р.\nСтоимость одной полной рамки с сотами (Заказать можно только в августе-сентябре) - 1800р.\nДля общения со мной используйте команды:\n/start - простыня, которую вы сейчас читаете\n/subscribe - подписаться на открытие сезона. Мёд выкачивается всего два раза в год. Чтобы не пропустить очередной сезон - подпишитесь. Вы получите сообщение, как только dsfox@ соберется поехать за медом\n/order - диалог заказа.. У вас может быть только один активный заказ (per Telegram account). Если вы решили заказать еще - пишите еще раз /order с указанием всего, что Вам нужно\n/track - подписка на уведомления о том, где сейчас Ваш мёд\n/untrack - не будете получать никаких сообщений пока мёд не приедет в офис (default)\n/status - ну где там мой мёд?\n/info - немного информации про мёд и пасеку\n/view - посмотреть Ваш текущий заказ\n/reset - Удаляется Ваш заказ, стирается вся история нашего общения\n/# - Выход из любого диалога со мной. Следует использовать, если я хочу от Вас непонятного.";
const TEXT_INFO = "Вы можете заказывать мёд в 1л-1.5л-2л-3л-банках. Стоимость 1л - 600р. В августе-сентябре Вы так же можете заказать рамку с сотами. Как правило, в полной рамке около 3л мёда ± 0.5л. Поэтому стоимость рамки - 1800р. Рамка вручается в целофановом пакете. Хранить её лучше в холодильнике. Мёд не портится, но очень привлекает всяких насекомых, в первую очередь ос и пчёл.\nПасека, мёд с которой Вы заказываете, находится здесь - https://yandex.ru/maps/-/CVTuJQ0u\nПыльцу для мёда пчёлы таскают с полевых цветов и близлежащих полей, на которых каждый год растут рандомные культурные растения. Мёд, выкачанный в июне - менее вязкий, более прозрачный, хуже кристаллизуется и пахнет пыльцой цветов. Августовский мёд более плотный, тёмный и быстрее начинает кристаллизоваться, даже при комнатной температуре.";
const TEXT_TRACK = "Вы подписались на уведомления.";
const TEXT_UNTRACK = "Вы отписались от уведомлений.";
const TEXT_RESET_COMPLETE = "Ваш заказ «%s» успешно удален. У Вас сейчас нет заказов.";
const TEXT_ADMIN_INFO = "/raw - вся база заказов в JSON\n/list - список заказов со статусами\n/new - новые (неподтвержденные заказы)\n/orders - список подтвержденных заказов\n/setstatus - обновить статус для всех заказов. Число от 1 до 7 или 0, чтобы ввести свою фразу\n/approve yandexLogin note - подтверждение заказа, где note - короткое понятное сообщение о заказе\n/add login note - добавление произвольного заказа, где login и note - имя и заказ соответственно\n/message yandexLogin - отправить личное сообщение\n/subscribers - показывает список тех, кто подписался на открытие сезона (telegram username)\n/open - открытие сессии приема заказов\n/close - закрытие сессии приема заказов";
const TEXT_QEUST_RESET = "Вы уверены, что хотите удалить свой текущий заказ?: %s";
const TEXT_QUEST_SETSTATUS = "Какой статус установить для всех заказов?";
const TEXT_QUEST_SETSTATUS_CUSTOM = "Хорошо, давай установим свой статус. Напиши его и я сразу же обновлю его для всех.";
const TEXT_QUEST_SETSTATUS_DONE = "Новый статус установлен и разослан всем, кто подписан: ";
const TEXT_APPROVED_TRUE = "проверен";
const TEXT_APPROVED_FALSE = "не проверен";
const TEXT_APPROVE_DONE = "Заказ %s подтверждён: ";
const TEXT_MESSAGE_DONE = "Сообщение отправлено: ";
const TEXT_SEASON_OPEN_MESSAGE = "Сезон приема заказов на мёд открыт. /order - для диалога заказа. /start - краткая информация и список команд."
const TEXT_SEASON_OPEN = "Сезон приема заказов открыт! С этого момента я буду сообщать о всех новых заказах.";
const TEXT_QUEST_SEASON_CLOSE = "Закрыть сезон приема заказов? Текущий файл orders.json будет заархивирован. Всем, кто захочет сделать новый заказ будет отправлено сообщение: Сезон закрыт.";
const TEXT_SEASON_CLOSE = "Сезон закрыт. Создан файл архива orders.json, старые файлы настроек сохранены.";
const TEXT_SORRY_DONE = "Что-то я затупил, спасибо. Так о чем это мы? Я жду какой-нибудь команды.";
const TEXT_SORRY_DENY = "У меня все хорошо. Нет никакой необходимости писать мне /#. Я всего лишь жду какой-нибудь команды.";
const TEXT_SUBSCRIBE_OK = "Вы подписались на уведомления об открытии сезона.";
const TEXT_UNSUBSCRIBE_OK = "Вы отписались от уведомлений";
const TEXT_VIEW_ORDER = "Ваш заказ: ";
const TEXT_NEW_ORDERS = "Появились новые заказы:\n";

const ADMIN_ID = 104410529; //dsfox@
const CHECK_ORDERS_INTERVAL = 1000 * 60 * 60 * 6; //check orders every 6 hours

var YaHoneyBot = require("node-telegram-bot-api");
var fs = require("fs");
var checkTimer = null;

var token = fs.existsSync(FILE_TOKEN) ? fs.readFileSync(FILE_TOKEN) : null;
var orders = fs.existsSync(FILE_ORDERS) ? JSON.parse(fs.readFileSync(FILE_ORDERS)) : {};
var chatStates = fs.existsSync(FILE_CHAT_STATES) ? JSON.parse(fs.readFileSync(FILE_CHAT_STATES)) : {};
var settings = fs.existsSync(FILE_SETTINGS) ? JSON.parse(fs.readFileSync(FILE_SETTINGS)) : DEFAULT_SETTINGS;

var bot = new YaHoneyBot(token, { polling: true });

bot.getMe().then(function(me) {
    console.log("Hello! My name is %s!", me.first_name);
    console.log("My id is %s.", me.id);
    console.log("And my username is @%s.", me.username);
});

bot.on("text", function(msg) {
    var cid = msg.chat.id;
    var mText = msg.text;
    var mDate = msg.date;
    var mUser = msg.from.username || msg.from.last_name;
    var uid = String(msg.from.id);
    var fakeUser = false;

    if (mText.indexOf("//") == 0) {
        mText = mText.substr(1);
        fakeUser = true;
    }

    //handle bot conversation reset
    if (mText === "/#") {
        if (chatStates[uid]) {
            delete chatStates[uid];
            answer(cid, TEXT_SORRY_DONE);
        } else {
            answer(cid, TEXT_SORRY_DENY);
        }
        return;
    }

    if (typeof orders[uid] === "object") {
        orders[uid].laststamp = mDate;
    }

    if (typeof chatStates[uid] === "string") {
        //handle open user conversations
        if (chatStates[uid] === CHAT_STATE_LOGIN) {
            var realName = orders[uid] ? orders[uid].realName : null;
            var order = new Order(cid);
            order.userName = mUser;
            order.yandexLogin = yFilter(mText);
            order.realName = realName;
            orders[uid] = order;
            if (realName) {
                chatStates[uid] = CHAT_STATE_ORDER;
                answer(cid, realName + TEXT_START_ORDER);
            } else {
                chatStates[uid] = CHAT_STATE_NAME;
                answer(cid, TEXT_QUEST_NAME);
            }
        } else if (chatStates[uid] === CHAT_STATE_NAME) {
            var realName = mText.charAt(0).toUpperCase() + mText.substr(1);
            orders[uid].realName = realName;
            chatStates[uid] = CHAT_STATE_ORDER;
            answer(cid, realName + TEXT_START_ORDER);
        } else if (chatStates[uid] === CHAT_STATE_ORDER) {
            orders[uid].text = mText;
            settings.users[uid] = {
                'yandexLogin': orders[uid].yandexLogin,
                'realName': orders[uid].realName,
                'userName': orders[uid].userName
            }
            delete chatStates[uid];
            answer(cid, TEXT_ORDER_SUCCESS);
            if (!checkTimer) {
                checkTimer = setTimeout(checkOrders, CHECK_ORDERS_INTERVAL);
            }
            save();
        } else if (chatStates[uid] === CHAT_STATE_RESET) {
            if (CHAT_CONVERSATION_YES.indexOf(mText.toLowerCase()) >= 0) {
                answer(cid, TEXT_RESET_COMPLETE.replace("%s", orders[uid].text));
                delete orders[uid];
                delete chatStates[uid];
                save();
            } else if (CHAT_CONVERSATION_NO.indexOf(mText.toLowerCase()) >= 0) {
                answer(cid, TEXT_DONE);
                delete chatStates[uid];
            } else {
                answer(cid, TEXT_WAT);
            }
        } else if (chatStates[uid] === CHAT_STATE_REORDER) {
            if (CHAT_CONVERSATION_YES.indexOf(mText.toLowerCase()) >= 0) {
                chatStates[uid] = CHAT_STATE_LOGIN;
                answer(cid, TEXT_QUEST_LOGIN);
            } else if (CHAT_CONVERSATION_NO.indexOf(mText.toLowerCase()) >= 0) {
                answer(cid, TEXT_DONE);
                delete chatStates[uid];
            }
        }

        //handle open admin conversations
        if (chatStates[ADMIN_ID] === CHAT_STATE_SETSTATUS_QUEST) {
            var n = Number(mText);
            if (n === NaN || n < 0 || n >= orderSates.length) {
                answer(cid, ERROR_SETSTATUS_QUEST);
            } else if (n == 0) {
                chatStates[ADMIN_ID] = CHAT_STATE_SETSTATUS_CUSTOM;
                answer(cid, TEXT_QUEST_SETSTATUS_CUSTOM);
            } else {
                var state = orderSates[n];
                for (var i in orders) {
                    orders[i].state = state;
                    if (orders[i].track) {
                        answer(orders[i].chatId, state);
                        settings.talks[orders[i].chatId] = { 'chatState': PRIVATE_CHAT_STATE_WAIT_FOR_ANSWER };
                    }
                }
                delete chatStates[ADMIN_ID];
                answer(cid, TEXT_QUEST_SETSTATUS_DONE + '«' + state + '»');
                save();
            }
        } else if (chatStates[ADMIN_ID] === CHAT_STATE_SETSTATUS_CUSTOM) {
            for (var i in orders) {
                orders[i].state = mText;
                if (orders[i].track) {
                    answer(orders[i].chatId, mText);
                }
            }
            delete chatStates[ADMIN_ID];
            answer(cid, TEXT_QUEST_SETSTATUS_DONE + '«' + mText + '»');
            save();
        } else if (chatStates[ADMIN_ID] === CHAT_STATE_CLOSE_SEASON) {
            if (CHAT_CONVERSATION_YES.indexOf(mText.toLowerCase()) >= 0) {
                backup();
                settings.open = false;
                delete chatStates[ADMIN_ID];
                answer(cid, TEXT_SEASON_CLOSE);
                save();
            } else if (CHAT_CONVERSATION_NO.indexOf(mText.toLowerCase()) >= 0) {
                delete chatStates[ADMIN_ID];
                answer(cid, TEXT_DONE);
            } else {
                answer(cid, TEXT_WAT);
            }
        } else if (chatStates[ADMIN_ID] === CHAT_STATE_ADMIN_REORDER) {
            if (CHAT_CONVERSATION_YES.indexOf(mText.toLowerCase()) >= 0) {
                var order = settings.talks[ADMIN_ID].order;
                orders[order.chatId] = order;
                answer(cid, TEXT_ADMIN_REORDER_SUCCESS);
                delete chatStates[uid];
                delete settings.talks[ADMIN_ID].order;
                save();
            } else if (CHAT_CONVERSATION_NO.indexOf(mText.toLowerCase()) >= 0) {
                answer(cid, TEXT_DONE);
                delete chatStates[uid];
                delete settings.talks[ADMIN_ID].order;
                save();
            }
        }
        return;
    }

    if (cid !== ADMIN_ID || fakeUser) { //handle new user commands
        if (mText === "/subscribe") {
            if (settings.subscribers[uid]) {
                answer(cid, ERROR_SUBSCRIBE);
            } else {
                settings.subscribers[uid] = { "date": new Date(mDate), "chatId": cid, "user": mUser };
                answer(cid, TEXT_SUBSCRIBE_OK);
                save();
            }
        } else if (mText === "/unsubscribe") {
            if (settings.subscribers[uid]) {
                delete settings.subscribers[uid];
                answer(cid, TEXT_UNSUBSCRIBE_OK);
                save();
            } else {
                answer(cid, ERROR_UNSUBSCRIBE);
            }
        } else if (mText === "/start") {
            answer(cid, TEXT_WELCOME);
        } else if (mText === "/test") {
            answer(cid, TEXT_TEST);
        } else if (mText === "/order") {
            if (settings.open) {
                if (orders[uid]) {
                    chatStates[uid] = CHAT_STATE_REORDER;
                    answer(cid, TEXT_ORDER_EXIST.replace("%s", '«' + orders[uid].text + '»'));
                } else if (settings.users[uid] && settings.users[uid].yandexLogin && settings.users[uid].realName) { //known user
                    var order = new Order(cid);
                    order.userName = mUser;
                    order.yandexLogin = settings.users[uid].yandexLogin;
                    order.realName = settings.users[uid].realName;
                    orders[uid] = order;
                    chatStates[uid] = CHAT_STATE_ORDER;
                    answer(cid, settings.users[uid].realName + TEXT_START_ORDER);
                } else {
                    chatStates[uid] = CHAT_STATE_LOGIN;
                    answer(cid, TEXT_QUEST_LOGIN);
                }
            } else {
                answer(cid, ERROR_SEASON_CLOSED);
            }
        } else if (mText === "/track" || mText === "/untrack") {
            if (orders[uid]) {
                var enable = (mText === "/track");
                for (var i in orders) {
                    if (i === uid) {
                        orders[i].track = enable;
                        answer(cid, enable ? TEXT_TRACK : TEXT_UNTRACK);
                    }
                }
                save();
            } else {
                answer(cid, ERROR_NO_ORDERS);
            }
        } else if (mText === "/status") {
            if (orders[uid]) {
                answer(cid, orders[uid].state);
            } else {
                answer(cid, ERROR_NO_ORDERS);
            }
        } else if (mText === "/info") {
            answer(cid, TEXT_INFO);
        } else if (mText === "/view") {
            if (orders[uid]) {
                answer(cid, TEXT_VIEW_ORDER + '«' + orders[uid].text + '»');
            } else {
                answer(cid, ERROR_NO_ORDERS);
            }
        } else if (mText === "/reset") {
            if (orders[uid]) {
                answer(cid, TEXT_QEUST_RESET.replace("%s", '«' + orders[uid].text + '»'));
                chatStates[uid] = CHAT_STATE_RESET;
            } else {
                answer(cid, ERROR_NO_ORDERS);
            }
        } else if (settings.talks[uid].chatState === PRIVATE_CHAT_STATE_WAIT_FOR_ANSWER) { //silent action
            delete settings.talks[uid].chatState;
            if (orders[uid]) {
                orders[uid].privateAnswer = mText;
            }
        } else {
            answerError(cid);
        }
    } else { //handle ADMIN commands
        if (mText === "/subscribers") {
            var list = '';
            for (var i in settings.subscribers) {
                list += settings.subscribers[i].user + ' [' + i + ']' + ' : ' + settings.subscribers[i].date
            }
            if (list.length) {
                answer(cid, list);
            } else {
                answer(cid, ERROR_EMPTY_LIST);
            }
        } else if (mText === "/info") {
            answer(cid, TEXT_ADMIN_INFO);
        } else if (mText === "/raw") {
            answer(cid, JSON.stringify(orders));
        } else if (mText == "/list") {
            var list = '';
            for (var i in orders) {
                var row = orders[i].note;
                row += ' . ' + orders[i].yandexLogin
                row += ' . [' + (orders[i].approved ? TEXT_APPROVED_TRUE : TEXT_APPROVED_FALSE);
                row += '] ';
                if (orders[i].privateAnswer) {
                    row += 'private message:' + orders[i].privateAnswer;
                }
                row += '\n';
                list += row;
            }
            if (list.length) {
                answer(cid, list);
            } else {
                answer(cid, ERROR_EMPTY_LIST);
            }
        } else if (mText === "/new") {
            var list = '';
            for (var i in orders) {
                if (!orders[i].approved) {
                    var row = orders[i].yandexLogin + ' . ' + orders[i].text + '\n';
                    list += row;
                }
            }
            if (list.length) {
                answer(cid, list);
            } else {
                answer(cid, ERROR_EMPTY_LIST);
            }
        } else if (mText === "/orders") {
            var list = '';
            for (var i in orders) {
                if (orders[i].note) {
                    var row = orders[i].yandexLogin + ' . ' + orders[i].note + '\n';
                    list += row;
                }
            }
            if (list.length) {
                answer(cid, list);
            } else {
                answer(cid, ERROR_EMPTY_LIST);
            }
        } else if (mText === "/setstatus") {
            var msg = TEXT_QUEST_SETSTATUS + '\n';
            for (var i = 0; i < orderSates.length; i++) {
                msg += i + " - " + orderSates[i] + '\n'
            }
            chatStates[uid] = CHAT_STATE_SETSTATUS_QUEST;
            answer(cid, msg);
        } else if (mText.indexOf("/approve") == 0) {
            var pText = parseCmd(mText);
            var yid = pText[0];
            var note = pText[1];
            var order;
            for (var i in orders) {
                if (orders[i].yandexLogin === yid) {
                    order = orders[i];
                }
            }
            if (order) {
                if (note) {
                    order.note = note;
                    order.approved = true;
                    var msg = TEXT_APPROVE_DONE.replace("%s", yid) + ': ' + note;
                    answer(cid, msg);
                    save();
                } else {
                    answer(cid, ERROR_APROOVE_NOTE.replace("%s", yid));
                }
            } else {
                answer(cid, ERROR_YID_NOT_FOUND.replace("%s", yid));
            }
        } else if (mText.indexOf("/message") == 0) {
            var pText = parseCmd(mText);
            var yid = pText[0];
            var msg = pText[1];
            var order;
            for (var i in orders) {
                if (orders[i].yandexLogin === yid) {
                    order = orders[i];
                }
            }
            if (order) {
                if (msg) {
                    answer(order.chatId, msg);
                    answer(cid, TEXT_MESSAGE_DONE + '«' + msg + '»');
                } else {
                    answer(cid, ERROR_DIRECT_MESSAGE_SENT.replace("%s", yid));
                }
            } else {
                answer(cid, ERROR_YID_NOT_FOUND.replace("%s", yid));
            }
        } else if (mText === "/open") {
            if (!settings.open) {
                settings.open = true;
                for (var i in settings.subscribers) {
                    answer(settings.subscribers[i].chatId, TEXT_SEASON_OPEN_MESSAGE);
                }
                answer(cid, TEXT_SEASON_OPEN);
                orders = {};
                chatStates = {};
                save();
            } else {
                answer(cid, ERROR_OPEN_SEASON);
            }
        } else if (mText === "/close") {
            if (settings.open) {
                chatStates[ADMIN_ID] = CHAT_STATE_CLOSE_SEASON;
                answer(cid, TEXT_QUEST_SEASON_CLOSE);
            } else {
                answer(cid, ERROR_CLOSE_SEASON);
            }
        } else if (mText.indexOf("/add") == 0) {
            var pText = parseCmd(mText);
            var uid = pText[0];
            var note = pText[1];
            if (uid && note) {
                var order = new Order(uid);
                order.userName = uid;
                order.yandexLogin = uid;
                order.approved = true;
                order.note = note;
                if (!orders[uid]) {
                    orders[uid] = order;
                    answer(cid, TEXT_ADMIN_ORDER_SUCCESS);
                    save();
                } else {
                    settings.talks[ADMIN_ID] = { 'order': order };
                    chatStates[ADMIN_ID] = CHAT_STATE_ADMIN_REORDER;
                    answer(cid, TEXT_ADMIN_ORDER_EXIST.replace("%s", '«' + orders[uid].note + '»'));
                    save();
                }
            } else {
                answer(cid, ERROR_ADMIN_ORDER);
            }
        }
    }

    console.log('MSG: ', msg);
});

function Order(cid) {
    this.chatId = cid; //telegram user id
    this.userName = null; //telegram given username || name
    this.orderId = Math.random() + Date.now(); //id
    this.yandexLogin = null; // Yandex team login
    this.state = ORDER_STATE_DEFAULT; // initial order state
    this.approved = false; // not approved bu default
    this.timestamp = Date.now(); // now
    this.laststamp = Date.now(); // now
    this.realName = null; // user provided name
    this.track = false; //dont track by default
    this.text = null; // user provided order message
    this.note = null; // admin moderated order
}

function parseCmd(text) {
    var result = [];
    var cmd = text.substr(text.indexOf(' ') + 1);
    var idx = cmd.indexOf(' ');
    result.push(idx > 0 ? cmd.substring(0, idx) : cmd);
    idx > 0 && result.push(cmd.substr(idx + 1));
    return result;
}

function fsError(err) {
    if (err) {
        return console.log(err);
    }
}

function save() {
    fs.writeFile(FILE_ORDERS, JSON.stringify(orders), fsError);
    fs.writeFile(FILE_CHAT_STATES, JSON.stringify(chatStates), fsError);
    fs.writeFile(FILE_SETTINGS, JSON.stringify(settings), fsError);
}

function backup() {
    var d = (new Date(Date.now())).toLocaleDateString();
    d = d.replace(new RegExp('\\.', 'g'), '_'); //mac
    d = d.replace(new RegExp('/', 'g'), '_'); //unix
    fs.writeFileSync(FILE_ORDERS + '_' + d + '.backup', JSON.stringify(orders));
}

function answer(aChatId, aMessage) {
    bot.sendMessage(aChatId, aMessage);
}

function answerError(chatId) {
    answer(chatId, ERROR_UNKONOWN_CMD[Math.floor(Math.random() * (ERROR_UNKONOWN_CMD.length))]);
}

function yFilter(login) {
    var i = login.indexOf('@');
    if (i != -1) {
        var before = login.substr(0, i);
        var after = login.substr(i + 1);
        if (before.length) {
            return before;
        }
        if (after.length) {
            return after;
        }
    }
    return login;
}

function checkOrders() {
    var now = Date.now();
    var found = false;
    var msg = TEXT_NEW_ORDERS;
    for (var i in orders) {
        if (i && i.text && parseInt(i.laststamp) > now && !i.approved) {
            i.laststamp = now;
            !found ? found = true : null;
            msg += i.yandexLogin;
            msg += ' : ' + i.text;
        }
    }
    if (found) {
        save();
        answer(ADMIN_ID, msg);
    }
    checkTimer = null;
}