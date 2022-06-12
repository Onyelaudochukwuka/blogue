import React from 'react'

import { getPosts, getPostDetails } from '../../services';

import { PostDetail, Categories, PostWidget, Author, Comments, CommentsForm } from '../../components';
const PostDetails = ({ post }) => {
  return (
    <div className="container mx-auto px-10 mb-8">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
        <div className="lg:col-span-8 col-span-1">
              <PostDetail post={post}/>
              <Author post={post.author}/>
          <CommentsForm slug={post.slug} />
              <Comments slug={post.slug}/>
          </div>
          <div className="lg:col-span-4 col-span-1">
            <div className="lg:sticky relative top-8">
                <PostWidget slug={post.slug} categories={post.categories.map((category) => category.slug)}/>
                <Categories />
              </div>
          </div>
        </div>
    </div>
  )
}

export default PostDetails;
export async function getStaticProps({ params }) {
  const posts = await getPostsDetails(params.slug);

  return {
    props: { post: data }
  }
}

export async function getStaticPaths(){
  const posts = await getPosts();
  return {
    paths: posts.map(({node: { slug }}) => ({ params: { slug }})),
    falback: false,
  }
}