// // Get DOM elements

// const tabsData = [
//   {
//     mainTab: "Frequent Questions",
//     subTabs: [
//       {
//         question: "How does Order.UK work?",
//         content: {
//           gridItems: [
//             {
//               title: "Place an Order!",
//               image: "./assets/order-food 1.png",
//               description: "Place order through our website or Mobile app",
//             },
//             {
//               title: "Track Progress",
//               image: "./assets/food 1.png",
//               description: "Double check your address and order items",
//             },
//             {
//               title: "Get Your Order",
//               image: "./assets/order 1.png",
//               description: "Get your food at your doorstep with live tracking",
//             },
//           ],
//           paragraph:
//             "Order.UK simplifies the food ordering process. Browse through our diverse menu, select your favorite dishes, and proceed to checkout. Your delicious meal will be on its way to your doorstep in no time!",
//         },
//       },
//       {
//         question: "What payment methods are accepted?",
//         content: {
//           gridItems: [
//             {
//               title: "Credit/Debit Cards",
//               image: "./assets/food 1.png",
//               description: "Visa, Mastercard, and more accepted",
//             },
//             {
//               title: "Cash on Delivery",
//               image: "./assets/order-food 1.png",
//               description: "Pay with cash when your order arrives",
//             },
//             {
//               title: "Mobile Wallets",
//               image: "./assets/order 1.png",
//               description: "JazzCash, EasyPaisa, and other wallets supported",
//             },
//           ],
//           paragraph:
//             "We support all major payment methods including cards, wallets, and cash to make your experience seamless.",
//         },
//       },
//       {
//         question: "Can I track my order in real-time?",
//         content: {
//           gridItems: [
//             {
//               title: "Live Order Updates",
//               image: "./assets/order 1.png",
//               description: "Track your food with GPS in real-time",
//             },
//             {
//               title: "Delivery ETA",
//               image: "./assets/food 1.png",
//               description: "Estimated arrival time shown live",
//             },
//             {
//               title: "Driver Contact",
//               image: "./assets/order-food 1.png",
//               description: "Get in touch with the driver if needed",
//             },
//           ],
//           paragraph:
//             "Yes, you can track your food from preparation to delivery with our live order tracking system.",
//         },
//       },

