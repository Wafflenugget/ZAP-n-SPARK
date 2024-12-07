let cart = [];
let cartPopup = document.getElementById('cart-popup');
let cartItemsDiv = document.getElementById('cart-items');
let shakeBox = document.getElementById('shake-box');
let cartIcon = document.getElementById('cart');

function toggleCart() {
    cartPopup.style.display = cartPopup.style.display === 'block' ? 'none' : 'block';
}

function addToCart(product) {
    cart.push(product);
    updateCart();
    triggerShake();
}

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
}

function removeItem(index) {
    cart.splice(index, 1);
    updateCart();
}

function confirmOrder() {
    alert("Order confirmed! Thank you for your purchase.");
    cart = [];
    updateCart();
    cartPopup.style.display = 'none';
}

function triggerShake() {
    shakeBox.style.display = 'block';
    setTimeout(() => {
        shakeBox.style.display = 'none';
    }, 2000);
}

// Shake every 20 seconds
setInterval(triggerShake, 20000);
