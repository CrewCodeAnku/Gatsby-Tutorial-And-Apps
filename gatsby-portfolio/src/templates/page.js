import React from "react"
import Layout from "../components/layout"
import Seo from "../components/seo"

const Page = ({ pageContext }) => (
  <Layout>
    <Seo title={pageContext.title} />
    <h1 dangerouslySetInnerHTML={{ __html: pageContext.title }} />
    <div dangerouslySetInnerHTML={{ __html: pageContext.content }} />
  </Layout>
)

export default Page
