import ReactDOM from 'react-dom/client';
import '../css/style.css'
import typescriptLogo from '../typescript.svg'
import viteLogo from '/vite.svg';
import Stateful from "./Stateful.tsx";
import Stateless from "./Stateless";

const App = () => {
    return (
        <div>
            <a href="https://vite.dev" target="_blank">
                <img src={viteLogo} className="logo" alt="Vite logo" />
            </a>
            <a href="https://www.typescriptlang.org/" target="_blank">
                <img src={typescriptLogo} className="logo vanilla" alt="TypeScript logo" />
            </a>
            <h1>Vite + TypeScript</h1>
            <p className="read-the-docs">
                Click on the Vite and TypeScript logos to learn more
            </p>
            <div className="States">
                <Stateful />
                <Stateless
                    colors={["red", "green", "blue", "yellow", "purple", "pink"]}
                />
            </div>
        </div>
    )
}

ReactDOM.createRoot(document.querySelector('#app') as HTMLElement).render(<App />);