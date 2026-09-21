# Portal do Bombeiro Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Entregar a v1 completa do Portal do Bombeiro — site estático mobile-first com busca, categorias, favoritos, recentes, bottom nav, PWA e assets de IA.

**Architecture:** SPA vanilla na raiz do repo. `config.js` + `links.js` são a fonte de verdade; módulos `search` / `favorites` / `recent` / `app` renderizam views e persistem só em `localStorage`. Service worker faz cache do shell; documentos e sistemas abrem em nova aba via placeholders `COLE_O_LINK_AQUI`.

**Tech Stack:** HTML5, CSS3, Vanilla JS, Web App Manifest, Service Worker. Sem bundler, sem framework, sem backend.

**Spec:** `docs/superpowers/specs/2026-09-21-portal-do-bombeiro-design.md`

## Global Constraints

- Sem backend, banco, autenticação, API própria ou admin
- Sem inventar URLs — usar exatamente `COLE_O_LINK_AQUI`
- Sem afirmar vínculo oficial com empresa/órgão
- Mobile-first (base 360–430px); breakpoints 360 / 390 / 430 / 768 / 1024 / 1440+
- Cores só via CSS variables; imagens só como arquivos em `/assets/`
- Favoritos e recentes só em `localStorage` (chaves `portal-bombeiro:favorites` e `portal-bombeiro:recent`)
- Links externos: `target="_blank"` + `rel="noopener noreferrer"`
- Idioma da UI e README: português (Brasil)
- Commits só se o usuário pedir explicitamente OU se o executor tiver identidade git já configurada; nunca rodar `git config`

---

## File Map

| Path | Responsibility |
|------|----------------|
| `index.html` | Shell único da SPA |
| `css/style.css` | Design system + componentes + layout base |
| `css/responsive.css` | Breakpoints e adaptações desktop |
| `js/config.js` | Nome, subtítulo, paths de logo/hero, textos UI |
| `js/links.js` | Array `resources` (docs + sistemas) |
| `js/search.js` | `filterResources(resources, query)` |
| `js/favorites.js` | get/toggle/isFavorite via localStorage |
| `js/recent.js` | get/addRecent via localStorage (máx. 8) |
| `js/app.js` | Views, render, nav, eventos, SW register |
| `manifest.json` | PWA manifest |
| `service-worker.js` | Precache do shell |
| `assets/**` | Logo, hero, categorias, sistemas, ícones PWA |
| `README.md` | Manutenção para não-dev + prompts de imagem |
| `tests/search.test.mjs` | Testes Node do filtro de busca |
| `tests/favorites.test.mjs` | Testes Node dos favoritos (localStorage mock) |
| `tests/recent.test.mjs` | Testes Node dos recentes (localStorage mock) |

---

### Task 1: Scaffold + config + design tokens

**Files:**
- Create: `index.html`
- Create: `css/style.css`
- Create: `css/responsive.css`
- Create: `js/config.js`
- Create: `assets/logo/.gitkeep`
- Create: `assets/hero/.gitkeep`
- Create: `assets/categories/.gitkeep`
- Create: `assets/systems/.gitkeep`
- Create: `assets/icons/.gitkeep`
- Create: `assets/decorations/.gitkeep`

**Interfaces:**
- Consumes: nada
- Produces: `window.PORTAL_CONFIG` com shape abaixo

```js
window.PORTAL_CONFIG = {
  name: "Portal do Bombeiro",
  subtitle: "Documentos, procedimentos e sistemas em um só lugar.",
  searchPlaceholder: "O que você procura?",
  logo: "./assets/logo/logo.svg",
  heroImage: "./assets/hero/hero-main.webp",
  recentLimit: 8,
  storageKeys: {
    favorites: "portal-bombeiro:favorites",
    recent: "portal-bombeiro:recent"
  }
};
```

- [ ] **Step 1: Criar pastas de assets com `.gitkeep`**

