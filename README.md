# 🚀 Next.js Authentication Project

This project is built with **Next.js**, **React**, and **TypeScript**, featuring a well-structured setup with **Husky, Commitlint, Commitizen, and Lint-Staged** to enforce best coding and commit practices.

---

## 📖 Project Setup

### 1️⃣ Clone the Repository

```sh
git clone https://github.com/dhinakaran7501/Nextjs_auth_practice.git
cd auth
```

### 2️⃣ Install Dependencies

```sh
npm install
```

### 3️⃣ Start Development Server

```sh
npm run dev
```

This will start the Next.js application at `http://localhost:3000`.

---

## 🔧 Code Quality Tools

### ✅ Husky

Husky automates **Git hooks** (pre-commit and commit-msg) to ensure good code quality and commit practices.

#### **Husky Hooks**

- **`pre-commit`** → Runs `lint-staged` to format and lint staged files.
- **`commit-msg`** → Ensures that commit messages follow the conventional format.

#### **Example Commit Message Validation Format:**

```
Format: <type>: <description>

Valid types: [build, chore, ci, docs, feat, fix, perf, refactor, revert, style, test]

Examples:
  feat: add user authentication
  fix: resolve payment calculation issue
  docs: update API documentation
```

---

### ✅ Commitizen

Commitizen provides an **interactive CLI** for creating well-structured commit messages.

#### **Usage**

Instead of:

```sh
git commit -m "fixed stuff"
```

Use:

```sh
npx cz
```

This ensures a structured commit history.

---

### ✅ Lint-Staged

Lint-Staged ensures that only **staged files** are formatted and linted before committing.

---

## 🚀 Project Scripts

### ✅ Development

```sh
npm run dev
```

Starts the Next.js development server.

### ✅ Build

```sh
npm run build
```

Builds the project for production.

### ✅ Linting

```sh
npm run lint
```

Runs ESLint to check for code issues.

### ✅ Format Code

```sh
npm run lint-staged
```

Formats staged files using **ESLint and Prettier**.

### ✅ Commit with Commitizen

```sh
npm run commit
```

Prompts for structured commit messages following **Conventional Commits**.

---

## 📂 Folder Structure

```
src/
│── app/                      # Application-related pages and components
│── assets/                   # Stores images, PDFs, and other static files
│── components/               # Reusable components
│── hooks/                    # Custom hooks
│── layouts/                  # Layout components (Navbar, Footer, Header, Login, Signup, etc.)
│── libs/                     # Utility libraries (DB connections, environment variables, etc.)
│── services/                 # API call functions
│── templates/                # Email templates or other structured content
│── types/                    # TypeScript type definitions
│── utils/                    # Constants and reusable functions
│── validations/              # Form validation using Formik or Zod
│── middleware/               # Custom middleware for authentication or request handling
```

This folder structure ensures **modularity, maintainability, and scalability** in the project. 🚀

---

## 🎯 Expected Output for Each Script

| Command                                      | Expected Output                                                  |
| -------------------------------------------- | ---------------------------------------------------------------- |
| `npm run dev`                                | Starts **Next.js development server** at `http://localhost:3000` |
| `npm run build`                              | Optimizes the app for **production**, generating `.next/` folder |
| `npm run start`                              | Runs the **production build**                                    |
| `npm run lint`                               | Shows **linting errors** (if any)                                |
| `npm run commit`                             | Opens an **interactive commit message prompt**                   |
| `git commit -m "feat: added authentication"` | ✅ Passes commit validation and gets committed                   |
| `git commit -m "fixed bug"`                  | ❌ Fails (invalid format)                                        |
| `git commit -m "fix: resolve login issue"`   | ✅ Passes validation                                             |

---

## 🎯 Contribution Guidelines

1. **Follow the commit message format.** Use `npx cz` for structured commits.
2. **Ensure all linting and formatting checks pass** before pushing changes.
3. **Run tests before merging (PRs - Pull Requests).**
4. **Use feature branches** (`feature/your-feature-name`) instead of committing directly to `main`.
5. **Write meaningful commit messages** that describe the purpose of the change.
6. **Keep PRs small and focused** to make reviewing easier.
7. **Ensure compatibility** with existing functionality before merging.
8. **Review other contributors' PRs (Pull Requests)** to maintain code quality.
9. **Update documentation** if changes impact project usage.

---

## 📜 License

This project is licensed under the [MIT License](https://www.linkedin.com/in/dhinakaran-ramasamy-7684ba22a/).

---
