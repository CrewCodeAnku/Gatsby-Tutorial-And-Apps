import * as React from 'react'
import Seo from "../components/seo"
import { graphql } from 'gatsby';
import Layout from "../components/layouts"
import Header from "../components/home/header";
import Feature from "../components/home/features";
import Portfolio from "../components/home/portfolio";

interface IndexPageProps {
  data: {
    site: {
      siteMetadata: {
        title: string
      }
    }
    allRestApiGetallproduct:{
      edges:{
        node:{
          data:{
            category:string,
            color:string,
            image:any,
            price:number,
            subcategory:string,
            title:string,
            userid:string,
            _id:string
          }
        }
      }
    }
  },
  dispatch:any
}

export default class extends React.Component<IndexPageProps, {}> {
  constructor(props: IndexPageProps, context: any) {
    super(props, context)
  }
  public render() {
    console.log(this.props);
    return (
      <Layout>
          <Seo title="Home" />
          <Header/>
          <Feature/>
          <Portfolio data={this.props.data}/>
      </Layout>
    )
  }
}

export const pageQuery = graphql`
  query IndexQuery {
    site {
      siteMetadata {
        title
      }
    }
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
