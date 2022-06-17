import React, {useState, useRef} from 'react';

const create = () => {
    const [error, setError] = useState(false);
    const [showSuccessMessage , setShowSuccessMessage] = useState(false);
    const titleEl = useRef();
    const slugEl = useRef();
    const contentEl = useRef();
    const handleCommentSubmission = () => {
      
  }
  return (
    <div className="bg-cyan-100 shadow-lg rounded-lg p-8 pb-12 mb-8 w-4/5 m-auto">
    <h3 className="text-xl mb-8 font-semibold border-b pb-4">Leave A Reply</h3>
    
    <div className="grid grid-cols-1 gap-4 mb-4">
    <div className="grid grid-cols-1 gap-4 mb-4">
      
        <label htmlFor='title' className="font-bold text-xl mb-1">Title</label>
      <input 
      type="text"
      ref={titleEl}
      name="name"
      id="title"
      className="py-2 px-4 w-full outline-none rounded-lg ring-2 ring-cyan-300 focus:ring-2 focus:ring-cyan-500 bg-cyan-100 text-gray-700"
      placeholder="Title"
      />
      
    </div>
    
    {error && <p className="text-xs text-red-500">All fields are required.</p>}
    <div className="mt-8">
      <button 
      type="button"
      onClick={handleCommentSubmission}
      className="transition duration-500 ease hover:bg-indigo-900 inline-block bg-pink-600 text-lg rounded-full text-white px-8 py-3 cursor-pointer"
      >
          Post Comment
      </button>
      {showSuccessMessage && <span className="text-xl float-right font-semibold mt-3 text-green-500">Comment submitted for review</span>}
    </div>
    <div className="grid grid-cols-1 gap-4 mb-4">
      <textarea
       ref={contentEl}
        className="p-4 outline-none w-full rounded-lg focus:ring-2 focus:ring-gray-200 bg-gray-100 text-gray-700"
        placeholder="Comment"
        name="comment"
        />

    </div>
</div>
  )
}

export default create