import React, {useState, useEffect, useRef} from 'react'

const CommentsForm = () => {
  let [error, setError] = useState(false);
  let [localStorage , setLocalStorage] = useState(false);
  let [showSuccessMessage , setShowSuccessMessage] = useState(false);
  const commentEl = useRef();
  const nameEl = useRef();
  const emailEl = useRef();
  const storeDetailEl = useRef();
  return (
    <div className="bg-white shadow-lg rounded-lg p-8 pb-12 mb-8">
        <h3 className="text-xl mb-8 font-semibold border-b pb-4">commentsForm</h3>
        <div className="grid grid-cols-1 gap-4 mb-4">
          <textarea ref={commentEl} className="p-4 outline-none w-full rounded-lg focus:ring-2 focus:ring-gray-200 bg-gray-200"></textarea>
        </div>
        <div className="grid grid-cols-1 gap-4 mb-4"></div>
        <div className="grid grid-cols-1 gap-4 mb-4"></div>
    </div>
  )
}

export default CommentsForm