# 📚 BOOKNOOK
### Your Personal Digital Library — Read. Borrow. Return.

<div align="center">

<img src="https://capsule-render.vercel.app/api?type=venom&height=250&color=0:6C63FF,50:8B5CF6,100:00D4FF&text=BOOKNOOK&fontSize=65&fontColor=ffffff&animation=fadeIn&fontAlignY=45&desc=Explore%20Books%20%7C%20Borrow%20Books%20%7C%20Enjoy%20Reading&descAlignY=65&descSize=16" width="100%" />

<p>
  <b>A modern online library platform built to make reading and book management easier.</b>
</p>

<a href="YOUR_FRONTEND_VERCEL_URL">
  <img src="https://img.shields.io/badge/🌐_LIVE_DEMO-Visit_BookNook-7C3AED?style=for-the-badge" />
</a>
<a href="https://book-libary-server.vercel.app/">
  <img src="https://img.shields.io/badge/⚡_BACKEND-API-0891B2?style=for-the-badge" />
</a>

<br/>

<img src="https://img.shields.io/badge/Next.js-16-black?style=flat-square&logo=next.js" />
<img src="https://img.shields.io/badge/React-19-61DAFB?style=flat-square&logo=react" />
<img src="https://img.shields.io/badge/Tailwind_CSS-38BDF8?style=flat-square&logo=tailwindcss" />
<img src="https://img.shields.io/badge/JavaScript-F7DF1E?style=flat-square&logo=javascript&logoColor=black" />
<img src="https://img.shields.io/badge/Authentication-Better_Auth-7C3AED?style=flat-square" />

</div>

---

## ✦ 01 — About The Project

**BookNook** is a modern online library management application designed for book lovers.

It provides a simple and interactive experience where users can discover books, explore detailed information, add new books, borrow their favorite titles, manage borrowed books, and return them.

> Make book management easier and create a better digital reading experience.

## ✦ 02 — Key Features

<table>
<tr>
<td width="50%">

### 📖 Discover Books
Explore available books and find your next favorite read.

</td>
<td width="50%">

### 🔍 Book Details
View detailed information about individual books.

</td>
</tr>
<tr>
<td width="50%">

### ➕ Add Books
Add new books to the library collection.

</td>
<td width="50%">

### 📚 Borrow Books
Borrow books for a selected period.

</td>
</tr>
<tr>
<td width="50%">

### ↩️ Return Books
Manage borrowed books and return them.

</td>
<td width="50%">

### 🔐 Secure Authentication
Register, log in, and access protected routes.

</td>
</tr>
<tr>
<td width="50%">

### 🌙 Dark & Light Mode
Switch between dark and light themes.

</td>
<td width="50%">

### 📱 Responsive Design
Enjoy a smooth experience on desktop, tablet, and mobile.

</td>
</tr>
</table>

Additional experience:

- Google authentication integration.
- Toast notifications for user feedback.
- Modern and reusable UI components.
- Smooth animations and interactive elements.
- User profile management.

## ✦ 03 — Tech Universe

<div align="center">

### Frontend & Framework

<img src="https://skillicons.dev/icons?i=nextjs,react,js,tailwind" />

### Styling & UI

`Tailwind CSS` · `Lucide React` · `next-themes` · `React Toastify`

### Authentication & Animation

`Better Auth` · `Motion`

### Backend & Database

<img src="https://skillicons.dev/icons?i=nodejs,express,mongodb" />

### Tools & Deployment

<img src="https://skillicons.dev/icons?i=git,github,vscode,vercel" />

</div>

## ✦ 04 — Project Architecture

```text
book-libary-client/
│
├── public/
│   ├── images/
│   └── icons/
│
├── src/
│   │
│   ├── app/
│   │   │
│   │   ├── api/
│   │   │   └── auth/
│   │   │       └── [...all]/
│   │   │           └── route.js
│   │   │
│   │   ├── add-book/
│   │   │   └── page.jsx
│   │   │
│   │   ├── books/
│   │   │   ├── [id]/
│   │   │   │   ├── book-details-content.jsx
│   │   │   │   └── page.jsx
│   │   │   └── page.jsx
│   │   │
│   │   ├── login/
│   │   │   └── page.jsx
│   │   │
│   │   ├── register/
│   │   │   └── page.jsx
│   │   │
│   │   ├── my-books/
│   │   │   ├── my-books-content.jsx
│   │   │   └── page.jsx
│   │   │
│   │   ├── my-borrows/
│   │   │   └── page.jsx
│   │   │
│   │   ├── profile/
│   │   │   └── page.jsx
│   │   │
│   │   ├── favicon.ico
│   │   ├── globals.css
│   │   ├── layout.js
│   │   ├── loading.jsx
│   │   └── page.js
│   │
│   ├── components/
│   │   │
│   │   ├── auth/
│   │   │   ├── sign-out-button.jsx
│   │   │   ├── signin-form.jsx
│   │   │   └── signup-form.jsx
│   │   │
│   │   ├── books/
│   │   │   └── AddBookForm.jsx
│   │   │
│   │   ├── home/
│   │   │   ├── extra-sections.jsx
│   │   │   ├── hero-slider.jsx
│   │   │   └── new-arrivals.jsx
│   │   │
│   │   ├── ui/
│   │   │   ├── button.jsx
│   │   │   ├── card.jsx
│   │   │   ├── input.jsx
│   │   │   ├── label.jsx
│   │   │   └── separator.jsx
│   │   │
│   │   ├── animated-card.jsx
│   │   ├── animated-image.jsx
│   │   ├── fotter.jsx
│   │   ├── loading.jsx
│   │   ├── navbar.jsx
│   │   └── scroll-reveal.jsx
│   │
│   └── lib/
│       ├── api.js
│       ├── auth-client.js
│       ├── auth.js
│       └── utils.js
│
├── .gitignore
├── AGENTS.md
├── components.json
├── eslint.config.mjs
├── jsconfig.json
├── next.config.mjs
├── package.json
├── package-lock.json
└── README.md
```

