
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import {ThemeContext, LanguageContext, PriorityColorContext} from "./context/context.jsx";
import AppContainer from './context/AppContext.jsx'

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
        <PriorityColorContext value="red">
          <ThemeContext.Provider value="black">
              <LanguageContext.Provider value="en">
                  <AppContainer />
              </LanguageContext.Provider>
          </ThemeContext.Provider>
        </PriorityColorContext>
    </>
  )
}

export default App
