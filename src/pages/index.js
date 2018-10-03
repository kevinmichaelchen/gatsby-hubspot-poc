import React from 'react'
import { Link, graphql } from 'gatsby'
import Layout from '../components/layout'
import font from './font.css'
import moment from 'moment'

const renderPost = (post, index) => {
  const postDate = moment(post.published).format('MMM D, YYYY h:m:s A')
  const timeDisplay = <span>{postDate}</span>
  return (
    <div key={post.id} className="post" style={{ marginBottom: '4rem' }}>
      <h2>
        #{index} - {post.title}
      </h2>
      <h3>
        Posted by {post.author.full_name} on {timeDisplay}
      </h3>
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
      {posts.map((p, i) => renderPost(p, i))}
      <pre>{stuff}</pre>
      <Link to="/page-2/">Go to page 2</Link>
    </Layout>
  )
}

export const query = graphql`
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
        }
      }
    }
  }
`

export default IndexPage
