# 🧩 Client CLI — por Kami

Uma CLI simples e dinâmica para iniciar e gerenciar builds de clientes no projeto **Expo**.

---

## 🚀 Instalação

Instale globalmente:

```bash
npm install -g @kamidev/client-cli
```

Após isso, você poderá rodar diretamente:

```bash
client
```
---

## ⚙️ Comandos disponíveis

| Ação                          | Descrição                                              |
|-------------------------------|--------------------------------------------------------|
| **Gerar Prebuild (clean)** 🧩 | Gera o prebuild com limpeza (`expo prebuild --clean`)  |
| **Gerar Prebuild** 🧩         | Gera o prebuild normalmente (`expo prebuild`)          |
| **Rodar na Web** 🌐           | Executa o app no navegador (`npm run web`)             |
| **Rodar no iOS** 🍎           | Executa o app no simulador iOS (`expo run:ios`)        |
| **Rodar no Android** 🤖       | Executa o app no emulador Android (`expo run:android`) |

---

## 💻 Uso Interativo

<!--    /\_/\
      =( •.• )=
        /   \    -->

Basta executar:

```bash
client
```

Depois:

1. Selecione o **cliente**
2. Escolha a **ação** que deseja executar

Exemplo de saída:

```
🚀 Executando comando:
> CLIENT=<nome_cliente> npx expo run:ios
```

---

## ⚡ Uso Avançado (com Flags)

Ideal para **automatização de scripts** ou **pipelines CI/CD**.
Você pode pular as perguntas e passar as opções diretamente via linha de comando:

```bash
client --client <nome_cliente> --command ios
```

### 🔧 Flags disponíveis

| Flag        | Descrição                                                                      | Exemplo                    |
|-------------|--------------------------------------------------------------------------------|----------------------------|
| `--client`  | Nome da pasta dentro de `client-configs/`                                      | `--client <nome_cliente>`  |
| `--command` | Comando a ser executado (`prebuild`, `cleanprebuild`, `web`, `ios`, `android`) | `--command <nome_cliente>` |

