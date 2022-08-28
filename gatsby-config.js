module.exports = {
  siteMetadata: {
    title: `Gatsby Store`,
    description: `Simple website for my portfolio and resume`,
    author: `@anku`,
  },
  plugins: [
    `gatsby-plugin-react-helmet`,
    // Add typescript stack into webpack
    `gatsby-plugin-typescript`,
    `gatsby-plugin-sharp`,
    {
      resolve: 'gatsby-source-rest-api',
      options: {
        endpoints: [
           "https://crewapi.herokuapp.com/getallproduct"
        ]
      },
    },
  ],
}
