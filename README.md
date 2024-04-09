# Important

**You need the following things before you can kick off with LavaJS:**

- [**Java Installed**](https://www.java.com/en/download/)
- [**LavaLink CL Server**](https://ci.fredboat.com/viewLog.html?buildId=lastSuccessful&buildTypeId=Lavalink_Build&tab=artifacts&guest=1)

> The setup has been covered in our official documentation. Do check it out if you have any doubts.

# Basic Startup Guide

- Create an `application.yml` file in the `Lavalink.jar` directory.
- Run the `Lavalink.jar` file in a terminal window using `java -jar Lavalink.jar`.

**Example code for running the client:**

```js
const { Client } = require("discord.js");
const { LavaClient } = require("@develofy/lavalink");

const bot = new Client();

const nodes = [
	{
		host: "localhost",
		port: 2333,
		password: "mypassword",
		retries: 5,
	},
];

const lavaClient = new LavaClient(bot, nodes);
bot.log("token");
```