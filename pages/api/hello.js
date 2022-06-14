import { GraphQLCLient, gql } from 'graphql';
const graphqlAPI = process.env.NEXT_PUBLIC_GRAPHCMS_ENDPOINT;

export default function handler(req, res) {
  res.status(200).json({ name: 'John Doe' })
}
