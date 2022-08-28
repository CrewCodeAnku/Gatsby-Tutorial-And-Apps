import * as React from "react"
import portfolio1 from "../../assets/images/portfolio/cabin.png"
import portfolio2 from "../../assets/images/portfolio/cake.png"
import portfolio3 from "../../assets/images/portfolio/circus.png"
import portfolio4 from "../../assets/images/portfolio/game.png"
import portfolio5 from "../../assets/images/portfolio/safe.png"
import portfolio6 from "../../assets/images/portfolio/submarine.png"
import Link from 'gatsby-link';

const Portfolio:React.FC<{data:any}> = (props) =>{
    console.log("Data", props.data);
     return(
        <section className="page-section bg-light" id="portfolio">
        <div className="container pt-5 pb-5">
            <div className="text-center">
                <h2 className="section-heading text-uppercase">Recent Products</h2>
            </div>
            <div className="row mt-5">
                { props.data 
                  && props.data.allRestApiGetallproduct
                  && props.data.allRestApiGetallproduct.edges[0].node.data.slice(0, 3).map((product:any, key:any)=>{
                        return(
                            <div key={key}  className="col-lg-4 col-sm-6 mb-4">
                                <div className="portfolioitem box-shadow">
                                     <Link className="portfoliolink" to={`/product-detail/${product._id}`}>
                                        <div className="portfoliohover">
                                            <div className="portfoliohovercontent">
                                                <i className="fas fa-plus fa-3x"></i>
                                            </div>
                                        </div>
                                        <img alt="productimage" style={{cursor:"pointer"}} onClick={()=>{}} className="img-fluid mb-3 rounded" src={product.image[0]} />
                                     </Link>
                                    <div className={`portfoliocaption`}>
                                        <Link className="text-dark" to={`/product-detail/${product._id}`}>
                                              <div style={{cursor:"pointer"}} onClick={()=>{}} className={`portfoliocaptionheading`}>{product.title.substring(0,20) + "..."}</div>
                                        </Link>
                                        <div className={`portfoliocaptionsubheading text-muted`}>$ {product.price}</div>
                                    </div>
                                </div>
                            </div>
                        )
                   })}
                       
            </div>
         </div>
      </section>
     )
} 

export default Portfolio