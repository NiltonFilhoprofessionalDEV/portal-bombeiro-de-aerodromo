import assert from "node:assert/strict";
import { filterResources } from "../js/search.js";

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
assert.ok(
  results.every((r) =>
    /credenciamento/i.test([r.title, r.description, r.category, ...(r.tags || [])].join(" "))
  )
);

assert.equal(filterResources(sample, "   ").length, 3);
assert.equal(filterResources(sample, "xyz-inexistente").length, 0);
console.log("search.test.mjs OK");
