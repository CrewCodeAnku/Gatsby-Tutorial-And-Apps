import * as React from "react"
import Link from "gatsby-link";
import { RootState } from '../../stores/reducers';
import {useSelector} from 'react-redux'

const Header:React.FC<{siteTitle:string}> = ({ siteTitle }) => {
  const cartitemcount = useSelector((state:RootState) => state.product.itemcount)
  //let location = useLocation()
  const [isToggle, toggle] = React.useState(false);
  const toggleMenu = () => toggle(!isToggle);

  /*React.useEffect(() => {
      toggle(isToggle=>!isToggle)
  },[location]);*/

   return(
     <nav className="navbar navbar-expand-md fixed-top navbar-dark navtop">
       <div className="container">
        <Link className="navbar-brand" to="/">{siteTitle}</Link>
        <button onClick={toggleMenu} className="navbar-toggler p-0 border-0" type="button" data-toggle="offcanvas">
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className={`navbar-collapse offcanvas-collapse ${isToggle?'open':''}`} id="navbarsExampleDefault">
          <ul className="navbar-nav ml-auto">
           <li className="nav-item">
                <Link className="nav-link" to={"/cart"}><span>Cart</span><span className="badge app-btn ml-1 mb-1">{cartitemcount}</span></Link>
            </li>
            <li className="nav-item active">
              <Link className="nav-link" to={"/shop"}>Shop</Link>
            </li>
          </ul>
        </div>
        </div>
     </nav>
   )
}


export default Header;