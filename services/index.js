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
export const getPostDetails = async (slug) => {
  const query = gql`
    query GetPostDetails($slug : String!) {
      post(where: {slug: $slug}) {
        title
        excerpt
        featuredImage {
          url
        }
        author{
          name
          bio
          photo {
            url
          }
        }
        createdAt
        slug
        text
        categories {
          name
          slug
        }
      }
    }
  `;

  const result = await request(graphqlAPI, query, { slug });

  return result.post;
};

export const getRecentPosts = async () => {
  const query = gql`
    query GetPostDetails() {
      posts(
        orderBy: createdAt_ASC
        last: 3
      ) {
        title
        featuredImage {
          url
        }
        createdAt
        slug
      }
    }
  `;
  const result = await request(graphqlAPI, query);

  return result.posts;
};
export const getSimilarPosts = async (categories, slug) => {
  const query = gql`
    query GetPostDetails($slug: String!, $categories: [String!]) {
      posts(
        where: {slug_not: $slug, AND: {categories_some: {slug_in: $categories}}}
        last: 3
      ) {
        title
        featuredImage {
          url
        }
        createdAt
        slug
      }
    }
  `;
  const result = await request(graphqlAPI, query, { slug, categories });

  return result.posts;
};


export const submitComment = async (obj) => {
  const result = await fetch('/api/comments', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(obj),
  })
  return result.json()
}
export const submitPost = async (obj) => {
  const result = await fetch('/api/posts', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(obj),
  })
  return result.json();
}
export const submitAuthor = async (obj) => {
  const result = await fetch('/api/author', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(obj),
  })
  return result.json()
}
export const submitCategory = async (obj) => {
  const result = await fetch('/api/category', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(obj),
  })
  return result.json();
}
export const submitImage = async (url) => {
  const options = {
    method: 'POST',
    headers: {
      Authorization: 'Bearer eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6ImdjbXMtbWFpbi1wcm9kdWN0aW9uIn0.eyJ2ZXJzaW9uIjozLCJpYXQiOjE2NTUyMzEwNDQsImF1ZCI6WyJodHRwczovL2FwaS1hcC1zb3V0aC0xLmdyYXBoY21zLmNvbS92Mi9jbDN4ZW4yNHIwZmh2MDF2MDhvd2EwcXU3L21hc3RlciIsImh0dHBzOi8vbWFuYWdlbWVudC1uZXh0LmdyYXBoY21zLmNvbSJdLCJpc3MiOiJodHRwczovL21hbmFnZW1lbnQuZ3JhcGhjbXMuY29tLyIsInN1YiI6ImE4YjE3YjQ3LTEyMWMtNGQ1NS04NzBkLTM5MWY4OTg4ZTAxOCIsImp0aSI6ImNsNGVodHJrbTBwcWwwMXo0OTk4ZTVuc2sifQ.QkBsVaxYhRZBupa2z063AcXKoWMN-J1Q7RGdqz2pdqic6qmwLUYaFgfFA8uK4VpA9tMLTYp0rMJuah05pbK22gJF5djKmyDTEfEOH3B6xk58lyzn9yCOdylmZzmVF2qdAYdnw61Pe_y-mK4EP7v7W680m7qFThJhnYrccXalw8lthNLvuIO_Uqf7eB8uvUjUkfXpYBdP6mySfRRtxoa6oW2_Y4Z3eQM_SVGFiwK5i5op6zKNrarYrTAUaB1VOtJkKE7FChrDeGwrvAa7Hr9UL-8e8tdjoSDvhmYu3InqJjC3c5khxLbSK8iN-qgfrGcDVyRb-e0HAJHzGtYVl6u43XXd3B91HrXmsE2-9nqaUCddhvG8E8ZZuvvio7v0wWgMuJcYu3dOLjutZEj3eU5Kl3eZjj56Fe_Z84u9pRkTxizRgKPp9n2bXN3DXsNf-YxcTNvLLnmAx6Q-BpmC_9-PgK_BaVGlsMSMpPntgLdte9L5mPOkElxvU7M1Z_2VYekyUlrzQL1Y442f841PZxQ6dzroBSCAYPn8jB_3G75P_g8Pc0uWoApzVxPTKgEx2pIVCWZGLOYPgQEmaRhBd3Hy1BA-W8lCZLjQBJLyW-qnCxe19jzHcns9MXGiyAKXpRAwIclA7INbE7z6jGqgrXZopkonESPY0a1lquOiNkG0WzI',
      'Content-Type': 'application/x-www-form-urlencoded'
    },
    body: `url=${encodeURIComponent(
      url
    )}`,
  }
const  result = await fetch('https://api-ap-south-1.graphcms.com/v2/cl3xen24r0fhv01v08owa0qu7/master/upload', options)
  return result.json();
}
export const getComments = async (slug) =>{
  const query = gql`
  query GetComments($slug: String!) {
    comments(where: {post: {slug: $slug } } ){
      name
      createdAt
      comment
    }
  }
  `
  const result = await request(graphqlAPI, query, { slug });
  return result.comments;
}
export const getFeaturedPosts = async () => {
  const query = gql`
  query GetCategoryPost(){
    posts(where: {featredPost: true}){
      author {
        name 
        photo {
          url
        }
      }
      featuredImage{
        url
      }
      title
      slug
      createdAt
    }
  }
  `;
  const result = await request(graphqlAPI, query);
  return result.posts;
}
export const getCategoryPost = async (slug) => {
  const query = gql`
    query GetCategoryPost($slug: String!) {
      postsConnection(where: {categories_some: {slug: $slug}}) {
        edges {
          cursor
          node {
            author {
              bio
              name
              id
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
  `;

  const result = await request(graphqlAPI, query, { slug });

  return result.postsConnection.edges;
};
