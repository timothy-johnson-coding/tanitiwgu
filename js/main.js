/* ==========================================================================
   Visit Taniti — shared site behaviour
   Injects header + footer on every page, drives interactivity.
   ========================================================================== */
(function () {
  "use strict";

  /* ---------- Icon set (inline SVG) ---------- */
  var ICON = {
    clock: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/></svg>',
    globe: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="9"/><path d="M3 12h18M12 3a15 15 0 0 1 0 18M12 3a15 15 0 0 0 0 18"/></svg>',
    plus: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M12 5v14M5 12h14"/></svg>',
    palm: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 21V11M12 11c0-3 2-5 6-5M12 11c0-3-2-5-6-5M12 11c2-2 5-2 7 0M12 11c-2-2-5-2-7 0M12 11V8"/></svg>',
    check: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M20 6 9 17l-5-5"/></svg>',
    fb: '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M22 12a10 10 0 1 0-11.5 9.9v-7H8v-2.9h2.5V9.8c0-2.5 1.5-3.9 3.8-3.9 1.1 0 2.2.2 2.2.2v2.5h-1.3c-1.2 0-1.6.8-1.6 1.6v1.8h2.8L15.7 15h-2.3v7A10 10 0 0 0 22 12Z"/></svg>',
    ig: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="3" width="18" height="18" rx="5"/><circle cx="12" cy="12" r="4"/><circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none"/></svg>',
    yt: '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M23 12s0-3.4-.4-5a2.6 2.6 0 0 0-1.8-1.8C19 4.8 12 4.8 12 4.8s-7 0-8.8.4A2.6 2.6 0 0 0 1.4 7C1 8.6 1 12 1 12s0 3.4.4 5a2.6 2.6 0 0 0 1.8 1.8c1.8.4 8.8.4 8.8.4s7 0 8.8-.4a2.6 2.6 0 0 0 1.8-1.8c.4-1.6.4-5 .4-5ZM10 15.5v-7l6 3.5Z"/></svg>'
  };

  /* ---------- Site config ---------- */
  var NAV = [
    { href: "about.html",      label: "About Taniti" },
    { href: "activities.html", label: "Things to Do" },
    { href: "stay.html",       label: "Where to Stay" },
    { href: "dining.html",     label: "Dining" },
    { href: "travel.html",     label: "Getting Here" },
    { href: "contact.html",    label: "Contact" }
  ];

  /* ---------- Brand markup ---------- */
  function brand(extra) {
    return (
      '<a class="brand" href="index.html" aria-label="Visit Taniti home">' +
        '<span class="mark">' + ICON.palm + '</span>' +
        '<span>Taniti<small>Pacific Island Escape</small></span>' +
      "</a>"
    );
  }

  /* ---------- Build header ---------- */
  function buildHeader() {
    var page = document.body.getAttribute("data-page") || "";
    var links = NAV.map(function (n) {
      var active = n.href.indexOf(page) === 0 && page !== "" ? " class=\"active\"" : "";
      return '<li><a href="' + n.href + '"' + active + ">" + n.label + "</a></li>";
    }).join("");

    var html =
      '<div class="utility-bar"><div class="container">' +
        '<span class="utility-item">' + ICON.clock +
          ' Local Time: <strong id="localTime" style="margin-left:.25rem">--:--</strong></span>' +
        '<span class="utility-item hide-sm">🌋 Mt. Pulu: <strong style="margin-left:.25rem">Calm</strong></span>' +
        '<span class="utility-spacer"></span>' +
        '<span class="utility-item hide-sm">🏥 Taniti General — multilingual staff 24/7</span>' +
        '<span class="utility-item">' + ICON.globe +
          '<select class="lang-select" id="langSelect" aria-label="Choose language">' +
            '<option value="en">English (EN)</option>' +
            '<option value="mt">Merean (MT)</option>' +
            '<option value="ja">日本語 (JA)</option>' +
            '<option value="es">Español (ES)</option>' +
          "</select></span>" +
      "</div></div>" +
      '<header class="site-header" id="siteHeader"><div class="container"><nav class="nav">' +
        brand() +
        '<button class="nav-toggle" id="navToggle" aria-label="Toggle menu" aria-expanded="false" aria-controls="navLinks">' +
          "<span></span><span></span><span></span></button>" +
        '<ul class="nav-links" id="navLinks">' + links +
          '<li class="nav-cta"><a class="btn btn-primary" href="plan.html">Plan Your Trip</a></li>' +
        "</ul>" +
      "</nav></div></header>" +
      '<div class="nav-backdrop" id="navBackdrop"></div>';

    var mount = document.getElementById("site-header");
    if (mount) mount.outerHTML = html;
  }

  /* ---------- Build footer ---------- */
  function buildFooter() {
    var year = "2026";
    var html =
      '<footer class="site-footer"><div class="container">' +
        '<div class="footer-grid">' +
          '<div class="footer-about">' + brand() +
            "<p>The official visitor guide to Taniti — a tropical Pacific island of rainforests, " +
            "volcanic peaks and warm-hearted people. Plan your perfect escape.</p>" +
            '<div class="socials">' +
              '<a href="#" aria-label="Facebook">' + ICON.fb + "</a>" +
              '<a href="#" aria-label="Instagram">' + ICON.ig + "</a>" +
              '<a href="#" aria-label="YouTube">' + ICON.yt + "</a>" +
            "</div></div>" +
          "<div><h4>Explore</h4><ul>" +
            '<li><a href="about.html">About the Island</a></li>' +
            '<li><a href="activities.html">Things to Do</a></li>' +
            '<li><a href="stay.html">Where to Stay</a></li>' +
            '<li><a href="dining.html">Dining</a></li>' +
          "</ul></div>" +
          "<div><h4>Plan</h4><ul>" +
            '<li><a href="travel.html">Getting Here</a></li>' +
            '<li><a href="plan.html">Book a Trip</a></li>' +
            '<li><a href="travel.html#around">Getting Around</a></li>' +
            '<li><a href="contact.html">Contact Us</a></li>' +
          "</ul></div>" +
          "<div><h4>Visitor Newsletter</h4>" +
            "<p style=\"font-size:.92rem\">Island news, seasonal events and travel deals — straight to your inbox.</p>" +
            '<form class="newsletter" data-newsletter><label class="visually-hidden" for="nlEmail"></label>' +
              '<input id="nlEmail" type="email" placeholder="you@email.com" aria-label="Email address" required>' +
              '<button class="btn btn-primary" type="submit">Join</button></form>' +
            '<p style="font-size:.78rem;margin-top:.6rem;color:rgba(255,255,255,.55)">' +
            "Taniti Visitors & Tourism Bureau · Yasawa, Taniti</p></div>" +
        "</div>" +
        '<div class="footer-bottom">' +
          "<span>© " + year + " Taniti Visitors & Tourism Bureau. All rights reserved.</span>" +
          "<span><a href=\"#\">Privacy</a> · <a href=\"#\">Terms</a> · <a href=\"#\">Accessibility</a></span>" +
        "</div>" +
      "</div></footer>";

    var mount = document.getElementById("site-footer");
    if (mount) mount.outerHTML = html;
  }

  /* ---------- Live local time (Taniti = UTC+11, sample Pacific offset) ---------- */
  function startClock() {
    var el = document.getElementById("localTime");
    if (!el) return;
    function tick() {
      var now = new Date();
      // Taniti fictional offset UTC+11
      var utc = now.getTime() + now.getTimezoneOffset() * 60000;
      var t = new Date(utc + 11 * 3600000);
      var h = t.getHours(), m = t.getMinutes();
      var ap = h >= 12 ? "PM" : "AM";
      var hh = h % 12; if (hh === 0) hh = 12;
      el.textContent = hh + ":" + (m < 10 ? "0" + m : m) + " " + ap;
    }
    tick();
    setInterval(tick, 1000 * 15);
  }

  /* ---------- Mobile nav ---------- */
  function mobileNav() {
    var toggle = document.getElementById("navToggle");
    var links = document.getElementById("navLinks");
    var backdrop = document.getElementById("navBackdrop");
    if (!toggle || !links) return;
    function close() {
      links.classList.remove("open");
      backdrop && backdrop.classList.remove("show");
      toggle.setAttribute("aria-expanded", "false");
      document.body.style.overflow = "";
    }
    toggle.addEventListener("click", function () {
      var open = links.classList.toggle("open");
      backdrop && backdrop.classList.toggle("show", open);
      toggle.setAttribute("aria-expanded", String(open));
      document.body.style.overflow = open ? "hidden" : "";
    });
    backdrop && backdrop.addEventListener("click", close);
    links.addEventListener("click", function (e) {
      if (e.target.tagName === "A") close();
    });
    document.addEventListener("keydown", function (e) { if (e.key === "Escape") close(); });
  }

  /* ---------- Header shadow on scroll ---------- */
  function headerScroll() {
    var h = document.getElementById("siteHeader");
    if (!h) return;
    var onScroll = function () { h.classList.toggle("scrolled", window.scrollY > 8); };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
  }

  /* ---------- Language selector ---------- */
  var I18N = {
    en: { tagline: "Pacific Island Escape", cta: "Plan Your Trip" },
    mt: { tagline: "Te Henua o te Moana", cta: "Akamata Te Tere" },
    ja: { tagline: "南太平洋の楽園", cta: "旅行を計画する" },
    es: { tagline: "Escapada a la isla", cta: "Planea tu viaje" }
  };
  function languageMenu() {
    var sel = document.getElementById("langSelect");
    if (!sel) return;
    var saved = localStorage.getItem("taniti-lang") || "en";
    sel.value = saved;
    applyLang(saved);
    sel.addEventListener("change", function () {
      localStorage.setItem("taniti-lang", sel.value);
      applyLang(sel.value);
      toast("Language set to " + sel.options[sel.selectedIndex].text);
    });
  }
  function applyLang(code) {
    var t = I18N[code] || I18N.en;
    document.querySelectorAll(".brand small").forEach(function (n) { n.textContent = t.tagline; });
    document.querySelectorAll(".nav-cta .btn").forEach(function (n) { n.textContent = t.cta; });
    document.documentElement.setAttribute("lang", code === "mt" ? "en" : code);
  }

  /* ---------- Scroll reveal ---------- */
  function reveal() {
    var els = document.querySelectorAll(".reveal");
    if (!("IntersectionObserver" in window) || !els.length) {
      els.forEach(function (e) { e.classList.add("in"); });
      return;
    }
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (en.isIntersecting) { en.target.classList.add("in"); io.unobserve(en.target); }
      });
    }, { threshold: 0.12 });
    els.forEach(function (e) { io.observe(e); });
  }

  /* ---------- Accordions ---------- */
  function accordions() {
    document.querySelectorAll(".acc-head").forEach(function (head) {
      head.addEventListener("click", function () {
        var item = head.closest(".acc-item");
        var panel = item.querySelector(".acc-panel");
        var open = item.classList.toggle("open");
        panel.style.maxHeight = open ? panel.scrollHeight + "px" : null;
        head.setAttribute("aria-expanded", String(open));
      });
    });
  }

  /* ---------- Newsletter (footer) ---------- */
  function newsletter() {
    document.querySelectorAll("[data-newsletter]").forEach(function (f) {
      f.addEventListener("submit", function (e) {
        e.preventDefault();
        var input = f.querySelector("input");
        if (input.checkValidity()) { toast("Thanks for subscribing! 🌺"); f.reset(); }
        else { input.reportValidity(); }
      });
    });
  }

  /* ---------- Toast ---------- */
  var toastTimer;
  function toast(msg) {
    var el = document.getElementById("toast");
    if (!el) {
      el = document.createElement("div");
      el.id = "toast"; el.className = "toast";
      document.body.appendChild(el);
    }
    el.innerHTML = ICON.check + "<span></span>";
    el.querySelector("span").textContent = msg;
    requestAnimationFrame(function () { el.classList.add("show"); });
    clearTimeout(toastTimer);
    toastTimer = setTimeout(function () { el.classList.remove("show"); }, 3200);
  }
  window.tanitiToast = toast;

  /* ---------- Init ---------- */
  document.addEventListener("DOMContentLoaded", function () {
    buildHeader();
    buildFooter();
    startClock();
    mobileNav();
    headerScroll();
    languageMenu();
    reveal();
    accordions();
    newsletter();
    // page-specific hooks (defined in page scripts)
    if (window.tanitiPageInit) window.tanitiPageInit({ toast: toast, ICON: ICON });
  });
})();
