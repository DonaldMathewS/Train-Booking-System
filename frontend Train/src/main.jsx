import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import StoreContextProvider from './components/Storecontext/StoreContext.jsx'
import store from "./Store/store.js"
import { Provider } from "react-redux"
createRoot(document.getElementById('root')).render(




  <Provider store={store}>
    <StoreContextProvider>
      <App />
    </StoreContextProvider>
  </Provider>


)
