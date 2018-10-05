// Inspiration: https://raw.githubusercontent.com/gatsbyjs/gatsby/master/examples/gatsbygram/gatsby-node.js
const path = require(`path`)
const Promise = require(`bluebird`)

exports.createPages = ({ graphql, actions }) => {
  console.log('EXECUTING GATSBY WOOOOOOOO')
  const { createPage } = actions

  const createBlogTopicPagesPromise = new Promise((resolve, reject) => {
    resolve(
      graphql(
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
  const createBlogPostPagesPromise = new Promise((resolve, reject) => {
    resolve(
      graphql(
        `
          {
            allHubspotPost(limit: 2000) {
              edges {
                node {
                  id
                  title
                  slug
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
  return Promise.join(createBlogPostPagesPromise, createBlogTopicPagesPromise)
}
