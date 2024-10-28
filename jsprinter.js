/*JSPM.JSPrintManager.auto_reconnect = true;
JSPM.JSPrintManager.start();

// Register WebSocket for JSPrintManager
window.addEventListener("DOMContentLoaded", (event) => {
    JSPM.JSPrintManager.start();
    JSPM.JSPrintManager.WS.onStatusChanged = function () {
        if (JSPM.JSPrintManager.websocket_status) {
            console.log("JSPrintManager connected.");
            // You can automatically get the list of printers once the connection is established
            getPrinters();
        } else {
            console.log("JSPrintManager not connected.");
        }
    };
});

// Function to get available printers
function getPrinters() {
    JSPM.JSPrintManager.getPrinters().then(function (printers) {
        console.log("Available printers:", printers);
    });
}

// Function to print the modal content
function printModalContent() {
    // Get the modal content
    var modalContent = document.querySelector('.modal-content').innerHTML;

    // Create a new print job
    var cpj = new JSPM.ClientPrintJob();

    // Use ESC/POS, ZPL, RAW printing, or HTML printing (depending on your setup)
    cpj.printerCommands = modalContent;  // Use your modal content here
    cpj.clientPrinter = new JSPM.DefaultPrinter();  // Use the default printer

    // Send the print job
    cpj.sendToClient().then(function () {
        console.log("Print job sent to the printer.");
    }).catch(function (error) {
        console.error("Error printing:", error);
    });
}

// Add event listener to your print button
document.getElementById('printModalBtn').addEventListener('click', function () {
    printModalContent();
});*/