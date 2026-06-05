/* ============================================================
   AETERNA — Static site interactions (vanilla JS)
   ------------------------------------------------------------
   EDIT YOUR DETAILS HERE 👇
   ============================================================ */
const SITE = {
  brand: "EL STYLE HOUSE",
  whatsappNumber: "2348139485908", // international format, digits only (no + or spaces)
  whatsappMessage: "Hello EL STYLE HOUSE, I'd like to enquire about a bespoke appointment.",
  email: "elstylehouse@gmail.com",
  phoneDisplay: "2348139485908",
  address: "86, Ziks Avenue, Uwani, Enugu, Nigeria",
  instagram: "https://www.instagram.com/elstylehouse?igsh=MXFmODNwdXp2bnVwZw==",
};

function whatsappLink(message = SITE.whatsappMessage) {
  return `https://wa.me/${SITE.whatsappNumber}?text=${encodeURIComponent(message)}`;
}

/* ---------- Inject brand + contact details ---------- */
document.querySelectorAll("[data-brand]").forEach((el) => (el.textContent = SITE.brand));
document.querySelectorAll("[data-wa]").forEach((el) => {
  el.href = whatsappLink();
  el.target = "_blank";
  el.rel = "noopener noreferrer";
});
const addrEl = document.querySelector("[data-address]");
if (addrEl) addrEl.textContent = SITE.address;
const phoneEl = document.querySelector("[data-phone]");
if (phoneEl) phoneEl.textContent = SITE.phoneDisplay;
const emailEl = document.querySelector("[data-email]");
if (emailEl) { emailEl.textContent = SITE.email; emailEl.href = `mailto:${SITE.email}`; }
const igEl = document.querySelector("[data-instagram]");
if (igEl) igEl.href = SITE.instagram;
const emailLink = document.querySelector("[data-email-link]");
if (emailLink) emailLink.href = `mailto:${SITE.email}`;
document.getElementById("year").textContent = new Date().getFullYear();

/* ---------- Sticky navbar (transparent -> solid) ---------- */
const navbar = document.getElementById("navbar");
const onScrollNav = () => navbar.classList.toggle("scrolled", window.scrollY > 40);
onScrollNav();
window.addEventListener("scroll", onScrollNav, { passive: true });

/* ---------- Mobile menu ---------- */
const menuToggle = document.getElementById("menuToggle");
const mobileMenu = document.getElementById("mobileMenu");
menuToggle.addEventListener("click", () => {
  menuToggle.classList.toggle("open");
  mobileMenu.classList.toggle("open");
});
mobileMenu.querySelectorAll("a").forEach((a) =>
  a.addEventListener("click", () => {
    menuToggle.classList.remove("open");
    mobileMenu.classList.remove("open");
  })
);

/* ---------- Scroll reveal animations ---------- */
const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        revealObserver.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.15 }
);
document.querySelectorAll(".reveal").forEach((el) => revealObserver.observe(el));

/* ---------- Animated counters ---------- */
function animateCounter(el) {
  const target = parseInt(el.dataset.count, 10);
  const duration = 1600;
  const start = performance.now();
  function tick(now) {
    const p = Math.min((now - start) / duration, 1);
    const eased = 1 - Math.pow(1 - p, 3);
    el.textContent = Math.round(eased * target);
    if (p < 1) requestAnimationFrame(tick);
  }
  requestAnimationFrame(tick);
}
const counterObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        animateCounter(entry.target);
        counterObserver.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.5 }
);
document.querySelectorAll("[data-count]").forEach((el) => counterObserver.observe(el));

/* ---------- Hero parallax ---------- */
const heroImg = document.getElementById("heroImg");
if (heroImg) {
  window.addEventListener(
    "scroll",
    () => { heroImg.style.transform = `translateY(${window.scrollY * 0.4}px)`; },
    { passive: true }
  );
}

/* ---------- Testimonials slider ---------- */
const track = document.getElementById("testTrack");
const scrollByDir = (dir) => track.scrollBy({ left: dir * track.clientWidth * 0.8, behavior: "smooth" });
document.getElementById("testPrev").addEventListener("click", () => scrollByDir(-1));
document.getElementById("testNext").addEventListener("click", () => scrollByDir(1));

/* ---------- Toast helper ---------- */
const toast = document.getElementById("toast");
function showToast(msg) {
  toast.textContent = msg;
  toast.classList.add("show");
  setTimeout(() => toast.classList.remove("show"), 2600);
}

/* ---------- Contact form -> WhatsApp ---------- */
document.getElementById("contactForm").addEventListener("submit", (e) => {
  e.preventDefault();
  const name = document.getElementById("cName").value.trim();
  const email = document.getElementById("cEmail").value.trim();
  const message = document.getElementById("cMessage").value.trim();
  const text = `Enquiry from ${name || "a guest"} (${email || "no email"}): ${message || "I'd like to learn more about the atelier."}`;
  window.open(whatsappLink(text), "_blank", "noopener,noreferrer");
  showToast("Opening WhatsApp to send your enquiry…");
});

/* ---------- Smooth scroll for in-page anchors ---------- */
document.querySelectorAll('a[href^="#"]').forEach((a) => {
  a.addEventListener("click", (e) => {
    const id = a.getAttribute("href");
    if (id.length > 1) {
      const target = document.querySelector(id);
      if (target) { e.preventDefault(); target.scrollIntoView({ behavior: "smooth" }); }
    }
  });
});
