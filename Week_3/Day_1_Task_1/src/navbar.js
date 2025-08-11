
const dropDown = document.querySelector("#dropdown")
const separator = document.querySelector("#separator");
const toggleDropDownBtn = document.querySelector("#toggle-dropdown-btn");
const toggleDropDownImg = document.querySelector("#toggle-dropdown-img");

let dropDownState = "false";

function toggleDropDown () {

    if (dropDownState == "false") {
        separator.classList.remove("hidden")
        dropDown.classList.remove("hidden");
        toggleDropDownImg.src = "assets/hamburger-menu-close.svg";
        dropDownState = "True";
    }
    else {
        separator.classList.add("hidden")
        dropDown.classList.add("hidden");
        toggleDropDownImg.src = "assets/hamburger-menu-open.svg";
        dropDownState = "false";
    }
}

toggleDropDownBtn.addEventListener("click", () => {
    toggleDropDown();
});

const navUls = document.querySelectorAll("nav>ul, section>ul");

navUls.forEach(ul => {
    ul.addEventListener("click", (event) => {
        let target = event.target.closest("li[data-active]");
        if (!target) return;

        ul.querySelectorAll("li[data-active]").forEach(li => {
            li.dataset.active = "false";
        });

        target.dataset.active = "true";
    });
});