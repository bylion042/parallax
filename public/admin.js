// NOTIFY ADMIN WHEN THE SWAP PAGE IS ACCESSED
var socket = io();
socket.on("adminNotification", function (message) {
    alert(message); // Show a popup to admin
});

// UPDATE and store AMOUNT
function updateAmount() {
    var newAmount = document.getElementById("amountInput").value;
    if (newAmount) {
        localStorage.setItem("storedAmount", newAmount); // Save in localStorage
        socket.emit("updateAmount", newAmount); // Send update to Swap Page
        document.getElementById("amountInput").value = ""; // Clear input
    }
}

function deleteAmount() {
    localStorage.setItem("storedAmount", "$0.00"); // Reset in localStorage
    socket.emit("deleteAmount"); // Send reset to Swap Page
    alert("Amount reset"); // Show alert when amount is deleted
}

// Notify admin when a deposit is requested
socket.on("adminNotification", function (message) {
    alert(message);
});



function sendMessage() {
    var address = document.getElementById("inputMessage").value;

    if (!address) {
        alert("Please enter a coin address.");
        return;
    }

    socket.emit("sendAddressToSwap", address); // Emit the text to swap page
    alert("Address sent to swap page.");
}

