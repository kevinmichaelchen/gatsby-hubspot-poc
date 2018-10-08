// Inspiration: https://raw.githubusercontent.com/gatsbyjs/gatsby/master/examples/gatsbygram/gatsby-node.js
const path = require(`path`)
const Promise = require(`bluebird`)

exports.createPages = ({ graphql, actions }) => {
  console.log('EXECUTING GATSBY WOOOOOOOO')
  const { createPage } = actions

  const queryTopics = graphql(
    `
      {
        allHubspotTopic(limit: 2000) {
          edges {
            node {
              id
              name
              slug
            }
          }
        }
      }
    `
  )

  const queryPages = graphql(
    `
      {
        allHubspotPost(limit: 2000) {
          edges {
            node {
              id
              title
              slug
              topics {
                id
                name
                slug
              }
              topic_ids
              topic_ids_str
            }
          }
        }
      }
    `
  )

  const promiseA = new Promise((resolve, reject) => {
    resolve(
      queryPages.then(result => {
        if (result.errors || !result.data) {
          console.log('FOUND ERRORS')
          reject(new Error(result.errors))
        }

        console.log(
          'Creating pages for',
          result.data.allHubspotPost.edges.length,
          'blog posts'
        )
        result.data.allHubspotPost.edges.forEach(({ node }) => {
          createPage({
            path: `/posts/${node.slug}/`,
            component: path.resolve(`src/templates/post-page.js`),
            context: {
              id: node.id,
            },
          })
        })

        resolve()
      })
    )
  })

  const promiseB = new Promise((resolve, reject) => {
    resolve(
      queryTopics.then(result => {
        if (result.errors || !result.data) {
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
              id_str: node.id + '',
              slug: node.slug,
              name: node.name,
            },
          })
        })

        resolve()
      })
    )
  })

  return Promise.join(promiseA, promiseB)
}
