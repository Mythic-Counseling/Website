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

  // Specialties: animate "Read more". With the View Transitions API the card
  // glides to its new size and position (and its neighbours move with it);
  // otherwise the revealed text grows open. Either way the new text is
  // briefly highlighted so the reader can see what was added.
  var reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
  var cards = document.querySelectorAll(".specialty");
  cards.forEach(function (card, i) { card.style.viewTransitionName = "specialty-" + i; });

  document.querySelectorAll(".specialty__more > summary").forEach(function (summary) {
    var details = summary.parentElement;
    var rest = details.querySelector(".specialty__rest");

    summary.addEventListener("click", function (e) {
      e.preventDefault();
      var opening = !details.open;
      var toggle = function () {
        details.open = opening;
        rest.classList.toggle("is-revealed", opening);
      };

      if (reduceMotion.matches) {
        toggle();
      } else if (document.startViewTransition) {
        document.startViewTransition(toggle).finished.then(function () {
          if (!opening) details.closest(".specialty").scrollIntoView({ block: "nearest" });
        });
      } else if (opening) {
        toggle();
        rest.animate([{ height: "0px", opacity: 0 }, { height: rest.offsetHeight + "px", opacity: 1 }],
          { duration: 380, easing: "cubic-bezier(.2,.7,.2,1)" });
      } else {
        rest.animate([{ height: rest.offsetHeight + "px", opacity: 1 }, { height: "0px", opacity: 0 }],
          { duration: 260, easing: "ease-in" }).onfinish = toggle;
      }
    });
  });

  // Accordions (.disclosure): panels glide open and closed. Panels sharing a
  // name (the group topics) stay one-open-at-a-time; the name is removed so the
  // browser doesn't snap the others shut before they can animate.
  var groups = {};
  document.querySelectorAll("details.disclosure").forEach(function (details) {
    var name = details.getAttribute("name");
    if (name) {
      (groups[name] = groups[name] || []).push(details);
      details.removeAttribute("name");
      details.dataset.group = name;
    }
  });

  function setPanel(details, open) {
    var body = details.querySelector(".disclosure__body");
    if (details.open === open && !details.classList.contains("is-closing")) return;
    if (reduceMotion.matches || !body || !body.animate) { details.open = open; return; }

    if (details._anim) details._anim.cancel();
    if (open) {
      details.classList.remove("is-closing");
      details.open = true;
      details._anim = body.animate(
        [{ height: "0px", opacity: 0, overflow: "hidden" }, { height: body.offsetHeight + "px", opacity: 1, overflow: "hidden" }],
        { duration: 380, easing: "cubic-bezier(.2,.7,.2,1)" });
      details._anim.onfinish = function () { details._anim = null; };
    } else {
      details.classList.add("is-closing");
      details._anim = body.animate(
        [{ height: body.offsetHeight + "px", opacity: 1, overflow: "hidden" }, { height: "0px", opacity: 0, overflow: "hidden" }],
        { duration: 280, easing: "ease-in" });
      details._anim.onfinish = function () {
        details.open = false;
        details.classList.remove("is-closing");
        details._anim = null;
      };
    }
  }

  document.querySelectorAll("details.disclosure > summary").forEach(function (summary) {
    var details = summary.parentElement;
    summary.addEventListener("click", function (e) {
      e.preventDefault();
      var opening = !details.open || details.classList.contains("is-closing");
      setPanel(details, opening);
      if (opening && details.dataset.group) {
        groups[details.dataset.group].forEach(function (other) {
          if (other !== details && other.open) setPanel(other, false);
        });
      }
    });
  });

  // Scroll reveal: content fades up as it comes into view, items in a row one
  // after another.
  if (!reduceMotion.matches && "IntersectionObserver" in window) {
    var revealSelector = [
      ".section-head", ".section-title", ".philosophy > *", ".journey > *", ".approach > *",
      ".service-grid > *", ".approach-band__cols > *", ".topics > *", ".specialties > *",
      ".table-wrap", ".post-list > *", ".post__body > *", ".post-nav", ".contact > *",
      ".closing__inner > *", ".site-footer__inner > *"
    ].join(", ");
    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        var el = entry.target;
        observer.unobserve(el);
        el.classList.add("is-visible");
        setTimeout(function () {
          el.classList.remove("reveal", "is-visible");
          el.style.removeProperty("--reveal-delay");
        }, 1100 + (parseFloat(el.style.getPropertyValue("--reveal-delay")) || 0) * 1000);
      });
    }, { rootMargin: "0px 0px -8% 0px" });

    document.querySelectorAll(revealSelector).forEach(function (el) {
      var siblings = el.parentElement ? Array.prototype.indexOf.call(el.parentElement.children, el) : 0;
      el.classList.add("reveal");
      if (siblings > 0) el.style.setProperty("--reveal-delay", Math.min(siblings, 4) * 0.09 + "s");
      observer.observe(el);
    });
  }

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
