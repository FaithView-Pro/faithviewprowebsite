(function () {
  "use strict";

  var header = document.getElementById("siteHeader");
  var onScroll = function () {
    if (!header) return;
    if (window.scrollY > 8) header.classList.add("scrolled");
    else header.classList.remove("scrolled");
  };
  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();

  var toggle = document.getElementById("navToggle");
  var menu = document.getElementById("mobileMenu");
  if (toggle && menu) {
    toggle.addEventListener("click", function () {
      var open = menu.classList.toggle("open");
      toggle.setAttribute("aria-expanded", open ? "true" : "false");
      toggle.setAttribute("aria-label", open ? "Close menu" : "Open menu");
    });
    menu.addEventListener("click", function (e) {
      if (e.target.closest("a")) {
        menu.classList.remove("open");
        toggle.setAttribute("aria-expanded", "false");
      }
    });
  }

  var revealEls = document.querySelectorAll(".reveal");
  if ("IntersectionObserver" in window && revealEls.length) {
    var io = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add("in");
            io.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -40px 0px" }
    );
    revealEls.forEach(function (el) { io.observe(el); });
  } else {
    revealEls.forEach(function (el) { el.classList.add("in"); });
  }

  var searchInput = document.getElementById("docSearch");
  var searchWrap = document.getElementById("searchWrap");
  var searchClear = document.getElementById("searchClear");
  var docsGrid = document.getElementById("docsGrid");
  if (searchInput && docsGrid) {
    var applyFilter = function () {
      var q = searchInput.value.trim().toLowerCase();
      if (searchWrap) searchWrap.classList.toggle("has-value", q.length > 0);
      var cats = docsGrid.querySelectorAll(".doc-cat");
      cats.forEach(function (cat) {
        var links = cat.querySelectorAll("ul a");
        var anyVisible = false;
        links.forEach(function (link) {
          var text = link.textContent.toLowerCase() + " " + (cat.getAttribute("data-cat") || "");
          var visible = !q || text.indexOf(q) !== -1;
          link.parentElement.style.display = visible ? "" : "none";
          if (visible) anyVisible = true;
        });
        cat.classList.toggle("hidden", !anyVisible);
        cat.setAttribute("data-empty", anyVisible ? "false" : "true");
      });
    };
    searchInput.addEventListener("input", applyFilter);
    if (searchClear) {
      searchClear.addEventListener("click", function () {
        searchInput.value = "";
        applyFilter();
        searchInput.focus();
      });
    }
  }

  var yearEl = document.getElementById("year");
  if (yearEl) yearEl.textContent = String(new Date().getFullYear());
})();
