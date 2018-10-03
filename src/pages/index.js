import React from 'react'
import { Link, graphql } from 'gatsby'

import Layout from '../components/layout'

const renderPost = post => {
  return (
    <div className="post" style={{ marginBottom: '4rem' }}>
      <h2>{post.title}</h2>
      <div dangerouslySetInnerHTML={{ __html: post.body }} />
    </div>
  )
}

const IndexPage = ({ data }) => {
  const stuff = JSON.stringify(data, null, 2)
  const posts = data.allHubspotPost.edges.map(p => p.node)
  return (
    <Layout>
      <h1>Hi people</h1>
      {posts.map(renderPost)}
      <pre>{stuff}</pre>
      <Link to="/page-2/">Go to page 2</Link>
    </Layout>
  )
}

export const query = graphql`
  query PostQuery {
    allHubspotPost(limit: 10) {
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
        }
      }
    }
  }
`

export default IndexPage
