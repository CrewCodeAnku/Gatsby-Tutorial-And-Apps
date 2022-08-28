import React from "react"
import { graphql, StaticQuery, Link } from "gatsby"
import styled from "styled-components"

const PortfolioItemsWrapper = styled.div`
  display: flex;
  justify-content: center;
`

const PortfolioItem = styled.div`
  width: 300px;
  border: 1px solid #efefef;
  padding: 16px;
  margin: 16px;
`

const PortfolioImage = styled.img`
  max-width: 100%;
`

const PortfolioItems = () => {
  return (
    <StaticQuery
      query={graphql`
        {
          wpcontent {
            portfolios {
              edges {
                node {
                  content
                  title
                  slug
                  link
                  featuredImage {
                    node {
                      sourceUrl
                    }
                  }
                  excerpt
                }
              }
            }
          }
        }
      `}
      render={props => (
        <PortfolioItemsWrapper>
          {props.wpcontent.portfolios.edges.map(portfolioItem => (
            <PortfolioItem key={portfolioItem.node.id}>
              <h2>{portfolioItem.node.title}</h2>
              <PortfolioImage
                src={portfolioItem.node.featuredImage.node.sourceUrl}
                alt="thumbnail"
              />
              <div
                dangerouslySetInnerHTML={{ __html: portfolioItem.node.excerpt }}
              />
              <Link to={`/portfolio/${portfolioItem.node.slug}`}>
                Read More
              </Link>
            </PortfolioItem>
          ))}
        </PortfolioItemsWrapper>
      )}
    />
  )
}

export default PortfolioItems
