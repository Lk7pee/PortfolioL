"use strict";

const portfolioData = {
  whatsapp: "5581988015164",
  linkedin: "https://www.linkedin.com/in/filipe-gualberto-992b9a346/",
  github: "https://github.com/Lk7pee",
  instagram: "https://www.instagram.com/entaolipe/"
};

const themeConfig = {
  storageKey: "fg-theme",
  colors: {
    dark: "#101014",
    light: "#F7F1E8"
  },
  labels: {
    dark: {
      icon: "☾",
      text: "Escuro",
      aria: "Tema escuro ativo. Alternar para tema claro."
    },
    light: {
      icon: "☀",
      text: "Claro",
      aria: "Tema claro ativo. Alternar para tema escuro."
    }
  }
};

const projects = [
  {
    title: "Cartório Registral Abreu e Lima",
    category: "Site para Cartório Registral RI - RTD - RCPJ",
    url: "https://cartorioregistralabreuelima.com/",
    description: "Site profissional voltado para apresentar a instituição, os serviços registrais e os principais canais de atendimento ao público.",
    objective: "Organizar informações institucionais e facilitar o acesso do público aos canais e serviços do cartório.",
    color: "#E4572E",
    number: "01",
    symbol: "A"
  },
  {
    title: "13º RCPN de Recife - PE",
    subtitle: "Cartório do Arruda",
    category: "Site para Cartório de Registro Civil",
    url: "https://www.cartoriodoarruda.com.br/",
    description: "Projeto focado em navegação simples, informações bem distribuídas e acesso rápido aos serviços e orientações da serventia.",
    objective: "Criar um ponto de referência digital claro para quem procura informações e atendimento do cartório.",
    color: "#2E7D6B",
    number: "02",
    symbol: "R"
  },
  {
    title: "Cartório RCPN São José do Belmonte",
    category: "Site para Cartório de Registro Civil",
    url: "https://cartoriosjbelmontepe.com/",
    description: "Site responsivo criado para reunir informações institucionais, contatos, serviços e orientações úteis em uma estrutura acessível.",
    objective: "Aproximar o cartório do público por meio de uma página leve, organizada e confortável de acessar pelo celular.",
    color: "#7C3AED",
    number: "03",
    symbol: "B"
  }
];

const createWhatsAppUrl = (message) =>
  `https://wa.me/${portfolioData.whatsapp}?text=${encodeURIComponent(message)}`;

const getSystemTheme = () =>
  window.matchMedia("(prefers-color-scheme: light)").matches ? "light" : "dark";

const getSavedTheme = () => {
  try {
    const savedTheme = localStorage.getItem(themeConfig.storageKey);
    return savedTheme === "light" || savedTheme === "dark" ? savedTheme : null;
  } catch (error) {
    return null;
  }
};

const saveTheme = (theme) => {
  try {
    localStorage.setItem(themeConfig.storageKey, theme);
  } catch (error) {
    return false;
  }

  return true;
};

const applyTheme = (theme) => {
  const selectedTheme = theme === "light" ? "light" : "dark";
  const themeData = themeConfig.labels[selectedTheme];
  const themeMeta = document.querySelector("#theme-color-meta") || document.querySelector('meta[name="theme-color"]');

  document.documentElement.dataset.theme = selectedTheme;
  document.documentElement.style.colorScheme = selectedTheme;

  if (themeMeta) {
    themeMeta.setAttribute("content", themeConfig.colors[selectedTheme]);
  }

  document.querySelectorAll(".theme-toggle").forEach((button) => {
    button.setAttribute("aria-pressed", (selectedTheme === "dark").toString());
    button.setAttribute("aria-label", themeData.aria);
    button.title = themeData.aria;

    button.querySelector(".theme-toggle-icon").textContent = themeData.icon;
    button.querySelector(".theme-toggle-label").textContent = themeData.text;
  });
};

