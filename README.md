# Portal do Bombeiro

Página web **estática** para bombeiros de aeródromo acessarem documentos, procedimentos e sistemas com poucos toques no celular.

Não tem login, não tem banco de dados e não tem servidor próprio. É só abrir e usar.

---

## 1. Como abrir o projeto

1. Instale o [Node.js](https://nodejs.org/) (se ainda não tiver).
2. Abra o terminal nesta pasta do projeto.
3. Rode:

```bash
npx --yes serve .
```

4. Abra no navegador o endereço que aparecer (exemplo: `http://localhost:3000`).

> Evite abrir o `index.html` dando dois cliques (`file://`). Isso pode quebrar os módulos JavaScript e o modo aplicativo (PWA).

---

## 2. Onde adicionar novos links

Abra o arquivo:

`js/links.js`

Copie um objeto existente e cole no array `PORTAL_RESOURCES`.

Exemplo:

```js
{
  id: "ptr-novo-documento",
  title: "Nome do documento",
  description: "Descrição curta",
  category: "PTR",
  type: "document",
  icon: "📋",
  image: "./assets/categories/ptr.png",
  url: "COLE_O_LINK_AQUI",
  tags: ["ptr", "palavra-chave"],
  featured: false
}
```

Depois troque `COLE_O_LINK_AQUI` pelo link real do Google Drive ou do sistema.

Categorias válidas: `PTR`, `Operações`, `Manuais`, `Legislação`, `Formulários`, `Sistemas`.

Tipos válidos: `document` ou `system`.

Se `featured: true`, o item pode aparecer em destaques / acessos relacionados.

---

## 3. Como remover links

No mesmo arquivo `js/links.js`, apague o objeto inteiro do recurso (do `{` até o `},`).

Salve e atualize a página.

---

## 4. Como trocar imagens

As imagens ficam em:

| Pasta | Uso |
|-------|-----|
| `assets/hero/` | Imagem principal |
| `assets/categories/` | Imagens das categorias |
| `assets/systems/` | Imagens dos sistemas |
| `assets/logo/` | Logo |
| `assets/icons/` | Ícones do aplicativo (PWA) |

**Troque o arquivo mantendo o mesmo nome.**  
Exemplo: substitua `assets/hero/hero-main.png` por outra imagem com esse mesmo nome.

Não precisa mexer no layout.

Se mudar o nome do arquivo, atualize o caminho em:

- `js/config.js` (hero e logo)
- `js/links.js` (imagens dos recursos)
- `js/config.js` → `categoriesMeta` (imagens das categorias)

---

## 5. Como adicionar novas categorias

1. Em `js/config.js`, dentro de `categoriesMeta`, adicione a nova categoria:

```js
NovaCategoria: {
  title: "NovaCategoria",
  description: "Descrição curta",
  image: "./assets/categories/sua-imagem.png"
}
```

2. Coloque a imagem em `assets/categories/`.
3. Use o mesmo nome da categoria no campo `category` dos itens em `js/links.js`.
4. Em `js/app.js`, na função `renderCategories`, inclua o nome da categoria na lista `order`.

---

## 6. Como trocar o logo

Substitua o arquivo:

`assets/logo/logo.svg`

Se usar PNG, troque o caminho em `js/config.js`:

```js
logo: "./assets/logo/seu-logo.png",
```

---

## 7. Como trocar a imagem principal (hero)

Substitua:

`assets/hero/hero-main.png`

Ou altere em `js/config.js`:

```js
heroImage: "./assets/hero/hero-main.png",
```

---

## 8. Como gerar / buildar

Não precisa de build.

É HTML + CSS + JavaScript puro.

Só publique a pasta como site estático.

---

## 9. Como publicar como site estático

Qualquer hospedagem de arquivos estáticos funciona, por exemplo:

- Netlify (arrastar a pasta)
- GitHub Pages
- Cloudflare Pages
- Firebase Hosting (modo estático)

Envie **toda a pasta** do projeto (incluindo `assets`, `css`, `js`, `index.html`, `manifest.json`, `service-worker.js`).

---

## Links que precisam ser substituídos

Todos os recursos em `js/links.js` estão com:

`url: "COLE_O_LINK_AQUI"`

Substitua um por um:

### Documentos
- CRONOGRAMA DE PTR-BA ANUAL *(já tem link do Drive)*
- POP - PROCEDIMENTOS OPERACIONAIS PADRÃO
- PLEM - PCINC - PRAI
- MANUAIS ANAC
- MANUAIS CCI
- MANUAIS CBMGO
- RBAC - TOPS REA
- IS - INSTRUÇÕES SUPLEMENTARES
- FORMULARIO DE TROCA DE SERVICO
- FORMULARIOS PARA CREDENCIAMENTO

### Sistemas
- Intramed+ (Fluig) — link configurado
- NEXTI - PONTO ELETRÔNICO — coloque os links das lojas em `stores.apple` e `stores.android`
- Unicop — link configurado
- Meu RH — link configurado
- Academia CCR — link configurado

Cada sistema tem o campo `access` em `js/links.js` com a orientação de primeiro acesso.

Exemplo do Nexti:

```js
stores: {
  apple: "COLE_O_LINK_APPLE",
  android: "COLE_O_LINK_ANDROID"
}
```

---

## Favoritos

Ficam salvos só no aparelho (`localStorage`):

- Favoritos

Não enviam dados para nenhum servidor.

---

## Testar no celular

1. No computador, rode `npx --yes serve .`
2. Descubra o IP da máquina na mesma rede Wi-Fi (exemplo: `192.168.0.10`).
3. No celular, abra: `http://SEU_IP:3000`
4. No iPhone/Android, use “Adicionar à tela inicial” para instalar como app (PWA).

---

## Identidade e textos

Ajuste nome, subtítulo e mensagens em:

`js/config.js`

Cores principais ficam em:

`css/style.css` → variáveis `--color-*`

---

## Prompts para gerar imagens com IA

Use estes prompts para regenerar as imagens (sem texto na imagem).

### PROMPT — HERO
Fotografia cinematográfica hiper-realista de um bombeiro de aeródromo brasileiro com EPI completo ao lado de uma viatura CCI vermelha em pista de aeroporto ao entardecer. Iluminação dramática, luzes âmbar da pista, atmosfera operacional, sem texto, sem logos, sem marcas d'água.

### PROMPT — PTR
Fotografia cinematográfica hiper-realista em estação de bombeiros: luvas de combate, rádio e documentos técnicos sobre mesa metálica escura, acentos vermelhos, iluminação baixa dramática, sem texto legível, sem logos.

### PROMPT — OPERAÇÕES
Fotografia cinematográfica hiper-realista de operação de combate a incêndio em aeródromo: viatura CCI vermelha, mangueiras e equipamentos próximos à pista à noite, luzes âmbar, sem texto, sem logos.

### PROMPT — MANUAIS
Fotografia cinematográfica hiper-realista de bombeiro de aeródromo consultando pasta técnica espessa ao lado de capacete e lanterna em sala operacional escura, sem texto legível nas páginas, sem logos.

### PROMPT — LEGISLAÇÃO
Fotografia cinematográfica hiper-realista de pilha de documentos normativos sobre mesa escura com pista de aeroporto desfocada pela janela à noite, acentos vermelho e âmbar, sem texto legível, sem logos.

### PROMPT — FORMULÁRIOS
Fotografia cinematográfica hiper-realista de formulários organizados e caneta sobre prancheta em mesa metálica de corpo de bombeiros, iluminação dramática, sem texto legível, sem logos.

### PROMPT — SISTEMAS
Fotografia cinematográfica hiper-realista de centro de operações aeroportuárias com vários monitores, ambiente escuro, brilhos vermelho e âmbar, estética tecnológica, sem texto legível na tela, sem logos.

### PROMPT — SISTEMA (Next / ponto)
Fotografia cinematográfica hiper-realista de terminal de ponto digital e mão com crachá em corredor escuro, luzes âmbar, sem texto, sem logos.

### PROMPT — SISTEMA (Meu RH)
Fotografia cinematográfica hiper-realista de documentos funcionais e crachá sobre mesa, luz suave de abajur, clima de RH profissional, sem texto legível, sem logos.

### PROMPT — SISTEMA (Academia)
Fotografia cinematográfica hiper-realista de sala de treinamento de bombeiros com capacete sobre mesa e tela desfocada ao fundo, iluminação quente, sem texto, sem logos.

### PROMPT — ÍCONE PWA
Ícone de aplicativo moderno: fundo grafite escuro, escudo estilizado vermelho de bombeiro com detalhe de chama âmbar, estilo flat minimal profissional, sem texto, sem logos de marcas.

---

## Estrutura do projeto

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
│   ├── app.js
│   ├── config.js
│   ├── links.js
│   ├── search.js
│   ├── favorites.js
│   └── search.js
├── assets/
│   ├── logo/
│   ├── hero/
│   ├── categories/
│   ├── systems/
│   ├── icons/
│   └── decorations/
└── tests/
```

---

## Testes rápidos (opcional)

No terminal:

```bash
node tests/search.test.mjs
node tests/favorites.test.mjs
```
