import { PORTAL_CONFIG } from "./config.js";
import { PORTAL_RESOURCES } from "./links.js";
import { filterResources } from "./search.js";
import { getFavorites, isFavorite, toggleFavorite } from "./favorites.js";

const appEl = document.getElementById("app");
const bottomNavEl = document.getElementById("bottom-nav");

const state = {
  view: "home",
  category: null,
  query: ""
};

/** @type {Array<{view: string, category: string|null, query: string}>} */
const navHistory = [];

const ICONS = {
  home: `<svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M4 10.5 12 4l8 6.5V20a1 1 0 0 1-1 1h-5v-6H10v6H5a1 1 0 0 1-1-1v-9.5Z" stroke="currentColor" stroke-width="1.8" stroke-linejoin="round"/></svg>`,
  docs: `<svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M7 3.5h7l4 4V20a1 1 0 0 1-1 1H7a1 1 0 0 1-1-1V4.5a1 1 0 0 1 1-1Z" stroke="currentColor" stroke-width="1.8"/><path d="M14 3.5V8h4M9 12h6M9 16h6" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/></svg>`,
  systems: `<svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><rect x="3" y="4" width="18" height="12" rx="2" stroke="currentColor" stroke-width="1.8"/><path d="M8 20h8M12 16v4" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/></svg>`,
  fav: `<svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="m12 4.8 2.1 4.3 4.7.7-3.4 3.3.8 4.7L12 15.6 7.8 17.8l.8-4.7-3.4-3.3 4.7-.7L12 4.8Z" stroke="currentColor" stroke-width="1.8" stroke-linejoin="round"/></svg>`,
  search: `<svg class="search__icon" viewBox="0 0 24 24" fill="none" aria-hidden="true"><circle cx="11" cy="11" r="6.5" stroke="currentColor" stroke-width="1.8"/><path d="m16 16 4 4" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/></svg>`,
  star: `<svg viewBox="0 0 24 24" width="20" height="20" aria-hidden="true"><path d="m12 4.8 2.1 4.3 4.7.7-3.4 3.3.8 4.7L12 15.6 7.8 17.8l.8-4.7-3.4-3.3 4.7-.7L12 4.8Z" fill="currentColor"/></svg>`,
  back: `<svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M15 5 8 12l7 7" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>`
};

function snapshotState() {
  return {
    view: state.view,
    category: state.category,
    query: state.query
  };
}

function canGoBack() {
  return navHistory.length > 0 || state.view !== "home" || Boolean(state.query.trim());
}

function navigate(view, params = {}, options = {}) {
  const { fromBack = false } = options;
  const nextCategory =
    view === "categoria" ? (params.category ?? state.category) : (params.category ?? null);
  const nextQuery = params.query !== undefined ? params.query : state.query;

  const changing =
    view !== state.view ||
    nextCategory !== state.category ||
    nextQuery !== state.query;

  if (!fromBack && changing) {
    navHistory.push(snapshotState());
    if (navHistory.length > 40) navHistory.shift();
  }

  state.view = view;
  state.category = nextCategory;
  state.query = nextQuery;
  render();
  window.scrollTo({ top: 0, behavior: "smooth" });
}

function goBack() {
  if (navHistory.length > 0) {
    const prev = navHistory.pop();
    navigate(prev.view, { category: prev.category, query: prev.query }, { fromBack: true });
    return;
  }

  if (state.query.trim()) {
    navigate(state.view, { category: state.category, query: "" }, { fromBack: true });
    return;
  }

  if (state.view !== "home") {
    navigate("home", { category: null, query: "" }, { fromBack: true });
  }
}

function renderBackBar() {
  const enabled = canGoBack();
  return `
    <div class="back-bar">
      <button
        type="button"
        class="back-btn"
        data-action="back"
        ${enabled ? "" : "disabled"}
        aria-label="Voltar para a página anterior"
      >
        ${ICONS.back}
        <span>Voltar</span>
      </button>
    </div>
  `;
}

function showToast(message) {
  let toast = document.getElementById("toast");
  if (!toast) {
    toast = document.createElement("div");
    toast.id = "toast";
    toast.className = "toast";
    toast.setAttribute("role", "status");
    document.body.appendChild(toast);
  }
  toast.textContent = message;
  toast.classList.add("is-visible");
  clearTimeout(showToast._timer);
  showToast._timer = setTimeout(() => toast.classList.remove("is-visible"), 2800);
}

function escapeHtml(value) {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;");
}

