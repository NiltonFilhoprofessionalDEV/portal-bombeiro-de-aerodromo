# Portal do Bombeiro — Design Spec

**Data:** 2026-09-21  
**Status:** Aprovado em seções (abordagem + seções 1–4)  
**Tipo:** Site estático / SPA vanilla / PWA

---

## 1. Objetivo

Central visual de redirecionamento para bombeiros de aeródromo acessarem documentos (Google Drive) e sistemas externos.

Prioridades: velocidade → facilidade de uso → mobile-first → visual profissional → manutenção simples.

**Não haverá:** backend, banco, autenticação, API própria, admin, URLs inventadas.

---

## 2. Público e contexto de uso

- Público: bombeiros de aeródromo
- Uso ~99% em celular (360–430px como base de design)
- Cenário: encontrar recurso com pressa → toque → abrir link externo

Pergunta de design permanente: *“Um bombeiro no celular, com pressa, encontra isso rápido?”*

---

## 3. Arquitetura

### 3.1 Stack

- HTML5 + CSS3 + Vanilla JavaScript
- Sem framework, sem bundler, sem Node runtime em produção
- Hospedagem: qualquer static host (GitHub Pages, Netlify, Firebase Hosting static, etc.)

### 3.2 Estrutura de pastas (raiz do repositório)

```
/
├── index.html
├── manifest.json
├── service-worker.js
├── README.md
├── css/
│   ├── style.css
│   └── responsive.css
├── js/
│   ├── config.js
│   ├── links.js
│   ├── search.js
│   ├── favorites.js
│   ├── recent.js
│   └── app.js
└── assets/
    ├── logo/
    ├── hero/
    ├── categories/
    ├── systems/
    ├── icons/
    └── decorations/
```

### 3.3 Responsabilidades dos módulos JS

| Arquivo | Responsabilidade |
|---------|------------------|
| `config.js` | Nome, subtítulo, paths de logo/hero, textos UI básicos |
| `links.js` | Array único `resources` (documentos + sistemas) |
| `search.js` | Filtro instantâneo por title/description/category/tags |
| `favorites.js` | CRUD de favoritos em `localStorage` |
| `recent.js` | Últimos ~8 acessos em `localStorage` |
| `app.js` | Roteamento SPA, render, bottom nav, abertura de links |

### 3.4 Modelo de dados (`resources`)

```js
{
  id: "ptr-cronograma",
  title: "Cronograma PTR Anual",
  description: "Cronograma anual de PTR",
  category: "PTR",
  type: "document", // ou "system"
  icon: "📋",
  image: "./assets/categories/ptr.webp",
  url: "COLE_O_LINK_AQUI",
  tags: ["ptr", "cronograma", "anual"],
  featured: true
}
```

**Categorias iniciais:** PTR, Operações, Manuais, Legislação, Formulários, Sistemas.

**Regra de URLs:** nunca inventar. Placeholder `COLE_O_LINK_AQUI`. README lista o que substituir.

**Seed inicial (títulos do brief, sem URLs reais):**
- Documentos: Cronograma PTR Anual, Modelos PTR-BA, TOPs, Instruções para Bombeiros, Manual do Bombeiro, Manuais ANAC, Manuais dos CCIs, RBACs, Instruções Suplementares, Formulário Troca de Serviço, Formulário Credenciamento, documentos PC5
- Sistemas: Intramed, Next, Unicorp, Meu RH, Academia CCR

Adicionar/remover recurso = editar um objeto em `links.js` apenas.

---

## 4. UX e navegação

### 4.1 Views SPA

- `home`
- `documentos` (todos `type === "document"`)
- `sistemas` (todos `type === "system"`)
- `favoritos`
- `categoria` (filtro por `category`)
- `busca` (overlay/lista quando há query)

Sem páginas intermediárias desnecessárias. Abrir recurso = navegação direta à URL.

### 4.2 Home (mobile ~390px)

1. Hero full-bleed + overlay escuro
   - Título: **PORTAL DO BOMBEIRO**
   - Sub: Documentos, procedimentos e sistemas em um só lugar.
   - Campo de busca grande imediatamente abaixo
2. Acessos rápidos (`featured: true`)
3. Meus favoritos (ou empty state)
4. Acessados recentemente
5. Categorias (imagem + título + descrição + contagem)
6. Sistemas e portais

### 4.3 Bottom navigation

Itens: Início · Documentos · Sistemas · Favoritos  
- Fixa no mobile, respeita `safe-area-inset-bottom`
- Hide on scroll down / show on scroll up
- Desktop: adaptação apropriada (barra superior sticky ou nav compacta no topo)

### 4.4 Cards e toque

- Cards com imagem de fundo/ilustração + gradiente + hierarquia clara
- Sem glassmorphism excessivo
- Área de toque confortável (≥ 44px)
- Ações: Abrir + Favoritar (estrela)
- Links externos: `target="_blank"` + `rel="noopener noreferrer"`
- Ao abrir: registrar em recentes

### 4.5 Busca