**Architecture note:** This tree is based on previously shared project files. Add any newly created theme-related files (such as `providers` or `theme-toggle`) and adjust filenames to match your actual project.

### Folder Overview

| Folder / File | Responsibility |
|---|---|
| `src/app/` | Application pages and routing |
| `src/app/api/` | Authentication API routes |
| `src/app/books/` | Book listing and details |
| `src/app/add-book/` | Add new books |
| `src/app/my-books/` | Personal book management |
| `src/app/my-borrows/` | Borrowed book management |
| `src/app/profile/` | User profile |
| `src/components/auth/` | Authentication components |
| `src/components/books/` | Book-related components |
| `src/components/home/` | Homepage sections |
| `src/components/ui/` | Reusable UI components |
| `src/lib/` | API and authentication utilities |
| `public/` | Static images and assets |

## ✦ 05 — Getting Started

### Prerequisites

Make sure you have installed:

- Node.js
- npm
- Git
- A running BookNook backend API

### Step 1 — Clone Repository

```bash
git clone YOUR_FRONTEND_GITHUB_REPOSITORY_URL
```

### Step 2 — Navigate to Project

```bash
cd book-libary-client
```

### Step 3 — Install Dependencies

```bash
npm install
```

### Step 4 — Configure Environment Variables

Create a `.env.local` file in the project root:

```env
NEXT_PUBLIC_API_URL=http://localhost:5000
BACKEND_API_URL=http://localhost:5000

AUTH_EXCHANGE_SECRET=your_auth_exchange_secret
```

For production, configure the deployed backend URL:

```env
NEXT_PUBLIC_API_URL=https://book-libary-server.vercel.app
BACKEND_API_URL=https://book-libary-server.vercel.app
```

**Security:** Never expose private authentication secrets, JWT secrets, MongoDB credentials, or Google OAuth client secrets in frontend code or public repositories.

### Step 5 — Start Development Server

```bash
npm run dev
```

Open your browser:

```text
http://localhost:3000
```

### Step 6 — Production Build

```bash
npm run build
```

Start the production server:

```bash
npm start
```

## ✦ 06 — Backend API Integration

<div align="center">

**POWERED BY BOOKNOOK API**

<a href="https://book-libary-server.vercel.app/">
https://book-libary-server.vercel.app/
</a>

</div>

| Method | Endpoint | Description |
|:---:|---|---|
| GET | `/books` | Get all books |
| GET | `/books/:id` | Get book details |
| POST | `/books` | Add a new book |
| DELETE | `/books/:id` | Delete a book |
| POST | `/borrow` | Borrow a book |
| GET | `/my-borrows` | Get borrowed books |
| PATCH | `/borrow/:borrowId/return` | Return a borrowed book |

*Check the backend repository for the complete list of implemented endpoints.*

## ✦ 07 — Authentication & Security

BookNook integrates Better Auth and a backend JWT authentication system.

- User registration and login.
- Google authentication integration.
- Protected application routes.
- Backend token-based authorization.
- Secure password handling on the backend.
- Server-side Google authentication exchange.

Private API requests use the Authorization header:

```http
Authorization: Bearer YOUR_JWT_TOKEN
```

Private secrets must remain on the server and must never be committed to GitHub.

## ✦ 08 — Deployment

The frontend is designed for deployment on **Vercel**.

1. Push the project to GitHub.
2. Import the repository into Vercel.
3. Configure production environment variables.
4. Set the production backend URL.
5. Configure backend CORS to allow the frontend domain.
6. Deploy the application.

**Backend:** https://book-libary-server.vercel.app/

**Frontend:** YOUR_FRONTEND_VERCEL_URL

## ✦ 09 — Developer

<div align="center">

<img src="https://capsule-render.vercel.app/api?type=soft&color=0:7C3AED,100:0891B2&height=120&section=header&text=ATIK%20HASAN&fontSize=38&fontColor=ffffff" width="100%" />

### Full Stack Web Developer

**Building ideas into real-world applications.**

<a href="https://github.com/Atik-Hassan-Abddula">
<img src="https://img.shields.io/badge/GitHub-181717?style=for-the-badge&logo=github&logoColor=white" />
</a>

<a href="https://www.linkedin.com/in/atik-hassan-687022440/">
<img src="https://img.shields.io/badge/LinkedIn-0A66C2?style=for-the-badge&logo=linkedin&logoColor=white" />
</a>

<a href="https://portfolio-ten-black-86.vercel.app/">
<img src="https://img.shields.io/badge/Portfolio-7C3AED?style=for-the-badge&logo=vercel&logoColor=white" />
</a>

<br/>

**LEARN. BUILD. IMPROVE. REPEAT.**

</div>

---

<div align="center">

### ⭐ Enjoying BookNook?

If you like this project, consider giving the repository a star!

<img src="https://capsule-render.vercel.app/api?type=waving&color=0:6C63FF,100:00D4FF&height=120&section=footer" width="100%" />

</div>
