/** @typedef {"PTR"|"Operações"|"Manuais"|"Legislação"|"Formulários"|"Sistemas"} Category */
/** @typedef {"document"|"system"} ResourceType */

/**
 * @typedef {Object} Resource
 * @property {string} id
 * @property {string} title
 * @property {string} description
 * @property {Category} category
 * @property {ResourceType} type
 * @property {string} icon
 * @property {string} image
 * @property {string} url
 * @property {string[]} tags
 * @property {boolean} featured
 */

/** @type {Resource[]} */
export const PORTAL_RESOURCES = [
  {
    id: "ptr-cronograma",
    title: "CRONOGRAMA DE PTR-BA ANUAL",
    description: "Cronograma anual de PTR-BA",
    category: "PTR",
    type: "document",
    icon: "📋",
    image: "./assets/categories/ptr.png",
    url: "https://drive.google.com/drive/folders/1uXOp8AvWKyJbtBgom4BONRDwpLFuRr76?usp=drive_link",
    tags: ["ptr", "cronograma", "anual", "ptr-ba", "treinamento"],
    featured: true
  },
  {
    id: "ptr-instrucoes",
    title: "DRIVE DE INSTRUÇÕES PTR-BA",
    description: "Instruções de PTR-BA - Créditos ao bombeiro BRITO",
    category: "PTR",
    type: "document",
    icon: "📋",
    image: "./assets/categories/ptr.png",
    url: "https://drive.google.com/drive/folders/0ByeZqp-_99nZNXZCRzV2VGpXU1k?resourcekey=0-9ih4HxeOcFv_CW-Qp881cw",
    tags: ["ptr", "instrucoes", "ptr-ba", "drive"],
    featured: false
  },
  {
    id: "ops-pop",
    title: "POP - PROCEDIMENTOS OPERACIONAIS PADRÃO",
    description: "Procedimentos Operacionais Padrão",
    category: "Operações",
    type: "document",
    icon: "🚒",
    image: "./assets/categories/operacoes.png",
    url: "https://drive.google.com/drive/folders/1ge5_5t1QC7dSXkrU4mjUtzuf4hVuD-Jp?usp=drive_link",
    tags: ["pop", "procedimento", "operacoes", "padrao"],
    featured: true
  },
  {
    id: "ops-plem",
    title: "PLEM - PCINC - PRAI",
    description: "Documentação PLEM, PCINC e PRAI",
    category: "Operações",
    type: "document",
    icon: "🚒",
    image: "./assets/categories/operacoes.png",
    url: "https://drive.google.com/drive/folders/1BUN2er5eGUG14h78LfFxHuOB6Z3zQXVq?usp=drive_link",
    tags: ["plem", "pcinc", "prai", "operacoes", "pc5"],
    featured: false
  },
  {
    id: "man-anac",
    title: "MANUAIS DA ANAC",
    description: "Manuais ANAC",
    category: "Manuais",
    type: "document",
    icon: "📚",
    image: "./assets/categories/manuais.png",
    url: "https://drive.google.com/drive/folders/1efdcbdRTkrK86HxFjVaJaCBqrje6Q53g?usp=drive_link",
    tags: ["manual", "anac", "aviacao"],
    featured: true
  },
  {
    id: "man-cci",
    title: "MANUAIS DOS CCI'S",
    description: "Manuais CCI",
    category: "Manuais",
    type: "document",
    icon: "📚",
    image: "./assets/categories/manuais.png",
    url: "https://drive.google.com/drive/folders/16_j3OeRCQxWYzYTnSZ1yp-q9-ylozeRW?usp=drive_link",
    tags: ["manual", "cci", "viatura", "equipamento"],
    featured: false
  },
  {
    id: "man-cbmgo",
    title: "MANUAIS CBMGO",
    description: "Manuais CBMGO",
    category: "Manuais",
    type: "document",
    icon: "📚",
    image: "./assets/categories/manuais.png",
    url: "https://drive.google.com/drive/folders/1kcTxTzR1yikd-0Nw046lvQSgXTYpjX0t?usp=drive_link",
    tags: ["manual", "cbmgo", "bombeiro"],
    featured: false
  },
  {
    id: "leg-rbac-tops",
    title: "RBAC'S E TOPS REA",
    description: "RBAC e TOPs REA",
    category: "Legislação",
    type: "document",
    icon: "⚖️",
    image: "./assets/categories/legislacao.png",
    url: "https://drive.google.com/drive/folders/1BRisfkx8ZkZjuaDt6fdjBGXXE5YTk5fk?usp=drive_link",
    tags: ["rbac", "tops", "rea", "legislacao", "norma"],
    featured: true
  },
  {
    id: "leg-is",
    title: "IS - INSTRUÇÕES SUPLEMENTARES",
    description: "Instruções Suplementares",
    category: "Legislação",
    type: "document",
    icon: "⚖️",
    image: "./assets/categories/legislacao.png",
    url: "https://drive.google.com/drive/folders/1tm5UuPa1GmLoVQ4GZlLvxBcOyEABga6v?usp=drive_link",
    tags: ["is", "instrucao", "suplementar", "legislacao", "norma"],
    featured: false
  },
  {
    id: "form-troca",
    title: "FORMULÁRIO DE TROCA DE SERVIÇO",
    description: "Formulário de troca de serviço",
    category: "Formulários",
    type: "document",
    icon: "📝",
    image: "./assets/categories/formularios.png",
    url: "https://drive.google.com/drive/folders/13k4OA9jpbmu7mckS8WaA8JH6QXrNDvRa?usp=drive_link",
    tags: ["formulario", "troca", "servico", "plantao"],
    featured: true
  },
  {
    id: "form-cred",
    title: "FORMULÁRIOS PARA CREDENCIAMENTO",
    description: "Formulários para credenciamento",
    category: "Formulários",
    type: "document",
    icon: "📝",
    image: "./assets/categories/formularios.png",
    url: "https://drive.google.com/drive/folders/1-AhJ7UMYXBO9aKkoeO-D6pu0b0CenYIV?usp=drive_link",
    tags: ["formulario", "credenciamento", "acesso"],
    featured: true
  },
  {
    id: "sys-intramed",
    title: "INTRAMED+ (Fluig)",
    description: "Portal Intramed+",
    access:
      "Primeiro acesso — Usuário: nome.ultimonome (ex: joao.silva). Senha: nome + 3 últimos dígitos do CPF (ex: joao556).",
    category: "Sistemas",
    type: "system",
    icon: "🌐",
    image: "./assets/systems/intramed.png",
    url: "https://portal.medmais.com/portal/p/0101001/home",
    tags: ["intramed", "fluig", "sistema", "portal", "medmais"],
    featured: false
  },
  {
    id: "sys-next",
    title: "NEXTI - PONTO ELETRÔNICO",
    description: "Aplicativo de ponto eletrônico",
    access:
      "Primeiro acesso — Usuário: CPF sem ponto e sem traço. Senha: 4 primeiros dígitos do CPF. Baixe o app na loja do seu celular.",
    category: "Sistemas",
    type: "system",
    icon: "🕐",
    image: "./assets/systems/next.png",
    url: "",
    stores: {
      apple: "https://apps.apple.com/br/app/nexti/id1242457098",
      android: "https://play.google.com/store/apps/details?id=com.nexti.mobile&pcampaignid=web_share"
    },
    tags: ["nexti", "next", "ponto", "sistema", "trabalho", "app", "apple", "android"],
    featured: true
  },
  {
    id: "sys-unicorp",
    title: "UNICORP",
    description: "Universidade corporativa",
    access:
      "Primeiro acesso — Usuário: CPF sem ponto e sem traço. Senha padrão: Acesso@01 (troque a senha após o primeiro acesso).",
    category: "Sistemas",
    type: "system",
    icon: "🌐",
    image: "./assets/systems/unicorp.png",
    url: "https://universidade.medmais.com/login/index.php",
    tags: ["unicop", "unicorp", "universidade", "sistema", "portal", "medmais"],
    featured: false
  },
  {
    id: "sys-meu-rh",
    title: "MEU RH",
    description: "Portal de contracheques",
    access:
      "Primeiro acesso — Usuário: CPF sem ponto e sem traço. Senha: 2 últimos dígitos do ano de nascimento + dia da admissão + 2 últimos dígitos do CPF (sem ponto e sem traço).",
    category: "Sistemas",
    type: "system",
    icon: "👤",
    image: "./assets/systems/meu-rh.png",
    url: "https://meurh.medmais.com/01/#/login",
    tags: ["rh", "holerite", "contracheque", "sistema", "funcionario", "medmais"],
    featured: true
  },
  {
    id: "sys-academia",
    title: "ACADEMIA CCR",
    description: "Cursos e certificados",
    access: "Acesse pelo link oficial da Academia CCR. Use somente este endereço (não pesquise no Google).",
    category: "Sistemas",
    type: "system",
    icon: "🎓",
    image: "./assets/systems/academia-ccr.png",
    url: "http://academia.ccraeroportos.com.br/",
    tags: ["academia", "ccr", "curso", "certificado", "credenciamento", "treinamento"],
    featured: true
  },
  {
    id: "sys-inspecao-extintores",
    title: "INSPEÇÃO DE EXTINTORES",
    description: "App de inspeção de extintores",
    access: "Abra o link e faça login com o usuário e senha do app de inspeção.",
    category: "Sistemas",
    type: "system",
    icon: "🧯",
    image: "./assets/categories/sistemas.png",
    url: "https://firechecklist.vercel.app/login",
    tags: ["extintor", "inspecao", "checklist", "firechecklist", "sistema", "app"],
    featured: true
  },
  {
    id: "sys-siscaer",
    title: "SISCAER",
    description: "Cadastro SISCAER — Polícia Federal",
    access:
      "Usado no credenciamento. Acesse o link oficial, preencha o cadastro e siga as orientações do SISCAER.",
    category: "Sistemas",
    type: "system",
    icon: "🌐",
    image: "./assets/categories/sistemas.png",
    url: "https://servicos.pf.gov.br/siscaer-publico-web/#/cadastro",
    tags: ["siscaer", "credenciamento", "policia", "federal", "cadastro", "sistema"],
    featured: true
  },
  {
    id: "sys-nada-consta-goias",
    title: "CERTIDÃO NEGATIVA/POSITIVA — ESTADO DE GOIÁS",
    description: "Certidão negativa/positiva — TJGO",
    access:
      "Usado no credenciamento. Emita a certidão no link oficial do Tribunal de Justiça de Goiás.",
    category: "Sistemas",
    type: "system",
    icon: "🌐",
    image: "./assets/categories/sistemas.png",
    url: "https://projudi.tjgo.jus.br/CertidaoNegativaPositivaPublica?PaginaAtual=1&TipoArea=2&InteressePessoal=S",
    tags: ["nada consta", "certidao", "goias", "tjgo", "credenciamento", "sistema"],
    featured: true
  },
  {
    id: "sys-nada-consta-federal",
    title: "CERTIDÃO NEGATIVA/POSITIVA — FEDERAL",
    description: "Certidão negativa/positiva (Gov.br — por estado)",
    access:
      "Usado no credenciamento. Emitido por estado no Gov.br. Link ainda não configurado — cole a URL em js/links.js quando tiver.",
    category: "Sistemas",
    type: "system",
    icon: "🌐",
    image: "./assets/categories/sistemas.png",
    url: "COLE_O_LINK_AQUI",
    tags: ["nada consta", "certidao", "federal", "gov", "credenciamento", "sistema"],
    featured: true
  }
];
