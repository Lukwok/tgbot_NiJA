const TelegramBot = require('node-telegram-bot-api');
const { forever } = require('request');
const token = '1601794899:AAFYCbypGF4UT-LW5WPlIXSmLodW2257vQI';
const bot = new TelegramBot(token, {polling: true});

const opening ="特別嗚謝可愛嘅路過!! >W< \n全體成員, 家族戰報名表 (六/日20:00-21:00) ";
var avaList= [];
const unopening ="!!殘念~~ 人家不能出戰嘛~~!!";
var unAvaList = [];


//opening
bot.onText(/\/start$/,(msg)=>{
    //forever();
    const chatId = msg.chat.id;
    const output = opening+"\n\n"+unopening;
    //init list
    avaList = [];
    unAvaList =[];
    //send opening
    bot.sendMessage(chatId,output);
});

//show
bot.onText(/\/show$/,(msg)=>{

    const chatId = msg.chat.id;
    var nameList1 = "";
    
    avaList.forEach(element => {
        nameList1+= element+"\n"
    });

    var nameList2 = "";
    unAvaList.forEach(element => {
        nameList2+= element+"\n"
    });

    var output = opening + "\n\n" + nameList1+"\n" + unopening + "\n\n" + nameList2;
    bot.sendMessage(chatId,output);
});

//tag
bot.onText(/\/all$/,(msg)=>{
    const chatId = msg.chat.id;
    var output = "仲未整好 XDDD";
    bot.sendMessage(chatId,output);
});

//tag
bot.onText(/\/close$/,(msg)=>{
    const chatId = msg.chat.id;
    var output = "898";
    bot.sendMessage(chatId,output);
   // process.exit();
});

//help
bot.onText(/\/help$/,(msg)=>{
    const chatId = msg.chat.id;
    var output = `皆さん~ 路過sansan 教你點用 <3 \n
    注意!! 此乃路過一日亂整出黎! 請不要同人分享或自己亂玩\n
    所有資料被第三方改動,路過不會負責~~ (我懶)\n
    1. /start \t 唔好亂用 !!佢會restart個bot同清空record!!\n
    2. /join [name] \t 如果得閒打族戰就報名la\n
    3. /sorry [name] \t Sor9ly, 是日要陪女陪腦細,打唔到 QWQ\n
    4. /delete [name] \t 哎? ざんねん~ 原來我都係唔得閒打.. \n
    5. /fuck [name] \t 頂,終於做完野~~可以打得~~\n
    6. /show \t 出結果\n
    7. /close \t 898 \n
    8. /help \t 召喚我 \n\n
    仲有冇咩唔明? 但就算有我都幫你唔到 :P `;
    bot.sendMessage(chatId,output);
});

bot.on('message', (msg) => {
    //join
    if (msg.text.toString().toLowerCase().startsWith("/join")) {
        const chatId = msg.chat.id;
        var input = msg.text;
        var name = input.split(" ").pop()
        if (name == "/join"){
            name = msg.from.first_name;
        }
        avaList.push(name);
        bot.sendMessage(chatId,name+" Added successful");
    }
    
    //can't join
    if (msg.text.toString().toLowerCase().startsWith("/sorry")) {
        const chatId = msg.chat.id;
        var input = msg.text;
        var name = input.split(" ").pop()
        if (name == "/sorry"){
            name = msg.from.first_name;
        }
        unAvaList.push(name);
        bot.sendMessage(chatId,name+" Added successful");
    };

    //delete from ava
    if (msg.text.toString().toLowerCase().startsWith("/delete")) {
        const chatId = msg.chat.id;
        var input = msg.text;
        var name = input.split(" ").pop()
        if (name == "/delete"){
            name = msg.from.first_name;
        }
        avaList.remove_by_value(name);
        bot.sendMessage(chatId,name+" Removed successful");
    };

    if (msg.text.toString().toLowerCase().startsWith("/fuck")) {
        const chatId = msg.chat.id;
        var input = msg.text;
        var name = input.split(" ").pop()
        if (name == "/fuck"){
            name = msg.from.first_name;
        }
        unAvaList.remove_by_value(name);
        bot.sendMessage(chatId,name+" Removed successful");
    };

    if (msg.text.toString().toLowerCase().includes("小玉")) {
        const chatId = msg.chat.id;
        bot.sendMessage(chatId,"大家姐");
    };

    if (msg.text.toString().toLowerCase().includes("忍毛")) {
        const chatId = msg.chat.id;
        bot.sendMessage(chatId,"臭弟弟 > ^ < 哼!!!!!");
    };
});

Array.prototype.remove_by_value = function(val) {
    for (var i = 0; i < this.length; i++) {
      if (this[i] === val) {
        this.splice(i, 1);
        i--;
      }
    }
    return this;
}