function getByIds(ids) {
  const map = new Map(PORTAL_RESOURCES.map((item) => [item.id, item]));
  return ids.map((id) => map.get(id)).filter(Boolean);
}

function countByCategory(category) {
  return PORTAL_RESOURCES.filter((item) => item.category === category).length;
}

function isPlaceholderUrl(url) {
  const value = String(url || "").trim();
  return !value || value === "COLE_O_LINK_AQUI" || value === "COLE_O_LINK_APPLE" || value === "COLE_O_LINK_ANDROID" || value === "#";
}

function openExternalUrl(url) {
  if (isPlaceholderUrl(url)) {
    showToast(PORTAL_CONFIG.linkNotConfigured);
    return;
  }
  window.open(String(url).trim(), "_blank", "noopener,noreferrer");
}

function openResource(resource) {
  openExternalUrl(resource.url);
}

function openStore(resource, storeKey) {
  const url = resource.stores?.[storeKey];
  openExternalUrl(url);
}

function onToggleFavorite(id) {
  const nowFavorite = toggleFavorite(id, localStorage, PORTAL_CONFIG.storageKeys.favorites);
  showToast(nowFavorite ? "Adicionado aos favoritos" : "Removido dos favoritos");
  render();
}

function renderSearchBox() {
  return `
    <div class="search">
      <label class="search__field" for="search-input">
        ${ICONS.search}
        <input
          id="search-input"
          class="search__input"
          type="search"
          enterkeyhint="search"
          autocomplete="off"
          placeholder="${escapeHtml(PORTAL_CONFIG.searchPlaceholder)}"
          aria-label="${escapeHtml(PORTAL_CONFIG.searchPlaceholder)}"
          value="${escapeHtml(state.query)}"
        />
        ${
          state.query
            ? `<button type="button" class="search__clear" data-action="clear-search" aria-label="Limpar pesquisa">Limpar</button>`
            : ""
        }
      </label>
    </div>
  `;
}

function renderHero() {
  return `
    <header class="hero">
      <div class="hero__media">
        <img
          src="${escapeHtml(PORTAL_CONFIG.heroImage)}"
          alt="Bombeiro de aeródromo em operação com viatura de combate a incêndio"
          width="1200"
          height="1600"
          fetchpriority="high"
        />
      </div>
      <div class="hero__overlay" aria-hidden="true"></div>
      <div class="hero__content">
        <div class="hero__brand">
          <img src="${escapeHtml(PORTAL_CONFIG.logo)}" alt="" width="48" height="48" />
          <span class="visually-hidden">${escapeHtml(PORTAL_CONFIG.name)}</span>
        </div>
        <h1 class="hero__title">${escapeHtml(PORTAL_CONFIG.name)}</h1>
        <p class="hero__subtitle">${escapeHtml(PORTAL_CONFIG.subtitle)}</p>
        ${renderSearchBox()}
      </div>
    </header>
  `;
}

function renderResourceCard(resource, index = 0) {
  const favored = isFavorite(resource.id, localStorage, PORTAL_CONFIG.storageKeys.favorites);
  const access = resource.access
    ? `<div class="resource-card__access"><span class="resource-card__access-label">Como acessar</span><p class="resource-card__access-text">${escapeHtml(resource.access)}</p></div>`
    : "";
  const systemClass = resource.type === "system" ? " resource-card--system" : "";
  const hasStores = Boolean(resource.stores?.apple || resource.stores?.android);

  const actions = hasStores
    ? `
        <div class="resource-card__actions resource-card__actions--stores">
          <button
            type="button"
            class="btn btn--primary"
            data-action="open-store"
            data-id="${escapeHtml(resource.id)}"
            data-store="apple"
          >App Store</button>
          <button
            type="button"
            class="btn btn--ghost"
            data-action="open-store"
            data-id="${escapeHtml(resource.id)}"
            data-store="android"
          >Google Play</button>
        </div>`
    : `
        <div class="resource-card__actions">
          <button
            type="button"
            class="btn btn--primary"
            data-action="open"
            data-id="${escapeHtml(resource.id)}"
          >Abrir</button>
        </div>`;

  return `
    <article class="resource-card${systemClass} fade-in" style="animation-delay:${Math.min(index, 8) * 30}ms">
      <div class="resource-card__media">
        <img src="${escapeHtml(resource.image)}" alt="" loading="lazy" width="176" height="144" />
      </div>
      <div class="resource-card__body">
        <div class="resource-card__meta">
          <span class="badge">${escapeHtml(resource.category)}</span>
          <button
            type="button"
            class="fav-btn"
            data-action="toggle-fav"
            data-id="${escapeHtml(resource.id)}"
            aria-label="${favored ? "Remover dos favoritos" : "Adicionar aos favoritos"}"
            aria-pressed="${favored ? "true" : "false"}"
          >${ICONS.star}</button>
        </div>
        <h3 class="resource-card__title">${escapeHtml(resource.title)}</h3>
        <p class="resource-card__desc">${escapeHtml(resource.description)}</p>
        ${access}
        ${actions}
      </div>
    </article>
  `;
}

