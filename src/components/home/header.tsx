import * as React from "react"
import './home.css';
import backimage from "../../assets/images/hero.png"
import { navigate } from "gatsby"
//import { url } from "inspector";

const Header = () => (
    <header className="masthead" style={{backgroundImage:`url("${backimage}")`}}>
        <div className="container">
          <div className="row align-items-start align-items-md-center justify-content-end">
             <div className="col-md-5 text-center text-md-left pt-5 pt-md-0">
                <h2 className="mb-2 text-dark">Welcome to Gatsby Store</h2>
                <div className="text-center text-md-left">
                    <p className="mb-4 text-dark">
                        Start your shopping with wide variety of product 
                    </p>
                    <p>
                       <button onClick={()=>{navigate("/shop");}} className="btn app-btn btn-xl text-uppercase js-scroll-trigger">Shop Now</button>
                    </p>
                </div>
              </div>
            </div>
        </div>
   </header>
)

export default Header;