const setupTheme = () => {
  const mediaQuery = window.matchMedia("(prefers-color-scheme: light)");

  applyTheme(getSavedTheme() || getSystemTheme());

  document.querySelectorAll(".theme-toggle").forEach((button) => {
    button.addEventListener("click", () => {
      const currentTheme = document.documentElement.dataset.theme === "light" ? "light" : "dark";
      const nextTheme = currentTheme === "dark" ? "light" : "dark";

      saveTheme(nextTheme);
      applyTheme(nextTheme);
    });
  });

  const syncWithSystem = (event) => {
    if (!getSavedTheme()) {
      applyTheme(event.matches ? "light" : "dark");
    }
  };

  if (typeof mediaQuery.addEventListener === "function") {
    mediaQuery.addEventListener("change", syncWithSystem);
  } else if (typeof mediaQuery.addListener === "function") {
    mediaQuery.addListener(syncWithSystem);
  }
};

const renderProjects = () => {
  const projectsGrid = document.querySelector("#projects-grid");

  if (!projectsGrid) return;

  projectsGrid.innerHTML = projects.map((project) => {
    const message = `Olá, Filipe! Vi o projeto ${project.title} no seu portfólio e gostaria de solicitar algo parecido.`;

    return `
      <article class="case-study reveal" style="--case-color: ${project.color};">
        <div class="case-visual" aria-hidden="true">
          <span class="case-label">Case study / ${project.number}</span>
          <div class="case-dots">${"<i></i>".repeat(9)}</div>
          <span class="case-shape case-shape-main">${project.symbol}</span>
          <span class="case-shape case-shape-small"></span>
          <span class="case-shape case-shape-line"></span>
        </div>
        <div class="case-info">
          <div class="case-meta">
            <span>${project.category}</span>
            <span>Projeto ${project.number}</span>
          </div>
          <h3>${project.title}</h3>
          ${project.subtitle ? `<p class="case-subtitle">${project.subtitle}</p>` : ""}
          <p class="case-description">${project.description}</p>
          <div class="case-objective">
            <strong>Objetivo do projeto</strong>
            <p>${project.objective}</p>
          </div>
          <div class="case-actions">
            <a class="button case-secondary" href="${project.url}" target="_blank" rel="noopener noreferrer" aria-label="Ver site ${project.title}">
              Ver site <span aria-hidden="true">↗</span>
            </a>
            <a class="button case-primary" href="${createWhatsAppUrl(message)}" target="_blank" rel="noopener noreferrer">
              Quero algo parecido
            </a>
          </div>
        </div>
      </article>
    `;
  }).join("");
};

const setupWhatsAppLinks = () => {
  document.querySelectorAll("[data-whatsapp-message]").forEach((element) => {
    const message = element.dataset.whatsappMessage;

    if (element.tagName === "BUTTON") {
      element.addEventListener("click", () => {
        window.open(createWhatsAppUrl(message), "_blank", "noopener,noreferrer");
      });
    } else {
      element.setAttribute("href", createWhatsAppUrl(message));
    }
  });
};

const setupMobileMenu = () => {
  const menuToggle = document.querySelector(".menu-toggle");
  const navigation = document.querySelector(".main-nav");

  if (!menuToggle || !navigation) return;

  const closeMenu = () => {
    navigation.classList.remove("open");
    menuToggle.setAttribute("aria-expanded", "false");
    menuToggle.setAttribute("aria-label", "Abrir menu de navegação");
    document.body.classList.remove("nav-open");
  };

  const openMenu = () => {
    navigation.classList.add("open");
    menuToggle.setAttribute("aria-expanded", "true");
    menuToggle.setAttribute("aria-label", "Fechar menu de navegação");
    document.body.classList.add("nav-open");
  };

  menuToggle.addEventListener("click", () => {
    menuToggle.getAttribute("aria-expanded") === "true" ? closeMenu() : openMenu();
  });

  navigation.querySelectorAll("a").forEach((link) => link.addEventListener("click", closeMenu));

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") closeMenu();
  });

  document.addEventListener("click", (event) => {
    if (
      navigation.classList.contains("open") &&
      !navigation.contains(event.target) &&
      !menuToggle.contains(event.target)
    ) {
      closeMenu();
    }
  });

  window.addEventListener("resize", () => {
    if (window.innerWidth >= 980) closeMenu();
  });
};

const setupSmoothScroll = () => {
  document.querySelectorAll('a[href^="#"]:not([href="#"])').forEach((link) => {
    link.addEventListener("click", (event) => {
      const target = document.querySelector(link.getAttribute("href"));
      if (!target) return;

      event.preventDefault();
      target.scrollIntoView({
        behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth",
        block: "start"
      });
    });
  });
};

