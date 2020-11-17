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
      "I crack lame jokes. Check them out too by 'q!joke'\nMI'm a commie too, so I can read out free virtual excerpts from the Communist Manifesto, check it out by 'q!read'."
    );
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
