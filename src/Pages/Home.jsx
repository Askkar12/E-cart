import React, { useEffect } from 'react'
import { Col, Row } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { fetchproducts } from '../Redux/Productslice';
import Spinner from 'react-bootstrap/Spinner';
import { addToWishList } from '../Redux/WhishlistSlice';
import { addToCart } from '../Redux/CartSlice';



function Home() {
  const dispatch = useDispatch()
  const{loading,products,error}=useSelector((state)=>state.productReducer)
  const{wishlist}=useSelector((state)=>state.wishlistReducer)
  const cart=useSelector((state)=>state.cartReducer)
  // console.log(loading);
  // console.log(products);
  // console.log(error);
  
  
  
  useEffect(()=>{
    dispatch(fetchproducts())
  },[])

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
      alert("items added")
    }else{
      dispatch(addToCart(product))
      alert("item added")
    }
  }



  return (
    <>
   <div style={{marginTop:"70px"}}>
   {
   loading?
   <div className="text-center mt-5">
   <Spinner animation="border" variant="danger" />
   </div>:
    <Row className='mt-5 ms-5'>
      {
        products?.length>0?products.map((product,index)=>(
          <Col className="mt-5" sm={12} md={6} lg={4} xl={3}>
          <Card style={{ width: '18rem', height:"380px" }} >
          <Link to={`/view/${product.id}`}><Card.Img variant="top" style={{width:"100%", height:"200px"}} src={product.thumbnail} /></Link>
        <Card.Body>
          <Card.Title className='text-center  fw-200'>{product.title.slice(0,16)}</Card.Title>
          <Card.Text className='text-center mt-3'>
            {product.description.slice(0,20)}
          </Card.Text>
          <div className="d-flex justify-content-between">
          <Button className='btn btn-light'onClick={()=>handleWishlist(product)}><i className="fa-solid fa-heart text-danger"></i></Button>
          <Button className='btn btn-light'onClick={()=>handleCart(product)}><i className="fa-solid fa-cart-shopping text-warning"></i></Button>
          </div>
        </Card.Body>
      </Card>
    
          </Col>
        )):<div className='fw-bolder mt-5 mb-5'><p className='text-danger'>Nothing To Display</p></div>
       
      }
    </Row>
  
   }

   </div>
   </>
  )
}


export default Home
