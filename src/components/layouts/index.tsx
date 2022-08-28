/**
 * Layout component that queries for data
 * with Gatsby's useStaticQuery component
 *
 * See: https://www.gatsbyjs.com/docs/use-static-query/
 */

 import * as React from "react"
 import { useStaticQuery, graphql, withPrefix } from "gatsby"
 import { Helmet } from "react-helmet";
 import Header from "./header";
 import Footer from "./footer";
 import './styles.css';

 
 const Layout:React.FC<{children:any}> = ({ children }) => {
   const data = useStaticQuery(graphql`
     query SiteTitleQuery {
       site {
         siteMetadata {
           title
         }
       }
     }
   `)
 
   return (
     <>
       <Helmet>
       <link href="https://fonts.googleapis.com/css2?family=Roboto:wght@300;400;500;700;900&display=swap" rel="stylesheet"/> 
         <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css"/>
         <link href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.13.0/css/all.min.css" rel="stylesheet"/>
       </Helmet>
       <Header siteTitle={data.site.siteMetadata?.title || `Title`} />
         <main style={{minHeight:"100vh"}} role="main"  className="main">
            {children}
         </main>
       <Footer/>
     </>
   )
 }
 
 export default Layout
 