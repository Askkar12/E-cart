import { Navigate, Route, Routes, useLocation } from 'react-router-dom'
import './App.css'
import Footer from './Components/Footer'
import Header from './Components/Header'
import Wishlist from './Pages/Wishlist'
import View from './Pages/View'
import Cart from './Pages/Cart'
import Home from './Pages/Home'



function App() {

  const location=useLocation()
  const isHomePage=location.pathname==='/'
  

  return (
    <>
      <Header insideHome={isHomePage}/>
      <Routes>
        <Route path='/'element={<Home/>}/>
        <Route path='/Wishlist'element={<Wishlist/>}/>
        <Route path='/Cart'element={<Cart/>}/>
        <Route path='/View/:id'element={<View/>}/>  
        <Route path='/*'element={<Navigate to={'/'}/>}/>  
      </Routes>
      <Footer/> 
    </>
  )
}

export default App
