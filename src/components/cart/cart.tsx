import * as React from 'react';
import Link from "gatsby-link";
//import portfolio1 from "../../assets/images/portfolio/cabin.png";
import './cart.css';
import {useSelector} from 'react-redux';
import { RootState } from '../../stores/reducers';

const Cart:React.FC<{updateQuantity:(value:any)=>void,removeFromCart:(id:any)=>void}> = (props) => {
    const cartitem = useSelector((state:RootState) => state.product.cartitem);
    const subtotal = useSelector((state:RootState) => state.product.subTotal);
    const totalPrice = useSelector((state:RootState) => state.product.totalPrice);
    const tax = useSelector((state:RootState) => state.product.tax);

    return(
        <div className="container">
          {cartitem.length>0?(<div style={{padding:"0px", background:"none"}} className={`shoppingcart border-0 card`}>
              <div className="card-header bg-white app-btn-link">
                  <i className="fa fa-shopping-cart" aria-hidden="true"></i>
                  <span className="ml-3">Shopping cart</span>
                  <Link to={"/"} className="btn btn-sm pull-right app-btn">Continue shopping</Link>
                  <div className="clearfix"></div>
              </div>
              <div className="card-body bg-light">
                  {cartitem.map((data:any,key:any)=>{
                            return(
                                <div key={key} className="row mt-5 mb-5">
                                    <div className="col-12 col-sm-12 col-md-2">
                                        <img className="img-responsive rounded box-shadow" src={data.image[0]} alt="prewiew" width="120" height="80"/>
                                    </div>
                                    <div className="col-12 text-sm-center col-sm-12 text-md-left col-md-6">
                                        <p className="product-name"><strong>{data.title}</strong></p>
                                        <h4>
                                        <small className="badge app-btn-link">In stock</small>
                                        </h4>
                                    </div>
                                    <div className="col-12 col-sm-12 text-sm-center col-md-4 text-md-right row">
                                        <div className="col-3 col-sm-3 col-md-6 text-md-right" style={{paddingTop:"5px"}}>
                                        <h6 className="mt-2"><strong>${data.price} <span className="text-muted">x</span></strong></h6>
                                        </div>
                                        <div className="col-4 col-sm-4 col-md-4">
                                        <div className={`quantity`}>
                                            <input onChange={(e)=>{props.updateQuantity({quantity:e.target.value, productid:data._id})}} type="number" step="1" max="99" min="1" value={data.quantity} title="Qty" className={`qty`}/>
                                        </div>
                                        </div>
                                        <div className="col-2 col-sm-2 col-md-2 text-right">
                                            <button onClick={()=>{props.removeFromCart(data._id)}} type="button" className="btn btn-outline-danger btn-xs">
                                                <i className="fa fa-trash" aria-hidden="true"></i>
                                            </button>
                                        </div>
                                    </div>
                               </div>
                            )
                        })}
              </div>
              <div className="card-footer bg-white">
                <div className="d-flex flex-column pull-right" style={{margin:"10px"}}>
                    <div className="pull-right" style={{margin:"5px"}}>
                        Sub Total: <b>${subtotal}</b>
                    </div>
                    <div className="pull-right" style={{margin:"5px"}}>
                        Tax: <b>${tax}</b>
                    </div>
                    <div className="pull-right" style={{margin:"5px"}}>
                        Total price: <b>${totalPrice}</b>
                    </div>
                    <Link to={"/checkout"} className="btn app-btn pull-right">Checkout</Link>
                </div>
              </div>
          </div>):(
              <div className={`shoppingcart border-0`}>
                    <div className="card-header bg-white app-btn-link">
                        <i className="fa fa-shopping-cart" aria-hidden="true"></i>
                        <span className="ml-3">Shopping cart</span>
                        <Link to={"/shop"} className="btn btn-sm pull-right app-btn">Continue shopping</Link>
                        <div className="clearfix"></div>
                    </div>
                    <div className="card-body">
                        <div className="row mt-5 mb-5">
                            <div className="col-12 col-sm-12 text-center">
                                <h5>No item in the cart add item in cart to start shopping!</h5>
                            </div>
                        </div>
                    </div>
               </div>
          )}
      </div>
    )
    
}

export default Cart;