//       {
//         question: "Is Order.UK available in my area?",
//         content: {
//           gridItems: [
//             {
//               title: "Live Order Updates",
//               image: "./assets/order-food 1.png",
//               description: "Track your food with GPS in real-time",
//             },
//             {
//               title: "Delivery ETA",
//               image: "./assets/food 1.png",
//               description: "Estimated arrival time shown live",
//             },
//             {
//               title: "Driver Contact",
//               image: "./assets/order 1.png",
//               description: "Get in touch with the driver if needed",
//             },
//           ],
//           paragraph:
//             "Yes, you can track your food from preparation to delivery with our live order tracking system.",
//         },
//       },
//     ],
//   },
//   {
//     mainTab: "Who we are?",
//     subTabs: [
//       {
//         question: "Our Mission",
//         content: {
//           gridItems: [
//             {
//               title: "Local Focus",
//               image: "./assets/order 1.png",
//               description: "Empowering local restaurants",
//             },
//             {
//               title: "Reliable Delivery",
//               image: "./assets/order-food 1.png",
//               description: "Delivering quality every time",
//             },
//             {
//               title: "Community Driven",
//               image: "./assets/food 1.png",
//               description: "Serving with responsibility",
//             },
//           ],
//           paragraph:
//             "Our mission is to connect people with great food and support the local economy by enabling restaurant growth.",
//         },
//       },
//       {
//         question: "Our Values",
//         content: {
//           gridItems: [
//             {
//               title: "Integrity",
//               image: "./assets/food 1.png",
//               description: "We are transparent and honest",
//             },
//             {
//               title: "Innovation",
//               image: "./assets/order 1.png",
//               description: "Constantly evolving with technology",
//             },
//             {
//               title: "Customer First",
//               image: "./assets/order-food 1.png",
//               description: "Every decision revolves around our users",
//             },
//           ],
//           paragraph:
//             "We believe in integrity, innovation, and putting customers at the center of everything we do.",
//         },
//       },
//       {
//         question: "Our History",
//         content: {
//           gridItems: [
//             {
//               title: "Founded in 2020",
//               image: "./assets/order-food 1.png",
//               description: "Started with a small team in Lahore",
//             },
//             {
//               title: "Growing Fast",
//               image: "./assets/order 1.png",
//               description: "Now serving in 10+ cities",
//             },
//             {
//               title: "Award-Winning",
//               image: "./assets/food 1.png",
//               description: "Recognized for best food delivery experience",
//             },
//           ],
//           paragraph:
//             "From a small startup to a nationwide delivery platform, our journey is defined by hard work and community support.",
//         },
//       },
//     ],
//   },
//   {
//     mainTab: "Partner Program",
//     subTabs: [
//       {
//         question: "Why partner with us?",
//         content: {
//           gridItems: [
//             {
//               title: "Increased Reach",
//               image: "./assets/food 1.png",
//               description: "Tap into a wide customer base",
//             },
//             {
//               title: "Easy Integration",
//               image: "./assets/order-food 1.png",
//               description: "Join with minimal setup",
//             },
//             {
//               title: "Marketing Boost",
//               image: "./assets/order 1.png",
//               description: "We promote your restaurant",
//             },
//           ],
//           paragraph:
//             "Partnering with Order.UK gives you access to more customers, robust support, and growth opportunities.",
//         },
//       },
//       {
//         question: "How to get started?",
//         content: {
//           gridItems: [
//             {
//               title: "Sign Up Online",
//               image: "./assets/order 1.png",
//               description: "Fill out our simple onboarding form",
//             },
//             {
//               title: "Verify Details",
//               image: "./assets/food 1.png",
//               description: "We review your business details",
//             },
//             {
//               title: "Start Selling",
//               image: "./assets/order-food 1.png",
//               description: "List your menu and begin receiving orders",
//             },
//           ],
//           paragraph:
//             "Getting started is easy. Just sign up, verify your details, and you'll be ready to serve more customers.",
//         },
//       },
//       {
//         question: "Success Stories",
//         content: {
//           gridItems: [
//             {
//               title: "Fast Growth",
//               image: "./assets/order-food 1.png",
//               description: "40% order increase within 3 months",
//             },
//             {
//               title: "Strong Branding",
//               image: "./assets/food 1.png",
//               description: "Brand visibility across the city",
//             },
//             {
//               title: "Positive Reviews",
//               image: "./assets/order 1.png",
//               description: "Thousands of happy customers",
//             },
//           ],
//           paragraph:
//             "Hundreds of partners have scaled their business and reached new customers with our platform.",
//         },
//       },
//     ],
//   },
//   {
//     mainTab: "Help & Support",
//     subTabs: [
//       {
//         question: "Need help with an order?",
//         content: {
//           gridItems: [
//             {
//               title: "Live Chat",
//               image: "./assets/order 1.png",
//               description: "Get support from our agents instantly",
//             },
//             {
//               title: "Call Support",
//               image: "./assets/order-food 1.png",
//               description: "Available 9am–12am every day",
//             },
//             {
//               title: "Order History",
//               image: "./assets/food 1.png",
//               description: "Find and manage previous orders",
//             },
//           ],
//           paragraph:
//             "We’re always here to help. Use our live chat, call support, or review your order history for solutions.",
//         },
//       },
//       {
//         question: "Having payment issues?",
//         content: {
//           gridItems: [
//             {
//               title: "Refund Requests",
//               image: "./assets/food 1.png",
//               description: "Submit refund within 24 hours",
//             },
//             {
//               title: "Payment Status",
//               image: "./assets/order 1.png",
//               description: "Track success or failure of payment",
//             },
//             {
//               title: "Support Center",
//               image: "./assets/order-food 1.png",
//               description: "Find answers to common issues",
//             },
//           ],
//           paragraph:
//             "Facing a payment issue? Contact our support and get fast resolution or apply for a refund easily.",
//         },
//       },
//       {
//         question: "Can’t log in?",
//         content: {
//           gridItems: [
//             {
//               title: "Forgot Password",
//               image: "./assets/order-food 1.png",
//               description: "Reset via SMS or email",
//             },
//             {
//               title: "Account Lock",
//               image: "./assets/food 1.png",
//               description: "Contact support if your account is locked",
//             },
//             {
//               title: "Security Settings",
//               image: "./assets/order 1.png",
//               description: "Keep your account safe with 2FA",
//             },
//           ],
//           paragraph:
//             "If you're having trouble logging in, reset your password or contact our support to unlock your account.",
//         },
//       },
//     ],
//   },
// ];
// const mainTabs = document.getElementById("mainTabs");
// const subTabs = document.getElementById("subTabs");
// const tabContent = document.getElementById("tabContent");

