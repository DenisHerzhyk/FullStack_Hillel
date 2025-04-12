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

- **App** – The main container responsible for rendering the final output.  
- **DataFetcher** – Fetches data from the `jsonplaceholder` API. A 1-second delay is introduced to demonstrate the loading state before displaying the fetched data.  
- **Post** – Displays the details of a single post.  

# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh



## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript and enable type-aware lint rules. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.
