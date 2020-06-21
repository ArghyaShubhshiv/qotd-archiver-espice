const Discord = require("discord.js");
const fs = require("fs");
const fetch = require("node-fetch");

const client = new Discord.Client();
const token = process.env.token;

client.once("ready", () => {
  console.log("Ready!");
});

client.on("message", async (message) => {
  if (message.content.startsWith("q!help")) {
    message.channel.send(
      "This bot stores all the eSpice QOTDs; you can check them all by typing 'q!giveList.'\nI also crack lame jokes. Check them out too by 'q!joke'"
    );
  } else if (
    message.content.startsWith("<#645998087076315157>") &&
    !(message.channel.type === "dm")
  ) {
    fs.appendFile("./questions.txt", `\n${message.content}`, (err) => {
      console.log(err);
    });
  } else if (
    (message.content.includes("Answer") ||
      message.content.includes("answer")) &&
    !(message.channel.type === "dm")
  ) {
    fs.appendFile(
      "./questions.txt",
      `\n **${message.content}** \n\n`,
      (err) => {
        console.log(err);
      }
    );
  } else if (message.content.startsWith("q!giveList")) {
    let x = message.author;
    message.channel.send("DMed you with the question list :)");
    fs.readFile("./questions.txt", "utf-8", (err, data) => {
      if (err) throw err;
      console.log("questions given");
      x.send(data);
    });
  } else if (message.content.startsWith("q!joke")) {
    await message.channel.send(
      "Toh bhai main joke maarne ja raha hoon, agar lame lage toh please maarna mat."
    );
    await joke()
      .then((sayJoke = (jox) => message.channel.send(jox)))
      .catch(
        (err = () => {
          message.channel.send(
            "Ya chhod yaar; maine nai maarna koi faaltu sa joke ¯|..(ツ)..|¯"
          );
          console.log(err);
        })
      );
  }
});

client.login(token);

async function joke() {
  let endpoint = "https://icanhazdadjoke.com/";
  let jokeData = await fetch(endpoint, {
    headers: {
      Accept: "application/json",
    },
  });
  jokeData = await jokeData.json();
  jokeData = await jokeData.joke;
  return jokeData;
}
