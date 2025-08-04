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

btn.addEventListener("click", () => {
  ip1.classList.add("hidden");
  ip2.classList.add("hidden");
  ip3.classList.add("hidden");

  const daybox = document.getElementById("day");
  const monthbox = document.getElementById("month");
  const yearbox = document.getElementById("year");
  const day = document.getElementById("day").value;
  const month = document.getElementById("month").value;
  const year = document.getElementById("year").value;

  label1.classList.remove("text-red-500");
  label2.classList.remove("text-red-500");
  label3.classList.remove("text-red-500");

  daybox.classList.remove("border-red-500");
  monthbox.classList.remove("border-red-500");
  yearbox.classList.remove("border-red-500");

  let hasError = false;

  if (!day) {
    ip1.classList.remove("hidden");
    label1.classList.add("text-red-500");
    daybox.classList.add("border-red-500");
    hasError = true;
  }
  if (!month) {
    ip2.classList.remove("hidden");
    label2.classList.add("text-red-500");
    monthbox.classList.add("border-red-500");
    hasError = true;
  }
  if (!year) {
    ip3.classList.remove("hidden");
    label3.classList.add("text-red-500");
    yearbox.classList.add("border-red-500");
    hasError = true;
  }

  if (hasError) {
    return;
  } else {
    label1.classList.remove("text-red-500");
    daybox.classList.remove("border-red-500");
  }

  const inputDate = new Date(
    `${year}-${month.padStart(2, "0")}-${day.padStart(2, "0")}`
  );

  if (
    isNaN(inputDate.getTime()) ||
    inputDate.getDate() != parseInt(day) ||
    inputDate.getMonth() + 1 != parseInt(month) ||
    inputDate.getFullYear() != parseInt(year)
  ) {
    invalidInput.classList.remove("hidden")
    return;
  }

  const today = new Date();
  let years = today.getFullYear() - inputDate.getFullYear();
  let months = today.getMonth() - inputDate.getMonth();
  let days = today.getDate() - inputDate.getDate();

  if (days < 0) {
    months--;
    const lastMonth = new Date(today.getFullYear(), today.getMonth(), 0);
    days += lastMonth.getDate();
  }

  if (months < 0) {
    years--;
    months += 12;
  }

  totalYear.innerHTML = years;
  totalMonth.innerHTML = months;
  totalDay.innerHTML = days;
});
