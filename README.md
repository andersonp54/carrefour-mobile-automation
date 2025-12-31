# 📱 Testes Mobile – Carrefour | Automação E2E Android & iOS

![Javascript](https://img.shields.io/static/v1?label=language&message=javascript&color=orange&style=for-the-badge&logo=javascript)
![Appium](https://img.shields.io/static/v1?label=mobile&message=appium&color=purple&style=for-the-badge&logo=appium)
![WebdriverIO](https://img.shields.io/static/v1?label=runner&message=webdriverio&color=red&style=for-the-badge&logo=webdriverio)
![Android](https://img.shields.io/static/v1?label=platform&message=android&color=green&style=for-the-badge&logo=android)
![iOS](https://img.shields.io/static/v1?label=platform&message=ios&color=black&style=for-the-badge&logo=apple)
![Allure](https://img.shields.io/static/v1?label=report&message=allure&color=ff69b4&style=for-the-badge&logo=allure)

---

## 📋 Sobre o projeto

Este projeto tem como objetivo automatizar **testes end-to-end (E2E) mobile** para o aplicativo do **Native-Demo-App**, contemplando **Android e iOS**, utilizando **JavaScript moderno (ES Modules)** com **Appium**.

O foco da automação é garantir:

- funcionamento correto dos principais fluxos do app  
- validação de comportamento em Android e iOS  
- prevenção de regressões funcionais  
- execução local  
- reutilização de código e padronização de interações mobile  

---

## 🧰 Tecnologias utilizadas

### 🔹 Automação Mobile
- **Appium**  
  https://appium.io/

### 🔹 Test Runner
- **WebdriverIO**  
  https://webdriver.io/

### 🔹 Linguagem
- **JavaScript (ES Modules)**  
  https://developer.mozilla.org/en-US/docs/Web/JavaScript


---

## 💻 Pré-requisitos

Antes de começar, você precisa ter instalado:

### 🔹 Geral
- **Node.js 18+**
- **npm 8+**
- **Java JDK 11+**

```bash
node -v
npm -v
```
```
⚠️ Não é necessário iniciar o Appium manualmente.
O WDIO gerencia automaticamente o ciclo de vida do Appium.
```

### 📱 Aplicação Mobile (obrigatório)
É necessário baixar e preparar a aplicação manualmente antes da execução dos testes.

1️⃣ Clonar o repositório da aplicação de teste (native-demo-app)
Execute o clone do projeto native-demo-app, que é utilizado como base para os testes mobile:
```
git clone https://github.com/webdriverio/native-demo-app.gi t
```

2️⃣ Gerar os builds da aplicação

Siga as instruções do repositório native-demo-app para gerar os binários da aplicação para cada plataforma:
- **Android → gerar o .apk**
- **iOS → gerar o .app**

3️⃣ Copiar os binários para o projeto de automação

Após gerar os arquivos, copie-os para os diretórios abaixo:
```
apps/
├── android/
│   └── native-demo-app.apk
└── ios/
    └── native-demo-app.app
```
---
### 🔹 Android
- **Android Studio**
- **Android SDK**
- **Emulador Android configurado**
```bash
ANDROID_HOME
JAVA_HOME
```

### 🔹 iOS (macOS)
- **Xcode**
- **Xcode Command Line Tools**
- **Simulador iOS configurado**
```bash
xcode-select --install
```

---

## 📦 Instalação das dependências

Na raiz do projeto, execute:
```bash
npm install
```
Caso encontre problemas de dependência:
```bash
npm install --force
```

---

## ▶️ Executando os testes
Executar testes Android
```bash
npm run test:android
```
Executar testes iOS
```bash
npm run test:ios
```
Executar cenário específico
```bash
npm run test:ios:spec tests/06.swipe.spec.js
```

### 📊 Relatórios

Após a execução dos testes, use os comandos abaixo para gerar o report:
```
npm run allure:generate
npm run allure:open
```
Os seguintes artefatos são gerados na pasta Report :

- Relatório HTML
- Screenshot  

---

## 🗂️ Estrutura do projeto
```
carrefour-mobile-automation/
├─ apps/
│  ├─ android/
│  └─ ios/
│
├─ dto/
│  └─ user-bean.js
│
├─ helpers/
│  └─ utils/
│     └─ random.js
│
├─ Pages/
│
├─ Resports/
├─ 
├─ tests/
│  └─ .specs
│     
├─ wdio.android.conf.js
├─ wdio.ios.conf.js
├─ package.json
└─ README.md
```

---

## 🧪 Tipos de testes implementados
### ✅ Testes E2E Mobile
```
Login
Onboarding
Fluxos principais do app
Validação de navegação
```

### ✅ Testes de Plataforma
```
Execução dedicada para Android
Execução dedicada para iOS
```

### ✅ Testes Negativos
```
Login inválido
Campos obrigatórios
Fluxos interrompidos
Validações de erro
```
---


**⚠️ Observações sobre a execução no CI**

Durante o desenvolvimento do desafio, foi identificado um problema na execução da automação mobile em ambiente de CI, que impossibilitou a entrega dessa etapa dentro do prazo proposto.

🔍 Contexto

A automação mobile depende da execução da aplicação native-demo-app, envolvendo:

- Inicialização de emulador Android ou simulador iOS  
- Configuração e comunicação com o Appium 
- Build e instalação da aplicação mobile  
- Execução de testes E2E com dependência de ambiente gráfico  
- Durante a tentativa de execução no CI, a pipeline não conseguiu - concluir a execução dos testes mobile com sucesso.  
- Apesar de diferentes ajustes e tentativas, não foi possível isolar a causa raiz dentro do tempo disponível para o desafio.

**🧪 O que foi validado**

- A automação mobile executa corretamente em ambiente local  
- Os testes são iniciados, executados e finalizados com sucesso localmente  
- Evidências (screenshots, logs, stack trace e relatórios Allure) são geradas corretamente  
- A estrutura do projeto está preparada para execução automatizada


## 👤 Autor

### Anderson Patricio
#### Senior Quality Assurance Engineer