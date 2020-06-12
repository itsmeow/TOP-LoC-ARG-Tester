require("dotenv").config();
const Discord = require("discord.js");
const bot = new Discord.Client();
const fetch = require("node-fetch");
// eslint-disable-next-line no-undef
const TOKEN = process.env.TOKEN;

let foundList = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13];

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

function foundPass(msg, json, pass) {
  logReply(
    msg,
    `Response \`${json.response}\` - Keywords: \`${pass}\` ${
      json.response !== "Invalid Command"
        ? "(<@&721095703195287664>, please verify)"
        : ""
    }`
  );
}

bot.on("message", (msg) => {
  if (msg.content.startsWith("!test ")) {
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
  if (msg.content.startsWith("!testkey ")) {
    let args = msg.content.split(" ");
    if (args.length === 4) {
      let toTest = args[1] + " " + args[2] + " " + args[3];
      console.log("testing key " + toTest);
      fetch(`https://usb.twentyonepilots.com/api/chatbot/check/command`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json, text/plain, */*",
          Origin: "https://ineedyoutotellmewerealrighttellmewereokay.com",
          Host: "usb.twentyonepilots.com",
          Referer: "https://ineedyoutotellmewerealrighttellmewereokay.com/",
          "X-TOP-Access-Key": "Aigiequiem7ahh2saeNahl6eighum9ae",
        },
        body: `{ "command": "${toTest}" }`,
      })
        .then((res) => res.json())
        .then((json) => foundPass(msg, json, toTest))
        .catch((err) => {
          console.log(err);
          logReply(msg, "Invalid keyword");
        });
    } else {
      msg.reply("Must have 3 keywords.");
    }
  }
});

bot.login(TOKEN);
