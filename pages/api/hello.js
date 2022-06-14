import { GraphQLCLient, gql } from 'graphql';
const graphqlAPI = process.env.NEXT_PUBLIC_GRAPHCMS_ENDPOINT;

export default function comments(req, res) {
  const graphQlClient = new GraphQLClient(graphqlAPI, {
  headers: {
    authorization: `Bearer ${process.env.GRAPHCMS_TOKEN}`
  }
});
  const query = gql`
  mutation CreateComment($name: String!, $email: String!, $comment: String!, $slug: String!) {
    CreateComment(data: { name: $name, email: $email, comment: $comment, post: { connect: { slug: $slug } } }){ id }
  }
  `
  const result = await graphQLClient.request(query, req.body)

  return res.status(200).send(result);
}
