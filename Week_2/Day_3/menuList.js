
const menuItems = [
  { name: "Offers", active: true },
  { name: "Burgers" },
  { name: "Fries" },
  { name: "Snacks" },
  { name: "Salads" },
  { name: "Cold drinks" },
  { name: "Happy Meal®" },
  { name: "Desserts" },
  { name: "Hot drinks" },
  { name: "Sauces" },
  { name: "Orbit®" }
];

function populateMenu() {
  const menuList = document.getElementById('menu-list');
  
  menuItems.forEach(item => {
    const li = document.createElement('li');
    const a = document.createElement('a');
    
    a.href = "#";
    a.className = `inline-block px-3 py-1 md:px-4 md:py-2 hover:bg-orange-700 rounded-full transition-colors ${
      item.active ? 'bg-black' : ''
    }`;
    a.textContent = item.name;
    

    a.addEventListener('click', (e) => {
      e.preventDefault();

      document.querySelectorAll('#menu-list a').forEach(link => {
        link.classList.remove('bg-black');
      });

      a.classList.add('bg-black');
    });
    
    li.appendChild(a);
    menuList.appendChild(li);
  });
}


document.addEventListener('DOMContentLoaded', populateMenu);