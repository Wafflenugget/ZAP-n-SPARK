let cart = [];
let cartPopup = document.getElementById('cart-popup');
let cartItemsDiv = document.getElementById('cart-items');
let shakeBox = document.getElementById('shake-box');
let cartIcon = document.getElementById('cart');

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
}

// Remove item from the cart
function removeItem(index) {
    cart.splice(index, 1);
    updateCart();
}

// Confirm the order and reset the cart
function confirmOrder() {
    alert("Order confirmed! Thank you for your purchase.");
    cart = [];
    updateCart();
    cartPopup.style.display = 'none';
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