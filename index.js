const Discord = require("discord.js");
const fetch = require("node-fetch");
const client = new Discord.Client();
const token = process.env.TOKEN;

client.once("ready", () => {
  console.log("Ready!");
});

client.on("message", async (message) => {
  if (message.content.startsWith("q!help")) {
    message.channel.send(
      "I crack lame jokes. Check them out too by 'q!joke'."
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
  } 
);

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