function renderCardList(resources, emptyMessage) {
  if (!resources.length) {
    return `<div class="empty">${escapeHtml(emptyMessage)}</div>`;
  }
  return `<div class="card-list">${resources.map(renderResourceCard).join("")}</div>`;
}

function renderCategories() {
  const order = ["PTR", "Operações", "Manuais", "Legislação", "Formulários", "Sistemas"];
  return `
    <section class="section section--categories" aria-labelledby="cat-title">
      <div class="section__head">
        <h2 id="cat-title" class="section__title">Navegar</h2>
      </div>
      <div class="category-grid">
        ${order
          .map((key) => {
            const meta = PORTAL_CONFIG.categoriesMeta[key];
            const count = countByCategory(key);
            return `
              <button
                type="button"
                class="category-card"
                data-action="category"
                data-category="${escapeHtml(key)}"
              >
                <div class="category-card__media">
                  <img src="${escapeHtml(meta.image)}" alt="" loading="lazy" width="640" height="360" />
                </div>
                <div class="category-card__overlay" aria-hidden="true"></div>
                <div class="category-card__content">
                  <h3 class="category-card__title">${escapeHtml(meta.title)}</h3>
                  <p class="category-card__desc">${escapeHtml(meta.description)}</p>
                  <span class="category-card__count">${count} recurso${count === 1 ? "" : "s"}</span>
                </div>
              </button>`;
          })
          .join("")}
      </div>
    </section>
  `;
}

function renderViewHeader(title, description = "") {
  return `
    <div class="view-header">
      <h1 class="view-header__title">${escapeHtml(title)}</h1>
      ${description ? `<p class="view-header__desc">${escapeHtml(description)}</p>` : ""}
      ${renderSearchBox()}
    </div>
  `;
}

function renderSearchResults() {
  const results = filterResources(PORTAL_RESOURCES, state.query);
  return `
    <div class="results-banner">
      <strong>${results.length} resultado${results.length === 1 ? "" : "s"}</strong>
      <button type="button" class="btn btn--ghost" data-action="clear-search">Limpar pesquisa</button>
    </div>
    <section class="section">
      ${renderCardList(results, PORTAL_CONFIG.emptySearch)}
    </section>
  `;
}

function renderHome() {
  if (state.query.trim()) {
    return `${renderHero()}${renderSearchResults()}`;
  }
  return `
    ${renderHero()}
    ${renderCategories()}
  `;
}

function renderDocumentos() {
  const docs = filterResources(
    PORTAL_RESOURCES.filter((item) => item.type === "document"),
    state.query
  );
  return `
    ${renderViewHeader("Documentos", "Procedimentos, manuais, normas e formulários")}
    ${renderCardList(docs, PORTAL_CONFIG.emptyCategory)}
  `;
}

function renderSistemas() {
  const systems = filterResources(
    PORTAL_RESOURCES.filter((item) => item.type === "system"),
    state.query
  );
  return `
    ${renderViewHeader("Sistemas e portais", PORTAL_CONFIG.systemsIntro)}
    ${renderCardList(systems, PORTAL_CONFIG.emptyCategory)}
  `;
}

function renderFavoritos() {
  const favorites = filterResources(
    getByIds(getFavorites(localStorage, PORTAL_CONFIG.storageKeys.favorites)),
    state.query
  );
  return `
    ${renderViewHeader("Favoritos", "Seus recursos salvos neste aparelho")}
    ${renderCardList(favorites, PORTAL_CONFIG.emptyFavorites)}
  `;
}

function renderCategoria() {
  const meta = PORTAL_CONFIG.categoriesMeta[state.category] || {
    title: state.category || "Categoria",
    description: ""
  };
  const items = filterResources(
    PORTAL_RESOURCES.filter((item) => item.category === state.category),
    state.query
  );
  return `
    ${renderViewHeader(meta.title, meta.description)}
    ${renderCardList(items, PORTAL_CONFIG.emptyCategory)}
  `;
}

