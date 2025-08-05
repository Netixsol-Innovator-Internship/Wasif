document.addEventListener("DOMContentLoaded", () => {
  const notifications = [
    {
      name: "Mark Webber",
      time: "1m ago",
      action: "reacted to your recent post",
      target: "My first tournament today!",
      unread: true,
      avatar: "./assets/images/avatar-mark-webber.webp",
      chess: false,
      message: "Check out the post if you haven't already!",
    },
    {
      name: "Angela Gray",
      time: "5m ago",
      action: "followed you",
      unread: true,
      avatar: "./assets/images/avatar-angela-gray.webp",
      message: "Angela has started following you. Say hello!",
    },
    {
      name: "Jacob Thompson",
      time: "1 day ago",
      action: "has joined your group",
      target: "Chess Club",
      unread: true,
      chess: true,
      avatar: "./assets/images/avatar-jacob-thompson.webp",
      message: "Jacob just joined your group. Welcome him!",
    },
    {
      name: "Rizky Hasanuddin",
      time: "5 days ago",
      action: "sent you a private message",
      unread: false,
      chess: false,
      avatar: "./assets/images/avatar-rizky-hasanuddin.webp",
      message:
        "Hello, thanks for setting up the Chess Club. I've been a member for a few weeks now and I'm already having lots of fun and improving my game.",
    },
    {
      name: "Kimberly Smith",
      time: "1 week ago",
      action: "commented on your picture",
      unread: false,
      chess: false,
      avatar: "./assets/images/avatar-kimberly-smith.webp",
      message: "Nice picture!",
      picture: "./assets/images/cmntImage.png",
    },
    {
      name: "Nathan Peterson",
      time: "2 weeks ago",
      action: "reacted to your recent post",
      target: "5 end-game strategies to increase your win rate",
      unread: false,
      avatar: "./assets/images/avatar-nathan-peterson.webp",
      message: "Nathan liked your recent post!",
    },
    {
      name: "Anna Kim",
      time: "2 weeks ago",
      action: "left the group",
      target: "Chess Club",
      unread: false,
      chess: true,
      avatar: "./assets/images/avatar-anna-kim.webp",
      message: "Anna has left the group.",
    },
  ];
  const body = document.body;
  const notiCounter = document.getElementById("notiCounter");
  const notiUl = document.getElementById("notiUl");
  const markAll = document.getElementById("markAll");
  const darkMode = document.getElementById("darkMode");
  const icon = document.getElementById("icon");

  if (localStorage.getItem("darkMode") === "true") {
    body.classList.add("dark");
    icon.classList.add("fa-sun", "text-yellow-300");
    icon.classList.remove("fa-moon", "text-white");
  }

  darkMode.addEventListener("click", () => {
    const isDark = body.classList.toggle("dark");
    localStorage.setItem("darkMode", isDark);
    icon.classList.toggle("fa-moon");
    icon.classList.toggle("fa-sun");
    icon.classList.toggle("text-white");
    icon.classList.toggle("text-yellow-300");
  });

  const unreadCount = notifications.filter((n) => n.unread).length;
  notiCounter.innerText = unreadCount;
  let markAllAsRead = false;
  notifications.forEach((element) => {
    const li = document.createElement("li");
    li.classList = `${
      element.unread
        ? "bg-gray-100 dark:bg-gray-700"
        : "bg-white dark:bg-gray-800"
    } text-black dark:text-white text-xs py-3 px-2 md:px-2 rounded-lg w-full hover:bg-gray-50 dark:hover:bg-gray-600 cursor-pointer notificationItem`;

    li.innerHTML = `
      <div class="w-full">
        <div class="flex gap-x-2 items-start">
          <div class="w-9 h-9 rounded-full overflow-hidden">
            <img src="${element.avatar}" class="w-full h-full object-cover" />
          </div>
          <div class="flex-1">
            <p class="text-sm leading-5">
              <span class="font-extrabold">${element.name}</span>
              <span class="text-gray-600 dark:text-gray-300"> ${
                element.action
              } </span>
              ${
                element.target
                  ? `<span class="font-semibold cursor-pointer ${
                      element.chess
                        ? "text-blue-950 dark:text-blue-400"
                        : "text-gray-600 dark:text-gray-300"
                    }"> ${element.target}</span>`
                  : ""
              }
              <span class="inline-block w-2 h-2 ${
                element.unread ? "bg-red-600" : ""
              } rounded-full ml-1 align-middle red-dot"></span>
            </p>
            <div class="flex md:justify-between">
              <p class="text-gray-400 dark:text-gray-400 text-xs mt-1">${
                element.time
              }</p>
              ${
                element.picture
                  ? `<img class="hidden md:inline-block w-10 h-8 align-middle ml-auto -mt-4 " src="${element.picture}">`
                  : ""
              }
            </div>
            ${
              element.message
                ? `<div id="msg" class="justify-between border border-gray-300 dark:border-gray-600 p-3 mt-2 text-gray-600 dark:text-gray-300 rounded-md text-sm hidden"><p>${
                    element.message
                  }</p>
                ${
                  element.picture
                    ? `<img class="inline-block w-28 md:w-56 h-22 md:h-44" src=${element.picture}></img>`
                    : ""
                }</div>`
                : ""
            }
          </div>
          </div>
          </div>
          `;

    notiUl.appendChild(li);

    li.addEventListener("click", () => {
      if (element.unread) {
        element.unread = false;
        li.classList.remove("bg-gray-100", "dark:bg-gray-700");
        li.classList.add("bg-white", "dark:bg-gray-800");
        const redDot = li.querySelector("span.red-dot");
        if (redDot) redDot.classList.remove("bg-red-600");

        const updatedUnread = notifications.filter((n) => n.unread).length;
        notiCounter.innerText = updatedUnread;
        if (updatedUnread == 0) {
          notiCounter.classList.add("hidden");
        }
      }

      const msg = li.querySelector("#msg");
      if (msg) {
        msg.classList.toggle("hidden");
        msg.classList.toggle("flex");
      }
      const updatedUnread = notifications.filter((n) => n.unread).length;
      notiCounter.innerText = updatedUnread;
      notiCounter.classList.toggle("hidden", updatedUnread === 0);
      if (!updatedUnread) {
        markAllAsRead = true;
        markAll.innerHTML = "Mark All as Unread";
      }
    });
  });

  markAll.addEventListener("click", () => {
    markAllAsRead = !markAllAsRead;
    markAll.innerHTML = markAllAsRead
      ? "Mark All as Read"
      : "Mark All as Unread";

    document.querySelectorAll(".notificationItem").forEach((li, index) => {
      const element = notifications[index];
      element.unread = !markAllAsRead;

      const redDot = li.querySelector("span.red-dot");
      if (redDot) {
        redDot.classList.toggle("bg-red-600", element.unread);
      }

      li.classList.toggle("bg-gray-100", element.unread);
      li.classList.toggle("bg-white", !element.unread);
      li.classList.toggle("dark:bg-gray-700", element.unread);
      li.classList.toggle("dark:bg-gray-800", !element.unread);
    });

    const updatedUnread = notifications.filter((n) => n.unread).length;
    notiCounter.innerText = updatedUnread;
    notiCounter.classList.toggle("hidden", updatedUnread === 0);

    document.querySelectorAll("#msg").forEach((msg) => {
      msg.classList.remove("flex");
      msg.classList.add("hidden");
    });
  });
});
