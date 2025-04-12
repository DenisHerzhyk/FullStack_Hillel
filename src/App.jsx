
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import store from './redux/store.js';
import {Provider} from 'react-redux'
import {ThemeContext, LanguageContext, PriorityColorContext} from "./context/context.js";
import AppContext from "./context/AppContext.jsx";

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
            <Provider store={store}>
                <PriorityColorContext value="red">
                  <ThemeContext.Provider value="black">
                      <LanguageContext.Provider value="en">
                            <AppContext />
                      </LanguageContext.Provider>
                  </ThemeContext.Provider>
                </PriorityColorContext>
            </Provider>
        </>
      )
}

export default App
