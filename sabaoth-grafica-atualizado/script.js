// SABAOTH Gráfica — interacções do site

const WHATSAPP_NUMBER = "244951940041";

function createWhatsAppUrl(message) {
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
}

function formatKz(value) {
  return new Intl.NumberFormat("pt-AO", { maximumFractionDigits: 0 }).format(value) + " Kz";
}

// Ligações de contacto pelo WhatsApp.
function setupWhatsAppLinks() {
  document.querySelectorAll(".whatsapp-link").forEach((link) => {
    const message = link.dataset.message || "Olá, SABAOTH Gráfica! Gostaria de obter informações sobre os vossos serviços.";
    link.href = createWhatsAppUrl(message);
    link.target = "_blank";
    link.rel = "noopener noreferrer";
  });
}
setupWhatsAppLinks();

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
  mainNav.querySelectorAll("a").forEach((link) => link.addEventListener("click", closeMenu));
  document.addEventListener("keydown", (event) => { if (event.key === "Escape") closeMenu(); });
}

// Produtos e serviços da tabela de preços.
const sabaothProducts = [
  { name: "Boné pesado", price: 5000, icon: "🧢", category: "Personalizados", description: "Boné pesado personalizado." },
  { name: "Boné básico", price: 3500, icon: "🧢", category: "Personalizados", description: "Boné básico para divulgar a sua marca." },
  { name: "Caneta", price: 1500, icon: "✒️", category: "Brindes", description: "Caneta para uso profissional ou promocional." },
  { name: "Agenda personalizada", price: 5000, icon: "📔", category: "Papelaria", description: "Agenda personalizada para organizar o seu dia." },
  { name: "Caneca", price: 5000, icon: "☕", category: "Personalizados", description: "Caneca personalizada para oferecer ou promover a sua marca." },
  { name: "T-shirt", price: 6000, icon: "👕", category: "Vestuário", description: "T-shirt personalizada para a sua marca, equipa ou evento." },
  { name: "T-shirt leve", price: 3000, icon: "👕", category: "Vestuário", description: "T-shirt leve para divulgação e identificação." },
  { name: "Carimbo personalizado", price: 10000, icon: "🔖", category: "Timbragem", description: "Carimbo personalizado para documentos e uso profissional." },
  { name: "Convites", price: 1500, icon: "✉️", category: "Papelaria", description: "Convites para eventos e ocasiões especiais." },
  { name: "Casaco personalizado", price: 12000, icon: "🧥", category: "Vestuário", description: "Casaco personalizado para a sua marca ou equipa." },
  { name: "Criação de logótipos", price: 6000, icon: "🎨", category: "Design gráfico", description: "Criação de logótipo para a identidade visual da sua marca." },
  { name: "Flyers A4", price: 6000, icon: "📄", category: "Impressão", description: "Flyers A4 para divulgar produtos, serviços ou eventos." },
  { name: "Passe PVC", price: 2000, icon: "🪪", category: "Identificação", description: "Passe em PVC para identificação." },
  { name: "Banners", price: 3000, icon: "🖼️", category: "Comunicação visual", description: "Banner para divulgação e comunicação visual." }
];

const pricingGrid = document.querySelector("#pricing-grid");
const priceSearch = document.querySelector("#price-search");
const pricingCount = document.querySelector("#pricing-count");

function renderPricing(searchTerm = "") {
  if (!pricingGrid) return;
  const query = searchTerm.trim().toLocaleLowerCase("pt-AO");
  const products = sabaothProducts.filter((product) =>
    `${product.name} ${product.category} ${product.description}`.toLocaleLowerCase("pt-AO").includes(query)
  );
  pricingGrid.replaceChildren();

  if (!products.length) {
    const empty = document.createElement("p");
    empty.className = "pricing-empty";
    empty.textContent = "Não encontrámos produtos com esse nome. Tente outra pesquisa.";
    pricingGrid.appendChild(empty);
    if (pricingCount) pricingCount.textContent = "Nenhum produto encontrado.";
    return;
  }

  products.forEach((product) => {
    const card = document.createElement("article");
    card.className = "pricing-card";
    const top = document.createElement("div"); top.className = "pricing-card-top";
    const icon = document.createElement("span"); icon.className = "pricing-product-icon";
    icon.setAttribute("aria-hidden", "true"); icon.textContent = product.icon;
    const badge = document.createElement("span"); badge.className = "pricing-badge"; badge.textContent = product.category;
    top.append(icon, badge);

    const title = document.createElement("h3"); title.textContent = product.name;
    const description = document.createElement("p"); description.className = "pricing-card-description";
    description.textContent = product.description;
    const bottom = document.createElement("div"); bottom.className = "pricing-card-bottom";
    const label = document.createElement("span"); label.className = "pricing-label"; label.textContent = "Preço indicado";
    const price = document.createElement("strong"); price.className = "pricing-value"; price.textContent = formatKz(product.price);
    bottom.append(label, price);

    const order = document.createElement("a"); order.className = "pricing-order";
    order.href = createWhatsAppUrl(`Olá, SABAOTH Gráfica! Gostaria de obter informações sobre ${product.name}. Vi o preço indicado de ${formatKz(product.price)}.`);
    order.target = "_blank"; order.rel = "noopener noreferrer"; order.textContent = "Consultar produto ↗";
    card.append(top, title, description, bottom, order);
    pricingGrid.appendChild(card);
  });
  if (pricingCount) pricingCount.textContent = `${products.length} ${products.length === 1 ? "produto ou serviço encontrado" : "produtos e serviços encontrados"}`;
}
if (pricingGrid) {
  renderPricing();
  if (priceSearch) priceSearch.addEventListener("input", () => renderPricing(priceSearch.value));
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
    galleryCards.forEach((card) => { card.hidden = filter !== "todos" && card.dataset.category !== filter; });
  });
});

