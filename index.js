const Discord = require("discord.js");
const fs = require("fs");
const fetch = require("node-fetch");
const client = new Discord.Client();
const token = process.env.TOKEN;

client.once("ready", () => {
  console.log("Ready!");
});

client.on("message", async (message) => {
  if (message.content.startsWith("q!help")) {
    message.channel.send(
      "I crack lame jokes. Check them out too by 'q!joke'\nMain ek Communist Sardar bhi hoon, so I can read out free virtual excerpts from the Communist Manifesto too."
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
  } else if (msg.startsWith("q!read")) {
    await message.channel.send(
      "Reading an excerpt from The Communist Manifesto..."
    );
    fs.readFile("./manifesto.txt", "utf-8", (err, data) => {
      if (err) throw err;
      data = data.split("\r\n").join(" ");
      data = data.split("#");
      let indexNum = Math.floor(Math.random() * data.length);
      let excerpt = data[indexNum];
      message.channel.send("```" + excerpt + "```");
    });
  }
});

client.login(process.env.token);
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
