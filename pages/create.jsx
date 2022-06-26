import React, {useState, useRef} from 'react';

const create = () => {
  const [error, setError] = useState(false);
  const [tags, setTags] = useState([]);
  const [width, setWidth] = useState(`48px`);
    const [showSuccessMessage , setShowSuccessMessage] = useState(false);
    const titleEl = useRef();
    const slugEl = useRef();
    const coverTextEl = useRef();
  const contextEl = useRef();
  const changeTag = (e) => {
   const val =  e.key == "Enter" ? setTags((prev)=> [...prev,e.target.value]) : "";
    console.log(tags);
    console.log(contextEl)
    }
    const handleCommentSubmission = () => {
      
    }
  return (
    <div className="bg-white shadow-lg rounded-lg p-8 pb-12 mb-8 w-4/5 m-auto">
    <h3 className="text-xl mb-8 font-semibold border-b pb-4">Create Content</h3>
    
    <div className="grid grid-cols-1 gap-4 mb-4">
    <div className="grid grid-cols-1 gap-4 mb-2">
        <label htmlFor='title' className="font-bold text-xl text-gray-700">Title</label>
      <input 
      type="text"
      ref={titleEl}
      name="name"
      id="title"
      className="py-2 px-4 w-full outline-none rounded-lg ring-2 ring-gray-300 focus:ring-2 focus:ring-gray-500 bg-gray-100 text-gray-700"
      placeholder="Title"
      />
      
        </div>
        <div className="grid grid-cols-1 gap-4 mb-4">
          <label for="coverText" className="font-bold text-xl text-gray-700">Cover Text</label>
      <textarea
       ref={coverTextEl}
       id="coverText"
        className="p-4 outline-none w-full rounded-lg ring-2 ring-gray-300 focus:ring-2 focus:ring-gray-500 bg-gray-100 text-gray-700"
        placeholder="Cover Text"
        name="coverText"
        />

        </div>
        <div className="grid grid-cols-1 gap-4 mb-4">
          <label for="coverText" className="font-bold text-xl text-gray-700">Cover Image</label>
      <input
      type="file"
      className="py-2 px-4 w-full outline-none rounded-lg ring-2 ring-gray-300 focus:ring-2 focus:ring-gray-500 bg-gray-100 text-gray-700"

        />

        </div>
        <div className="">
          <label for="coverText" className="font-bold text-xl text-gray-700">Content</label>
          <textarea placeholder="Content In Markdown"
            className="p-4 outline-none w-full rounded-lg ring-2 ring-gray-300 focus:ring-2 focus:ring-gray-500 bg-gray-100 text-gray-700 h-72"

        />
        </div>
        <div className="w-full relative block mx-auto">
          <span
          ref={contextEl}
          className="absolute inset-y-0 left-2 flex items-center pl-2"
          >{tags ? tags.map((tag) => (<p>{tag}</p>)) : "Text"}</span>
          <input type="text" placeholder="" 
            className={`block  w-full py-2 pl-[${width}] pr-3 outline-none rounded-lg ring-2 ring-gray-300 focus:ring-2 focus:ring-gray-500 bg-gray-100 text-gray-700`}
            
          onKeyUp={changeTag}/>
        </div>
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
    
</div>
  )
}

export default create