Criar os diretórios listados em File Map sob `assets/`, cada um com `.gitkeep`.

- [ ] **Step 2: Criar `js/config.js`**

Implementar exatamente o objeto `PORTAL_CONFIG` acima (pode adicionar textos de empty state se necessário, desde que centralizados aqui).

- [ ] **Step 3: Criar `css/style.css` com design system**

Definir no `:root` no mínimo:

```css
:root {
  --color-primary: #c1121f;
  --color-primary-dark: #780000;
  --color-background: #0b0d10;
  --color-surface: #161a20;
  --color-surface-elevated: #1e242d;
  --color-text: #f5f6f7;
  --color-text-muted: #a0a8b4;
  --color-accent: #f0a202;
  --color-border: rgba(255, 255, 255, 0.08);
  --font-display: "Barlow Condensed", "Arial Narrow", sans-serif;
  --font-body: "Outfit", system-ui, sans-serif;
  --space-1: 0.25rem;
  --space-2: 0.5rem;
  --space-3: 0.75rem;
  --space-4: 1rem;
  --space-5: 1.5rem;
  --space-6: 2rem;
  --radius-sm: 0.5rem;
  --radius-md: 0.75rem;
  --radius-lg: 1rem;
  --shadow-card: 0 8px 24px rgba(0, 0, 0, 0.35);
  --touch-min: 44px;
  --nav-height: 64px;
  --safe-bottom: env(safe-area-inset-bottom, 0px);
  --transition-fast: 150ms ease;
  --transition-med: 250ms ease;
}
```

Incluir reset mínimo, tipografia base, utilitários de foco visível (`:focus-visible`), e placeholders estruturais para `.hero`, `.search`, `.bottom-nav`, `.card`, `.section`.

- [ ] **Step 4: Criar `css/responsive.css`**

Breakpoints mínimos:

```css
@media (min-width: 768px) { /* tablet */ }
@media (min-width: 1024px) { /* desktop nav adaptation */ }
@media (min-width: 1440px) { /* wide */ }
```

- [ ] **Step 5: Criar `index.html` shell**

Estrutura mínima:

```html
<!DOCTYPE html>
<html lang="pt-BR">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover" />
  <meta name="theme-color" content="#0b0d10" />
  <title>Portal do Bombeiro</title>
  <link rel="manifest" href="./manifest.json" />
  <link rel="preconnect" href="https://fonts.googleapis.com" />
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
  <link href="https://fonts.googleapis.com/css2?family=Barlow+Condensed:wght@600;700&family=Outfit:wght@400;500;600;700&display=swap" rel="stylesheet" />
  <link rel="stylesheet" href="./css/style.css" />
  <link rel="stylesheet" href="./css/responsive.css" />
</head>
<body>
  <a class="skip-link" href="#main">Ir para o conteúdo</a>
  <div id="app"></div>
  <nav class="bottom-nav" id="bottom-nav" aria-label="Navegação principal"></nav>
  <script src="./js/config.js"></script>
  <script src="./js/links.js"></script>
  <script src="./js/search.js"></script>
  <script src="./js/favorites.js"></script>
  <script src="./js/recent.js"></script>
  <script src="./js/app.js"></script>
</body>
</html>
```

- [ ] **Step 6: Verificar scaffold**

Abrir com servidor estático (ex.: `npx --yes serve .` ou Live Server). Esperado: página escura vazia sem erros de 404 nos CSS/JS ainda inexistentes (criar stubs vazios `links.js`, `search.js`, `favorites.js`, `recent.js`, `app.js` se necessário para não quebrar o console).

---

### Task 2: `links.js` — catálogo central

**Files:**
- Create: `js/links.js`

**Interfaces:**
- Consumes: nada
- Produces: `window.PORTAL_RESOURCES` — `Array<Resource>`

