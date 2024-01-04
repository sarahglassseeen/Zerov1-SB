module.exports.config = {
    name: "alozero",
    version: "1.0.0",
    hasPermssion: 0,
    credits: "Sarah",
    description: "Gọi Bot Version 1.0.0",
    commandCategory: "Noprefix",
    usages: "",
    cooldowns: 2,
    denpendencies: {}
  };
  
  module.exports.handleReply = async function({ api, args, Users, event, handleReply }) {
    var name = await Users.getNameUser(event.senderID);
    switch (handleReply.type) {
        case "reply":
            {
                var idad = global.config.ADMINBOT;
                for (let ad of idad) {
                    api.sendMessage({
                        body: "Tin nhắn từ ❤" + name + ":\n" + event.body,
                        mentions: [{
                            id: event.senderID,
                            tag: name
                        }]
                    }, ad, (e, data) => global.client.handleReply.push({
                        name: this.config.name,
                        messageID: data.messageID,
                        messID: event.messageID,
                        author: event.senderID,
                        id: event.threadID,
                        type: "goizerosb"
                    }))
                }
                break;
            }
        case "goizerosb":
            {
                api.sendMessage({ body: `${event.body}`, mentions: [{ tag: name, id: event.senderID }] }, handleReply.id, (e, data) => global.client.handleReply.push({
                    name: this.config.name,
                    author: event.senderID,
                    messageID: data.messageID,
                    type: "reply"
                }), handleReply.messID);
                break;
            }
    }
  };
  
  
  module.exports.handleEvent = async({ event, api, Users, Threads }) => {
    var { threadID, messageID, body, senderID } = event;
    if (senderID == global.data.botID) return;
  
    const moment = require("moment-timezone");
    var time = moment.tz("Asia/Ho_Chi_Minh").format("HH:mm:ss D/MM/YYYY");
    let name = await Users.getNameUser(event.senderID);
    var idbox = event.threadID;
    let uidUser = event.senderID;
    let dataThread = await Threads.getData(event.threadID);
    let threadInfo = dataThread.threadInfo;
    const listAdmin = global.config.ADMINBOT;
  
    var tl = [
        `${name}` + ", Bạn gọi Zero-SB có gì ko",
        `${name}` + ",muốn tăng tim tiktok gõ /tim + link video . Sarah sẽ random ngẫu nhiên từ 50-300",
    ];
    var rand = tl[Math.floor(Math.random() * tl.length)];
    // Gọi bot
    var arr = ["zero", "zero ơi",  "yêu zero", "zero đâu rồi"];
    arr.forEach(value => {
        let str = value[0].toUpperCase() + value.slice(1);
    if (body === value.toUpperCase() | body === value | str === body) {
            let nameT = threadInfo.threadName;
            modules = "------ Gọi Zero-SB ------\n";
            console.log(modules, value + "|", nameT);
            api.sendMessage(rand, threadID, () => {
                var idad = listAdmin;
                for (var idad of listAdmin) {
                    api.sendMessage(`=== Bot Notification ===\n\n👥Box Name: ${nameT}\n🔰ID box: ${idbox}\n💖Name User: ${name} \n💕ID User: ${uidUser}\n🕒Time: ${time}\n😊♥️Gọi Zero-SB: ${value}`,
                        idad, (error, info) =>
                        global.client.handleReply.push({
                            name: this.config.name,
                            author: senderID,
                            messageID: info.messageID,
                            messID: messageID,
                            id: idbox,
                            type: "goizerosb"
                        })
                    );
                }
            });
        }
    });
  }
  
  module.exports.run = async({ event, api }) => {
    return api.sendMessage("Xin lỗi !", event.threadID)
                  }