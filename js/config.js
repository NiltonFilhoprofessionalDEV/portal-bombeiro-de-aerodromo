export const PORTAL_CONFIG = {
  name: "Portal do Bombeiro de Aeródromo",
  subtitle:
    "Aqui você encontra pastas de PTR, POP, manuais, legislação e formulários, além dos sistemas do dia a dia (Intramed+, Nexti, Unicop, Meu RH e Academia CCR), com orientação de primeiro acesso.",
  searchPlaceholder: "O que você procura?",
  logo: "./assets/logo/logo.svg",
  heroImage: "./assets/hero/hero-main.jpg",
  storageKeys: {
    favorites: "portal-bombeiro:favorites"
  },
  emptyFavorites: "Você ainda não adicionou nenhum favorito.",
  emptySearch: "Nenhum resultado para essa busca.",
  emptyCategory: "Nenhum recurso nesta categoria ainda.",
  linkNotConfigured: "Link ainda não configurado. Coloque o endereço em js/links.js.",
  systemsIntro:
    "Use somente os links oficiais abaixo. Não pesquise no Google — os endereços são configurados com os dados da Medmais.",
  homeHighlight: {
    resourceId: "sys-mais-gestao",
    badge: "Aviso Med+",
    title: "App de checklist da Med Mais",
    message:
      "Novo sistema em destaque: abra o Mais Gestão para fazer o checklist. O link também está em Sistemas."
  },
  categoriesMeta: {
    PTR: {
      title: "PTR",
      description:
        "Cronograma anual, instruções e documentos de treinamento PTR-BA.",
      image: "./assets/categories/ptr.jpg"
    },
    Operações: {
      title: "Operações",
      description:
        "POP, PLEM, PCINC, PRAI e demais procedimentos operacionais.",
      image: "./assets/categories/operacoes.jpg"
    },
    Manuais: {
      title: "Manuais",
      description: "Manuais ANAC, CCI, CBMGO e material técnico de consulta.",
      image: "./assets/categories/manuais.jpg"
    },
    Legislação: {
      title: "Legislação",
      description: "RBAC, TOPs REA, Instruções Suplementares e normas.",
      image: "./assets/categories/legislacao.jpg"
    },
    Formulários: {
      title: "Formulários",
      description: "Troca de serviço, credenciamento e formulários do dia a dia.",
      image: "./assets/categories/formularios.jpg"
    },
    Sistemas: {
      title: "Sistemas",
      description:
        "Checklist Med Mais (Mais Gestão), Intramed+, Nexti, Unicorp, Meu RH, Academia CCR, inspeção de extintores e links de credenciamento (SISCAER e nada consta).",
      image: "./assets/categories/sistemas.jpg"
    }
  }
};
