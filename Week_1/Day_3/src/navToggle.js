 // Mobile Menu Toggle
  const mobileMenuButton = document.getElementById('mobile-menu-button');
  const closeMenuButton = document.getElementById('close-menu-button');
  const mobileMenu = document.getElementById('mobile-menu');
  
  mobileMenuButton.addEventListener('click', () => {
    mobileMenu.classList.remove('translate-x-full');
    mobileMenu.classList.add('translate-x-0');
  });
  
  closeMenuButton.addEventListener('click', () => {
    mobileMenu.classList.remove('translate-x-0');
    mobileMenu.classList.add('translate-x-full');
  });

  // Dark Mode Logic
  function toggleDarkMode() {
    const body = document.body;
    const checkbox = document.getElementById('dark-toggle');
    const mobileCheckbox = document.getElementById('dark-toggle-mobile');
    
    // Determine which checkbox triggered the change
    const sourceCheckbox = event?.target || checkbox;
    
    if (sourceCheckbox.checked) {
      body.classList.add('dark');
      localStorage.setItem('darkMode', 'enabled');
      // Sync both checkboxes
      checkbox.checked = true;
      mobileCheckbox.checked = true;
    } else {
      body.classList.remove('dark');
      localStorage.setItem('darkMode', 'disabled');
      // Sync both checkboxes
      checkbox.checked = false;
      mobileCheckbox.checked = false;
    }
  }

  // Initialize on page load
  document.addEventListener('DOMContentLoaded', () => {
    const body = document.body;
    const checkbox = document.getElementById('dark-toggle');
    const mobileCheckbox = document.getElementById('dark-toggle-mobile');
    
    if (localStorage.getItem('darkMode') === 'enabled') {
      body.classList.add('dark');
      checkbox.checked = true;
      mobileCheckbox.checked = true;
    } else {
      body.classList.remove('dark');
      checkbox.checked = false;
      mobileCheckbox.checked = false;
    }
    
    // Add event listeners
    checkbox.addEventListener('change', toggleDarkMode);
    mobileCheckbox.addEventListener('change', toggleDarkMode);
  });