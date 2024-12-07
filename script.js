let cart = [];
let cartPopup = document.getElementById('cart-popup');
let cartItemsDiv = document.getElementById('cart-items');
let cartIcon = document.getElementById('cart');

function toggleCart() {
    cartPopup.style.display = cartPopup.style.display === 'block' ? 'none' : 'block';
}

function addToCart(product) {
    cart.push(product);
    updateCart();
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

function confirmPurchase() {
    // Show payment section after confirming purchase
    document.getElementById('payment-section').style.display = 'block';
    document.getElementById('confirm-btn').style.display = 'none';  // Hide the confirm button
}

function completePayment() {
    // Simulate payment completion (replace this with actual payment gateway integration)
    alert('Payment Successful! Thank you for your purchase.');
    
    // Show the redirect message after payment is complete
    document.getElementById('payment-section').style.display = 'none';
    document.getElementById('redirect-message').style.display = 'block';
}

function redirectToGallery() {
    // Redirect back to the product
