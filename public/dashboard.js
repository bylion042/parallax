// ACTIVES ON SIDE BAR 
document.addEventListener("DOMContentLoaded", function () {
    const links = document.querySelectorAll(".link-container a");

    links.forEach(link => {
        link.addEventListener("click", function () {
            // Remove active class from all links
            links.forEach(l => l.classList.remove("active"));

            // Add active class to clicked link
            this.classList.add("active");
        });
    });
});



// GARALLY OPENING  
document.addEventListener("DOMContentLoaded", function () {
    const profileLink = document.getElementById("profile-link");
    const galleryOverlay = document.getElementById("gallery");
    const closeGallery = document.getElementById("close-gallery");

    // Open the gallery when clicking "Profile"
    profileLink.addEventListener("click", function (event) {
        event.preventDefault(); // Prevent default link behavior
        galleryOverlay.classList.add("active");
    });

    // Close when clicking the "X" button
    closeGallery.addEventListener("click", function () {
        galleryOverlay.classList.remove("active");
    });

    // Close when clicking outside the popup
    galleryOverlay.addEventListener("click", function (event) {
        if (event.target === galleryOverlay) {
            galleryOverlay.classList.remove("active");
        }
    });
});



// ALL ABOUT GETTING CODE TO ACCESS THE SWAP PAGE
document.addEventListener("DOMContentLoaded", function () {
    function setupSwapCodeSystem() {
        const getCodeBtns = document.querySelectorAll("#getcode"); // Select all "Get Code" buttons
        const swapBtns = document.querySelectorAll("#swap"); // Select all "Swap" buttons

        getCodeBtns.forEach((btn) => {
            btn.addEventListener("click", function (event) {
                event.preventDefault(); 
                const swapCode = Math.floor(10000 + Math.random() * 90000); // Generate 5-digit code
                sessionStorage.setItem("swapCode", swapCode); // Store the code
                alert(`Your Swap Code: ${swapCode}`); // Show the code
            });
        });

        swapBtns.forEach((btn) => {
            btn.addEventListener("click", function (event) {
                event.preventDefault(); 
                const userCode = prompt("Enter your Swap Code:");
                const storedCode = sessionStorage.getItem("swapCode");

                if (userCode === storedCode) {
                    window.location.href = "/swap"; // Redirect if correct
                } else {
                    alert("Invalid Swap Code! Please try again.");
                }
            });
        });
    }

    setupSwapCodeSystem(); // Ensure buttons work when loaded

    // If your small-screen menu is hidden by default, check when it opens
    const mobileMenu = document.querySelector(".mobile-menu"); // Adjust this selector based on your menu
    if (mobileMenu) {
        mobileMenu.addEventListener("click", () => {
            setTimeout(setupSwapCodeSystem, 500); // Wait a bit before rechecking
        });
    }
});





// DRAGABLE IMAGE 
document.addEventListener('DOMContentLoaded', () => {
    const draggable = document.querySelector('.draggable-image');
    const closeButton = document.querySelector('.close-btn');
    let isDragging = false;
    let offsetX = 0;
    let offsetY = 0;

    // Common function to start dragging
    const startDrag = (e) => {
        isDragging = true;
        draggable.style.cursor = 'grabbing';

        const rect = draggable.getBoundingClientRect();

        // Calculate offsets for mouse or touch
        if (e.type === 'mousedown') {
            offsetX = e.clientX - rect.left;
            offsetY = e.clientY - rect.top;
        } else if (e.type === 'touchstart') {
            offsetX = e.touches[0].clientX - rect.left;
            offsetY = e.touches[0].clientY - rect.top;
        }
    };

    // Common function to drag
    const onDrag = (e) => {
        if (!isDragging) return;

        // Get cursor or touch position
        let clientX, clientY;
        if (e.type === 'mousemove') {
            clientX = e.clientX;
            clientY = e.clientY;
        } else if (e.type === 'touchmove') {
            clientX = e.touches[0].clientX;
            clientY = e.touches[0].clientY;
        }

        // Update position of the draggable element
        draggable.style.left = `${clientX - offsetX}px`;
        draggable.style.top = `${clientY - offsetY}px`;
        draggable.style.right = 'auto'; // Prevent snapping back to right
        draggable.style.transform = 'none'; // Remove initial centering
    };

    // Common function to stop dragging
    const stopDrag = () => {
        isDragging = false;
        draggable.style.cursor = 'grab';
    };

    // Mouse events
    draggable.addEventListener('mousedown', (e) => {
        if (e.target.classList.contains('close-btn')) return; // Ignore drag on close button
        startDrag(e);
    });

    window.addEventListener('mousemove', onDrag);
    window.addEventListener('mouseup', stopDrag);

    // Touch events
    draggable.addEventListener('touchstart', (e) => {
        if (e.target.classList.contains('close-btn')) return; // Ignore drag on close button
        startDrag(e);
    });

    window.addEventListener('touchmove', onDrag);
    window.addEventListener('touchend', stopDrag);

    // Close functionality
    closeButton.addEventListener('click', () => {
        draggable.style.display = 'none'; // Hide the draggable container
    });
});