// // Function to create tabbed UI
// function initTabs(data) {
//   data.forEach((tab, i) => {
//     const li = document.createElement("li");
//     li.className =
//       "main-tab px-6 py-2 rounded-full cursor-pointer whitespace-nowrap font-medium text-darkgrey bg-white border border-gray-200 hover:bg-light-green hover:text-white transition-all";
//     li.textContent = tab.mainTab;
//     if (i === 0) li.classList.add("active-tab", "bg-light-green", "text-white");

//     li.addEventListener("click", () => {
//       document.querySelectorAll(".main-tab").forEach((t) =>
//         t.classList.remove("bg-light-green", "text-white")
//       );
//       li.classList.add("bg-light-green", "text-white");
//       loadSubTabs(tab.subTabs);
//     });

//     mainTabs.appendChild(li);
//   });

//   // Load first tab's sub tabs by default
//   loadSubTabs(data[0].subTabs);
// }

// function loadSubTabs(subTabsData) {
//   subTabs.innerHTML = "";
//   tabContent.innerHTML = "";

//   subTabsData.forEach((item, index) => {
//     const li = document.createElement("li");
//     li.className =
//       "sub-tab text-white text-center cursor-pointer px-4 py-2 rounded-full border border-light-gray hover:bg-white hover:text-black transition-all";
//     li.textContent = item.question;
//     if (index === 0)
//       li.classList.add("bg-white", "text-black", "font-semibold");

//     li.addEventListener("click", () => {
//       document.querySelectorAll(".sub-tab").forEach((t) =>
//         t.classList.remove("bg-white", "text-black", "font-semibold")
//       );
//       li.classList.add("bg-white", "text-black", "font-semibold");
//       loadContent(item.content);
//     });

//     subTabs.appendChild(li);
//   });

//   // Load first sub tab content by default
//   loadContent(subTabsData[0].content);
// }

// function loadContent(content) {
//   const grid = document.createElement("div");
//   grid.className =
//     "grid md:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-6 mb-6 text-center";

//   content.gridItems.forEach((item) => {
//     const card = document.createElement("div");
//     card.className =
//       "bg-white bg-opacity-10 backdrop-blur-lg p-4 rounded-lg flex flex-col items-center justify-center gap-2";

//     const img = document.createElement("img");
//     img.src = item.image;
//     img.alt = item.title;
//     img.className = "h-16 w-16 object-contain";

//     const title = document.createElement("h4");
//     title.textContent = item.title;
//     title.className = "font-bold text-lg mt-2";

//     const desc = document.createElement("p");
//     desc.textContent = item.description;
//     desc.className = "text-sm opacity-80";

//     card.appendChild(img);
//     card.appendChild(title);
//     card.appendChild(desc);
//     grid.appendChild(card);
//   });

//   const para = document.createElement("p");
//   para.textContent = content.paragraph;
//   para.className = "text-sm mt-6 opacity-90 leading-relaxed text-center";

