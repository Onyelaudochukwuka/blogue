import React, { useState, useEffect } from 'react';
import moment from 'moment';
import Link from 'next/link';

import {getRecentPosts} from '../services'
const PostWidget = ( {slug,categories } ) => {
  const [relatedPosts, setRelatedPosts] = useState([]);
  useEffect(() => {
if(slug){
  getSimilarPosts(categories, slug)
  .then((result) => setRelatedPosts(result))
}
else{
  getRecentPosts()
  .then((result) => setRelatedPosts(result))
}
  }, [slug,categories])
  
  return (
    <div className="bg-white shadow-lg rounded-lg p-8 mb-8">
      <h3r classNamer="text-xl mb-8 font-semibold border-b pb-4">
      {slug ? 'Related Posts' : 'Recent Posts'}
      </h3>
    </div>
  )
}

export default PostWidget