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

// Display greeting message and prompt for purchase
function displayGreeting() {
    const greetingElement = document.getElementById("greeting");
    const purchasePromptElement = document.getElementById("purchase-prompt");
    
    if (isLoggedIn) {
        greetingElement.textContent = `Hello, ${username}! You are logged in.`;
        purchasePromptElement.textContent = "Click 'Confirm Purchase' to get your crafts.";
    } else {
        greetingElement.textContent = "Hello! Please log in to proceed.";
        purchasePromptElement.textContent = ""; // Clear prompt if not logged in
    }
}

// Toggle the cart popup visibility
function toggleCart() {
    cartPopup.classList.toggle('show');
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

    // Check if the user is logged in
    if (!isLoggedIn) {
        alert("Please log in to proceed with the purchase.");
        window.location.href = "https://wafflenugget.github.io/login-page/"; // Redirect to login page
        return;
    }

    // Show survey for shipping details
    let shippingName = prompt("Please enter your name for shipping:");
    let shippingAddress = prompt("Please enter your shipping address:");
    
    if (shippingName && shippingAddress) {
        alert(`Thank you, ${shippingName}! Your order will be shipped to ${shippingAddress}.`);
        // Here you could send the order details to a server or process it as needed
        cart = []; // Reset the cart
        updateCart();
        cartPopup.style.display = 'none'; // Hide cart popup
    } else {
        alert("Shipping details are required to complete your order.");
    }
}

// Simulate user login
function login(user) {
    username = user; // Store the username
    isLoggedIn = true; // Update login status
    localStorage.setItem('username', username); // Store username in localStorage
    alert(`Welcome, ${username}!`); // Alert the user
    // Update greeting and prompt
    displayGreeting();
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

// Call this function on the page load to show the greeting
window.onload = function() {
    updateCart(); // Update cart display
    displayGreeting(); // Display greeting if logged in
};
