#!/usr/bin/env node

import inquirer from "inquirer";
import { execSync } from "child_process";
import fs from "fs";
import path from "path";
import updateCheck from "update-check";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const pkgPath = path.resolve(__dirname, "../package.json");
const pkg = JSON.parse(fs.readFileSync(pkgPath, "utf-8"));

const CONFIGS_PATH = path.resolve("./client-configs");
const REPO_URL = "https://github.com/VictorMurakami/client-cli";

const commands = [
  { name: "Gerar Prebuild (clean) 🧩", value: "cleanprebuild" },
  { name: "Gerar Prebuild 🧩", value: "prebuild" },
  { name: "Rodar no iOS 🍎", value: "ios" },
  { name: "Rodar no Android 🤖", value: "android" },
];

// 🧭 Função que verifica se há uma nova versão publicada no npm
async function checkForUpdates() {
  try {
    const update = await updateCheck(pkg);
    if (update && update.latest !== pkg.version) {
      console.log(
        `\n🔔 Nova versão disponível: ${update.latest} (você está usando ${pkg.version})`
      );
      console.log("👉 Atualize com:\n   npm install -g client-cli@latest\n");
    }
  } catch {
    // não exibe erro se falhar (sem internet, etc)
  }
}

(async () => {
  console.log("\n✨ CLI de Inicialização por Kami\n");

  // ⚙️ Checa se o usuário quer ver o repositório
  if (process.argv.includes("--repo")) {
    console.log(`📦 Repositório do CLI:\n${REPO_URL}\n`);
    process.exit(0);
  }

  // ⚙️ Checa se o usuário quer instrução de update
  if (process.argv.includes("--update")) {
    console.log("\n⬆️ Para atualizar o CLI:");
    console.log("npm install -g client-cli@latest\n");
    process.exit(0);
  }

  // 🔎 Verifica se há nova versão
  await checkForUpdates();

  // 🔍 Verifica se a pasta client-configs existe
  if (!fs.existsSync(CONFIGS_PATH)) {
    console.error("❌ A pasta './client-configs' não foi encontrada.");
    process.exit(1);
  }

  // 📁 Lê subpastas dentro de ./client-configs, ignorando "default"
  const clients = fs
    .readdirSync(CONFIGS_PATH)
    .filter((name) => {
      const fullPath = path.join(CONFIGS_PATH, name);
      return fs.statSync(fullPath).isDirectory() && name !== "default";
    })
    .sort();

  if (clients.length === 0) {
    console.error("⚠️ Nenhum cliente encontrado em './client-configs'.");
    process.exit(1);
  }

  // ➕ Adiciona cliente web
  const choices = [
    { name: "Cliente Web 🌐", value: "web-client" },
    ...clients.map((c) => ({ name: c, value: c })),
  ];

  const { client } = await inquirer.prompt([
    {
      type: "list",
      name: "client",
      message: "Selecione o cliente:",
      choices,
    },
  ]);

  // 🖥️ Cliente web
  if (client === "web-client") {
    console.log("\n🚀 Executando comando para cliente Web:\n> npm run web\n");

    try {
      execSync("npm run web", { stdio: "inherit", shell: true });
    } catch (err) {
      console.error("\n❌ Erro ao executar comando:", err.message);
      process.exit(1);
    }

    process.exit(0);
  }

  // Pergunta ação
  const { command } = await inquirer.prompt([
    {
      type: "list",
      name: "command",
      message: "Selecione a ação que deseja executar:",
      choices: commands,
    },
  ]);

  let finalCommand = "";

  switch (command) {
    case "prebuild":
      finalCommand = `CLIENT=${client} npx expo prebuild`;
      break;
    case "cleanprebuild":
      finalCommand = `CLIENT=${client} npx expo prebuild --clean`;
      break;
    case "ios":
      finalCommand = `CLIENT=${client} npx expo run:ios`;
      break;
    case "android":
      finalCommand = `CLIENT=${client} npx expo run:android`;
      break;
    default:
      console.error("❌ Comando inválido.");
      process.exit(1);
  }

  console.log(`\n🚀 Executando comando:\n> ${finalCommand}\n`);

  try {
    execSync(finalCommand, { stdio: "inherit", shell: true });
  } catch (err) {
    console.error("\n❌ Erro ao executar comando:", err.message);
    process.exit(1);
  }
})();