```js
/**
 * @typedef {Object} Resource
 * @property {string} id
 * @property {string} title
 * @property {string} description
 * @property {"PTR"|"Operações"|"Manuais"|"Legislação"|"Formulários"|"Sistemas"} category
 * @property {"document"|"system"} type
 * @property {string} icon
 * @property {string} image
 * @property {string} url
 * @property {string[]} tags
 * @property {boolean} featured
 */
```

- [ ] **Step 1: Criar `js/links.js` com seed completo**

Incluir pelo menos estes itens (todos com `url: "COLE_O_LINK_AQUI"`):

Documentos:
- `ptr-cronograma` — Cronograma PTR Anual — category PTR — featured true
- `ptr-modelos` — Modelos PTR-BA — PTR — featured true
- `ops-tops` — TOPs — Procedimentos Operacionais Padrão — Operações — featured true
- `ops-instrucoes` — Instruções para Bombeiros — Operações
- `man-bombeiro` — Manual do Bombeiro — Manuais — featured true
- `man-anac` — Manuais ANAC — Manuais
- `man-cci` — Manuais dos CCIs — Manuais
- `leg-rbac` — RBACs — Legislação — featured true
- `leg-is` — Instruções Suplementares — Legislação
- `form-troca` — Formulário Troca de Serviço — Formulários — featured true
- `form-cred` — Formulário de Credenciamento — Formulários — featured true
- `ops-pc5` — Documentos PC5 — Operações

Sistemas (type `system`, category `Sistemas`, image em `./assets/systems/...`):
- `sys-intramed` — Intramed
- `sys-next` — Next — "Registro de ponto" — featured true
- `sys-unicorp` — Unicorp
- `sys-meu-rh` — Meu RH — "Holerites e informações funcionais" — featured true
- `sys-academia` — Academia CCR — "Cursos e certificados" — featured true

Cada item deve ter `tags` relevantes em português (ex.: credenciamento, ptr, ponto).

Exportar:

```js
window.PORTAL_RESOURCES = [ /* ... */ ];
```

- [ ] **Step 2: Verificar no DevTools**

No console da página: `PORTAL_RESOURCES.length` ≥ 17 e nenhum `url` diferente de `COLE_O_LINK_AQUI`.

---

### Task 3: search / favorites / recent (lógica pura + testes)

**Files:**
- Create: `js/search.js`
- Create: `js/favorites.js`
- Create: `js/recent.js`
- Create: `tests/search.test.mjs`
- Create: `tests/favorites.test.mjs`
- Create: `tests/recent.test.mjs`
- Create: `tests/mock-localstorage.mjs`

**Interfaces:**
- Consumes: `PORTAL_CONFIG.storageKeys`, `PORTAL_CONFIG.recentLimit`
- Produces:
  - `window.PortalSearch.filterResources(resources, query) => Resource[]`
  - `window.PortalFavorites.getFavorites() => string[]`
  - `window.PortalFavorites.isFavorite(id) => boolean`
  - `window.PortalFavorites.toggleFavorite(id) => boolean` (novo estado)
  - `window.PortalRecent.getRecent() => string[]`
  - `window.PortalRecent.addRecent(id) => string[]`

Para testes Node, espelhar a mesma lógica em exports ESM **ou** duplicar funções puras testáveis no topo do arquivo e atribuir a `window` quando existir. Preferência: funções puras + attach:

```js
export function filterResources(resources, query) { /* ... */ }
if (typeof window !== "undefined") {
  window.PortalSearch = { filterResources };
}
```

Se o ambiente de abertura via `<script>` clássico não suportar `export`, usar IIFE + anexar em `window`, e nos testes importar via `node --experimental-vm-modules` **ou** extrair núcleo para `js/lib/*.mjs` importado pelos scripts. **Decisão travada:** usar arquivos `.js` IIFE no browser e `.mjs` de teste que **reimplementam a chamada** importando de `js/search.mjs` etc.

