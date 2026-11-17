"use strict";

const portfolioData = {
  whatsapp: "5581988015164",
  linkedin: "https://www.linkedin.com/in/filipe-gualberto-992b9a346/",
  github: "https://github.com/Lk7pee",
  instagram: "https://www.instagram.com/entaolipe/"
};

// Fonte única dos cartões. Após editar, execute: node tools/sync-projects.cjs
const projects = [
  {
    title: "Cartório Registral de Abreu e Lima",
    category: "Registro de Imóveis, RTD e RCPJ",
    description: "Site institucional que organiza os serviços registrais e facilita o acesso às informações e aos canais de atendimento.",
    url: "https://cartorioregistralabreuelima.com/",
    image: "assets/projects/registral-abreu-lima.webp",
    imageAlt: "Página inicial da Serventia Registral de Abreu e Lima, com serviços e canais de atendimento.",
    color: "#e3e8e5"
  },
  {
    title: "Cartório do Arruda",
    category: "Registro Civil das Pessoas Naturais",
    description: "Site institucional com navegação acessível, serviços organizados e informações úteis para o atendimento ao cidadão.",
    url: "https://www.cartoriodoarruda.com.br/",
    image: "assets/projects/cartorio-arruda.webp",
    imageAlt: "Página inicial do Cartório do Arruda, com apresentação do Registro Civil e identidade em tons terrosos.",
    color: "#e5e8dc"
  },
  {
    title: "Cartório RCPN São José do Belmonte",
    category: "Registro Civil das Pessoas Naturais",
    description: "Site responsivo desenvolvido para apresentar os serviços e facilitar o acesso às orientações e ao atendimento.",
    url: "https://cartoriosjbelmontepe.com/",
    image: "assets/projects/sao-jose-belmonte.webp",
    imageAlt: "Página inicial do Cartório Silva de São José do Belmonte, com apresentação e acessos aos serviços.",
    color: "#e6e1db"
  },
  {
    title: "Cartório RCPN de Abreu e Lima",
    category: "Registro Civil das Pessoas Naturais — RCPN",
    description: "Site institucional desenvolvido para facilitar o acesso aos serviços, orientações e canais de atendimento do Registro Civil de Abreu e Lima/PE.",
    url: "https://registrocivilabreuelima.com/",
    image: "assets/projects/rcpn-abreu-lima.webp",
    imageAlt: "Página inicial do RCPN de Abreu e Lima, com serviços de registro civil e canais de atendimento.",
    color: "#e0e5e9"
  }
];

const createWhatsAppUrl = (message) =>
  `https://wa.me/${portfolioData.whatsapp}?text=${encodeURIComponent(message)}`;

const escapeHtml = (value) => String(value).replace(/[&<>"']/g, (character) => ({
  "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;"
})[character]);

// A mesma função gera o HTML estático e a apresentação no navegador.
const renderProjectsMarkup = () => projects.map((project) => {
  const message = `Olá, Filipe! Vi o projeto ${project.title} no seu portfólio e gostaria de solicitar algo parecido.`;
  const title = escapeHtml(project.title);
  return `<article class="project-card">
  <div class="project-preview" style="--preview-bg: ${escapeHtml(project.color)}">
    ${project.image ? `<img src="${escapeHtml(project.image)}" alt="${escapeHtml(project.imageAlt)}" width="1200" height="800" loading="lazy" decoding="async">` : ""}
    <div class="project-fallback"${project.image ? " hidden" : ""}>${title}<small>Conheça o projeto no site publicado.</small></div>
  </div>
  <div class="project-info">
    <p class="project-category">${escapeHtml(project.category)}</p>
    <h3 class="project-title">${title}</h3>
    <p class="project-description">${escapeHtml(project.description)}</p>
    <div class="project-actions">
      <a class="button button-secondary" href="${escapeHtml(project.url)}" target="_blank" rel="noopener noreferrer" aria-label="Visitar site: ${title} (nova aba)">Visitar site <span aria-hidden="true">↗</span></a>
      <a class="text-link" href="${escapeHtml(createWhatsAppUrl(message))}" target="_blank" rel="noopener noreferrer" aria-label="Solicitar algo parecido com ${title} pelo WhatsApp">Solicitar algo parecido</a>
    </div>
  </div>
</article>`;
}).join("\n");

const setupProjects = () => {
  const grid = document.querySelector("#projects-grid");
  grid.innerHTML = renderProjectsMarkup();
  grid.querySelectorAll("img").forEach((img) => {
    const showFallback = () => { img.hidden = true; img.nextElementSibling.hidden = false; };
    img.addEventListener("error", showFallback);
    if (img.complete && !img.naturalWidth) showFallback();
  });
};

