require('dotenv').config({
  path: `.env.${process.env.NODE_ENV}`,
})

console.log('WOOOOOOOOOO ', process.env.NODE_ENV)
console.log('WOOO', process.env.GATSBY_HUBSPOT_API_KEY)

module.exports = {
  siteMetadata: {
    title: 'Gatsby Default Starter',
  },
  plugins: [
    'gatsby-plugin-react-helmet',
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: 'gatsby-starter-default',
        short_name: 'starter',
        start_url: '/',
        background_color: '#663399',
        theme_color: '#663399',
        display: 'minimal-ui',
        icon: 'src/images/gatsby-icon.png', // This path is relative to the root of the site.
      },
    },
    'gatsby-plugin-offline',
    {
      resolve: 'gatsby-source-hubspot',
      options: {
        key: `${process.env.GATSBY_HUBSPOT_API_KEY}`,
        filters: {
          limit: 2,
          state: 'PUBLISHED',
        },
      },
    },
  ],
}
