const {glob} = require("glob");
const path = require("path");

/**
 * Deletes the cached version of a specific file from the Node.js require cache.
 * param {string} file - The path to the file whose cached version needs to be deleted.
 * returns {Promise<void>} - A promise that resolves once the cached file is deleted.
 */
async function deleteCachedFile(file) {
    const filePath = path.resolve(file);
    if (require.cache[filePath]) {
        delete require.cache[filePath];
    }
}

/**
 * Loads files from the specified directory and deletes their cached versions from the Node.js require cache.
 * @param {string} directoryName - The name of the directory from which to load the files.
 * @returns {Promise<string[]>} - A promise that resolves with an array of file paths to the loaded JavaScript files.
 * @throws {Error} - If there is an error loading files from the directory.
 */
async function loadFiles(directoryName) {
    try {
        // Use glob to find all files with ".js" extension in the specified directory and subdirectories
        const files = await glob(path.join(process.cwd(), directoryName, "**/*.js").replace(/\\/g, "/"));

        // Filter the found files to include only JavaScript files
        const jsFiles = files.filter(file => path.extname(file) === ".js");

        // Delete cached versions of all the JavaScript files found
        await Promise.all(jsFiles.map(deleteCachedFile));

        // Return the array of loaded JavaScript file paths
        return jsFiles;

    } catch (error) {
        // If there is an error loading files, log the error and re-throw it
        console.log(`Error loading files from directory ${directoryName}: ${error}`);
        throw error;
    }
}

// Export the loadFiles function to make it accessible to other modules
module.exports = { loadFiles };
