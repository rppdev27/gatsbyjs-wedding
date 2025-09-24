// gatsby-config.js
module.exports = {
  siteMetadata: {
    title: `Sarah & Michael Wedding`,
    description: `Join us for our special day`,
    author: `@wedding`,
    siteUrl: `https://sarahandmichael.wedding`,
  },
  plugins: [
    `gatsby-plugin-react-helmet`,
    `gatsby-plugin-image`,
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `images`,
        path: `${__dirname}/src/images`,
      },
    },
    `gatsby-transformer-sharp`,
    `gatsby-plugin-sharp`,
    // Remove this plugin for now
    // {
    //   resolve: `gatsby-plugin-manifest`,
    //   options: {
    //     name: `sarah-michael-wedding`,
    //     short_name: `wedding`,
    //     start_url: `/`,
    //     background_color: `#f7f0fd`,
    //     theme_color: `#a855f7`,
    //     display: `minimal-ui`,
    //   },
    // },
  ],
}