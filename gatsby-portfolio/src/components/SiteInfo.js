import React from "react"
import { graphql, StaticQuery } from "gatsby"
import styled from "styled-components"

const SiteInfoWrapper = styled.div`
  flex-grow: 1;
  color: white;
  margin: auto 0;
`

const SiteTitle = styled.div`
  font-weight: bold;
`

const SiteInfo = () => (
  <StaticQuery
    query={graphql`
      {
        wpcontent {
          generalSettings {
            title
            url
            description
          }
        }
      }
    `}
    render={props => (
      <SiteInfoWrapper>
        <SiteTitle>{props.wpcontent.generalSettings.title}</SiteTitle>
        <div>{props.wpcontent.generalSettings.description}</div>
      </SiteInfoWrapper>
    )}
  />
)

export default SiteInfo
