// SABAOTH Gráfica — interacções do site
// Número comercial em formato internacional, sem +, espaços ou traços.
const WHATSAPP_NUMBER = "244951940041";

function createWhatsAppUrl(message) {
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
}

document.querySelectorAll(".whatsapp-link").forEach((link) => {
  const message = link.dataset.message || "Olá, SABAOTH Gráfica! Gostaria de obter informações sobre os vossos serviços.";
  link.href = createWhatsAppUrl(message);
  link.target = "_blank";
  link.rel = "noopener noreferrer";
});

// Menu mobile acessível.
const menuToggle = document.querySelector(".menu-toggle");
const mainNav = document.querySelector(".main-nav");

function closeMenu() {
  if (!menuToggle || !mainNav) return;
  mainNav.classList.remove("is-open");
  menuToggle.setAttribute("aria-expanded", "false");
  menuToggle.setAttribute("aria-label", "Abrir menu");
}

if (menuToggle && mainNav) {
  menuToggle.addEventListener("click", () => {
    const isOpen = mainNav.classList.toggle("is-open");
    menuToggle.setAttribute("aria-expanded", String(isOpen));
    menuToggle.setAttribute("aria-label", isOpen ? "Fechar menu" : "Abrir menu");
  });

  mainNav.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", closeMenu);
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") closeMenu();
  });
}

// Filtros da galeria.
const filterButtons = [...document.querySelectorAll(".filter-button")];
const galleryCards = [...document.querySelectorAll(".gallery-card")];

filterButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const filter = button.dataset.filter;
    filterButtons.forEach((item) => {
      const active = item === button;
      item.classList.toggle("is-active", active);
      item.setAttribute("aria-pressed", String(active));
    });

    galleryCards.forEach((card) => {
      card.hidden = filter !== "todos" && card.dataset.category !== filter;
    });
  });
});

// Galeria em lightbox com navegação por setas.
const lightbox = document.querySelector("#lightbox");
const lightboxImage = document.querySelector(".lightbox-image");
const lightboxCaption = document.querySelector(".lightbox-caption");
const lightboxClose = document.querySelector(".lightbox-close");
const lightboxPrev = document.querySelector(".lightbox-prev");
const lightboxNext = document.querySelector(".lightbox-next");
let currentImageIndex = 0;
let visibleCards = [];

function refreshVisibleCards() {
  visibleCards = galleryCards.filter((card) => !card.hidden);
}

function showLightboxImage(index) {
  refreshVisibleCards();
  if (!visibleCards.length) return;
  currentImageIndex = (index + visibleCards.length) % visibleCards.length;
  const card = visibleCards[currentImageIndex];
  const image = card.querySelector("img");
  lightboxImage.src = card.dataset.full;
  lightboxImage.alt = image.alt;
  lightboxCaption.textContent = image.alt;
}

function openLightbox(card) {
  refreshVisibleCards();
  const index = visibleCards.indexOf(card);
  if (index < 0) return;
  showLightboxImage(index);
  lightbox.classList.add("is-open");
  lightbox.setAttribute("aria-hidden", "false");
  document.body.classList.add("no-scroll");
  lightboxClose.focus();
}

function closeLightbox() {
  lightbox.classList.remove("is-open");
  lightbox.setAttribute("aria-hidden", "true");
  document.body.classList.remove("no-scroll");
}

galleryCards.forEach((card) => {
  card.addEventListener("click", () => openLightbox(card));
});
lightboxClose.addEventListener("click", closeLightbox);
lightboxPrev.addEventListener("click", () => showLightboxImage(currentImageIndex - 1));
lightboxNext.addEventListener("click", () => showLightboxImage(currentImageIndex + 1));
lightbox.addEventListener("click", (event) => {
  if (event.target === lightbox) closeLightbox();
});
document.addEventListener("keydown", (event) => {
  if (!lightbox.classList.contains("is-open")) return;
  if (event.key === "Escape") closeLightbox();
  if (event.key === "ArrowLeft") showLightboxImage(currentImageIndex - 1);
  if (event.key === "ArrowRight") showLightboxImage(currentImageIndex + 1);
});

// Ano actual no rodapé.
const yearElement = document.querySelector("#current-year");
if (yearElement) yearElement.textContent = new Date().getFullYear();


// Visualizar os trabalhos de design gráfico no mesmo lightbox da galeria.
document.querySelectorAll('[data-design-image]').forEach((card) => {
  card.addEventListener('click', () => {
    const lightbox = document.querySelector('#lightbox');
    const image = lightbox?.querySelector('.lightbox-image');
    const caption = lightbox?.querySelector('.lightbox-caption');
    if (!lightbox || !image || !caption) return;
    image.src = card.dataset.designImage;
    image.alt = card.dataset.designTitle || 'Trabalho de design gráfico';
    caption.textContent = card.dataset.designTitle || 'Trabalho de design gráfico';
    lightbox.classList.add('is-open');
    lightbox.setAttribute('aria-hidden', 'false');
    document.body.classList.add('lightbox-open');
  });
});
