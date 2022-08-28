const _ = require("lodash")
const Promise = require("bluebird")
const path = require("path")
const slash = require("slash")

exports.createPages = ({ graphql, actions }) => {
  const { createPage, createRedirect } = actions
  createRedirect({
    fromPath: "/",
    toPath: "/home", // Make sure you have changed the slug of home page in wordpress to home
    redirectInBrowser: true,
    IsPermanent: true,
  })

  return new Promise((resolve, reject) => {
    graphql(
      `
        {
          wpcontent {
            pages {
              edges {
                node {
                  id
                  slug
                  template {
                    templateName
                  }
                  title
                  content
                }
              }
            }
          }
        }
      `
    )
      .then(result => {
        if (result.errors) {
          console.log(result.errors)
          reject(result.errors)
        }

        const pageTemplate = path.resolve("./src/templates/page.js")
        const portfolioUnderContentTemplate = path.resolve(
          "./src/templates/portfolioUnderContent.js"
        )

        _.each(result.data.wpcontent.pages.edges, edge => {
          createPage({
            path: `/${edge.node.slug}/`,
            component: slash(
              edge.node.template &&
                edge.node.template.templateName ===
                  "Portfolio Items Below Content"
                ? portfolioUnderContentTemplate
                : pageTemplate
            ),
            context: edge.node,
          })
        })
      })
      .then(() => {
        graphql(
          `
            {
              wpcontent {
                portfolios {
                  edges {
                    node {
                      content
                      portfolio {
                        websiteUrl
                      }
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
          `
        ).then(result => {
          if (result.errors) {
            console.log(result.errors)
            reject(result.errors)
          }
          const portfolioTemplate = path.resolve("./src/templates/portfolio.js")

          _.each(result.data.wpcontent.portfolios.edges, edge => {
            createPage({
              path: `/portfolio/${edge.node.slug}/`,
              component: slash(portfolioTemplate),
              context: edge.node,
            })
          })
        })
      })
      .then(() => {
        graphql(
          `
            {
              wpcontent {
                posts {
                  edges {
                    node {
                      excerpt
                      id
                      date
                      title
                      content
                      slug
                    }
                  }
                }
              }
            }
          `
        ).then(result => {
          if (result.errros) {
            console.log(result.errors)
            reject(result.errors)
          }

          const posts = result.data.wpcontent.posts.edges
          const postsPerPage = 2
          const numberOfPages = Math.ceil(posts.length / postsPerPage)
          const blogPostListTemplate = path.resolve(
            "./src/templates/blogPostList.js"
          )

          Array.from({ length: numberOfPages }).forEach((page, index) => {
            createPage({
              component: slash(blogPostListTemplate),
              path: index === 0 ? "/blog" : `/blog/${index + 1}`,
              context: {
                posts: posts.slice(
                  index * postsPerPage,
                  index * postsPerPage + postsPerPage
                ),
                numberOfPages,
                currentPage: index + 1,
              },
            })
          })

          const pageTemplate = path.resolve("./src/templates/page.js")
          _.each(posts, post => {
            createPage({
              path: `/post/${post.node.slug}`,
              component: slash(pageTemplate),
              context: post.node,
            })
          })

          resolve()
        })
      })
  })
}
