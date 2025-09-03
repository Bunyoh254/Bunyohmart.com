// Load products
if (document.getElementById("product-list")) {
  fetch("products.json")
    .then(res => res.json())
    .then(products => {
      let container = document.getElementById("product-list");
      products.forEach(p => {
        container.innerHTML += `
          <div class="card">
            <img src="${p.image}" alt="${p.name}" width="150">
            <h3>${p.name}</h3>
            <p>$${p.price}</p>
            <button onclick="addToCart(${p.id}, '${p.name}', ${p.price})">Add to Cart</button>
          </div>
        `;
      });
    });
}

// Add to cart
function addToCart(id, name, price) {
  let cart = JSON.parse(localStorage.getItem("cart")) || [];
  cart.push({ id, name, price });
  localStorage.setItem("cart", JSON.stringify(cart));
  alert(`${name} added to cart!`);
}

// Show cart items
if (document.getElementById("cart-items")) {
  let cart = JSON.parse(localStorage.getItem("cart")) || [];
  let container = document.getElementById("cart-items");
  let total = 0;

  cart.forEach((item, index) => {
    total += item.price;
    container.innerHTML += `
      <p>${item.name} - $${item.price} 
      <button onclick="removeFromCart(${index})">Remove</button></p>
    `;
  });

  document.getElementById("cart-total").textContent = "Total: $" + total.toFixed(2);
}

// Remove from cart
function removeFromCart(index) {
  let cart = JSON.parse(localStorage.getItem("cart")) || [];
  cart.splice(index, 1);
  localStorage.setItem("cart", JSON.stringify(cart));
  location.reload();
}

// Fake order placement
function placeOrder(e) {
  e.preventDefault();
  localStorage.removeItem("cart"); // clear cart
  window.location.href = "order_confirmation.html";
}
