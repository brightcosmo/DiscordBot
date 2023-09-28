async function loadModals(client){
    const {loadFiles} = require("../functions/fileLoader");
    const ascii = require("ascii-table");
    const table = new ascii().setHeading("Modal", "Status");

    await client.modals.clear();

    const modalArray = [];
    const modalsFolder = await loadFiles("modals");

    modalsFolder.forEach((file) => {
        const modal = require(file);

        if (!modal.data){
            console.log("Missing modal data: ", modal);
            return;
        }

        client.modals.set(modal.data.name, modal);
        modalArray.push(modal.data);
        table.addRow(modal.data.name, "🟢");
    })
    console.log("\n\x1b[36mmodals Loaded.\x1b[0m\n", table.toString());
}

module.exports = {loadModals}