const setupTheme = () => {
  const button = document.querySelector(".theme-toggle");
  const preference = matchMedia("(prefers-color-scheme: dark)");
  let manualTheme = null;
  try {
    const saved = localStorage.getItem("fg-theme");
    if (saved === "light" || saved === "dark") manualTheme = saved;
  } catch { /* O tema funciona quando o armazenamento é bloqueado. */ }
  const apply = () => {
    const theme = manualTheme || (preference.matches ? "dark" : "light");
    document.documentElement.dataset.theme = theme;
    document.querySelector("#theme-color-meta").content = theme === "dark" ? "#101014" : "#F7F1E8";
    button.setAttribute("aria-pressed", String(theme === "dark"));
    button.title = theme === "dark" ? "Ativar tema claro" : "Ativar tema escuro";
  };
  button.addEventListener("click", () => {
    manualTheme = document.documentElement.dataset.theme === "dark" ? "light" : "dark";
    try { localStorage.setItem("fg-theme", manualTheme); } catch { /* Preserva a escolha nesta visita. */ }
    apply();
  });
  preference.addEventListener("change", apply);
  window.addEventListener("storage", (event) => {
    if (event.key === "fg-theme" || event.key === null) {
      manualTheme = event.newValue === "light" || event.newValue === "dark" ? event.newValue : null;
      apply();
    }
  });
  apply();
  button.hidden = false;
};

const setupMobileMenu = () => {
  const header = document.querySelector(".site-header");
  const toggle = document.querySelector(".menu-toggle");
  const nav = document.querySelector(".main-nav");
  const desktop = matchMedia("(min-width: 980px)");
  const close = (restoreFocus = false) => {
    nav.classList.remove("open");
    toggle.setAttribute("aria-expanded", "false");
    toggle.setAttribute("aria-label", "Abrir menu");
    if (restoreFocus) toggle.focus();
  };
  toggle.addEventListener("click", () => {
    const open = toggle.getAttribute("aria-expanded") !== "true";
    nav.classList.toggle("open", open);
    toggle.setAttribute("aria-expanded", String(open));
    toggle.setAttribute("aria-label", open ? "Fechar menu" : "Abrir menu");
  });
  nav.querySelectorAll("a").forEach((link) => link.addEventListener("click", () => {
    close();
    document.querySelector(link.hash)?.focus({ preventScroll: true });
  }));
  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && nav.classList.contains("open")) close(true);
  });
  document.addEventListener("click", (event) => { if (!header.contains(event.target)) close(); });
  header.addEventListener("focusout", (event) => { if (!header.contains(event.relatedTarget)) close(); });
  desktop.addEventListener("change", () => close(!desktop.matches && nav.contains(document.activeElement)));
  toggle.hidden = false;
  header.classList.add("menu-ready");
};

const setupQuoteForm = () => {
  const form = document.querySelector("#quote-form");
  const status = form.querySelector(".form-status");
  const fields = [form.querySelector("#name"), form.querySelector("#project-type"), form.querySelector("#description")];
  const validate = (field) => {
    const minimum = field.id === "name" ? 2 : field.id === "description" ? 10 : 1;
    const error = field.value.trim().length < minimum
      ? (field.id === "name" ? "Informe seu nome com pelo menos 2 caracteres." : field.id === "description" ? "Descreva sua ideia com pelo menos 10 caracteres." : "Selecione o tipo de projeto.")
      : "";
    field.setAttribute("aria-invalid", String(Boolean(error)));
    document.getElementById(field.getAttribute("aria-describedby")).textContent = error;
    return !error;
  };
  fields.forEach((field) => field.addEventListener("input", () => {
    status.textContent = "";
    if (field.getAttribute("aria-invalid") === "true") validate(field);
  }));
  // Uma única navegação na mesma aba evita pop-ups bloqueados e abas duplicadas.
  let navigating = false;
  form.addEventListener("submit", (event) => {
    event.preventDefault();
    if (navigating) return;
    const valid = fields.map(validate).every(Boolean);
    if (!valid) {
      status.textContent = "Confira os campos indicados para continuar.";
      fields.find((field) => field.getAttribute("aria-invalid") === "true").focus();
      return;
    }
    const message = ["Olá, Filipe! Quero solicitar um orçamento.", "", `Nome: ${fields[0].value.trim()}`, `Tipo de projeto: ${fields[1].value}`, `Descrição: ${fields[2].value.trim()}`].join("\n");
    navigating = true;
    status.textContent = "Abrindo sua mensagem no WhatsApp…";
    window.location.assign(createWhatsAppUrl(message));
    window.setTimeout(() => { navigating = false; }, 1500);
  });
  window.addEventListener("pageshow", () => { navigating = false; status.textContent = ""; });
  const briefing = document.querySelector("#orcamento");
  briefing.hidden = false;
  const openLinkedBriefing = () => { if (location.hash === "#orcamento") briefing.open = true; };
  openLinkedBriefing();
  window.addEventListener("hashchange", openLinkedBriefing);
};

const initializePortfolio = () => {
  setupTheme();
  setupMobileMenu();
  setupProjects();
  setupQuoteForm();
  document.querySelectorAll("[data-whatsapp-message]").forEach((link) => { link.href = createWhatsAppUrl(link.dataset.whatsappMessage); });
};
if (typeof document !== "undefined") initializePortfolio();
// Exportação para manutenção opcional do HTML estático, sem dependências.
if (typeof module !== "undefined" && module.exports) module.exports = { projects, renderProjectsMarkup };
