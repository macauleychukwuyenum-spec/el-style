/* ============================================================
   EL STYLE HOUSE — Collections page (vanilla JS)
   ------------------------------------------------------------
   EDIT YOUR DETAILS HERE 👇  (keep in sync with main.js)
   ============================================================ */
const SITE = {
  brand: "EL STYLE HOUSE",
  whatsappNumber: "2348139485908", // international format, digits only (no + or spaces)
  email: "elstylehouse@gmail.com",
  instagram: "https://www.instagram.com/elstylehouse?igsh=MXFmODNwdXp2bnVwZw==",
};

function whatsappLink(message) {
  return `https://wa.me/${SITE.whatsappNumber}?text=${encodeURIComponent(message)}`;
}

/* ---------- Inject brand + contact details ---------- */
document.querySelectorAll("[data-brand]").forEach((el) => (el.textContent = SITE.brand));
document.querySelectorAll("[data-wa]").forEach((el) => {
  el.href = whatsappLink("Hello EL STYLE HOUSE, I'd like to enquire about a bespoke appointment.");
  el.target = "_blank";
  el.rel = "noopener noreferrer";
});
const igEl = document.querySelector("[data-instagram]");
if (igEl) igEl.href = SITE.instagram;
const emailLink = document.querySelector("[data-email-link]");
if (emailLink) emailLink.href = `mailto:${SITE.email}`;
const yearEl = document.getElementById("year");
if (yearEl) yearEl.textContent = new Date().getFullYear();

/* ---------- Navbar stays solid on this page ---------- */
const navbar = document.getElementById("navbar");
if (navbar) navbar.classList.add("scrolled");

/* ---------- Mobile menu ---------- */
const menuToggle = document.getElementById("menuToggle");
const mobileMenu = document.getElementById("mobileMenu");
if (menuToggle && mobileMenu) {
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
}

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

/* ---------- Toast helper ---------- */
const toast = document.getElementById("toast");
function showToast(msg) {
  if (!toast) return;
  toast.textContent = msg;
  toast.classList.add("show");
  setTimeout(() => toast.classList.remove("show"), 2600);
}

/* ---------- Multi-select gallery ---------- */
const grid = document.getElementById("collectionGrid");
const selectBar = document.getElementById("selectBar");
const selectCount = document.getElementById("selectCount");
const enquireBtn = document.getElementById("enquireSelect");
const clearBtn = document.getElementById("clearSelect");
const selected = new Set();

function buildMessage() {
  const list = Array.from(selected);
  return `Hello ${SITE.brand}, I'm interested in this ${list.join(", ")} i saw on your website and i know you have more designs. Please share more details.`;
}

function syncUI() {
  const count = selected.size;
  if (selectCount) {
    selectCount.textContent = count === 1 ? "1 piece selected" : `${count} pieces selected`;
  }
  if (enquireBtn) enquireBtn.href = count ? whatsappLink(buildMessage()) : "#";
  if (selectBar) selectBar.classList.toggle("visible", count > 0);
  document.body.classList.toggle("bar-open", count > 0);
}

if (grid) {
  grid.querySelectorAll(".piece").forEach((piece) => {
    piece.setAttribute("aria-pressed", "false");
    piece.addEventListener("click", () => {
      const name = piece.dataset.piece;
      const isOn = piece.classList.toggle("selected");
      piece.setAttribute("aria-pressed", isOn ? "true" : "false");
      if (isOn) selected.add(name);
      else selected.delete(name);
      syncUI();
    });
  });
}

if (clearBtn) {
  clearBtn.addEventListener("click", () => {
    selected.clear();
    if (grid) grid.querySelectorAll(".piece.selected").forEach((p) => {
      p.classList.remove("selected");
      p.setAttribute("aria-pressed", "false");
    });
    syncUI();
  });
}

if (enquireBtn) {
  enquireBtn.addEventListener("click", (e) => {
    if (selected.size === 0) {
      e.preventDefault();
      return;
    }
    showToast("Opening WhatsApp with your selection…");
  });
}

syncUI();
