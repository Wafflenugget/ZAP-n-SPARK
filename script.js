let cart = [];
let cartPopup = document.getElementById('cart-popup');
let cartItemsDiv = document.getElementById('cart-items');
let shakeBox = document.getElementById('shake-box');
let cartIcon = document.getElementById('cart');

// Load user data and cart items from localStorage on page load
let username = localStorage.getItem('username'); // Retrieve username from localStorage
let isLoggedIn = username !== null; // Check if user is logged in
cart = JSON.parse(localStorage.getItem('cart')) || []; // Retrieve cart items

// Add cart counter element to the cart icon
let cartCount = document.createElement('span');
cartCount.id = 'cart-count';
cartIcon.appendChild(cartCount);

// Display greeting message and prompt for purchase only when the cart is clicked
function displayGreeting() {
    const greetingElement = document.getElementById("greeting");
    const purchasePromptElement = document.getElementById("purchase-prompt");
    
    if (isLoggedIn) {
        greetingElement.textContent = `Hello, ${username}! Please log in again to continue.`;
        purchasePromptElement.textContent = "Click 'Confirm Purchase' to get your crafts.";
    } else {
        greetingElement.textContent = "Hello! Please log in to proceed.";
        purchasePromptElement.textContent = ""; // Clear prompt if not logged in
    }
}

// Toggle the cart popup visibility and show greeting/prompt
function toggleCart() {
    cartPopup.classList.toggle('show');
    displayGreeting(); // Display greeting and prompt when the cart is clicked
}

// Add product to cart
function addToCart(product) {
    cart.push(product);
    updateCart();
    triggerShake();
}

// Update cart display
function updateCart() {
    cartItemsDiv.innerHTML = ''; // Clear existing items
    cart.forEach((item, index) => {
        let div = document.createElement('div');
        div.classList.add('cart-item');
        div.innerHTML = `
            <span>${item}</span>
            <button class="delete-btn" onclick="removeItem(${index})">Delete</button>
        `;
        cartItemsDiv.appendChild(div);
    });

    // Update cart item count
    cartCount.textContent = cart.length;

    // Store cart items in localStorage
    localStorage.setItem('cart', JSON.stringify(cart));
}

// Remove item from the cart
function removeItem(index) {
    cart.splice(index, 1);
    updateCart();
}

// Confirm the order and check login and cart status
function confirmOrder() {
    // Check if the cart is empty
    if (cart.length === 0) {
        alert("Your cart is empty. Please add items to your cart before purchasing.");
        return;
    }

    // Show survey for shipping details
    let shippingName = prompt("Please enter your name for shipping:");
    let shippingAddress = prompt("Please enter your shipping address:");

    // Validate shipping details
    if (!shippingName || !shippingAddress) {
        alert("Both name and address are required to complete your order.");
        return;
    }

    // Check for length and characters
    if (shippingName.length < 2 || shippingAddress.length < 5) {
        alert("Please enter a valid name (at least 2 characters) and address (at least 5 characters).");
        return;
    }

    // Check for special characters (optional)
    const nameRegex = /^[a-zA-Z\s]+$/; // Only letters and spaces
    const addressRegex = /^[a-zA-Z0-9\s,.'-]+$/; // Letters, numbers, spaces, commas, periods, apostrophes, and hyphens

    if (!nameRegex.test(shippingName)) {
        alert("Please enter a valid name without special characters.");
        return;
    }

    if (!addressRegex.test(shippingAddress)) {
        alert("Please enter a valid address without special characters.");
        return;
    }

    alert(`Thank you, ${shippingName}! Your order will be shipped to ${shippingAddress}.`);
    cart = []; // Reset the cart
    updateCart();
    cartPopup.style.display = 'none'; // Hide cart popup
}

// Simulate user login
function login(user) {
    username = user; // Store the username
    isLoggedIn = true; // Update login status
    localStorage.setItem('username', username); // Store username in localStorage
    alert(`Welcome, ${username}!`); // Alert the user
    // Redirect to the ZAP-n-SPARK buying page
    window.location.href = "https://wafflenugget.github.io/ZAP-n-SPARK/";
}

// Trigger shake effect
function triggerShake() {
    shakeBox.style.display = 'block';
    setTimeout(() => {
        shakeBox.style.display = 'none';
    }, 2000);
}

// Shake every 20 seconds
setInterval(triggerShake, 20000);

// Update cart on page load
window.onload = function() {
    updateCart(); // Update cart display
};