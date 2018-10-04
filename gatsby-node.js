// Inspiration: https://raw.githubusercontent.com/gatsbyjs/gatsby/master/examples/gatsbygram/gatsby-node.js
const path = require(`path`)
const Promise = require(`bluebird`)

exports.createPages = ({ graphql, actions }) => {
  console.log('EXECUTING GATSBY WOOOOOOOO')
  const { createPage } = actions

  const allTopicsQuery = `
  query TopicQuery {
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
  const allPostsQuery = `
  query PostQuery {
    allHubspotPost(limit: 2) {
      edges {
        node {
          id
          title
          body
          state
          author {
            id
            name
            full_name
            bio
            email
            facebook
            google_plus
            linkedin
            twitter
            twitter_username
            website
            slug
          }
          meta {
            title
            description
          }
          summary
          published
          updated
          created
          slug
          topics {
            id
            name
          }
        }
      }
    }
  }
`

  return new Promise((resolve, reject) => {
    resolve(
      graphql(allTopicsQuery).then(result => {
        if (result.errors) {
          reject(new Error(result.errors))
        }

        const topicTemplate = path.resolve(`src/templates/topic-page.js`)

        console.log('result.data =', result.data)
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
