import { createSlice } from "@reduxjs/toolkit";



const cartSlice=createSlice({
    name:"cart",
    initialState:[],
    reducers:{
        addToCart:(state,action)=>{
            const existingproduct=state.find(item=>item.id==action.payload.id)
            if(existingproduct){
                const remainingproducts=state.filter(item=>item.id!=existingproduct.id)
                existingproduct.quantity++
                existingproduct.totalprice=existingproduct.price*existingproduct.quantity
                state=[...remainingproducts,existingproduct]
            }else{
                state.push({...action.payload,quantity:1,totalprice:action.payload.price})
            }
        },
        removefromcart:(state,action)=>{
            return state=state.filter(item=>item.id!==action.payload)
        },
        emptycart:(state)=>{
            return state=[]
        }
    }
        
})
export const {addToCart,removefromcart,emptycart}=cartSlice.actions
export default cartSlice.reducer