const setupHeaderEffect = () => {
  const header = document.querySelector(".site-header");
  if (!header) return;

  const updateHeader = () => header.classList.toggle("scrolled", window.scrollY > 20);
  updateHeader();
  window.addEventListener("scroll", updateHeader, { passive: true });
};

const setupFaq = () => {
  const questions = document.querySelectorAll(".faq-question");

  questions.forEach((question, index) => {
    const item = question.closest(".faq-item");
    const answer = item.querySelector(".faq-answer");
    const answerId = `faq-answer-${index + 1}`;

    answer.id = answerId;
    question.setAttribute("aria-controls", answerId);

    question.addEventListener("click", () => {
      const wasOpen = question.getAttribute("aria-expanded") === "true";

      questions.forEach((otherQuestion) => {
        otherQuestion.setAttribute("aria-expanded", "false");
        otherQuestion.closest(".faq-item").classList.remove("open");
      });

      if (!wasOpen) {
        question.setAttribute("aria-expanded", "true");
        item.classList.add("open");
      }
    });
  });
};

const setupQuoteForm = () => {
  const form = document.querySelector("#quote-form");
  if (!form) return;

  const fields = {
    name: form.querySelector("#name"),
    projectType: form.querySelector("#project-type"),
    description: form.querySelector("#description")
  };

  const showError = (field, message) => {
    const group = field.closest(".form-group");
    group.classList.toggle("has-error", Boolean(message));
    field.setAttribute("aria-invalid", Boolean(message).toString());
    group.querySelector(".field-error").textContent = message;
  };

  const validateForm = () => {
    let isValid = true;

    if (fields.name.value.trim().length < 2) {
      showError(fields.name, "Informe seu nome com pelo menos 2 caracteres.");
      isValid = false;
    } else {
      showError(fields.name, "");
    }

    if (!fields.projectType.value) {
      showError(fields.projectType, "Selecione o tipo de projeto.");
      isValid = false;
    } else {
      showError(fields.projectType, "");
    }

    if (fields.description.value.trim().length < 10) {
      showError(fields.description, "Descreva sua ideia com pelo menos 10 caracteres.");
      isValid = false;
    } else {
      showError(fields.description, "");
    }

    return isValid;
  };

  Object.values(fields).forEach((field) => {
    ["input", "change"].forEach((eventName) => {
      field.addEventListener(eventName, () => {
        if (field.getAttribute("aria-invalid") === "true") validateForm();
      });
    });
  });

  form.addEventListener("submit", (event) => {
    event.preventDefault();

    if (!validateForm()) {
      form.querySelector('[aria-invalid="true"]')?.focus();
      return;
    }

    const message = [
      "Olá, Filipe! Quero solicitar um orçamento.",
      "",
      `Nome: ${fields.name.value.trim()}`,
      `Tipo de projeto: ${fields.projectType.value}`,
      `Descrição: ${fields.description.value.trim()}`
    ].join("\n");

    window.open(createWhatsAppUrl(message), "_blank", "noopener,noreferrer");
  });
};

const setupRevealAnimations = () => {
  const elements = document.querySelectorAll(".reveal");

  if (
    window.matchMedia("(prefers-reduced-motion: reduce)").matches ||
    !("IntersectionObserver" in window)
  ) {
    elements.forEach((element) => element.classList.add("revealed"));
    return;
  }

  const observer = new IntersectionObserver((entries, currentObserver) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("revealed");
        currentObserver.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.1,
    rootMargin: "0px 0px -40px"
  });

  elements.forEach((element) => observer.observe(element));
};

const setupExternalDataLinks = () => {
  document.querySelectorAll('a[href*="linkedin.com"]').forEach((link) => {
    link.href = portfolioData.linkedin;
  });
  document.querySelectorAll('a[href*="github.com"]').forEach((link) => {
    link.href = portfolioData.github;
  });
  document.querySelectorAll('a[href*="instagram.com"]').forEach((link) => {
    link.href = portfolioData.instagram;
  });
};

const initializePortfolio = () => {
  setupTheme();
  renderProjects();
  setupExternalDataLinks();
  setupWhatsAppLinks();
  setupMobileMenu();
  setupSmoothScroll();
  setupHeaderEffect();
  setupFaq();
  setupQuoteForm();
  setupRevealAnimations();
};

document.addEventListener("DOMContentLoaded", initializePortfolio);
