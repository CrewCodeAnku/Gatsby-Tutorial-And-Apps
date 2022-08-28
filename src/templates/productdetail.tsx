import * as React from 'react';
import Seo from "../components/seo";
import Layout from "../components/layouts";
import {graphql} from 'gatsby';
import "../components/shop/shop.css";
import Link from 'gatsby-link';
import { connect } from 'react-redux';
import { addToCart } from '../stores/actions/product.actions.types';
import ReactNotifications from 'react-notifications-component'
import { store } from 'react-notifications-component';
import 'react-notifications-component/dist/theme.css'
import 'animate.css'

interface IndexPageProps {
    data:any,
    pageContext:any,
    dispatch:any,
    cartitem:[],
    addToCart:any
}

class ProductDetail extends React.Component<IndexPageProps, {}> {
    
    constructor(props: IndexPageProps, context: any) {
        super(props, context)
    }

    addToCart = () => {
        let data = this.props.cartitem.filter((data:any)=>{
            return data._id === this.props.pageContext.id
        });

        if(data.length>0){
            store.addNotification({
                title: 'Error',
                message: "Item already added to cart!",
                type: 'danger',
                insert: 'top',
                container: 'top-right',
                animationIn:  ["animate__animated", "animate__fadeIn"],
                animationOut: ["animate__animated", "animate__fadeOut"],
                dismiss: {
                  duration: 2000,
                  onScreen: true,
                }
            })
        }else{

            let productdetail = this.props.data 
            && this.props.data.allRestApiGetallproduct
            && this.props.data.allRestApiGetallproduct.edges[0].node.data.filter((product:any) => 
               product._id === this.props.pageContext.id
            );;
            productdetail[0]['quantity'] = 1;
            this.props.addToCart(productdetail[0])
            store.addNotification({
                title: 'Error',
                message: "Item successfully added to cart!",
                type: 'default',
                insert: 'top',
                container: 'top-right',
                animationIn:  ["animate__animated", "animate__fadeIn"],
                animationOut: ["animate__animated", "animate__fadeOut"],
                dismiss: {
                  duration: 2000,
                  onScreen: true,
                }
            })
         }  
    }

    public render() {
        const productdetail = this.props.data 
        && this.props.data.allRestApiGetallproduct
        && this.props.data.allRestApiGetallproduct.edges[0].node.data.filter((product:any) => 
           product._id === this.props.pageContext.id
        );

        const similarproducts = this.props.data
        && this.props.data.allRestApiGetallproduct
        && this.props.data.allRestApiGetallproduct.edges[0].node.data.filter((product:any) => 
          product._id !== this.props.pageContext.id 
          && product.category === productdetail[0].category
        );

        return (
            <Layout>
                <Seo title="Product Detail" />
                <ReactNotifications />
                {productdetail && productdetail.length>0 && <div className="container mt-5">
                    <div className="bg-white border-0 box-shadow">
                        <div className="container-fliud">
                            <div className="wrapper row p-5">
                                <div className={`preview col-md-6`}> 
                                    <div className={`previewpic tabcontent tab-content`}>
                                        <div className="tab-pane active" id="pic-1">
                                            <img alt="productimage" className="rounded" src={productdetail[0].image[0]} />
                                        </div>
                                    </div>
                                </div>
                                <div className={`details col-md-6`}>
                                    <h3 className={`producttitle`}>{productdetail[0].title}</h3>
                                    <h4 className={`price mt-3`}>
                                        Current price: <span>${productdetail[0].price}</span>
                                    </h4>
                                    {productdetail && productdetail[0].subcategory === "2"?(<div className="d-flex mt-3">
                                        <h5>Size:</h5>
                                        <select className="form-control ml-3 w-25">
                                            <option value="">Select</option>
                                            {productdetail[0].size && productdetail[0].size[0].map((sizedata:any,index:any)=>{
                                                  return(<option value={sizedata.value} key={index}>{sizedata.value}</option>)
                                            })}
                                        </select>
                                    </div>):null}
                                    {productdetail && productdetail[0].subcategory === "3"?(<div className="d-flex mt-3">
                                        <h5>Size:</h5>
                                        <select className="form-control ml-3 w-25">
                                            <option value="">Select</option>
                                            {productdetail[0].size && productdetail[0].size[0].map((sizedata:any,index:any)=>{
                                                  return(<option value={sizedata.value} key={index}>{sizedata.value}</option>)
                                            })}
                                        </select>
                                    </div>):null}
                                    <div className="mt-4">
                                        <h5>
                                            Colour:
                                            <span className="ml-2">{productdetail[0].color}</span>
                                        </h5>
                                    </div>
                                    <div className={`action mt-5`}>
                                        <button onClick={()=>{this.addToCart()}} className={`btn app-btn btn-block btn-lg`} type="button">Add to Cart</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>}
                <div className="container mt-5 mb-5">
                    <div className="row">
                        <div className="col-md-12">
                            <h3 className="font-weigh-bold">Similar Items</h3>
                        </div>
                    </div>
                    <div className="row mt-5">
                          {similarproducts && similarproducts.slice(0, 3).map((similardata:any, key:any)=>{
                            return(
                                <div key={key} className="col-lg-3 col-md-6 mb-4">
                                  <div className="bg-white h-100 border-0 box-shadow">
                                      <Link to={`/product-detail/${similardata._id}`}>
                                          <img style={{maxWidth:"255px",maxHeight:"168px", minWidth:"255px", minHeight:"168px"}} className="card-img-top" src={similardata.image[0]} alt=""/>
                                      </Link>
                                      <div className="card-body">
                                          <p className="card-title item-title">
                                                <Link className="item-title" to={`/product-detail/${similardata._id}}`}>{similardata.title}</Link>
                                          </p>
                                          <h5>${similardata.price}</h5>
                                          <Link className="btn app-btn btn-block btn-sm" to={`/product-detail/${similardata._id}`}>View item</Link>
                                      </div>
                                  </div>
                               </div>
                            )
                          })} 
                    </div>
                </div>
            </Layout>
        )
    }
}

const mapStateToProps = ({
    product: { 
        cartitem
    }
    
 }:any) => ({
      cartitem
 });

export default connect(mapStateToProps, {
    addToCart
 })(ProductDetail)

export const query = graphql`
  query ($id: String!) {
    allRestApiGetallproduct(
        filter: {data: {elemMatch: {_id: {eq: $id}}}}
      ) {
        edges {
          node {
            data {
              category
              color
              image
              price
              subcategory
              title
              userid
              _id
            }
          }
        }
     }
  }
`
