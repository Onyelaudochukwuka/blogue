import React from 'react'

import { getPosts, getPostDetails } from '../../services';

import { PostDetail, Categories, PostWidget, Author, Comments, CommentsForm } from '../../components';
const PostDetails = () => {
  return (
    <div className="container mx-auto px-10 mb-8">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
        <div className="lg:col-span-8 col-span-1">
              <PostDetail />
              <Author />
              <CommentsForm />
              <Comments />
          </div>
          <div className="lg:col-span-4 col-span-1">
            <div className="lg:sticky relative top-8">
                <PostWidget />
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
    props: { posts }
  }
}