// Apresentar o preço por baixo das imagens da galeria que têm preço associado.
galleryCards.forEach((card) => {
  const caption = card.querySelector(".gallery-caption");
  const price = Number(card.dataset.price);
  if (!caption || !Number.isFinite(price) || price <= 0) return;
  const priceLabel = document.createElement("span");
  priceLabel.className = "gallery-price";
  priceLabel.textContent = formatKz(price);
  caption.appendChild(priceLabel);
});

// Preços nos cartões de criação de logótipos do portfólio.
document.querySelectorAll(".design-card[data-price]").forEach((card) => {
  const price = Number(card.dataset.price);
  if (!Number.isFinite(price) || price <= 0) return;
  const priceLabel = document.createElement("strong");
  priceLabel.className = "design-price";
  priceLabel.textContent = `Preço indicado: ${formatKz(price)}`;
  card.appendChild(priceLabel);
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
function refreshVisibleCards() { visibleCards = galleryCards.filter((card) => !card.hidden); }
function showLightboxImage(index) {
  refreshVisibleCards();
  if (!visibleCards.length || !lightboxImage || !lightboxCaption) return;
  currentImageIndex = (index + visibleCards.length) % visibleCards.length;
  const card = visibleCards[currentImageIndex];
  const image = card.querySelector("img");
  lightboxImage.src = card.dataset.full || image.src;
  lightboxImage.alt = image.alt;
  const productPrice = Number(card.dataset.price);
  lightboxCaption.textContent = `${image.alt}${productPrice > 0 ? ` — ${formatKz(productPrice)}` : ""}`;
}
function openLightbox(card) {
  refreshVisibleCards();
  const index = visibleCards.indexOf(card);
  if (index < 0 || !lightbox) return;
  showLightboxImage(index);
  lightbox.classList.add("is-open");
  lightbox.setAttribute("aria-hidden", "false");
  document.body.classList.add("no-scroll");
  lightboxClose?.focus();
}
function closeLightbox() {
  if (!lightbox) return;
  lightbox.classList.remove("is-open");
  lightbox.setAttribute("aria-hidden", "true");
  document.body.classList.remove("no-scroll", "lightbox-open");
}
galleryCards.forEach((card) => card.addEventListener("click", () => openLightbox(card)));
lightboxClose?.addEventListener("click", closeLightbox);
lightboxPrev?.addEventListener("click", () => showLightboxImage(currentImageIndex - 1));
lightboxNext?.addEventListener("click", () => showLightboxImage(currentImageIndex + 1));
lightbox?.addEventListener("click", (event) => { if (event.target === lightbox) closeLightbox(); });

// Os trabalhos de design gráfico usam o mesmo lightbox.
document.querySelectorAll("[data-design-image]").forEach((card) => {
  card.addEventListener("click", () => {
    if (!lightbox || !lightboxImage || !lightboxCaption) return;
    lightboxImage.src = card.dataset.designImage;
    lightboxImage.alt = card.dataset.designTitle || "Trabalho de design gráfico";
    const price = Number(card.dataset.price);
    lightboxCaption.textContent = `${card.dataset.designTitle || "Trabalho de design gráfico"}${price > 0 ? ` — ${formatKz(price)}` : ""}`;
    lightbox.classList.add("is-open");
    lightbox.setAttribute("aria-hidden", "false");
    document.body.classList.add("no-scroll");
    lightboxClose?.focus();
  });
});

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape") { closeMenu(); if (lightbox?.classList.contains("is-open")) closeLightbox(); }
  if (!lightbox?.classList.contains("is-open")) return;
  if (event.key === "ArrowLeft") showLightboxImage(currentImageIndex - 1);
  if (event.key === "ArrowRight") showLightboxImage(currentImageIndex + 1);
});

// Ano actual no rodapé.
const yearElement = document.querySelector("#current-year");
if (yearElement) yearElement.textContent = new Date().getFullYear();

