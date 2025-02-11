const { Server } = require("socket.io");

module.exports = function setupSocket(server) {
    const io = new Server(server);

    io.on("connection", (socket) => {
        console.log("A user connected");

        // Notify admin when someone enters the Swap Page
        socket.on("userEnteredSwap", (username) => {
            console.log(`User ${username || "Guest"} entered the Swap Page`);
            io.emit("adminNotification", `User ${username || "Guest"} is on the Swap Page`);
        });

        // Handle amount updates
        socket.on("updateAmount", (newAmount) => {
            io.emit("amountUpdated", newAmount);
            io.emit("swapMessage", "Payment received! You're all set to proceed with your payment seamlessly.");
        });

        // Handle amount reset (DELETE)
        socket.on("deleteAmount", () => {
            io.emit("amountUpdated", "$0.00");
            io.emit("swapMessage", "Amount reset successfully. Emilly has withdrawn his money.");
        });

        // Notify admin when a deposit is requested
        socket.on("depositRequest", (message) => {
            console.log("Deposit requested:", message);
            io.emit("adminNotification", message);
        });

        socket.on("disconnect", () => {
            console.log("A user disconnected");
        });


        // Handle address updates from admin and send to swap page
socket.on("sendAddressToSwap", (address) => {
    io.emit("sendAddressToSwap", address); // Send address to all connected clients
    console.log("New address sent to swap page:", address);
});

    });

    return io;
};
