# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

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

- **CalculatorCallback** - contains the calculation and send memorized calculation to **ChildCallback** component, avoiding unnecessary re-renders.
- **CalculationMemo** - contains memorized calculation and send memorized calculation, receiving memorized calculation to memorizedValue.
- **ChildCallback** - contains buttons for calculation that will later call calc function with appropriate sign.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.
