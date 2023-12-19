import { gql } from "@apollo/client";

export const GET_TOPICS = gql`
query GetTopics {
  topics {
    id
    title
    body
  }
}
`
export const GET_TOPIC = gql`
query GetTopic ($id: Int) {
  getTopic (id: $id) {
    id
    title
    body
  }
}
`

export const ADD_TOPIC = gql`
mutation AddTopic ($title: String, $body: String) {
  createTopic (title: $title, body: $body) {
    title
    body
  }
}
`

export const UPDATE_TOPIC = gql`
mutation UpdateTopic ($id: Int, $title: String, $body: String) {
  updateTopic (id: $id, title: $title, body: $body) {
    title
    body
  }
}
`

export const DELETE_TOPIC = gql`
mutation DelTopic ($id: Int) {
  deleteTopic (id: $id) {
    title
    body
  }
}
`