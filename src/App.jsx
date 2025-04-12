import {ErrorBoundary} from "react-error-boundary";
import {Suspense} from "react";
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import "./components/Post/Post.min.scss";
import DataFetcher from "./components/DataFetcher.jsx";

function App() {
  return (
    <>
      <div>
        <a href="https://vite.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <DataFetcher />
    </>
  )
}

export default App
