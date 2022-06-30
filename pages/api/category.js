import { GraphQLClient, gql } from 'graphql-request';
const graphqlAPI = process.env.NEXT_PUBLIC_GRAPHCMS_ENDPOINT;
export default async function category(req, res) {
    const graphQlClient = new GraphQLClient(graphqlAPI, {
        headers: {
            authorization: `Bearer ${process.env.GRAPHCMS_TOKEN}`
        }
    });
    const query = gql`
mutation CreateCategory($name: String!, $slug: String!, $id:ID) {
  createCategory(data: {name: $name, slug: $slug, posts: {connect: {id: $id}}}){id}
}
`;
    try {
        const result = await graphQlClient.request(query, {
            name: req.body.name,
            slug: req.body.slug,
            id: req.body.id
        });
        return res.status(200).send(result);
    }
    catch (error) {
        console.log(error);
        return res.status(500).send(error);
    }
}
