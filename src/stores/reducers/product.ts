import {
    ADD_TO_CART,
    REMOVE_FROM_CART,
    UPDATE_QUANTITY,
    RESET_CART
} from '../actions/product.actions.types';

const initialState = {
    cartitem:[] as string[],
    itemcount:0,
    totalPrice:0,
    subTotal:0,
    tax:10
}

export default function product(state = initialState,{payload, type}:any) {
    switch (type) {
        case ADD_TO_CART:
            const action = {...payload}
            let cartitem:any = [...state.cartitem];
            cartitem.push(action);
            var subtotalprice = state.subTotal;
            for(let i=0; i<cartitem.length; i++){ 
                 subtotalprice += cartitem[i].price
            } 
            return {...state,cartitem:cartitem, itemcount:state.itemcount + 1, subTotal:subtotalprice, totalPrice:subtotalprice + state.tax};

         case REMOVE_FROM_CART:
            let allcartitem = [...state.cartitem];
            let finalcartitem:any = allcartitem.filter((data:any)=>{
                 return data._id !== payload
            })
            var subtotalprice = 0;
            for(let i=0; i<finalcartitem.length; i++){ 
                 subtotalprice += finalcartitem[i].price
            } 
            return {...state,cartitem:finalcartitem, itemcount:state.itemcount - 1, subTotal:subtotalprice, totalPrice:subtotalprice + state.tax};

         case UPDATE_QUANTITY:
            const actionitem = {...payload}
            let cartitemdata:any = [...state.cartitem];
            var index = cartitemdata.findIndex((item:any)=> item._id === actionitem.productid);
            cartitemdata[index]['quantity'] = actionitem.quantity;
            subtotalprice = 0;
            for(let i=0; i<cartitemdata.length; i++){ 
                 subtotalprice += cartitemdata[i].price * cartitemdata[i].quantity
            } 
            return {...state,cartitem:cartitemdata, itemcount:state.itemcount, subTotal:subtotalprice, totalPrice:subtotalprice + state.tax};
        
        case RESET_CART:
            return {...state, cartitem:[], itemcount:0}    

        default:
            return state;
    }
}