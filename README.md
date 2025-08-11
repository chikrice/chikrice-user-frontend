# 🏋️‍♂️ Chikrice - Fitness App

> **The body you have always dreamed of** 💪

[![Live Demo](https://img.shields.io/badge/Live%20Demo-Chikrice-blue?style=for-the-badge&logo=vercel)](https://chikrice.khaled-javdan.com)
[![Frontend Repo](https://img.shields.io/badge/Frontend-Repository-blue?style=for-the-badge&logo=github)](https://github.com/chikrice/chikrice-user-frontend)
[![Project Board](https://img.shields.io/badge/Project%20Board-Tasks-blue?style=for-the-badge&logo=github)](https://github.com/orgs/chikrice/projects/1)
[![Node.js](https://img.shields.io/badge/Node.js-v18.x-green?style=for-the-badge&logo=node.js)](https://nodejs.org/)
[![React](https://img.shields.io/badge/React-18.2.0-blue?style=for-the-badge&logo=react)](https://reactjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.8.3-blue?style=for-the-badge&logo=typescript)](https://www.typescriptlang.org/)
[![License](https://img.shields.io/badge/License-MIT-green?style=for-the-badge)](LICENSE)

##  About This Project

**Chikrice** is a comprehensive fitness application designed to help users achieve their health and fitness goals. This project serves as an excellent learning platform for junior and mid-level frontend engineers who want to:

- 🚀 **Level up their skills** with modern React development
- 🤝 **Collaborate** with other developers in a real-world project
-  **Learn** industry best practices and patterns
- 💼 **Build portfolio** with a production-ready application
- 🔄 **Experience** code migration from JavaScript to TypeScript
- 🧪 **Practice** testing with Vitest and Playwright

### 🌟 Why Contribute to Chikrice?

- **Real-world experience**: Work on a live application used by real users
- **Modern tech stack**: Learn cutting-edge technologies and tools
- **Community-driven**: Join a community of passionate developers
- **Portfolio-worthy**: Add a substantial project to your portfolio
- **Mentorship opportunities**: Learn from experienced developers
- **Fitness enthusiasts welcome**: Perfect if you love fitness and programming!

## 🏗️ Project Architecture

This is a **full-stack application** with separate frontend and backend repositories:

### Frontend (This Repository)
- **React 18** with modern hooks and patterns
- **Material-UI** for professional UI components
- **Zustand** for state management
- **Vite** for fast development and building

### Backend Repository
- **Node.js** with Express.js
- **MongoDB** database
- **JWT Authentication**
- **RESTful API**

** Backend Repository**: [chikrice-backend](https://github.com/chikrice/chikrice-backend)

*If you're a backend developer or want to work on the API, check out the backend repository!*

## 🛠️ Tech Stack

### Core Technologies
- **React 18.2.0** - Modern React with hooks and concurrent features
- **JavaScript** → **TypeScript** (Migration in progress)
- **Material-UI (MUI) 5.14.19** - Professional UI components
- **React Hook Form 7.48.2** - Performant form handling
- **Zustand 5.0.7** - Lightweight state management
- **Vite 5.4.10** - Fast build tool and dev server

### Development Tools
- **ESLint** - Code linting and quality
- **Prettier** - Code formatting
- **Husky** - Git hooks
- **Commitlint** - Conventional commit messages
- **TypeScript 5.8.3** - Type safety (migration in progress)

### Testing (Coming Soon)
- **Vitest** - Unit and integration testing
- **Playwright** - End-to-end testing

### Additional Libraries
- **React Router DOM** - Client-side routing
- **Axios** - HTTP client
- **SWR** - Data fetching
- **Framer Motion** - Animations
- **i18next** - Internationalization
- **React Joyride** - User onboarding
- **ApexCharts** - Data visualization

## 🚀 Quick Start

### Prerequisites
- **Node.js v18.x** (Recommended)
- **Yarn** package manager
- **Git**

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/chikrice/chikrice-user-frontend.git
   cd chikrice-user-frontend
   ```

2. **Set up environment variables**
   ```bash
   cp .env.example .env
   ```
   
   **📝 Configure your `.env` file:**
   - `VITE_DEV_HOST_API`: Your backend API URL (default: `http://localhost:3000`)
   - `VITE_GOOGLE_CLIENT_ID`: Google OAuth client ID
   - `VITE_MAPBOX_API`: Mapbox API key (optional)

   **🔑 How to get API keys:**
   - **Google OAuth**: [Google Cloud Console](https://console.cloud.google.com/apis/credentials)
   - **Mapbox**: [Mapbox Account](https://account.mapbox.com/access-tokens/)

3. **Install dependencies**
   ```bash
   yarn install
   ```

4. **Start development server**
   ```bash
   yarn dev
   ```

5. **Open your browser**
   Navigate to [http://localhost:3030](http://localhost:3030)

### Available Scripts

| Command | Description |
|---------|-------------|
| `yarn dev` | Start development server |
| `yarn build` | Build for production |
| `yarn preview` | Preview production build |
| `yarn lint` | Run ESLint |
| `yarn lint:fix` | Fix ESLint issues and format code |
| `yarn release` | Create a new release |

## 📁 Project Structure

```
src/
├── components/          # Reusable UI components
├── pages/              # Page components
├── sections/           # Page sections and features
├── layouts/            # Layout components
├── store/              # Zustand stores
├── hooks/              # Custom React hooks
├── utils/              # Utility functions
├── api/                # API integration
├── theme/              # MUI theme configuration
├── locales/            # Internationalization
└── assets/             # Static assets
```

## 🤝 Contributing

We welcome contributions from developers of all skill levels! Here's how you can get started:

### 🎯 Good First Issues

Look for issues labeled with:
- `good first issue` - Perfect for beginners
- `help wanted` - General help needed
- `bug` - Bug fixes
- `enhancement` - New features
- `documentation` - Documentation improvements

### 📋 Contribution Guidelines

1. **Fork the repository**
2. **Create a feature branch**
   ```bash
   git checkout -b feature/your-feature-name
   ```
3. **Make your changes**
4. **Follow our coding standards**
   - Run `yarn lint:fix` before committing
   - Follow conventional commit messages
   - Write clean, readable code
5. **Test your changes**
6. **Submit a pull request**

### 🏷️ Commit Message Convention

We use [Conventional Commits](https://www.conventionalcommits.org/):

```
type(scope): description

feat(auth): add login functionality
fix(ui): resolve button alignment issue
docs(readme): update installation instructions
```

### 🔧 Development Workflow

1. **Code Quality**
   - ESLint for linting
   - Prettier for formatting
   - Husky for pre-commit hooks

2. **Git Workflow**
   - Feature branches
   - Pull request reviews
   - Conventional commits

3. **Testing** (Coming Soon)
   - Unit tests with Vitest
   - E2E tests with Playwright

## 🎓 Learning Opportunities

### For Junior Developers
- **React Fundamentals**: Learn modern React patterns
- **State Management**: Understand Zustand vs Context
- **UI Development**: Master Material-UI components
- **Form Handling**: Practice with React Hook Form
- **Code Quality**: Learn ESLint and Prettier

### For Mid-Level Developers
- **TypeScript Migration**: Help migrate from JavaScript
- **Testing Implementation**: Set up Vitest and Playwright
- **Performance Optimization**: Optimize bundle size and runtime
- **Architecture Patterns**: Improve code organization
- **CI/CD**: Enhance deployment pipeline

### Skills You'll Develop
- ✅ Modern React development
- ✅ TypeScript implementation
- ✅ UI/UX design principles
- ✅ State management patterns
- ✅ Testing strategies
- ✅ Code quality practices
- ✅ Git workflow
- ✅ Performance optimization
- ✅ Internationalization
- ✅ Progressive Web Apps

## 🌐 Live Demo

Check out the live application: **[chikrice.khaled-javdan.com](https://chikrice.khaled-javdan.com)**

## 📚 Resources

### Documentation
- [React Documentation](https://react.dev/)
- [Material-UI Documentation](https://mui.com/)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)
- [Vite Documentation](https://vitejs.dev/)

### Community
- [GitHub Discussions](https://github.com/chikrice/chikrice-user-frontend/discussions)
- [Issues](https://github.com/chikrice/chikrice-user-frontend/issues)
- [Project Board](https://github.com/orgs/chikrice/projects/1)

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

##  Acknowledgments

- **Material-UI** for the excellent component library
- **Vite** for the fast build tool
- **All contributors** who help make this project better

---

**Ready to level up your skills?** 🚀

[Start Contributing →](https://github.com/chikrice/chikrice-user-frontend/issues)

*Made with ❤️ by the Chikrice community*

