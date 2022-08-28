import * as React from 'react';
import CheckOutForm from './checkoutform';
import {useSelector} from 'react-redux';
import { RootState } from '../../stores/reducers';

const CheckoutListing:React.FC<{method:(request:any)=>void}> = (props) => {
    const cartitem = useSelector((state:RootState) => state.product.cartitem);
    const totalPrice = useSelector((state:RootState) => state.product.totalPrice);
    const tax = useSelector((state:RootState) => state.product.tax);

    return(
      <div className="container mt-5 mb-5">
        <div className="row">
           <div className="col-md-4 order-md-2 mb-4">
              <h4 className="d-flex justify-content-between align-items-center mb-3">
                 <span className="text-muted">Your cart</span>
                 <span className="badge badge-secondary badge-pill">{cartitem.length}</span>
              </h4>
              <ul className="list-group mb-3">
                  {cartitem.map((data:any,index:any)=>{
                        return(
                           <li key={index} className="list-group-item d-flex justify-content-between lh-condensed">
                                <div>
                                    <h6 className="my-0">{data.title}</h6>
                                </div>
                                <span className="text-muted">${data.price * data.quantity}</span>
                            </li> 
                        ) 
                    })} 
                    <li className="list-group-item d-flex justify-content-between">
                        <span>Tax (USD)</span>
                        <strong>${tax}</strong>
                    </li>
                    <li className="list-group-item d-flex justify-content-between">
                        <span>Total (USD)</span>
                        <strong>${totalPrice}</strong>
                    </li>
              </ul>
           </div>
           <div className="col-md-8 order-md-1">
              <h4 className="mb-3">Billing address</h4>
              <CheckOutForm method={props.method}/>
           </div>
          </div>
        </div>
    )
  
}

export default CheckoutListing;