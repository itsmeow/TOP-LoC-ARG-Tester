require("dotenv").config();
const Discord = require("discord.js");
const bot = new Discord.Client();
const fetch = require("node-fetch");
// eslint-disable-next-line no-undef
const TOKEN = process.env.TOKEN;

let foundList = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 13];

bot.on("ready", () => {
  console.log(`Logged in as ${bot.user.tag}!`);
  bot.user.setActivity("!test (code)", {
    type: "LISTENING",
  });
});

function logReply(toReply, message) {
  console.log(message);
  toReply.reply(message);
}

function found(msg, json, code) {
  let hasCode = foundList.includes(json.code_index);
  logReply(
    msg,
    `Code ${json.code_index + 1}: ${code} links to ${json.url} ${
      !hasCode ? "(<@&721095703195287664>, please verify)" : ""
    }`
  );
  if (!hasCode) {
    foundList.push(json.code_index);
  }
}

bot.on("message", (msg) => {
  if (msg.content.startsWith("!test")) {
    let args = msg.content.split(" ");
    if (args.length === 2) {
      let toTest = args[1];
      console.log("testing " + toTest);
      fetch(
        `https://usb.twentyonepilots.com/api/code/${encodeURIComponent(
          toTest
        )}/check`,
        {
          method: "GET",
          headers: {
            Accept: "application/json, text/plain, */*",
            Host: "usb.twentyonepilots.com",
            Referer: "https://usb.twentyonepilots.com/",
            "X-TOP-Access-Key": "Aigiequiem7ahh2saeNahl6eighum9ae",
          },
        }
      )
        .then((res) => res.json())
        .then((json) => found(msg, json, toTest))
        .catch((err) => logReply(msg, "Invalid code"));
    }
  }
});

bot.login(TOKEN);
