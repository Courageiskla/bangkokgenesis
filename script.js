async function loadComponent(id, file) {
  try {
    const el = document.getElementById(id);
    if (el) {
      const res = await fetch(file);
      if (!res.ok) throw new Error(`Could not fetch ${file}: ${res.status}`);
      el.innerHTML = await res.text();
    }
  } catch (error) {
    console.error(`❌ Error loading component ${file}:`, error);
  }
}

function initPageScripts() {
  // Mobile Menu Logic
  const mobileMenuButton = document.getElementById("mobile-menu-button");
  const mobileMenu = document.getElementById("mobile-menu");
  const closeMobileMenuButton = mobileMenu ? mobileMenu.querySelector("#close-mobile-menu") : null;
  const mobileLinks = mobileMenu ? mobileMenu.querySelectorAll(".mobile-link") : [];

  if (mobileMenuButton && closeMobileMenuButton && mobileMenu) {
    const openMenu = () => {
      mobileMenu.classList.remove("hidden");
      mobileMenu.classList.add("flex");
    };
    const closeMenu = () => {
      mobileMenu.classList.add("hidden");
      mobileMenu.classList.remove("flex");
    };
    mobileMenuButton.addEventListener("click", openMenu);
    closeMobileMenuButton.addEventListener("click", closeMenu);
    mobileLinks.forEach((link) => {
      link.addEventListener("click", closeMenu);
    });
  }
}

async function main() {
  await Promise.all([
    loadComponent("header", "/components/header.html"),
    loadComponent("mobile-menu-placeholder", "/components/mobile-menu.html"),
    loadComponent("footer", "/components/footer.html")
  ]);
  document.dispatchEvent(new CustomEvent('componentsLoaded'));
}

document.addEventListener('DOMContentLoaded', () => {
  document.addEventListener("componentsLoaded", initPageScripts);
  main();
});




//   // Language switcher
//   const langSwitcher = document.getElementById("lang-switcher");
//   if (langSwitcher) {
// window.toggleLang = function () {
//   const langMenu = document.getElementById("lang-menu");
//   if (langMenu) {
//     langMenu.classList.toggle("hidden");
//   }
// };
// window.addEventListener("click", function (e) {
//   const langMenu = document.getElementById("lang-menu");
//   if (langSwitcher && !langSwitcher.contains(e.target) && langMenu) {
//     langMenu.classList.add("hidden");
//   }
// });
//   }