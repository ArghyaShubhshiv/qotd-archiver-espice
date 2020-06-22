const Discord = require("discord.js");
const fs = require("fs");
const fetch = require("node-fetch");

const client = new Discord.Client();
const token = process.env.token;
const chinese_companies = require("./company.js");

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
    !(message.channel.type === "dm") &&
    message.channel == bot.channel.find("name", "qotd")
  ) {
    fs.appendFile("./questions.txt", `\n${message.content}`, (err) => {
      console.log(err);
    });
  } else if (
    (message.content.includes("Answer") ||
      message.content.includes("answer")) &&
    !(message.channel.type === "dm") &&
    message.channel == bot.channel.find("name", "qotd")
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
  } else if (finder(chinese_companies) === true) {
    y = message.author.id;
    await message.channel.send(
      "**CHINESE COMPANIES KA NAAM MAT BOL!!!** " + "@" + y
    );
  }
});

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

function finder(arrayname){
  for (let i = 0; i < arrayname.length; i++) {
    if (message.content.includes(arrayname[i]){
      return true;
      break
    }    
  }
}

client.login(token);
