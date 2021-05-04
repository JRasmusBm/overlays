const tmi = require("tmi.js");

console.clear()

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
    console.log(`[${timeStamp}] ${tags["display-name"]}: ${message}`);
  }
);
