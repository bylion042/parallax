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
    alert("Address will be sent to you shortly, please be patient while our system processes the deposit.");
    socket.emit("depositRequest", "User has requested a deposit address.");
});



// Listen for text sent from admin and display it in SweetAlert
socket.on("sendAddressToSwap", function (address) {
    Swal.fire({
        title: "New Address Received! copy and complete your deposit",
        text: address,
        icon: "success",
        confirmButtonText: "Copy",
        didOpen: () => {
            document.querySelector(".swal2-title").style.fontSize = "16px";
            document.querySelector(".swal2-title").style.lineHeight = "1.5";
            document.querySelector(".swal2-html-container").style.fontSize = "15px";
            document.querySelector(".swal2-html-container").style.lineHeight = "1.5";
            document.querySelector(".swal2-confirm").style.fontSize = "13px";
            document.querySelector(".swal2-confirm").style.padding = "8px 16px";
        }
    }).then(() => {
        navigator.clipboard.writeText(address)
            .then(() => {
                Swal.fire({
                    title: "Copied!",
                    text: "Address copied to clipboard.",
                    icon: "success",
                    confirmButtonText: "OK",
                    didOpen: () => {
                        document.querySelector(".swal2-title").style.fontSize = "16px";
                        document.querySelector(".swal2-title").style.lineHeight = "1.5";
                        document.querySelector(".swal2-html-container").style.fontSize = "15px";
                        document.querySelector(".swal2-html-container").style.lineHeight = "1.5";
                        document.querySelector(".swal2-confirm").style.fontSize = "13px";
                        document.querySelector(".swal2-confirm").style.padding = "8px 16px";
                    }
                });
            })
            .catch(() => {
                Swal.fire({
                    title: "Oops!",
                    text: "Failed to copy.",
                    icon: "error",
                    confirmButtonText: "Try Again",
                    didOpen: () => {
                        document.querySelector(".swal2-title").style.fontSize = "16px";
                        document.querySelector(".swal2-title").style.lineHeight = "1.5";
                        document.querySelector(".swal2-html-container").style.fontSize = "15px";
                        document.querySelector(".swal2-html-container").style.lineHeight = "1.5";
                        document.querySelector(".swal2-confirm").style.fontSize = "13px";
                        document.querySelector(".swal2-confirm").style.padding = "8px 16px";
                    }
                });
            });
    });
});

