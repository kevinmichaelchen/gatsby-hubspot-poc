// Inspiration: https://raw.githubusercontent.com/gatsbyjs/gatsby/master/examples/gatsbygram/gatsby-node.js
const path = require(`path`)
const Promise = require(`bluebird`)

exports.createPages = ({ graphql, actions }) => {
  console.log('EXECUTING GATSBY WOOOOOOOO')
  const { createPage } = actions

  return new Promise((resolve, reject) => {
    resolve(
      graphql(
        `
          {
            allHubspotTopic(limit: 2) {
              edges {
                node {
                  id
                  name
                }
              }
            }
          }
        `
      ).then(result => {
        if (result.errors) {
          console.log('FOUND ERRORS')
          reject(new Error(result.errors))
        }

        console.log(
          'Creating pages for',
          result.data.allHubspotTopic.edges.length,
          'topics'
        )
        result.data.allHubspotTopic.edges.forEach(({ node }) => {
          createPage({
            path: `/topics/${node.slug}/`,
            component: path.resolve(`src/templates/topic-page.js`),
            context: {
              id: node.id,
            },
          })
        })

        resolve()
      })
    )
  })
}
