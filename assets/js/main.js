// Mythic Counseling of Florida — navigation, booking dialog, forms and reading progress.
(function () {
  "use strict";

  var toggle = document.querySelector(".nav-toggle");
  var nav = document.getElementById("site-nav");
  var menuToggles = document.querySelectorAll(".site-nav__menu-toggle");

  function setNavOpen(open) {
    if (!toggle || !nav) return;
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

  // Booking dialog tabs (one per Google appointment schedule).
  var selectTab = function () {};
  document.querySelectorAll("[data-tabs]").forEach(function (root) {
    var tablist = root.querySelector('[role="tablist"]');
    var tabs = Array.prototype.slice.call(root.querySelectorAll('[role="tab"]'));
    if (tabs.length < 2) return;

    selectTab = function (name, focus) {
      var tab = tabs.filter(function (t) { return t.getAttribute("aria-controls") === name; })[0] || tabs[0];
      tabs.forEach(function (t) {
        var selected = t === tab;
        t.setAttribute("aria-selected", String(selected));
        t.tabIndex = selected ? 0 : -1;
        document.getElementById(t.getAttribute("aria-controls")).hidden = !selected;
      });
      if (focus) tab.focus();
    };

    tablist.hidden = false;
    tabs.forEach(function (tab, i) {
      tab.addEventListener("click", function () { selectTab(tab.getAttribute("aria-controls")); });
      tab.addEventListener("keydown", function (e) {
        var next = e.key === "ArrowRight" ? i + 1 : e.key === "ArrowLeft" ? i - 1 : null;
        if (next === null) return;
        e.preventDefault();
        selectTab(tabs[(next + tabs.length) % tabs.length].getAttribute("aria-controls"), true);
      });
    });
    selectTab(tabs[0].getAttribute("aria-controls"));
  });

  // Every "Book now" button ([data-book]) opens the booking dialog. Its
  // scheduler iframes load on first open. /#book (the old /appointments/
  // address redirects there) opens it on page load.
  var dialog = document.getElementById("booking-dialog");
  if (dialog && typeof dialog.showModal === "function") {
    var opener = null;

    var openBooking = function (tab) {
      dialog.querySelectorAll("iframe[data-src]").forEach(function (frame) {
        frame.src = frame.getAttribute("data-src");
        frame.removeAttribute("data-src");
      });
      if (tab) selectTab(tab);
      setNavOpen(false);
      dialog.showModal();
      document.body.style.overflow = "hidden";
    };

    document.addEventListener("click", function (e) {
      var trigger = e.target.closest("[data-book]");
      if (!trigger) return;
      e.preventDefault();
      opener = trigger;
      openBooking(trigger.getAttribute("data-book"));
    });

    dialog.querySelector("[data-close-dialog]").addEventListener("click", function () { dialog.close(); });
    // Close when the backdrop (outside the dialog box) is clicked.
    dialog.addEventListener("click", function (e) { if (e.target === dialog) dialog.close(); });
    dialog.addEventListener("close", function () {
      document.body.style.overflow = "";
      if (location.hash === "#book") history.replaceState(null, "", location.pathname + location.search);
      if (opener) opener.focus();
    });

    if (location.hash === "#book") openBooking();
  }

  // Reading progress: the boulder in the header climbs as you scroll down and
  // rolls back when you scroll up.
  var ascent = document.querySelector(".ascent");
  if (ascent) {
    var ticking = false;
    var update = function () {
      var max = document.documentElement.scrollHeight - window.innerHeight;
      var p = max > 0 ? Math.min(1, Math.max(0, window.scrollY / max)) : 0;
      ascent.style.setProperty("--p", p.toFixed(4));
      ascent.classList.toggle("is-moving", p > 0.01);
      ticking = false;
    };
    window.addEventListener("scroll", function () {
      if (!ticking) { requestAnimationFrame(update); ticking = true; }
    }, { passive: true });
    window.addEventListener("resize", update);
    update();
  }
})();
