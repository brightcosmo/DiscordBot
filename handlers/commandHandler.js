/**
 * Load and register commands for the Discord bot.
 * param {Client} client - The Discord.js Client instance representing the bot.
 * returns {Promise<void>} - A promise that resolves once all commands are loaded.
 */
async function loadCommands(client) {
    // Import necessary functions and modules
    const { loadFiles } = require("../functions/fileLoader");
    const ascii = require("ascii-table");
    
    // Create a new ASCII table to display command loading status
    const table = new ascii().setHeading("Command", "Status");

    // Clear the existing command collection in the client
    await client.commands.clear();

    // Initialize an array to store command data in JSON format
    let commandsArray = [];

    // Load command files from the "commands" directory
    const Files = await loadFiles("commands");

    // Iterate through each command file, require the module, and register the command
    Files.forEach((file) => {
        const command = require(file);

        // Register the command with the client's commands collection, mapped by command name
        client.commands.set(command.data.name, command);

        // Push the command data in JSON format to the commandsArray
        commandsArray.push(command.data.toJSON());

        // Add a row to the ASCII table with the command name and a green (🟢) status
        table.addRow(command.data.name, "🟢");
    });

    // Set the application commands with the commandsArray data
    client.application.commands.set(commandsArray);

    // Log the loaded commands along with the ASCII table displaying the loading status
    return console.log("\n\x1b[36mLoaded Commands.\x1b[0m\n", table.toString());
}

// Export the loadCommands function to make it accessible to other modules
module.exports = { loadCommands };