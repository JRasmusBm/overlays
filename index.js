const tmi = require("tmi.js");
const fsPromises = require("fs").promises

console.clear()

const introMessage = `----- NEW SESSION: ${new Date().toDateString()} ----\n`
fsPromises.appendFile("./.history", introMessage).then(
  fsPromises.readFile("./.history").then(history => {
    console.log(history.toString())

    const client = new tmi.Client({
      channels: ["jrasmusbm"],
    });

    client.connect().catch(console.error);

    client.on(
      "message",
      (channel, tags, message, self) => {
        if (self) return;
        const date = new Date();
        const timeStamp = `${date.getHours()}:${date.getMinutes()}`;
        const messageOutput = `[${timeStamp}] ${tags["display-name"]}: ${message}`
        console.log(messageOutput);
        fsPromises.appendFile("./.history", `${messageOutput}\n`)
      }
    );
  })
)
