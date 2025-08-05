const totalDay = document.getElementById("totaldays");
const totalMonth = document.getElementById("totalmonths");
const totalYear = document.getElementById("totalyears");
const btn = document.getElementById("btn");
const ip1 = document.getElementById("ip1");
const ip2 = document.getElementById("ip2");
const ip3 = document.getElementById("ip3");
const label1 = document.getElementById("label1");
const label2 = document.getElementById("label2");
const label3 = document.getElementById("label3");
const invalidInput = document.getElementById("invalidInput");
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

btn.addEventListener("click", () => {
  [ip1, ip2, ip3, invalidInput].forEach(el => el.classList.add("hidden"));
  [label1, label2, label3].forEach(label => label.classList.remove("text-red-500"));
  ["day", "month", "year"].forEach(id => {
    document.getElementById(id).classList.remove("border-red-500");
  });

  const day = document.getElementById("day").value.trim();
  const month = document.getElementById("month").value.trim();
  const year = document.getElementById("year").value.trim();

  let hasError = false;

  if (!day) {
    ip1.classList.remove("hidden");
    label1.classList.add("text-red-500");
    document.getElementById("day").classList.add("border-red-500");
    hasError = true;
  }

  if (!month) {
    ip2.classList.remove("hidden");
    label2.classList.add("text-red-500");
    document.getElementById("month").classList.add("border-red-500");
    hasError = true;
  }

  if (!year) {
    ip3.classList.remove("hidden");
    label3.classList.add("text-red-500");
    document.getElementById("year").classList.add("border-red-500");
    hasError = true;
  }

  if (hasError) return;

  const today = new Date();
  const d = parseInt(day, 10);
  const m = parseInt(month, 10);
  const y = parseInt(year, 10);

  const emonths = [4, 6, 9, 11];

  if (d <= 0 || d > 31 || m <= 0 || m > 12 || y <= 0 || y > today.getFullYear()) {
    invalidInput.innerText = "Invalid date entered.";
    invalidInput.classList.remove("hidden");
    return;
  }

  if (emonths.includes(m) && d > 30) {
    invalidInput.innerText = "This month has only 30 days.";
    invalidInput.classList.remove("hidden");
    return;
  }

  if (m === 2) {
    const isLeap = (y % 4 === 0 && y % 100 !== 0) || (y % 400 === 0);
    const maxFebDays = isLeap ? 29 : 28;
    if (d > maxFebDays) {
      invalidInput.innerText = `February ${y} has only ${maxFebDays} days.`;
      invalidInput.classList.remove("hidden");
      return;
    }
  }

  // Parse and check date validity
  const inputDate = new Date(`${y}-${String(m).padStart(2, "0")}-${String(d).padStart(2, "0")}`);
  if (
    isNaN(inputDate.getTime()) ||
    inputDate.getDate() !== d ||
    inputDate.getMonth() + 1 !== m ||
    inputDate.getFullYear() !== y
  ) {
    invalidInput.innerText = "Invalid date format.";
    invalidInput.classList.remove("hidden");
    return;
  }

  // Calculate difference
  let years = today.getFullYear() - y;
  let months = today.getMonth() - (m - 1);
  let days = today.getDate() - d;

  if (days < 0) {
    months--;
    const prevMonth = new Date(today.getFullYear(), today.getMonth(), 0);
    days += prevMonth.getDate();
  }

  if (months < 0) {
    years--;
    months += 12;
  }

  // Animate count
  function animateCount(element, endValue, duration = 1000) {
    let startValue = 0;
    const startTime = performance.now();

    function update(currentTime) {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const value = Math.floor(progress * (endValue - startValue) + startValue);
      element.innerText = value;
      if (progress < 1) requestAnimationFrame(update);
    }

    requestAnimationFrame(update);
  }

  animateCount(totalYear, years, 1200);
  animateCount(totalMonth, months, 1000);
  animateCount(totalDay, days, 800);
});