- Instantânea, sem reload
- Campos: title, description, category, tags
- Estados: resultados / nenhum resultado / limpar

### 4.6 Persistência local

| Chave | Conteúdo |
|-------|----------|
| `portal-bombeiro:favorites` | array de ids |
| `portal-bombeiro:recent` | array de ids (máx. 8) |

Sem dados pessoais.

---

## 5. Identidade visual

### 5.1 Direção

“Portal operacional de bombeiros + app moderno + centro de operações aeroportuárias.”

Não: corporativo genérico, cards brancos sem personalidade, template pronto.

### 5.2 Cores (somente via CSS variables)

- `--color-primary` — vermelho bombeiro (destaque)
- `--color-primary-dark` — vermelho escuro
- `--color-background` — grafite/preto
- `--color-surface` — cinza escuro
- `--color-text` / `--color-text-muted`
- `--color-accent` — âmbar/laranja pontual

Vermelho com parcimônia: identidade e CTAs, não fundo dominante.

### 5.3 Tipografia

- Display condensada (autoridade operacional) para títulos
- Sans altamente legível para corpo/UI mobile
- Fonte via Google Fonts (uso típico online, com Drive/sistemas externos) + stack de fallback local robusta para offline
- Fallbacks devem manter legibilidade e hierarquia mesmo sem a webfont

### 5.4 Design system em CSS

Tokens para: cores, tipografia, espaçamentos, bordas, raios, sombras, tamanhos de toque, transições.

### 5.5 Microinterações

Hover desktop, press mobile, entrada discreta de cards, feedback de favorito/clique. Respeitar `prefers-reduced-motion`.

---

## 6. Imagens e assets

### 6.1 Regras

- Arquivos independentes em `/assets/`
- Sem base64 de imagens importantes no CSS
- Sem dependência de URLs externas de imagem
- Sem texto tipográfico nas imagens geradas
- Troca de imagem = substituir arquivo (mesmo nome/path)

### 6.2 Entrega v1

Gerar com IA na implementação:

| Asset | Path sugerido |
|-------|----------------|
| Hero | `assets/hero/hero-main.webp` |
| Categorias | `assets/categories/{ptr,operacoes,manuais,legislacao,formularios,sistemas}.webp` |
| Sistemas | `assets/systems/{intramed,next,unicorp,meu-rh,academia-ccr}.webp` — uma imagem temática por sistema, mesma família visual, sem logos oficiais |
| Logo | `assets/logo/logo.svg` (ou PNG) — identidade própria, sem logos oficiais |
| PWA icons | `assets/icons/icon-192.png`, `icon-512.png` |

Estilo: fotografia cinematográfica realista / editorial operacional / iluminação dramática.

README inclui prompts de regeneração por asset.

### 6.3 Performance de mídia

- Preferência WebP (AVIF opcional)
- Hero sem lazy; demais com `loading="lazy"`
- Tamanhos adequados a hero / cards / thumbs

---

## 7. PWA e offline

- `manifest.json`: nome, short_name, theme/background colors, icons, `display: standalone`
- `service-worker.js`: precache do shell (HTML, CSS, JS, ícones, imagens essenciais)
- Não cachear documentos/sistemas externos
- Offline: estrutura do portal funciona; links externos exigem internet

---

## 8. Acessibilidade

- Contraste adequado
- `alt` em imagens
- Navegação por teclado + foco visível
- `aria-label` onde necessário
- Botões semânticos
- Alvos de toque adequados

---

## 9. Responsividade

Breakpoints mentais/estruturais: 360, 390, 430, 768, 1024, 1440+.  
Experiência em ~390px é referência de qualidade.

---

## 10. README (público não-dev)

Deve explicar em linguagem simples:

1. Como abrir o projeto  
2. Onde adicionar/remover links (`links.js`)  
3. Como trocar imagens / logo / hero  
4. Como adicionar categorias  
5. Quais placeholders `COLE_O_LINK_AQUI` substituir  
6. Como publicar como site estático  
7. Prompts de IA para regenerar imagens  

Sem build step obrigatório: abrir `index.html` via servidor estático local ou host.

---

## 11. Critérios de aceite (v1)

- [ ] Hero + busca + acessos rápidos + categorias + sistemas + favoritos + recentes
- [ ] Bottom nav com hide/show no scroll + safe-area
- [ ] Pesquisa instantânea com estados vazios/limpar
- [ ] Favoritos e recentes via localStorage
- [ ] SPA: home, documentos, sistemas, favoritos, filtro por categoria
- [ ] Todos os URLs = placeholders explícitos
- [ ] Assets locais gerados; paths estáveis para troca
- [ ] PWA instalável com cache do shell
- [ ] Mobile-first; desktop utilizável
- [ ] Sem backend; hospedável como estático
- [ ] README completo + prompts de imagem

---

## 12. Fora de escopo (v1)

Login, cadastro, backend, DB, admin, permissões, URLs inventadas, frameworks pesados, conteúdo fictício apresentado como oficial de órgão/empresa.
