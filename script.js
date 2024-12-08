let cart = JSON.parse(localStorage.getItem('cart')) || []; // Load cart from localStorage
let cartPopup = document.getElementById('cart-popup');
let cartItemsDiv = document.getElementById('cart-items');
let shakeBox = document.getElementById('shake-box');
let cartIcon = document.getElementById('cart');

// Load user login status and username from localStorage
let isLoggedIn = localStorage.getItem('isLoggedIn') === 'true'; // Check if the user is logged in
let username = localStorage.getItem('username') || ''; // Get the username from localStorage

// Add cart counter element to the cart icon
let cartCount = document.createElement('span');
cartCount.id = 'cart-count';
cartIcon.appendChild(cartCount);

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
    cartItemsDiv.innerHTML = '';
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
    // Save cart to localStorage
    localStorage.setItem('cart', JSON.stringify(cart));
}

// Remove item from the cart
function removeItem(index) {
    cart.splice(index, 1);
    updateCart();
}

// Show toast notifications
function showToast(message) {
    const toast = document.createElement('div');
    toast.className = 'toast';
    toast.textContent = message;
    document.body.appendChild(toast);
    setTimeout(() => {
        toast.classList.add('show');
    }, 100);
    setTimeout(() => {
        toast.classList.remove('show');
        setTimeout(() => {
            document.body.removeChild(toast);
        }, 500);
    }, 3000);
}

// Confirm the order and check login and cart status
function confirmOrder() {
    // Check if the cart is empty
    if (cart.length === 0) {
        showToast("Your cart is empty. Please add items to your cart before purchasing.");
        return;
    }

    // Check if the user is logged in
    if (!isLoggedIn) {
        showToast("Please log in to proceed with the purchase.");
        window.location.href = "https://codepen.io/KIDS-LEARNING-FOR-EVRYONE/full/bBwGpXg"; // Redirect to login page
        return;
    }

    // If both checks pass, confirm the order
    showToast("Order confirmed! Thank you for your purchase.");
    // Here you can store the order details or process it as needed
    cart = []; // Reset the cart
    updateCart();
    cartPopup.style.display = 'none'; // Hide cart popup
}

// Simulate user login
function login(user) {
    username = user; // Store the username
    isLoggedIn = true; // Update login status
    localStorage.setItem('username', username); // Store username in localStorage
    localStorage.setItem('isLoggedIn', 'true'); // Set login status in localStorage
    showToast(`Welcome, ${username}!`); // Alert the user
    // Redirect to cart page after login
    window.location.href = "https://codepen.io/KIDS-LEARNING-FOR-EVRYONE/full/OPLNmEv"; 
}

// Display greeting message on the cart page
function displayGreeting() {
    if (isLoggedIn) {
        document.getElementById("greeting").textContent = `Hello, ${username}!`;
        // Show any orders if necessary
        if (cart.length > 0) {
            document.getElementById("order-summary").innerHTML = `Your current order: ${cart.join(', ')}`;
        }
    }
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

// Call this function on the cart page load to show the greeting and cart items
window.onload = () => {
    displayGreeting();
    updateCart(); // Update cart display on page load
};
