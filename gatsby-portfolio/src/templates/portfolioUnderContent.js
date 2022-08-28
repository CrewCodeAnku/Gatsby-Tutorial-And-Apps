import React from "react"
import Layout from "../components/layout"
import PortfolioItems from "../components/PortfolioItems"
import Seo from "../components/seo"

const PortfolioUnderContent = ({ pageContext }) => (
  <Layout>
    <Seo title={pageContext.title} />
    <h1 dangerouslySetInnerHTML={{ __html: pageContext.title }} />
    <div dangerouslySetInnerHTML={{ __html: pageContext.content }} />
    <PortfolioItems />
  </Layout>
)

export default PortfolioUnderContent
