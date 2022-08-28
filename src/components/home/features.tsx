import * as React from "react"
import './home.css';

const Feature = () => (
       <section className="page-section" id="services">
            <div className="container mt-5 mb-5">
                <div className="text-center">
                    <h2 className="section-heading text-uppercase">Features</h2>
                </div>
                <div className="row text-center mt-5">
                    <div className="col-md-4">
                        <span className="fa-stack fa-4x">
                            <i className="fas fa-circle fa-stack-2x theme-color"></i>
                            <i className="fas fa-money fa-stack-1x fa-inverse"></i>
                        </span>
                        <h4 className="my-3">Affordable Price</h4>
                        <p className="text-muted">Buy product with affordable price and discount</p>
                    </div>
                    <div className="col-md-4">
                        <span className="fa-stack fa-4x">
                            <i className="fas fa-circle fa-stack-2x theme-color"></i>
                            <i className="fas fa-truck fa-stack-1x fa-inverse"></i>
                        </span>
                        <h4 className="my-3">Delivery At Doorstep</h4>
                        <p className="text-muted">Product will be delivered at your door step</p>
                    </div>
                    <div className="col-md-4">
                        <span className="fa-stack fa-4x">
                            <i className="fas fa-circle fa-stack-2x theme-color"></i>
                            <i className="fas fa-share fa-stack-1x fa-inverse"></i>
                        </span>
                        <h4 className="my-3">Free Returns</h4>
                        <p className="text-muted">Defective product will be returned within 10 days of purchasing</p>
                    </div>
                </div>
            </div>
     </section>
)

export default Feature;