**Decisão final (obrigatória):** criar módulos dual:

- `js/search.js`, `js/favorites.js`, `js/recent.js` — IIFE browser
- Nos testes, carregar a lógica copiada uma única vez: preferir extrair núcleo para `js/core/search-core.mjs`, `favorites-core.mjs`, `recent-core.mjs` e fazer os `.js` do browser apenas wrapping.

Simplificação aceita se reduzir atrito: **testar com Node lendo e `eval`/Function do corpo puro** — NÃO. Em vez disso:

Criar `js/core/*.mjs` com lógica pura; browser scripts importam via `<script type="module">` **só se** `app.js` também for module. **Travado:** converter todos os scripts da app para `type="module"`:

Atualizar `index.html` scripts para:

```html
<script type="module" src="./js/app.js"></script>
```

E `app.js` importa:

```js
import { PORTAL_CONFIG } from "./config.js";
import { PORTAL_RESOURCES } from "./links.js";
import { filterResources } from "./search.js";
import { getFavorites, isFavorite, toggleFavorite } from "./favorites.js";
import { getRecent, addRecent } from "./recent.js";
```

Todos os `js/*.js` usam `export`. Testes Node importam os mesmos arquivos.

- [ ] **Step 1: Escrever teste de busca**

`tests/search.test.mjs`:

```js
import { filterResources } from "../js/search.js";
import assert from "node:assert/strict";

const sample = [
  {
    id: "form-cred",
    title: "Formulário de Credenciamento",
    description: "Formulário operacional",
    category: "Formulários",
    tags: ["credenciamento", "formulario"]
  },
  {
    id: "sys-academia",
    title: "Academia CCR",
    description: "Cursos e certificados",
    category: "Sistemas",
    tags: ["curso", "credenciamento"]
  },
  {
    id: "ptr-cronograma",
    title: "Cronograma PTR Anual",
    description: "Cronograma anual",
    category: "PTR",
    tags: ["ptr"]
  }
];

const results = filterResources(sample, "credenciamento");
assert.equal(results.length, 2);
assert.ok(results.every((r) => /credenciamento/i.test(
  [r.title, r.description, r.category, ...(r.tags || [])].join(" ")
)));

assert.equal(filterResources(sample, "   ").length, 3);
assert.equal(filterResources(sample, "xyz-inexistente").length, 0);
console.log("search.test.mjs OK");
```

- [ ] **Step 2: Rodar teste (deve falhar)**

Run: `node tests/search.test.mjs`  
Expected: FAIL (módulo/função inexistente)

- [ ] **Step 3: Implementar `js/search.js`**

```js
export function filterResources(resources, query) {
  const q = String(query || "").trim().toLowerCase();
  if (!q) return resources.slice();
  return resources.filter((item) => {
    const haystack = [
      item.title,
      item.description,
      item.category,
      ...(item.tags || [])
    ]
      .join(" ")
      .toLowerCase();
    return haystack.includes(q);
  });
}
```

- [ ] **Step 4: Rodar teste (deve passar)**

Run: `node tests/search.test.mjs`  
Expected: `search.test.mjs OK`

- [ ] **Step 5: Escrever testes de favorites + recent**

`tests/mock-localstorage.mjs` — polyfill simples de `localStorage` em memória.

`tests/favorites.test.mjs` — toggle adiciona, toggle remove, getFavorites reflete estado; usar chave `portal-bombeiro:favorites`.

`tests/recent.test.mjs` — `addRecent` coloca id no início, deduplica, respeita limit 8.

- [ ] **Step 6: Implementar `favorites.js` e `recent.js` até os testes passarem**

Assinaturas exatas:

```js
// favorites.js
export function getFavorites(storage = localStorage, key = "portal-bombeiro:favorites")
export function isFavorite(id, storage = localStorage, key = "portal-bombeiro:favorites")
export function toggleFavorite(id, storage = localStorage, key = "portal-bombeiro:favorites")

// recent.js
export function getRecent(storage = localStorage, key = "portal-bombeiro:recent")
export function addRecent(id, limit = 8, storage = localStorage, key = "portal-bombeiro:recent")
```

