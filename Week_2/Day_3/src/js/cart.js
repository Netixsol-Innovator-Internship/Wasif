const cartOverlay = document.getElementById("cart-overlay");
const toggleBtn = document.getElementById("cart-toggle");
const cartBtn = document.getElementById("show-cart-button");

let cart = [];

toggleBtn.addEventListener("click", () => {
  cartOverlay.classList.add("hidden");
});

cartBtn?.addEventListener("click", () => {
  cartOverlay.classList.remove("hidden");
  renderCart();
});

function addToCart(product) {
  const existing = cart.find((item) => item.title === product.title);
  if (existing) {
    existing.quantity += 1;
  } else {
    cart.push({ ...product, quantity: 1 });
  }

  renderCart();
}

function renderCart() {
  const cartItemsContainer = document.getElementById("cart-items");
  const totalDisplay = document.getElementById("cart-total");

  cartItemsContainer.innerHTML = "";
  let total = 0;

  cart.forEach((item, index) => {
    const itemPrice = parseFloat(item.price.replace("GBP", "").trim());
    const subtotal = item.quantity * itemPrice;
    total += subtotal;

    const itemEl = document.createElement("div");
    itemEl.className =
      "flex justify-between items-center bg-gray-100 rounded p-3";

    itemEl.innerHTML = `
      <div class="flex flex-col md:flex-row items-center gap-4">
        <img src="${item.image}" alt="${item.title}" class="w-14 h-14 rounded-full object-cover">
        <div>
          <h3 class="font-bold text-sm">${item.title}</h3>
          <p class="text-xs text-gray-600">${item.description}</p>
        </div>
      </div>
      <div class="flex items-center gap-2">
        <button class="decrease bg-white border px-2 rounded text-lg" data-index="${index}">-</button>
        <span class="font-semibold text-sm">${item.quantity}</span>
        <button class="increase bg-white border px-2 rounded text-lg" data-index="${index}">+</button>
      </div>
    `;

    cartItemsContainer.appendChild(itemEl);
  });

  totalDisplay.textContent = `£${total.toFixed(2)}`;

  document.querySelectorAll(".increase").forEach((btn) =>
    btn.addEventListener("click", () => {
      const i = btn.dataset.index;
      cart[i].quantity += 1;
      renderCart();
    })
  );

  document.querySelectorAll(".decrease").forEach((btn) =>
    btn.addEventListener("click", () => {
      const i = btn.dataset.index;
      if (cart[i].quantity > 1) {
        cart[i].quantity -= 1;
      } else {
        cart.splice(i, 1);
      }
      renderCart();
    })
  );
}
