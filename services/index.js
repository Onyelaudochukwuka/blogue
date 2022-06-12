import {
    request,
    gql
} from 'graphql-request';

const graphqlAPI = process.env.NEXT_PUBLIC_GRAPHCMS_ENDPOINT;
export const getPosts = async () => {
    const query = gql `
    query MyQuery {
        postsConnection {
          edges {
            node {
              author {
                bio
                id
                name
                photo {
                  url
                }
              }
              createdAt
              slug
              title
              excerpt
              featuredImage {
                url
              }
              categories {
                name
                slug
              }
            }
          }
        }
      }      
    `
    const result = await request(graphqlAPI, query);
    return result.postsConnection.edges;
}
export const getPostDetails = async (slug) => {
  const query = gql `
  query getPostDetails($slug: String!) {
    post(where: { slug: $slug }){
          node {
            author {
              bio
              id
              name
              photo {
                url
              }
            }
            createdAt
            slug
            title
            excerpt
            featuredImage {
              url
            }
            categories {
              name
              slug
            }
            content {
              raw
            }
          }
        }
  `
  const result = await request(graphqlAPI, query, { slug });
  return result.postsConnection.edges;
}
export const getRecentPosts = async () =>{
  const query = gql`
    query getPostDetails(){
      posts(
        orderBy: createdAt_ASC
        last: 3
      ){
        title
        featuredImage {
          url
        }
        createdAt
        slug
      }
    }`
  const result = await request(graphqlAPI, query);
  return result.posts;
}
export const getCategories = async () =>{
  const query = gql`
  query GetCategories{
    categories {
      name
      slug
    }
  }
  `
  const result = await request(graphqlAPI, query);
  return result.categories;
}