- [ ] **Step 7: Converter `config.js` e `links.js` para ESM export**

```js
export const PORTAL_CONFIG = { /* ... */ };
export const PORTAL_RESOURCES = [ /* ... */ ];
```

Atualizar `index.html` para um único `<script type="module" src="./js/app.js">` (stub `app.js` que só importa os módulos).

- [ ] **Step 8: Rodar todos os testes**

Run: `node tests/search.test.mjs; node tests/favorites.test.mjs; node tests/recent.test.mjs`  
Expected: três OK

---

### Task 4: UI core — app.js (home, cards, busca, views)

**Files:**
- Create/Modify: `js/app.js`
- Modify: `css/style.css`
- Modify: `css/responsive.css`
- Modify: `index.html` (landmarks `#main`, regiões)

**Interfaces:**
- Consumes: todos os exports das Tasks 1–3
- Produces: SPA funcional com views `home | documentos | sistemas | favoritos | categoria`

- [ ] **Step 1: Implementar roteamento mínimo em `app.js`**

```js
const state = {
  view: "home", // home | documentos | sistemas | favoritos | categoria
  category: null,
  query: ""
};

function navigate(view, params = {}) {
  state.view = view;
  state.category = params.category ?? null;
  if (params.query !== undefined) state.query = params.query;
  render();
  window.scrollTo({ top: 0, behavior: "smooth" });
}
```

- [ ] **Step 2: Renderizar hero + busca + seções da home**

Home deve incluir nesta ordem:
1. Hero (imagem de `PORTAL_CONFIG.heroImage`, título, subtítulo)
2. Search input grande (`aria-label` + placeholder de config)
3. Acessos rápidos (`featured === true`)
4. Favoritos
5. Recentes
6. Categorias (agregar de `PORTAL_RESOURCES`)
7. Sistemas (`type === "system"`)

- [ ] **Step 3: Card de recurso**

Cada card: imagem/fundo, título, descrição, categoria, botão Favoritar, botão/ação Abrir.

`openResource(resource)`:
1. `addRecent(resource.id)`
2. se `url === "COLE_O_LINK_AQUI"` ou `url === "#"`, mostrar feedback amigável ("Link ainda não configurado") e **não** navegar
3. senão `window.open(url, "_blank", "noopener,noreferrer")`

- [ ] **Step 4: Busca ao vivo**

No `input` da busca: atualizar `state.query` e re-renderizar lista de resultados (pode substituir o miolo da home ou mostrar seção Resultados no topo). Estados:
- query vazia → home normal
- com resultados → lista
- zero → “Nenhum resultado” + botão limpar

- [ ] **Step 5: Views Documentos / Sistemas / Favoritos / Categoria**

Filtros:
- documentos: `type === "document"`
- sistemas: `type === "system"`
- favoritos: ids em `getFavorites()`
- categoria: `category === state.category`

Empty states em português, vindos de config quando possível.

- [ ] **Step 6: Verificação manual mobile**

Abrir em largura 390px (DevTools). Conferir: hero legível, busca fácil de tocar, seções scrolláveis, nenhum overflow horizontal.

---

### Task 5: Bottom nav + microinterações + a11y

**Files:**
- Modify: `js/app.js`
- Modify: `css/style.css`
- Modify: `css/responsive.css`

- [ ] **Step 1: Bottom nav fixa**

Itens: Início, Documentos, Sistemas, Favoritos.  
`padding-bottom` do `#main` ≥ `calc(var(--nav-height) + var(--safe-bottom))`.

- [ ] **Step 2: Hide on scroll down / show on scroll up**

