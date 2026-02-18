document.addEventListener("DOMContentLoaded", function () {

  const products = [
    { id: 1, name: "Wireless Headphones", price: 1499, image: "images/headphone.jpg" },
    { id: 2, name: "Smart Watch", price: 2999, image: "images/watch.jpg" },
    { id: 3, name: "Running Shoes", price: 1999, image: "images/shoes.jpg" },
    { id: 4, name: "Bluetooth Speaker", price: 999, image: "images/speaker.jpg" }
  ];

  const productList = document.getElementById("product-list");
  const cartCount = document.getElementById("cart-count");
  const searchInput = document.getElementById("search");

  let cart = JSON.parse(localStorage.getItem("cart")) || [];

  function saveCart() {
    localStorage.setItem("cart", JSON.stringify(cart));
  }

  function updateCartUI() {
    if (cartCount) {
      const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
      cartCount.textContent = "🛒 " + totalItems;
    }
  }

  function renderProducts(productArray) {
    if (!productList) return;

    productList.innerHTML = "";

    productArray.forEach(product => {
      const card = document.createElement("div");
      card.className = "product-card";

      card.innerHTML = `
        <img src="${product.image}" alt="${product.name}">
        <h3>${product.name}</h3>
        <p>₹${product.price}</p>
        <button>Add to Cart</button>
      `;

      card.querySelector("button").addEventListener("click", () => {
        addToCart(product);
      });

      productList.appendChild(card);
    });
  }

  function addToCart(product) {
    const existing = cart.find(item => item.id === product.id);

    if (existing) {
      existing.quantity += 1;
    } else {
      cart.push({ ...product, quantity: 1 });
    }

    saveCart();
    updateCartUI();
    alert(product.name + " added to cart!");
  }

  if (searchInput) {
    searchInput.addEventListener("input", function () {
      const value = this.value.toLowerCase();
      const filtered = products.filter(p =>
        p.name.toLowerCase().includes(value)
      );
      renderProducts(filtered);
    });
  }

  renderProducts(products);
  updateCartUI();

  if ("serviceWorker" in navigator) {
    navigator.serviceWorker.register("sw.js")
      .then(() => console.log("Service Worker Registered"));
  }

});
