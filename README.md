# 📝 Task Manager Fullstack

Um projeto frontend de authenticação completa usando Nextjs e Firebase para authenticação e authorization com CRUD completo de usuários. O projeto possui integração com API's externa de busca de informações de países, estados e cidades. Além disso possui tema customizado para dark mode e light mode, integração com Zustand, usa ZOD e react-hook-form para validar os formulários.

---

## 🚀 Demonstração

![Preview Light Mode](./tela-task-manager-light-theme.jpg)
![Preview Dark Mode](./tela-task-manager-dark-theme.jpg)
![Preview Gerenciador de Tarefas](./tela-task-manager-task-list.jpg)
![Preview Nova Tarefa](./tela-task-manager-new-task.jpg)

🔗 [Acesse o frontend (Vercel)](https://mini-auth-nextjs-api-git-main-thiago-yures-projects.vercel.app/)

---

## ⚙️ Tecnologias

### Frontend

- [Next.js](https://nextjs.org/)
- [Material UI](https://mui.com/)
- TypeScript
- [Zustand](https://zustand-demo.pmnd.rs/)
- [Zod](https://zod.dev/)
- [Firebase](https://firebase.google.com/?hl=pt-br)

---

## ⚙️ API's externas

- [API de países](https://restcountries.com/#rest-countries)
- [API de estados e cidades](https://countrystatecity.in/)

---

## 🧩 Funcionalidades

- cadastro, Login e Logout de usuários.
- Escolha dinâmica de tema salvo Zustand
- Rotas protegidas

---

## 📁 Estrutura do Projeto

```
mini-auth-nextjs-api/
├── src/         # Next.js + MUI + Firebase
│   ├── app/
│   ├── components/
│   └── ...
```

---

## 🛠️ Instalação Local

### 1. Clone o repositório

```bash
git clone https://github.com/ThiagoYure/mini-auth-nextjs-api.git
cd mini-auth-nextjs-api
```

### 2. Configure o frontend (Next.js)

```bash
cd ../frontend
npm install
npm run dev
```

---

## 🧪 Variáveis de Ambiente

```
NEXT_PUBLIC_STATES_API_KEY="SUA CHAVE DA API STATES"
NEXT_PUBLIC_FIREBASE_API_KEY="SUA CHAVE DA API DO FIREBASE"
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN="CONFIG DO FIREBASE"
NEXT_PUBLIC_FIREBASE_PROJECT_ID="CONFIG DO FIREBASE"
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET="CONFIG DO FIREBASE"
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID="CONFIG DO FIREBASE"
NEXT_PUBLIC_FIREBASE_API_ID="CONFIG DO FIREBASE"
NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID="CONFIG DO FIREBASE"
```

---

## 📤 Deploy

- Frontend [Vercel](https://vercel.com)

---

## 👨‍💻 Autor

**Thiago Yure**  
[GitHub](https://github.com/ThiagoYure)  
[LinkedIn](https://www.linkedin.com/in/thiagoyure)

---

> Projeto desenvolvido com fins de aprendizado e demonstração de stack frontend moderna com Next.js + Firebase API + MUI.