```js
let lastY = 0;
window.addEventListener("scroll", () => {
  const y = window.scrollY;
  const nav = document.getElementById("bottom-nav");
  if (y > lastY && y > 80) nav.classList.add("is-hidden");
  else nav.classList.remove("is-hidden");
  lastY = y;
}, { passive: true });
```

CSS: `.bottom-nav.is-hidden { transform: translateY(110%); }` com transition.

- [ ] **Step 3: Desktop adaptation**

Em ≥1024px: bottom nav vira top bar sticky **ou** navbar horizontal no topo (escolher uma e documentar no README). Conteúdo não fica coberto.

- [ ] **Step 4: A11y pass**

- skip link funciona
- foco visível em inputs/botões/links
- `alt` nas imagens
- `aria-current="page"` no item ativo da nav
- botões favoritar com `aria-pressed` e `aria-label`

- [ ] **Step 5: Microinterações**

`:active` scale leve nos cards; feedback ao favoritar (ícone preenchido); `prefers-reduced-motion: reduce` desativa animações não essenciais.

- [ ] **Step 6: Verificação teclado**

Tab através da home; Enter abre recurso; Espaço/Enter no favoritar alterna.

---

### Task 6: Assets de IA + logo + ícones PWA

**Files:**
- Create: `assets/hero/hero-main.webp` (ou `.png` convertido)
- Create: `assets/categories/ptr.webp`, `operacoes.webp`, `manuais.webp`, `legislacao.webp`, `formularios.webp`, `sistemas.webp`
- Create: `assets/systems/intramed.webp`, `next.webp`, `unicorp.webp`, `meu-rh.webp`, `academia-ccr.webp`
- Create: `assets/logo/logo.svg`
- Create: `assets/icons/icon-192.png`, `icon-512.png`
- Remove: `.gitkeep` obsoletos se os arquivos reais existirem

**Interfaces:**
- Consumes: paths já referenciados em `config.js` e `links.js`
- Produces: arquivos locais substituíveis

- [ ] **Step 1: Gerar logo SVG próprio**

Símbolo original (escudo/chama/pista estilizada) + wordmark opcional. Sem copiar logos oficiais. Preferência: SVG puro em `assets/logo/logo.svg`.

- [ ] **Step 2: Gerar imagens com a ferramenta de imagem do agente**

Prompts base (sem texto na imagem; fotografia cinematográfica realista; bombeiro de aeródromo / CCI / aeroporto; iluminação dramática; família visual coerente):

- Hero: bombeiro de aeródromo / viatura CCI / pista, atmosfera operacional
- PTR: equipamentos + documentação operacional
- Operações: ambiente operacional / equipamentos
- Manuais: bombeiro com material técnico (sem texto legível)
- Legislação: documentos + contexto aeroportuário
- Formulários: organização documental
- Sistemas: estética tecnológica/ops center
- Cada sistema: variação temática coerente (ponto, RH, academia, etc.) sem logos de marcas

- [ ] **Step 3: Otimizar**

Preferir WebP. Se a ferramenta só entregar PNG, salvar PNG e (se disponível via CLI `cwebp`/sharp) converter; senão manter PNG leve e atualizar paths em `links.js`/`config.js` para a extensão real. **Não** deixar 404.

- [ ] **Step 4: Gerar ícones PWA 192 e 512**

Baseados no logo; fundo alinhado a `--color-background` ou vermelho escuro.

- [ ] **Step 5: Verificar carregamento**

Network tab: hero carrega eager; demais `loading="lazy"`. Nenhuma imagem quebrada na home.

---

### Task 7: PWA (manifest + service worker)

**Files:**
- Create: `manifest.json`
- Create: `service-worker.js`
- Modify: `js/app.js` (register SW)
- Modify: `index.html` (`apple-touch-icon`, theme-color)

- [ ] **Step 1: Criar `manifest.json`**

