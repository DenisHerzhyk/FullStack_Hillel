import {Suspense, useState} from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import {ErrorBoundary} from 'react-error-boundary';

import MessageComponent from "./components/MessageComponent.jsx";
import fetchMessage from "./components/fetchMessage.js";

function App() {
  const [count, setCount] = useState(0);
  const messagePromise = fetchMessage().catch(() => "No message found.");
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
      <h1>Vite + React</h1>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <p>
          Edit <code>src/App.jsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
        <ErrorBoundary fallback={<div>Something went wrong in Boundary</div>}>
            <Suspense fallback={<div>Loading...</div>}>
                <MessageComponent messagePromise={messagePromise} />
            </Suspense>
        </ErrorBoundary>
    </>
  )
}

export default App
