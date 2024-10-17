import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { BrowserRouter } from 'react-router-dom'
import './bootstrap.min.css'
import { Provider } from 'react-redux'
import cartstore from './Redux/Cartstore.js'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
   <Provider store={cartstore}>
   <App />
   </Provider>
    </BrowserRouter>
  </StrictMode>,
)
