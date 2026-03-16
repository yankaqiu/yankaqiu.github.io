/**
 * Bento Grid — Dark mode toggle + theme persistence
 */
(function () {
  "use strict";

  // Theme toggle
  var toggle = document.getElementById("theme-toggle");
  if (!toggle) return;

  // Check saved preference or system preference
  var saved = localStorage.getItem("bento-theme");
  if (saved) {
    document.documentElement.setAttribute("data-theme", saved);
  } else if (window.matchMedia("(prefers-color-scheme: dark)").matches) {
    document.documentElement.setAttribute("data-theme", "dark");
  }

  toggle.addEventListener("click", function () {
    var current = document.documentElement.getAttribute("data-theme");
    var next = current === "dark" ? "light" : "dark";
    document.documentElement.setAttribute("data-theme", next);
    localStorage.setItem("bento-theme", next);
  });
})();
