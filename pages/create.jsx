import { prevElementSibling } from "domutils";
import React, {useState, useRef, useEffect} from 'react';

const create = () => {
  const [error, setError] = useState(false);
  const [tags, setTags] = useState([]);
  const [textError, setTextError] = useState(false);
  const [text, setText] = useState("");
  const [tlError, setTlError] = useState(false);
    const [showSuccessMessage , setShowSuccessMessage] = useState(false);
    const titleEl = useRef();
    const slugEl = useRef();
    const coverTextEl = useRef();
  const changeTag = (e) => {
    if (textError || tlError) return;
    if (e.target.value == "") return;
     tags.length <= 4 ? tags.indexOf(e.target.value) < 0 ? e.key == "Enter" ? (setTags((prev) => [...prev, e.target.value]), setText("")) : "" : (setTlError(true), setTimeout(() => setTlError(false), 3000)) : (setTextError(true), setTimeout(() => setTextError(false), 3000));
    }
    const handleCommentSubmission = () => {
      
    }
  useEffect(() => {
    setTags(tags);
  }, [tags])
  
  return (
    <div className="bg-white shadow-lg rounded-lg p-8 pb-12 mb-8 w-4/5 m-auto">
    <h3 className="text-xl mb-8 font-semibold border-b pb-4">Create Content</h3>
    
    <div className="grid grid-cols-1 gap-4 mb-4">
    <div className="flex flex-col-reverse gap-4 mb-2">
      <input 
      type="text"
      ref={titleEl}
      name="name"
      id="title"
      className="py-2 px-4 w-full outline-none rounded-lg ring-2 ring-gray-300 focus:ring-2 focus:ring-gray-500 bg-gray-100 text-gray-700 peer"
      placeholder="Title"
      />
          <label htmlFor='title' className="font-bold lg:text-xl text-base text-gray-700 lg:peer-focus:text-2xl peer-focus:text-lg transition-all duration-300 ease-in">Title</label>
      
        </div>
        <div className="flex flex-col-reverse gap-4 mb-4">
      <textarea
       ref={coverTextEl}
       id="coverText"
        className="p-4 outline-none w-full rounded-lg ring-2 ring-gray-300 focus:ring-2 focus:ring-gray-500 bg-gray-100 text-gray-700 peer"
        placeholder="Cover Text"
        name="coverText"
        />
          <label htmlFor="coverText" className="font-bold lg:text-xl text-base text-gray-700 lg:peer-focus:text-2xl peer-focus:text-lg transition-all duration-300 ease-in">Cover Text</label>

        </div>
        <div className="flex flex-col-reverse gap-4 mb-4">
      <input
      type="file"
      className="py-2 px-4 w-full outline-none rounded-lg ring-2 ring-gray-300 focus:ring-2 focus:ring-gray-500 bg-gray-100 text-gray-700 peer"

        />
          <label htmlFor="coverText" className="font-bold lg:text-xl text-base text-gray-700 lg:peer-focus:text-2xl peer-focus:text-lg transition-all duration-300 ease-in">Cover Image</label>

        </div>
        <div className="flex flex-col-reverse">
          <textarea placeholder="Content In Markdown"
            className="p-4 outline-none w-full rounded-lg ring-2 ring-gray-300 focus:ring-2 focus:ring-gray-500 bg-gray-100 text-gray-700 h-72 peer"

        />
          <label htmlFor="coverText" className="font-bold lg:text-xl text-base text-gray-700 lg:peer-focus:text-2xl peer-focus:text-lg transition-all duration-300 ease-in">Content</label>
        </div>  
        <div className="w-full flex flex-col-reverse gap-4">
            {textError && <p className="text-red-400 text-xs mt-4 transition-all duration-500 ease">Only 5 categories can be selected</p> }
            {tlError && <p className="text-red-400 text-xs mt-4 transition-all duration-500 ease">You can't enter same category twice</p> }
          <span className="left-2 flex flex-row flex-wrap">{tags ? tags.map((tag) => (<span className="flex p-2 rounded-lg bg-cyan-200 w-fit ml-6" key={tag} >
            <p className="text-xs">{tag}</p>
            <svg 
              className="w-3 h-3 align-middle my-auto ml-4"
              viewBox="0 0 297 297"
              onClick={(e) => {
                setTags((prev) => {
                  let tags = [...prev];
                  tags.splice(tags.indexOf(tag), 1)
                  return tags;
                })

              }
              }
            >
              <g>
                <path d="M293.805,219.495l-71.019-71.003l70.998-71.015c4.258-4.259,4.256-11.163-0.002-15.422L234.921,3.194
		C232.875,1.149,230.101,0,227.209,0c-2.893,0-5.667,1.15-7.712,3.196l-70.999,71.025L77.477,3.219
		c-4.26-4.258-11.162-4.257-15.422,0.001L3.194,62.081C1.149,64.127,0,66.901,0,69.794c0,2.893,1.15,5.666,3.196,7.711l71.035,71.01
		L3.248,219.525c-4.257,4.258-4.257,11.16,0,15.419l58.834,58.859c2.045,2.046,4.819,3.196,7.712,3.196h0.001
		c2.893,0,5.667-1.149,7.712-3.195l71.013-71.029l71.005,70.979c4.258,4.258,11.161,4.258,15.419,0l58.86-58.834
		c2.046-2.045,3.196-4.819,3.196-7.713C297,224.315,295.851,221.541,293.805,219.495z"
    fill="#000000"/>
              </g>
            </svg>
          </span>)) : ""}</span>
          <input type="text" placeholder="" 
            className="p-4  outline-none rounded-lg ring-2 ring-gray-300 focus:ring-2 focus:ring-gray-500 bg-gray-100 text-gray-700 peer"
            onChange={(e) => setText(e.target.value)}
            value={text}
            onKeyUp={changeTag}
            id="tags"
          />
          <label htmlFor="tags" className="font-bold lg:text-xl text-base text-gray-700 lg:peer-focus:text-2xl peer-focus:text-lg transition-all duration-300 ease-in">Tags</label>
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