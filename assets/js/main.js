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

  // Contact forms: POST to the configured endpoint, or fall back to a
  // pre-filled email when no endpoint is configured (action="mailto:…").
  document.querySelectorAll("[data-contact-form]").forEach(function (form) {
    var status = form.querySelector(".contact-form__status");

    form.addEventListener("submit", function (e) {
      e.preventDefault();
      if (form.querySelector('[name="_gotcha"]').value) return;

      var data = new FormData(form);
      var name = (data.get("first_name") + " " + data.get("last_name")).trim();
      var action = form.getAttribute("action") || "";

      if (action.indexOf("mailto:") === 0) {
        var body = "Name: " + name + "\nEmail: " + data.get("email") + "\n\n" + data.get("message");
        window.location.href = "mailto:" + form.dataset.email +
          "?subject=" + encodeURIComponent(form.dataset.subject) +
          "&body=" + encodeURIComponent(body);
        status.hidden = false;
        return;
      }

      var button = form.querySelector('button[type="submit"]');
      button.disabled = true;
      fetch(action, { method: "POST", body: data, headers: { Accept: "application/json" } })
        .then(function (res) {
          if (!res.ok) throw new Error(res.statusText);
          form.reset();
          status.textContent = "Thank you!";
        })
        .catch(function () {
          status.innerHTML = 'Sorry, something went wrong. Please email <a href="mailto:' +
            form.dataset.email + '">' + form.dataset.email + "</a>.";
        })
        .then(function () {
          status.hidden = false;
          button.disabled = false;
        });
    });
  });
})();
