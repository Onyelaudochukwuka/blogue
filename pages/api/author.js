import { GraphQLClient, gql } from 'graphql-request';
const graphqlAPI = process.env.NEXT_PUBLIC_GRAPHCMS_ENDPOINT;
export default async function author(req, res) {
    const graphQlClient = new GraphQLClient(graphqlAPI, {
        headers: {
            authorization: `Bearer ${process.env.GRAPHCMS_TOKEN}`
        }
    });
    const query = gql`
 mutation CreateAuthor($name: String!, $bio: String!, $photo: ID!) {
  createAuthor(data: {name: $name, bio: $bio, photo: {connect: {id: $photo}}}){id}
}
`;
    try {
        const result = await graphQlClient.request(query, {
            name: req.body.name,
            bio: req.body.bio,
            photo: req.body.photo
        });
        return res.status(200).send(result);
    }
    catch (error) {
        console.log(error);
        return res.status(500).send(error);
    }
}
