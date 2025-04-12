import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import Home from "./components/Home.jsx";
import About from "./components/About.jsx";
import Contact from "./components/Contact.jsx";
import { BrowserRouter, Routes, Route, NavLink } from "react-router";

function App() {
  return (
    <>
      <BrowserRouter>
        <nav>
          <ul className="App__navigation">
            <li>
              <NavLink to="/" end>
                Home
              </NavLink>
            </li>
            <li>
              <NavLink to="/about">About</NavLink>
            </li>
            <li>
              <NavLink to="/contact">Contact</NavLink>
            </li>
          </ul>
        </nav>
        <div>
          <a href="https://vite.dev" target="_blank">
            <img src={viteLogo} className="logo" alt="Vite logo" />
          </a>
          <a href="https://react.dev" target="_blank">
            <img src={reactLogo} className="logo react" alt="React logo" />
          </a>
        </div>
        <Routes>
          <Route element={<Home />} path="/" component={Home} />
          <Route element={<About />} path="/about" component={About} />
          <Route element={<Contact />} path="/contact" component={Contact} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
