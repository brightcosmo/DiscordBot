const { loadCommands } = require("../../handlers/commandHandler");
const { ActivityType } = require("discord.js")

/**
 * The "ready" event handler executed once when the Discord bot is ready and connected to Discord servers.
 * param {Client} client - The Discord.js Client instance representing the bot.
 * returns {void} - This function doesn't return anything.
 */
module.exports = {
  // The name of the event. "ready" indicates this is the "ready" event handler.
  name: "ready",
  
  // Whether this event handler should run only once (true) or multiple times (false).
  once: true,

  /**
   * The function that will be executed when the "ready" event is triggered.
   * @param {Client} client - The Discord.js Client instance representing the bot.
   * @returns {Promise<void>} - A promise that resolves once all tasks related to the "ready" event are completed.
   */
  async execute(client) {
    // Load commands when the bot is ready
    loadCommands(client);

    // Initialize a variable to keep track of the total number of non-bot users across all guilds
    let userCount = 0;

    // Fetch all guilds the bot is a member of
    await client.guilds.fetch();

    // Fetch all members in each guild and count non-bot members to get the total user count
    await Promise.all(
      client.guilds.cache.map(async (guild) => {
        await guild.members.fetch();
        userCount += guild.members.cache.filter((member) => !member.user.bot).size;
      })
    );

    // Define two activities to display in the bot's status
    const userStatus = {
      type: ActivityType.Watching,
      content: `over ${userCount} users`,
    };
    const serverStatus = {
      type: ActivityType.Watching,
      content: `over ${client.guilds.cache.size} servers`,
    };
    const statusArray = [userStatus, serverStatus];

    // Function to randomly pick and set an activity for the bot's status
    function pickActivity() {
      const option = Math.floor(Math.random() * statusArray.length);
      client.user.setActivity(statusArray[option].content, {
        type: statusArray[option].type,
      });
    }

    // Log that the bot is now online and set the initial activity
    console.log(`${client.user.tag} is now online! 🟢`);
    pickActivity();

    // Set an interval to change the activity every 5 seconds
    setInterval(pickActivity, 5 * 1000);

    // Uncomment the following lines if a database connection is involved
    // if (!Database) return;
    // Database.connect((err) => {
    //   if (err) {
    //     console.error('Error connecting to MySQL server:', err);
    //     return;
    //   }
    //   console.log(`${client.user.username} is now connected to the database! 🟢`);
    // });
  },
};