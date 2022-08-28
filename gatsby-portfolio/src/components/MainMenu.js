import React from "react"
import { graphql, StaticQuery, Link } from "gatsby"
import styled from "styled-components"
import SiteInfo from "./SiteInfo"

const MainMenuWrapper = styled.div`
  display: flex;
  background-color: #212529;
`

const MainMenuInner = styled.div`
  max-width: 960px;
  margin: 0 auto;
  display: flex;
  width: 960px;
  height: 100%;
`

const MenuItem = styled(Link)`
  color: white;
  display: block;
  padding: 16px 16px;
`

const MainMenu = () => (
  <StaticQuery
    query={graphql`
      {
        wpcontent {
          menus(where: { slug: "main-menu" }) {
            nodes {
              menuItems {
                edges {
                  node {
                    url
                    description
                    label
                    path
                  }
                }
              }
            }
          }
        }
      }
    `}
    render={props => {
      return (
        <MainMenuWrapper>
          <MainMenuInner>
            <SiteInfo />
            {props.wpcontent.menus.nodes[0].menuItems.edges.map(item => {
              return (
                <MenuItem to={`${item.node.path}`} key={item.node.label}>
                  {item.node.label}
                </MenuItem>
              )
            })}
          </MainMenuInner>
        </MainMenuWrapper>
      )
    }}
  />
)

export default MainMenu