function renderTopBar() {
  const items = [
    { view: "home", label: "Início" },
    { view: "documentos", label: "Documentos" },
    { view: "sistemas", label: "Sistemas" },
    { view: "favoritos", label: "Favoritos" }
  ];

  return `
    <header class="top-bar" aria-label="Navegação principal">
      <div class="top-bar__brand">
        <img src="${escapeHtml(PORTAL_CONFIG.logo)}" alt="" width="36" height="36" />
        <span>${escapeHtml(PORTAL_CONFIG.name)}</span>
      </div>
      <nav class="top-bar__nav">
        ${items
          .map(
            (item) => `
          <button
            type="button"
            data-action="nav"
            data-view="${item.view}"
            ${state.view === item.view ? 'aria-current="page"' : ""}
          >${escapeHtml(item.label)}</button>`
          )
          .join("")}
      </nav>
    </header>
  `;
}

function renderBottomNav() {
  const items = [
    { view: "home", label: "Início", icon: ICONS.home },
    { view: "documentos", label: "Documentos", icon: ICONS.docs },
    { view: "sistemas", label: "Sistemas", icon: ICONS.systems },
    { view: "favoritos", label: "Favoritos", icon: ICONS.fav }
  ];

  bottomNavEl.innerHTML = items
    .map(
      (item) => `
      <button
        type="button"
        class="bottom-nav__item"
        data-action="nav"
        data-view="${item.view}"
        ${state.view === item.view ? 'aria-current="page"' : ""}
      >
        ${item.icon}
        <span>${item.label}</span>
      </button>`
    )
    .join("");
}

function renderMain() {
  switch (state.view) {
    case "documentos":
      return renderDocumentos();
    case "sistemas":
      return renderSistemas();
    case "favoritos":
      return renderFavoritos();
    case "categoria":
      return renderCategoria();
    default:
      return renderHome();
  }
}

function bindSearchFocus() {
  const input = document.getElementById("search-input");
  if (!input) return;
  const cursor = input.value.length;
  if (document.activeElement === input) {
    input.setSelectionRange(cursor, cursor);
  }
}

function render() {
  document.title =
    state.view === "home"
      ? PORTAL_CONFIG.name
      : `${PORTAL_CONFIG.categoriesMeta[state.category]?.title || state.view} · ${PORTAL_CONFIG.name}`;

  appEl.innerHTML = `
    ${renderTopBar()}
    <main id="main" tabindex="-1">
      ${renderBackBar()}
      ${renderMain()}
    </main>
  `;
  renderBottomNav();
  bindSearchFocus();
}

function findResource(id) {
  return PORTAL_RESOURCES.find((item) => item.id === id);
}

function onClick(event) {
  const target = event.target.closest("[data-action]");
  if (!target) return;

  const action = target.dataset.action;
  if (action === "back") {
    goBack();
    return;
  }
  if (action === "nav") {
    navigate(target.dataset.view);
    return;
  }
  if (action === "category") {
    navigate("categoria", { category: target.dataset.category, query: "" });
    return;
  }
  if (action === "clear-search") {
    navigate(state.view, { category: state.category, query: "" });
    return;
  }
  if (action === "toggle-fav") {
    onToggleFavorite(target.dataset.id);
    return;
  }
  if (action === "open") {
    const resource = findResource(target.dataset.id);
    if (resource) openResource(resource);
    return;
  }
  if (action === "open-store") {
    const resource = findResource(target.dataset.id);
    if (resource) openStore(resource, target.dataset.store);
  }
}

function onInput(event) {
  if (event.target.id !== "search-input") return;
  state.query = event.target.value;
  render();
  const input = document.getElementById("search-input");
  if (input) {
    input.focus();
    const len = input.value.length;
    input.setSelectionRange(len, len);
  }
}

let lastY = 0;
function onScroll() {
  const y = window.scrollY;
  if (y > lastY && y > 80) bottomNavEl.classList.add("is-hidden");
  else bottomNavEl.classList.remove("is-hidden");
  lastY = y;
}

function registerServiceWorker() {
  if (!("serviceWorker" in navigator)) return;
  window.addEventListener("load", () => {
    navigator.serviceWorker.register("./service-worker.js").catch(() => {});
  });
}

document.addEventListener("click", onClick);
document.addEventListener("input", onInput);
window.addEventListener("scroll", onScroll, { passive: true });

render();
registerServiceWorker();
