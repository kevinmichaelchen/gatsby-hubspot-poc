import * as PropTypes from 'prop-types'
import React from 'react'
import { Link, graphql } from 'gatsby'
import Layout from '../components/layout'
import { renderPost } from '../pages'

class TopicTemplate extends React.Component {
  static propTypes = {
    data: PropTypes.shape({
      hubspotTopic: PropTypes.shape({
        id: PropTypes.string,
        name: PropTypes.string,
      }).isRequired,
    }).isRequired,
  }
  render() {
    const { pageContext } = this.props
    const { allHubspotPost } = this.props.data

    // TODO ID is showing up as UUID when it should be int
    const topicID = pageContext.id
    const topicName = pageContext.name
    const topicSlug = pageContext.slug

    const posts = allHubspotPost.edges.map(e => e.node)

    return (
      <Layout location={this.props.location}>
        <Link to={'/'}>Back</Link>
        <div>Topic ID: {topicID}</div>
        <div>Topic Name: {topicName}</div>
        <div>Topic Slug: {topicSlug}</div>
        {posts && posts.map((post, i) => renderPost(post, i))}
      </Layout>
    )
  }
}

export default TopicTemplate

export const postsQuery = graphql`
  query($slug: String!) {
    # Select the posts that have this topic id.
    allHubspotPost(filter: { topics: { elemMatch: { slug: { eq: $slug } } } }) {
      edges {
        node {
          id
          title
          slug
          summary
          author {
            id
            name
            full_name
          }
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
