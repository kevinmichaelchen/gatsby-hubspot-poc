import * as PropTypes from 'prop-types'
import React from 'react'
import { Link, graphql } from 'gatsby'
import Layout from '../components/layout'

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
    const { hubspotTopic } = this.props.data
    const { id, name } = hubspotTopic
    return (
      <Layout location={this.props.location}>
        <Link to={'/'}>Back</Link>
        <div>Topic ID: {id}</div>
        <div>Topic Name: {name}</div>
      </Layout>
    )
  }
}

export default TopicTemplate

// The post template's GraphQL query. Notice the “id”
// variable which is passed in. We set this on the page
// context in gatsby-node.js.
//
// All GraphQL queries in Gatsby are run at build-time and
// loaded as plain JSON files so have minimal client cost.
export const topicQuery = graphql`
  query($id: String!) {
    # Select the topic with this id.
    hubspotTopic(id: { eq: $id }) {
      id
      name
    }
  }
`
