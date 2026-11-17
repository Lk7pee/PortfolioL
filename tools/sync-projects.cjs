// Mantém os projetos visíveis sem JavaScript usando a mesma fonte de dados.
const fs = require("node:fs");
const path = require("node:path");
const { renderProjectsMarkup } = require("../js/script.js");
const file = path.join(__dirname, "..", "index.html");
const html = fs.readFileSync(file, "utf8");
const pattern = /<!-- projects:start -->[\s\S]*?<!-- projects:end -->/;
if (!pattern.test(html)) throw new Error("Marcadores de projetos não encontrados no index.html.");
const updated = html.replace(pattern, () => `<!-- projects:start -->\n${renderProjectsMarkup()}\n          <!-- projects:end -->`);
if (process.argv.includes("--check")) {
  if (updated !== html) { console.error("Projetos desatualizados. Execute node tools/sync-projects.cjs"); process.exitCode = 1; }
  else console.log("HTML estático sincronizado com os projetos.");
} else { fs.writeFileSync(file, updated); console.log("Projetos sincronizados no index.html."); }
