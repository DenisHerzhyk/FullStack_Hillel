## Setup

After uploading this repository to your environment, install the required dependencies:

```sh
npm install
```

Then run application:
```sh
npm run dev
```
## Description

This project consists of the following containers:

- **context** folder - contains contexts and actions from **redux** folder with child components. 
- **redux** folder - contains counterSagas, counterSlice, middleware and store
- **ChildContext2.jsx** - contains button which receives action from **redux** folder and either increment or decrement the count variable and sends updated current state of this value.
- **AppContext.jsx** - receives state of count and displays result

# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh



## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript and enable type-aware lint rules. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.