```json
{
  "name": "Portal do Bombeiro",
  "short_name": "Portal Bombeiro",
  "description": "Documentos, procedimentos e sistemas em um só lugar.",
  "start_url": "./index.html",
  "display": "standalone",
  "background_color": "#0b0d10",
  "theme_color": "#0b0d10",
  "lang": "pt-BR",
  "icons": [
    { "src": "./assets/icons/icon-192.png", "sizes": "192x192", "type": "image/png", "purpose": "any maskable" },
    { "src": "./assets/icons/icon-512.png", "sizes": "512x512", "type": "image/png", "purpose": "any maskable" }
  ]
}
```

- [ ] **Step 2: Criar `service-worker.js`**

Precache: `index.html`, CSS, JS modules, logo, hero, ícones, imagens de categoria essenciais.  
Strategy: cache-first para assets locais; network para navegação quando online.  
**Não** cachear URLs externas de Drive/sistemas.

- [ ] **Step 3: Registrar SW em `app.js`**

Somente em contextos seguros (`localhost` ou HTTPS):

```js
if ("serviceWorker" in navigator) {
  window.addEventListener("load", () => {
    navigator.serviceWorker.register("./service-worker.js").catch(() => {});
  });
}
```

- [ ] **Step 4: Testar PWA**

Via `npx --yes serve .`: Application → Manifest OK; SW activated; reload offline → shell carrega; link externo continua dependente de rede.

---

### Task 8: README + prompts de imagem + checklist final

**Files:**
- Create: `README.md`

- [ ] **Step 1: Escrever README em PT-BR simples**

Cobrir:
1. Como abrir (servidor estático; por que `file://` pode quebrar módulos/SW)
2. Onde adicionar/remover links (`js/links.js`) com exemplo de objeto
3. Como trocar imagens / logo / hero
4. Como adicionar categoria nova
5. Lista de todos os `COLE_O_LINK_AQUI` a substituir
6. Como publicar (arrastar pasta no Netlify/GitHub Pages)
7. Seção **Prompts de IA** para hero, cada categoria, sistemas, logo
8. Como testar no celular (mesma rede + IP local do `serve`)

- [ ] **Step 2: Checklist de aceite do spec**

Percorrer seção 11 do spec e marcar mentalmente/documentar evidência:
- hero, nav, busca, favoritos, recentes, categorias, sistemas
- placeholders intactos
- sem backend
- imagens trocáveis por arquivo
- novo recurso = só `links.js`

- [ ] **Step 3: Rodar testes Node finais**

Run: `node tests/search.test.mjs; node tests/favorites.test.mjs; node tests/recent.test.mjs`

- [ ] **Step 4: Smoke visual 390px e 1280px**

Confirmar bottom/top nav, contraste, sem overflow, empty states.

---

## Spec coverage (self-review)

| Spec section | Task |
|--------------|------|
| Arquitetura / pastas | 1 |
| links.js central | 2 |
| Busca | 3, 4 |
| Favoritos / recentes | 3, 4 |
| SPA views / cards / abrir links | 4 |
| Bottom nav / a11y / motion | 5 |
| Imagens IA / logo | 6 |
| PWA / offline shell | 7 |
| README + prompts | 8 |
| Cores via variables / design system | 1, 4 |
| Mobile-first / breakpoints | 1, 4, 5 |
| Sem URLs inventadas | 2, 4, 8 |

**Placeholder scan:** sem TBD de implementação; decisão ESM travada na Task 3.  
**Type consistency:** `Resource` shape único; storage keys alinhadas a `PORTAL_CONFIG`.

---

## Execution Handoff

Plan complete and saved to `docs/superpowers/plans/2026-09-21-portal-do-bombeiro.md`.

**Duas opções de execução:**

1. **Subagent-Driven (recomendado)** — um subagent fresco por task, review entre tasks  
2. **Inline Execution** — executar as tasks nesta sessão com checkpoints  

Qual abordagem?
