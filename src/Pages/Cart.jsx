import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { emptycart, removefromcart } from '../Redux/CartSlice'







function Cart() {
  const cart=useSelector((state)=>state.cartReducer)
  const dispatch=useDispatch()

  const[total,setTotal]=useState(0)
  
  useEffect(()=>{
    if(cart?.length>0){
      setTotal(cart?.map(product=>product?.totalprice).reduce((p1,p2)=>p1+p2))
    }else{
      setTotal(0)
    }
  },[cart])

  return (
  <div className="container" style={{marginTop:"100px"}}>
   { 
   cart?.length>0?
    <div className="row mt-5">
      <div className="col-lg-8">
        <table className='table shadow'>
        <thead>
          <tr>
            <th>#</th>
            <th>Title</th>
            <th>Image</th>
            <th>Quantity</th>
            <th>Price</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {
            cart.map((product,index)=>(
              <tr>
            <td>{index+1}</td>
            <td>{product.title} </td>
            <td><img style={{width:"200px%",height:"150px"}} src={product.thumbnail} alt="img" /></td>
            <td><input type="text" disabled  className='form-control' value={product.quantity} /></td>
            <td>{product.totalprice}</td>
            <td><button className='btn' onClick={()=>dispatch(removefromcart(product.id))}><i className="fa-solid fa-trash text-danger"></i></button></td>
          </tr>
            ))
            }
        </tbody>
        </table>
        <div className="d-flex justify-content-between">
          <button className='btn btn-outline-danger' onClick={()=>dispatch(emptycart())}>Empty Cart</button>
          <Link to={'/'} style={{textDecoration:"none"}} className='btn btn-success'>Shop More</Link>
        </div>
      </div>
      <div className="col-lg-1"></div>
      <div className="col-lg-3">
    <div className="container border rounded shadow mt-5 p-5 w-100">
      <h1>Cart Summary</h1>
      <h4>Total Product:{cart.length}</h4>
      <h5>Total: <span className='text-danger fw-bolder'>${total.toFixed(2)}</span></h5>

    </div>
    <div className="d-grid">
      <button className='btn btn-success m-3 rounded'>Checkout</button>
    </div>
      </div>
    </div>
    :<div className="d-flex align-items-center mt-5">
            <img src="https://www.gospeedy.co.in/images/empty.gif" alt="Empty Wishlist" />
            <h1 className="text-danger">Your Cart is Empty....</h1>
          </div>
    }
  </div>
  )
}

export default Cart
