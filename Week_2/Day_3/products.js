const products = (id, type) => {
  fetch("./data.json")
    .then((response) => response.json())
    .then((data) => {
      const menuContainer = document.getElementById(`${id}`);
      const Items = data.filter((item) => item.type === `${type}`);

      Items.forEach((item) => {
        const card = document.createElement("div");
        card.className =
          "flex justify-between items-center py-4 2xl:py-1 3xl:w-[496px] 3xl:h-[245px] rounded-lg shadow-[0_0_15px_5px_rgba(0,0,0,0.2)] px-5 gap-x-2";

        card.innerHTML = `
        <div class="space-y-4">
          <h1 class="font-bold text-base xl:text-xl">${item.title}</h1>
          <p class="text-[10px] xl:text-sm text-gray-700">${item.description}</p>
          <p class="font-bold text-base md:text-lg">${item.price}</p>
        </div>
        <div class="w-[300px] relative">
          <img src="${item.image}" alt="${item.title}" class="w-full h-auto">
          <button class="add-to-cart absolute right-0 bottom-0 bg-white/90 rounded-tl-3xl p-2"
            data-title="${item.title}"
            data-price="${item.price}"
            data-description="${item.description}"><img src="./assets/Plus.png" class="w-6 h-6 3xl:w-auto 3xl:h-auto"></button>
        </div>
      `;

        menuContainer.appendChild(card);
        const addToCartBtn = card.querySelector(".add-to-cart");

        addToCartBtn.addEventListener("click", () => {
          const product = {
            title: addToCartBtn.dataset.title,
            price: addToCartBtn.dataset.price,
            description: addToCartBtn.dataset.description,
          };

          addToCart(product);
          console.log("Cart:", cart);
        });
      });
    })
    .catch((error) => console.error("Error loading menu:", error));
};


// Search and Filter Logic 

products("burger-section", "burger");
products("fries-section", "fries");
products("drinks-section", "drinks");
