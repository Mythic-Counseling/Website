// Mythic Counseling of Florida — navigation and contact form behaviour.
(function () {
  "use strict";

  var toggle = document.querySelector(".nav-toggle");
  var nav = document.getElementById("site-nav");
  var menuToggles = document.querySelectorAll(".site-nav__menu-toggle");

  function setNavOpen(open) {
    toggle.setAttribute("aria-expanded", String(open));
    nav.classList.toggle("is-open", open);
    document.body.style.overflow = open ? "hidden" : "";
  }

  function closeSubmenus(except) {
    menuToggles.forEach(function (btn) {
      if (btn !== except) btn.setAttribute("aria-expanded", "false");
    });
  }

  if (toggle && nav) {
    toggle.addEventListener("click", function () {
      setNavOpen(toggle.getAttribute("aria-expanded") !== "true");
    });
    // Close the mobile panel when switching to the desktop layout.
    window.matchMedia("(min-width: 900px)").addEventListener("change", function (e) {
      if (e.matches) setNavOpen(false);
    });
  }

  menuToggles.forEach(function (btn) {
    btn.addEventListener("click", function () {
      var open = btn.getAttribute("aria-expanded") !== "true";
      closeSubmenus(btn);
      btn.setAttribute("aria-expanded", String(open));
    });
  });

  document.addEventListener("keydown", function (e) {
    if (e.key !== "Escape") return;
    var openMenu = document.querySelector('.site-nav__menu-toggle[aria-expanded="true"]');
    if (openMenu) {
      closeSubmenus();
      openMenu.focus();
    } else if (toggle && toggle.getAttribute("aria-expanded") === "true") {
      setNavOpen(false);
      toggle.focus();
    }
  });

  document.addEventListener("click", function (e) {
    if (!e.target.closest(".site-nav__item--has-menu")) closeSubmenus();
  });

  // Contact forms without a Google Form configured: turn the submission into a
  // pre-filled email so nothing is stored by a third party.
  document.querySelectorAll("[data-contact-form]").forEach(function (form) {
    var status = form.querySelector(".contact-form__status");

    form.addEventListener("submit", function (e) {
      e.preventDefault();
      if (form.querySelector('[name="_gotcha"]').value) return;

      var data = new FormData(form);
      var name = (data.get("first_name") + " " + data.get("last_name")).trim();
      var body = "Name: " + name + "\nEmail: " + data.get("email") + "\n\n" + data.get("message");
      window.location.href = "mailto:" + form.dataset.email +
        "?subject=" + encodeURIComponent(form.dataset.subject) +
        "&body=" + encodeURIComponent(body);
      status.hidden = false;
    });
  });

  // Appointment type tabs on /appointments/. #consultation or #individual in
  // the URL selects the matching booking calendar.
  document.querySelectorAll("[data-tabs]").forEach(function (root) {
    var tablist = root.querySelector('[role="tablist"]');
    var tabs = Array.prototype.slice.call(root.querySelectorAll('[role="tab"]'));
    var panels = root.querySelectorAll('[role="tabpanel"]');
    if (tabs.length < 2) return;

    function select(tab, focus) {
      tabs.forEach(function (t) {
        var selected = t === tab;
        t.setAttribute("aria-selected", String(selected));
        t.tabIndex = selected ? 0 : -1;
        document.getElementById(t.getAttribute("aria-controls")).hidden = !selected;
      });
      if (focus) tab.focus();
    }

    tablist.hidden = false;
    root.classList.add("is-tabbed");
    panels.forEach(function (panel) { panel.tabIndex = 0; });

    tabs.forEach(function (tab, i) {
      tab.addEventListener("click", function () {
        select(tab);
        history.replaceState(null, "", "#" + tab.getAttribute("aria-controls"));
      });
      tab.addEventListener("keydown", function (e) {
        var next = e.key === "ArrowRight" ? i + 1 : e.key === "ArrowLeft" ? i - 1 : null;
        if (next === null) return;
        e.preventDefault();
        select(tabs[(next + tabs.length) % tabs.length], true);
      });
    });

    var initial = tabs.filter(function (t) {
      return "#" + t.getAttribute("aria-controls") === location.hash;
    })[0];
    select(initial || tabs[0]);
    // The browser jumps to the panel itself; show the tabs above it instead.
    if (initial) requestAnimationFrame(function () { root.scrollIntoView(); });
  });
})();
