import * as PropTypes from 'prop-types'
import React from 'react'
import { Link, graphql } from 'gatsby'
import Layout from '../components/layout'
import moment from 'moment'
import { renderTopic } from '../pages'

class PostTemplate extends React.Component {
  static propTypes = {
    data: PropTypes.shape({
      hubspotPost: PropTypes.shape({
        id: PropTypes.string,
        title: PropTypes.string,
        body: PropTypes.string,
      }).isRequired,
    }).isRequired,
  }
  render() {
    const { hubspotPost: post } = this.props.data
    const postDate = moment(post.published).format('MMM D, YYYY h:m:s A')
    const timeDisplay = <span>{postDate}</span>
    return (
      <Layout location={this.props.location}>
        <Link to={'/'}>Back</Link>
        <h1>{post.title}</h1>
        <h3>
          Posted by{' '}
          <a href={`/blog/author/${post.author.slug}`}>
            {post.author.full_name}
          </a>{' '}
          on {timeDisplay}
        </h3>
        <h4>{post.topics && post.topics.map((t, i) => renderTopic(t, i))}</h4>
        <div dangerouslySetInnerHTML={{ __html: post.body }} />
      </Layout>
    )
  }
}

export default PostTemplate

// The post template's GraphQL query. Notice the “id”
// variable which is passed in. We set this on the page
// context in gatsby-node.js.
//
// All GraphQL queries in Gatsby are run at build-time and
// loaded as plain JSON files so have minimal client cost.
export const pageQuery = graphql`
  query($id: String!) {
    # Select the post with this id.
    hubspotPost(id: { eq: $id }) {
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
      topic_ids
      topics {
        id
        name
        slug
      }
    }
  }
`
