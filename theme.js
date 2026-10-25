/* Shared SmartCity theme toggle. Stores the preference for every page. */
(function () {
  "use strict";
  const KEY = "smartCityTheme";
  function applyTheme(theme) {
    const dark = theme === "dark";
    document.documentElement.classList.toggle("dark-mode", dark);
    if (document.body) document.body.classList.toggle("dark-mode", dark);
    const button = document.getElementById("themeToggle");
    if (button) {
      button.textContent = dark ? "☀️ Day Mode" : "🌙 Night Mode";
      button.setAttribute("aria-label", dark ? "Switch to day mode" : "Switch to night mode");
      button.setAttribute("aria-pressed", String(dark));
    }
  }
  function setup() {
    let button = document.getElementById("themeToggle");
    if (!button) {
      button = document.createElement("button");
      button.id = "themeToggle";
      button.className = "theme-toggle";
      button.type = "button";
      const navbar = document.querySelector(".navbar, header nav, nav");
      const login = navbar && navbar.querySelector(".login-btn, .login-button");
      const navLinks = navbar && navbar.querySelector(".nav-links");
      if (login && login.parentNode) login.parentNode.insertBefore(button, login);
      else if (navLinks) navLinks.appendChild(button);
      else if (navbar) navbar.appendChild(button);
      else { button.classList.add("theme-toggle-floating"); document.body.appendChild(button); }
    }
    // Avoid duplicate click handlers if a page reinitializes scripts.
    if (button.dataset.themeHandlerAttached !== "true") {
      button.dataset.themeHandlerAttached = "true";
      button.addEventListener("click", function () {
        const next = document.documentElement.classList.contains("dark-mode") ? "light" : "dark";
        localStorage.setItem(KEY, next);
        applyTheme(next);
      });
    }
    applyTheme(localStorage.getItem(KEY) || "light");
  }
  const saved = localStorage.getItem(KEY) || "light";
  document.documentElement.classList.toggle("dark-mode", saved === "dark");
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", function () { applyTheme(saved); setup(); }, { once: true });
  } else { applyTheme(saved); setup(); }
})();
