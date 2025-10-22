#!/usr/bin/env node

import inquirer from "inquirer";
import { execSync } from "child_process";

const clients = ["desktop", "xturbo", "velus"];
const commands = [
  { name: "Gerar Prebuild (clean) 🧩", value: "cleanprebuild" },
  { name: "Gerar Prebuild 🧩", value: "prebuild" },
  { name: "Rodar na Web 🌐", value: "web" },
  { name: "Rodar no iOS 🍎", value: "ios" },
  { name: "Rodar no Android 🤖", value: "android" },
];

(async () => {
  console.log("\n✨ CLI de Inicialização por Kami\n");

  const { client } = await inquirer.prompt([
    {
      type: "list",
      name: "client",
      message: "Selecione o cliente:",
      choices: clients.map((c) => ({ name: c, value: c })),
    },
  ]);

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
    case "web":
      finalCommand = `CLIENT=${client} npm run web`;
      break;
    case "ios":
      finalCommand = `CLIENT=${client} npx expo run:ios`;
      break;
    case "android":
      finalCommand = `CLIENT=${client} npx expo run:android`;
      break;
  }

  console.log(`\n🚀 Executando comando:\n> ${finalCommand}\n`);

  try {
    execSync(finalCommand, { stdio: "inherit", shell: true });
  } catch (err) {
    console.error("\n❌ Erro ao executar comando:", err.message);
    process.exit(1);
  }
})();
