const tipPercentages = [5, 10, 15, 20, 25];
const percentGrid = document.getElementById("percent-grid");

const billInput = document.getElementById("total-bill");
const personInput = document.getElementById("total-person");
const tipResult = document.getElementById("tip-result");
const totalResult = document.getElementById("total-result");
const resetBtn = document.getElementById("reset-btn");

const billError = document.getElementById("bill-error");
const personError = document.getElementById("person-error");
const customError = document.getElementById("custom-error");
const darkMode = document.getElementById("darkMode");
const body = document.body;
const icon = document.getElementById("icon");

if (localStorage.getItem("darkMode") === "true") {
  body.classList.add("dark");
  icon.classList.add("fa-sun", "text-white");
  icon.classList.remove("fa-moon");
}
darkMode.addEventListener("click", () => {
  const isDark = body.classList.toggle("dark");
  localStorage.setItem("darkMode", isDark);
  icon.classList.toggle("fa-moon");
  icon.classList.toggle("fa-sun");
  icon.classList.toggle("text-white");
});

let currentTip = null;

const isInputValid = () => {
  const bill = parseFloat(billInput.value);
  const people = Number(personInput.value);

  let valid = true;

  billError.classList.add("hidden");
  personError.classList.add("hidden");

  if (billInput.value.trim() === "") {
  billError.classList.remove("hidden");
  billError.innerHTML = "Field is required.";
  valid = false;
}
 if (personInput.value.trim() === "") {
  personError.classList.remove("hidden");
  personError.innerHTML = "Field is required.";
  valid = false;
}

  if (isNaN(bill) || bill <= 0) {
    billError.classList.remove("hidden");
    valid = false;
  }

  if (isNaN(people) || !Number.isInteger(people)) {
    personError.classList.remove("hidden");
    personError.innerHTML = "People must be a positive integer.";
    valid = false;
  }

  if (people <= 0) {
    personError.classList.remove("hidden");
    valid = false;
  }

  return valid;
};

const Buttons = () => {
  tipPercentages.forEach((percent) => {
    const btn = document.createElement("button");
    btn.className =
      "bg-sea-green text-white py-2 rounded-md hover:bg-light-green transition tip-btn";
    btn.textContent = `${percent}%`;

    btn.addEventListener("click", () => {
      if (!isInputValid()) {
        return;
      }

      currentTip = percent;

      document.querySelectorAll(".tip-btn").forEach((b) => {
        b.classList.remove("bg-light-green");
        b.classList.add("bg-sea-green");
      });

      btn.classList.remove("bg-sea-green");
      btn.classList.add("bg-light-green");

      const customInput = percentGrid.querySelector("input[type='number']");
      if (customInput) customInput.value = "";
      customError.classList.add("hidden");

      calculateTip(percent);
    });

    percentGrid.appendChild(btn);
  });

  const customDiv = document.createElement("div");
  customDiv.className = "relative";

  const customInput = document.createElement("input");
  customInput.type = "number";
  customInput.placeholder = "Custom";
  customInput.className =
    "w-full py-2 px-3 border border-grey-400 rounded-md text-right placeholder:text-center dark:placeholder:text-gray-4 text-gray-2 dark:text-gray-4 focus:outline-light-green dark:bg-sea-green-deep";

  customDiv.appendChild(customInput);
  percentGrid.appendChild(customDiv);

  customInput.addEventListener("input", () => {
    const val = parseFloat(customInput.value);

    document.querySelectorAll(".tip-btn").forEach((b) => {
      b.classList.remove("bg-light-green");
      b.classList.add("bg-sea-green");
    });

    if (isNaN(val) || val < 0) {
      customError.classList.remove("hidden");
      return;
    }

    customError.classList.add("hidden");

    if (!isInputValid()) {
      return;
    }

    currentTip = val;
    calculateTip(val);
  });
};

function calculateTip(percent) {
  const bill = parseFloat(billInput.value);
  const people = parseInt(personInput.value);

  const totalTip = (bill * percent) / 100;
  const tipPerPerson = totalTip / people;
  const totalPerPerson = (bill + totalTip) / people;

  tipResult.textContent = tipPerPerson.toLocaleString("en-US", {
    style: "currency",
    currency: "USD",
  });

  totalResult.textContent = totalPerPerson.toLocaleString("en-US", {
    style: "currency",
    currency: "USD",
  });
}

resetBtn.addEventListener("click", () => {
  billInput.value = "";
  personInput.value = "";
  tipResult.textContent = "$0.00";
  totalResult.textContent = "$0.00";
  currentTip = null;

  billError.classList.add("hidden");
  personError.classList.add("hidden");
  customError.classList.add("hidden");

  const customInput = percentGrid.querySelector("input[type='number']");
  if (customInput) customInput.value = "";

  document.querySelectorAll(".tip-btn").forEach((b) => {
    b.classList.remove("bg-light-green");
    b.classList.add("bg-sea-green");
  });
});

Buttons();

[billInput, personInput].forEach((input) => {
  input.addEventListener("input", () => {
    if (currentTip !== null && isInputValid()) {
      calculateTip(currentTip);
    } else {
      tipResult.textContent = "$0.00";
      totalResult.textContent = "$0.00";
    }
  });
});
