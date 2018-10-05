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

        const topicTemplate = path.resolve(`src/templates/topic-page.js`)

        console.log('result.data =', JSON.stringify(result.data))
        result.data.allHubspotTopic.edges.forEach(edge => {
          createPage({
            path: `/${edge.node.id}/`,
            component: topicTemplate,
            context: {
              id: edge.node.id,
            },
          })
        })

        return
      })
    )
  })
}