//   tabContent.innerHTML = "";
//   tabContent.appendChild(grid);
//   tabContent.appendChild(para);
// }

// // Initialize tabs on DOM load
// initTabs(tabsData);

// // Scrollable tabs functionality
// const mainTabsWrapper = document.getElementById("mainTabsWrapper");
// const scrollLeftBtn = document.getElementById("mainTabsScrollLeft");
// const scrollRightBtn = document.getElementById("mainTabsScrollRight");

// function updateScrollButtons() {
//   scrollLeftBtn.classList.toggle("hidden", mainTabsWrapper.scrollLeft <= 0);
//   scrollRightBtn.classList.toggle(
//     "hidden",
//     mainTabsWrapper.scrollLeft + mainTabsWrapper.offsetWidth >=
//       mainTabsWrapper.scrollWidth
//   );
// }

// scrollLeftBtn.addEventListener("click", () => {
//   mainTabsWrapper.scrollBy({ left: -150, behavior: "smooth" });
// });

// scrollRightBtn.addEventListener("click", () => {
//   mainTabsWrapper.scrollBy({ left: 150, behavior: "smooth" });
// });

// mainTabsWrapper.addEventListener("scroll", updateScrollButtons);
// window.addEventListener("resize", updateScrollButtons);
// window.addEventListener("load", updateScrollButtons);


    <!-- Swipper Section  -->

    <section
      class="custom-max-w bg-light-gray min-h-[700px] lg:my-12 my-6 rounded-md bg-opacity-[30%] py-16 px-8 flex justify-center"
    >
      <div class="h-full w-full items-center justify-center">
        <div
          class="head flex justify-between items-center flex-wrap gap-4 relative w-full"
        >
          <h3 class="xl:text-[36px] md:text-[30px] text-[27px] font-bold">
            Know more about us!
          </h3>

          <!-- Scrollable Tab Container -->
          <div class="relative w-full xl:w-auto ml-auto">
            <!-- Left Scroll Button -->
            <button
              id="mainTabsScrollLeft"
              class="absolute left-1 top-1/2 -translate-y-1/2 z-10 p-2 h-8 w-8 hidden items-center justify-center rounded-full bg-white shadow"
            >
              <img src="../assets/arrow_left.png" class="transform" alt="Left" />
            </button>

            <!-- Scrollable Wrapper -->
            <div
              id="mainTabsWrapper"
              class="md:overflow-visible overflow-x-auto scrollbar-hide md:py-0 py-4 lg:px-6"
            >
              <ul
                id="mainTabs"
                class="flex items-center w-max xl:gap-4 md:gap-2 gap-1"
              >
                <!-- Tabs go here -->
              </ul>
            </div>

            <!-- Right Scroll Button -->
            <button
              id="mainTabsScrollRight"
              class="absolute right-1 top-1/2 -translate-y-1/2 z-10 p-2 h-8 w-8 hidden items-center justify-center rounded-full bg-white shadow"
            >
              <img
                src="../assets/arrow_left.png"
                class="transform rotate-180"
                alt="Right"
              />
            </button>
          </div>
        </div>

        <div
          class="c mt-10 bg-light-darkbg rounded-[12px] xl:min-h-[526px] flex xl:flex-row flex-col text-white items-center"
        >
          <div
            class="left xl:py-16 py-8 md:px-4 px-2 xl:border-r xl:max-w-[500px]"
          >
            <ul
              class="flex xl:flex-col flex-row items-center xl:gap-12 md:gap-4 gap-2 flex-wrap xl:justify-start justify-center"
              id="subTabs"
            ></ul>
          </div>
          <div class="divider h-full w-1 bg-light-gray xl:block hidden"></div>
          <div
            class="right max-w-[800px] mx-auto xl:py-16 py-8 xl:px-0 px-8"
            id="tabContent"
          ></div>
        </div>
      </div>
    </section>