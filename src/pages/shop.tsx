import * as React from 'react'
import { graphql } from 'gatsby'
import Layout from "../components/layouts"
import Seo from "../components/seo"
import { Range, getTrackBackground } from "react-range";
import Link from 'gatsby-link';
//import Loader from "react-loader-spinner";
import "../components/shop/shop.css";

interface ShopPageProps {
     data:any
}

interface ShopPageState {
     category:any,
     price:any,
     values:any,
     allproduct:any
}

const STEP = 0.1;
const MIN = 0;
const MAX = 1000;

export default class extends React.Component<ShopPageProps, ShopPageState> {
    constructor(props: ShopPageProps, context: any) {
        super(props, context)
        this.state={
            category:[],
            price:null,
            values: [0],
            allproduct:[]
        }
      }

      componentDidMount(){
          this.setState({
               allproduct: this.props.data
               &&this.props.data.allRestApiGetallproduct 
               &&this.props.data.allRestApiGetallproduct.edges[0]
               &&this.props.data.allRestApiGetallproduct.edges[0].node
               &&this.props.data.allRestApiGetallproduct.edges[0].node.data
          })
      }

      onCategoryChange= (checked:any, value:any) => {
        var shopdata:any = this.props.data
        &&this.props.data.allRestApiGetallproduct 
        &&this.props.data.allRestApiGetallproduct.edges[0]
        &&this.props.data.allRestApiGetallproduct.edges[0].node
        &&this.props.data.allRestApiGetallproduct.edges[0].node.data

        if(checked){
            var category = [...this.state.category];
            category.push(value);
        }else{
            category = this.state.category.filter(function (e:any) {
                return e !==value;
            });
        }
        
        console.log("Category", category);

        this.setState({
            category:category
        })
        if(category.length>0){
            console.log("Shop Data", shopdata);

            shopdata = shopdata.filter((item:any) => category.find(i => i === item.category))
        }
        if(this.state.price){
            shopdata = shopdata.filter((item:any)=>item.price === this.state.price)
        }

        this.setState({
            allproduct:shopdata
        })
    }

    onPriceChange = (value:any) => {

        var shopdata:any = this.props.data
        &&this.props.data.allRestApiGetallproduct 
        &&this.props.data.allRestApiGetallproduct.edges[0]
        &&this.props.data.allRestApiGetallproduct.edges[0].node
        &&this.props.data.allRestApiGetallproduct.edges[0].node.data

        this.setState({
            price:value[0]
        });

        shopdata = shopdata.filter((item:any)=> item.price <= value[0]);


        if(this.state.category.length>0){
            shopdata = shopdata.filter((item:any) => this.state.category.find((i:any) => i === item.category))
        }
        this.setState({
            allproduct:shopdata
        })
    }

      public render() {
        return (
          <Layout>
             <Seo title="Shop" />
              <div className="container mt-3">
                <div className="row">
                    <div className="col-lg-3">
                        <div className={`categoryColumn py-2 container`}>
                            <h5>Filter by Category</h5>
                            <div className="d-flex flex-column">
                                <div className="d-flex mt-3">
                                    <span><input value="1" onChange={(e)=>{this.onCategoryChange(e.target.checked , e.target.value)}} type="checkbox"/> Men</span>
                                </div>
                                <div className="d-flex mt-3">
                                    <span><input value="2" onChange={(e)=>{this.onCategoryChange(e.target.checked, e.target.value)}} type="checkbox"/> Women</span>
                                </div>
                                <div className="d-flex mt-3 mb-2">
                                    <span><input value="3" onChange={(e)=>{this.onCategoryChange(e.target.checked, e.target.value)}} type="checkbox"/> Kids</span>
                                </div>
                            </div>
                        </div>
                        <div className={`categoryColumn py-2 container mt-3`}>
                            <h5>Filter by Price</h5>
                            <div className="mt-3 mb-3">
                            <Range
                                values={this.state.values}
                                step={STEP}
                                min={MIN}
                                max={MAX}
                                onChange={(values:any) =>{this.setState({ values });}}
                                onFinalChange={(values:any) => {this.onPriceChange(values)}}
                                renderTrack={({ props, children }:any) => (
                                    <div
                                    onMouseDown={()=>{}}
                                    onTouchStart={()=>{}}
                                    style={{
                                        ...props.style,
                                        height: "36px",
                                        display: "flex",
                                        width: "100%"
                                    }}
                                    >
                                    <div
                                        ref={props.ref}
                                        style={{
                                            height: "5px",
                                            width: "100%",
                                            borderRadius: "4px",
                                            background: getTrackBackground({
                                                values: this.state.values,
                                                colors: ["#f17e0a", "#ccc"],
                                                min: MIN,
                                                max: MAX
                                            }),
                                            alignSelf: "center"
                                        }}
                                    >
                                        {children}
                                    </div>
                                    </div>
                                )}
                                renderThumb={({ props, isDragged }:any) => (
                                    <div
                                    {...props}
                                    style={{
                                        ...props.style,
                                        height: "42px",
                                        width: "42px",
                                        borderRadius: "4px",
                                        backgroundColor: "#FFF",
                                        display: "flex",
                                        justifyContent: "center",
                                        alignItems: "center",
                                        boxShadow: "0px 2px 6px #AAA"
                                    }}
                                    >
                                    <div
                                        style={{
                                            height: "16px",
                                            width: "5px",
                                            backgroundColor: isDragged ? "#f17e0a" : "#CCC"
                                        }}
                                    />
                                    </div>
                                )}
                                />
                                {this.state.price}
                            </div>
                        </div>
                    </div>
                    <div className="col-lg-9">
                        <div className="row">
                           {this.state.allproduct.map((data:any,key:any)=>{
                                 return(
                                    <div key={key} className="col-lg-4 col-md-6 mb-4">
                                        <div className="h-100 border-0 box-shadow bg-white">
                                            <Link to={`/product-detail/${data._id}`}>
                                                <img style={{maxWidth:"255px",maxHeight:"168px", minWidth:"255px", minHeight:"168px"}} className="card-img-top" src={data.image[0]} alt=""/>
                                            </Link>
                                            <div className="card-body">
                                                <p className="card-title item-title">
                                                    <Link className="item-title" to={`/product-detail/${data._id}`}>{data.title}</Link>
                                                </p>
                                                <h5>$ {data.price}</h5>
                                                <Link className="btn app-btn btn-block btn-sm" to={`/product-detail/${data._id}`}>View item</Link>
                                            </div>
                                        </div>
                                     </div> 
                                 )
                            })
                           }
                            {this.state.allproduct.length === 0 &&
                                <div className="col-md-12">
                                       <div className="alert alert-light" role="alert">
                                               <span>No Product found</span>
                                        </div>
                                </div>
                            }
                        </div> 
                    </div>
                </div>
              </div>
          </Layout>
        )
      }
}

export const query = graphql`
  query ShopPageQuery {
    allRestApiGetallproduct {
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
