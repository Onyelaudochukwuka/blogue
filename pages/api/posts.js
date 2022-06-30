import { GraphQLClient, gql } from 'graphql-request';
const graphqlAPI = process.env.NEXT_PUBLIC_GRAPHCMS_ENDPOINT;
export default async function comments(req, res) {
    const graphQlClient = new GraphQLClient(graphqlAPI, {
        headers: {
            authorization: `Bearer ${process.env.GRAPHCMS_TOKEN}`
        }
    });
    const query = gql`
mutation CreatePost($title: String!, $slug: String!, $excerpt: String!, $featredPost: Boolean!, $text: String!, $featuredImage: ID, $author: ID) {
  createPost(
    data: {title: $title, slug: $slug, excerpt: $excerpt, featredPost: $featredPost, text: $text, featuredImage: {connect: {id: $featuredImage}}, author: {connect: {id: $author}}}
  ) {
    excerpt
    featredPost
    slug
    title
    text
  }
}

`;
    try {
        const result = await graphQlClient.request(query, {
            title: req.body.title,
            text: req.body.content,
            excerpt: req.body.excerpt,
            featuredImage: req.body.featuredImage,
            featredPost: req.body.featredPost,
            slug: req.body.slug
        });
        return res.status(200).send(result);
    }
    catch (error) {
        console.log(error);
        return res.status(500).send(error);
    }
}
