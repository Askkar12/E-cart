import React, { useEffect, useState } from 'react'
import { Button, Spinner } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import { addToWishList, removeFromWishlist } from '../Redux/WhishlistSlice';
import { addToCart } from '../Redux/CartSlice';



function View() {
  const{id}=useParams() //it is used to select a parameter In React, useParams is a hook provided by react-router-dom that allows you to access the dynamic parameters from the current route. 
  // console.log(id);
  const{loading}=useSelector((state)=>state.productReducer)
  const[product,setproduct]=useState({})
  const{wishlist}=useSelector((state)=>state.wishlistReducer)
  const cart=useSelector((state)=>state.cartReducer)
  const dispatch=useDispatch()

  useEffect(()=>{
    const products=JSON.parse(localStorage.getItem("products"))
    setproduct(products?.find(product=>product?.id==id))
  },[])
  // console.log(product);
  const handleWishlist=(product)=>{
    const existingproduct=wishlist.find(item=>item?.id==product?.id)
    if(existingproduct){
      alert("product already exist in wishlist")
    }else{
      dispatch(addToWishList(product))
    }
  }

  const handleCart=(product)=>{
    const existingproduct=cart.find(item=>item?.id==product?.id)
    if(existingproduct){
      dispatch(addToCart(product))
      dispatch(removeFromWishlist(product.id))
      alert("items added")
    }else{
      dispatch(addToCart(product))
      dispatch(removeFromWishlist(product.id))
      alert("item added")
    }
  }


  return (
    <>
    {
      loading?(
      <div className="text-center mt-5 ">
      <Spinner animation="border" variant="danger" />
      </div>
    ):(
    <div className="container row" style={{marginTop:"100px"}}>
      <div className="col-lg-4">
      <img style={{width:"100%",height:"400px"}} src={product.thumbnail} alt="img" />
      </div>
      <div className="col-lg-2"></div>
      <div className="col-lg-6">
        <p>{product.id}</p>
        <h1>{product.title}</h1>
        <h5 className='fw-bolder'> price: <span style={{color:'red'}}>{product.price}</span></h5>
        <p>{product.description}</p>
        <div className="d-flex justify-content-between mt-4">
        <Button className='btn btn-outline-dark' onClick={()=>handleWishlist(product)}><i className="fa-solid fa-heart text-danger"></i>Wishlist</Button>
        <Button className='btn btn-outline-light'onClick={()=>handleCart(product)}><i className="fa-solid fa-cart-shopping text-warning"></i>Cart</Button>
        </div>
      </div>

    </div>
    )}
</>

  )
}

export default View
