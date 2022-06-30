import { GraphQLClient, gql } from 'graphql-request';
const graphqlAPI = process.env.NEXT_PUBLIC_GRAPHCMS_ENDPOINT;
export default async function updateCategory(req, res) {
    const graphQlClient = new GraphQLClient(graphqlAPI, {
        headers: {
            authorization: `Bearer ${process.env.GRAPHCMS_TOKEN}`
        }
    });
    const query = gql`
        mutation UpdateCategory($name: String!, $id: ID) {
    updateCategory(data: { posts: { connect: { where: { id: $id } } }, name: $name }){ id }
}
`;
    try {
        const result = await graphQlClient.request(query, {
            id: req.body.id
        });
        return res.status(200).send(result);
    }
    catch (error) {
        console.log(error);
        return res.status(500).send(error);
    }
}
