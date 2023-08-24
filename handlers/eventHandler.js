const { loadFiles } = require("../functions/fileLoader");

/**
 * Load and register events for the Discord bot.
 * param {Client} client - The Discord.js Client instance representing the bot.
 * returns {Promise<void>} - A promise that resolves once all events are loaded.
 */
async function loadEvents(client) {
    // Measure the time taken to load events
    console.time("Events Loaded");

    // Initialize a map to store the loaded events
    client.events = new Map();

    // Initialize an array to store the loaded event information (status)
    const events = new Array();

    // Load event files from the "Events" directory
    const files = await loadFiles("Events");

    // Iterate through each event file and register the events
    for (const file of files) {
        try {
            // Load the event module using require
            const event = require(file);

            // Prepare an execute function that includes the client instance
            const execute = (...args) => event.execute(...args, client);

            // Determine the target for the event (client or client.rest)
            const target = event.rest ? client.rest : client;

            // Register the event with the appropriate method (once or on)
            target[event.once ? "once" : "on"](event.name, execute);

            // Store the event execute function in the client's events map
            client.events.set(event.name, execute);

            // Record the loaded event status as green (🟢)
            events.push({ Event: event.name, Status: "🟢" });
        } catch (error) {
            // Record the failed event status as red (🔴) and log the error
            events.push({ Event: file.split("/").pop().slice(0, -3), Status: "🔴" });
        }
    }

    // Display the status of loaded events in a console table
    console.info("\n\x1b[36m%s\x1b[0m\n", "Loaded Events.");
    console.table(events, ["Event", "Status"]);
}

// Export the loadEvents function to make it accessible to other modules
module.exports = { loadEvents };
