// NOTIFY ADMIN WHEN THE SWAP PAGE IS ACCESSED
var socket = io();
// Notify admin when a user enters the Swap page
socket.emit('userEnteredSwap', "Swap page is being accessed");

// UPDATE and store AMOUNT
var socket = io();

// Load stored amount from localStorage on page load
document.addEventListener("DOMContentLoaded", function () {
    var savedAmount = localStorage.getItem("storedAmount") || "$0.00";
    document.getElementById("amountDisplay").innerText = savedAmount;
});

// Listen for amount updates
socket.on("amountUpdated", function (newAmount) {
    document.getElementById("amountDisplay").innerText = newAmount;
    localStorage.setItem("storedAmount", newAmount); // Save update in localStorage
});

// Show "Payment received" when admin updates amount
socket.on("swapMessage", function (message) {
    alert(message);
});

// HANDLE AMOUNT RESET (NEW UPDATE)
socket.on("deleteAmount", function () {
    document.getElementById("amountDisplay").innerText = "$0.00"; // Reset display
    localStorage.setItem("storedAmount", "$0.00"); // Clear stored amount
    alert("Amount reset"); // Show alert
});

// DEPOSITE ADDRESS NEEDED
var socket = io();

document.getElementById("depositBtn").addEventListener("click", function () {
    alert("An email will be sent to you shortly, please be patient while our system processes the deposit.");
    socket.emit("depositRequest", "User has requested a deposit address.");
});



// Listen for text sent from admin and display it in SweetAlert
socket.on("sendAddressToSwap", function (address) {
    Swal.fire({
        title: 'New Address Received!',
        text: address,
        icon: 'success',
        confirmButtonText: 'Copy'
    }).then(() => {
        navigator.clipboard.writeText(address)
            .then(() => Swal.fire('Copied!', 'Address copied to clipboard.', 'success'))
            .catch(() => Swal.fire('Oops!', 'Failed to copy.', 'error'));
    });
});
