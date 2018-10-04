import * as PropTypes from 'prop-types'
import React from 'react'
import { graphql } from 'gatsby'
import Layout from '../components/layout'

class TopicTemplate extends React.Component {
  static propTypes = {
    data: PropTypes.shape({
      topicsJson: PropTypes.object.isRequired,
    }),
  }
  render() {
    return (
      <Layout location={this.props.location}>
        <pre>{JSON.stringify(this.props, null, 2)}</pre>
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
export const pageQuery = graphql`
  query($id: String!) {
    # Select the topic with this id.
    HubspotTopic(id: { eq: $id }) {
      id
      name
    }
  }
`
