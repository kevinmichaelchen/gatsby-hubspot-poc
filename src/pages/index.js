import React from 'react'
import { Link, graphql } from 'gatsby'
import Layout from '../components/layout'
import moment from 'moment'

const renderTopic = (topic, index) => {
  return (
    <span key={index} style={{ marginRight: '0.5rem' }}>
      <Link to={`/topics/${topic.slug}`}>{topic.name}</Link>
    </span>
  )
}

const renderPost = (post, index) => {
  const postDate = moment(post.published).format('MMM D, YYYY h:m:s A')
  const timeDisplay = <span>{postDate}</span>
  return (
    <div key={post.id} className="post" style={{ marginBottom: '4rem' }}>
      <h1>{post.title}</h1>
      <h3>
        Posted by{' '}
        <a href={`/blog/author/${post.author.slug}`}>{post.author.full_name}</a>{' '}
        on {timeDisplay}
      </h3>
      <h4>{post.topics && post.topics.map((t, i) => renderTopic(t, i))}</h4>
      <div dangerouslySetInnerHTML={{ __html: post.summary }} />
      <Link to={`/posts/${post.slug}`}>Read more</Link>
    </div>
  )
}

const IndexPage = ({ data }) => {
  const stuff = JSON.stringify(data, null, 2)
  const posts = data.allHubspotPost.edges.map(p => p.node)
  return (
    <Layout>
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
          topics {
            id
            name
            slug
          }
        }
      }
    }
  }
`

export default IndexPage
