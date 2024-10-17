import React, { useEffect, useState } from 'react'
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Badge from 'react-bootstrap/Badge';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { searchproducts } from '../Redux/Productslice';




function Header({insideHome}) {
  const dispatch=useDispatch()
  const[wishlistCount,setwishlistCount]=useState(0)
  const[cartCount,setcartCount]=useState(0)
  const{wishlist}=useSelector((state)=>state.wishlistReducer)
  const cart=useSelector((state)=>state.cartReducer)

  useEffect(()=>{
    setwishlistCount(wishlist?.length)
    setcartCount(cart?.length)
  },[wishlist,cart])
  return (
    <div>
       <Navbar expand="lg" className="bg-dark ">
      <Container>
        <Navbar.Brand href="#home" className='text-light'><Link style={{textDecoration:"none",color:"white"}} to={"/"}><i className="fa-solid fa-cart-shopping fa-beat"></i> E-cart</Link></Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto">
           { insideHome&&<Nav.Link className='me-3 '>
             <div className="input-group">
             <input  onChange={e=>dispatch(searchproducts(e.target.value.toLowerCase()))} type="text" className='form-control' placeholder='search products' style={{width:"300px"}} />
              <span className='input-group-text bg-white'>
              <i className="fa-solid fa-magnifying-glass"></i>
                </span>  
              </div>          
            </Nav.Link>}
            <Nav.Link href="#home"  className='text-light mt-3'><Link to={'./Wishlist'} style={{textDecoration:"none",color:"white"}}>Wishlist<Badge bg="secondary">{wishlistCount}</Badge></Link></Nav.Link>
            <Nav.Link href="#link"  className='text-light mt-3'><Link to={'./Cart'}  style={{textDecoration:"none",color:"white"}}>Cart <Badge bg="secondary">{cartCount}</Badge></Link></Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
    </div>
  )
}

export default Header
