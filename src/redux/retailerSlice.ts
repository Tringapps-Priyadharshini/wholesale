import { createSlice} from "@reduxjs/toolkit";
import retailerDetails from '../retailerJson/retailer.json';


type productType = {
    id: string,
    productName: string,
    quantity: number,
    price:number
}

type retailerType = {
    retailers: {
        name: string,
        address: string,
        products: productType[]
    }[]
}

const initialState : retailerType = {
    retailers : localStorage['retailerDetails'] ? JSON.parse(localStorage['retailerDetails']) : retailerDetails 
}

if(!localStorage['retailerDetails']){
    localStorage['retailerDetails'] = JSON.stringify(retailerDetails)
}

const retailerSlice = createSlice({
    name: 'retailers',
    initialState,
    reducers: {
        addProduct:(state,action) => {
            console.log('name',action.payload)
            const currentUser = action.payload.currentUser;
            const newProducts = action.payload.products;
            console.log("new",newProducts)
            const retailers = [...state.retailers];
            newProducts.forEach((product:any)=>{
                retailers.find((retailer)=>retailer.name === currentUser)?.products.push(product)
            })
            localStorage['retailerDetails'] = JSON.stringify(retailers)
            
        }
    }


})

export default retailerSlice.reducer;
export const {addProduct} =  retailerSlice.actions;