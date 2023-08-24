async function loadButtons(client){
    const {loadFiles} = require("../functions/fileLoader");
    const ascii = require("ascii-table");
    const table = new ascii().setHeading("Button", "Status");

    await client.buttons.clear();

    const buttonArray = [];
    const buttonsFolder = await loadFiles("buttons");

    buttonsFolder.forEach((file) => {
        const button = require(file);

        if (!button.data){
            console.log("Missing button data: ", button);
            return;
        }

        client.buttons.set(button.data.name, button);
        buttonArray.push(button.data);
        table.addRow(button.data.name, "🟢");
    })
    console.log("\n\x1b[36mButtons Loaded.\x1b[0m\n", table.toString());
}

module.exports = {loadButtons}