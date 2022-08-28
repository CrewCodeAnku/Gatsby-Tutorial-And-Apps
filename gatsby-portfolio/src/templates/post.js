import React from "react"

const BlogPost = ({ pageContext }) => {
  return (
    <div>
      <h1>{pageContext.title}</h1>
    </div>
  )
}

export default BlogPost
