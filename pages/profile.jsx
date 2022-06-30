import React, { useState, useEffect, useRef } from 'react'
import { submitAuthor, submitImage } from '../services';
const profile = () => {
  let [error, setError] = useState(false);
  let [showSuccessMessage, setShowSuccessMessage] = useState(false);
  const [res, setRes] = useState("")
  const bioEl = useRef();
  const nameEl = useRef();
  const emailEl = useRef();
  useEffect(() => {
    nameEl.current.value = window.localStorage.getItem('name');
    emailEl.current.value = window.localStorage.getItem('email');
  }, [])
  useEffect(() => {
    window.localStorage.setItem("author", JSON.stringify(res));
  },[res])
  const handleCommentSubmission = () => {
    setError(false);
    const { value: bio } = bioEl.current;
    const { value: name } = nameEl.current;
    const { value: photo } = emailEl.current;
    if (!bio || !name || !photo) {
      setError(true);
      return;
    }
    const authorObj = {
      name, photo, bio
    }
    const objCreate = (name,
      bio,
      photo
    ) => {
      return {
        name,
        bio,
        photo
      }
    }
    submitImage(photo)
      .then((res) => res.id)
      .then((photo) => submitAuthor(objCreate(name, bio, photo)))
      .then((res) => setRes(res))
      .then((res) => {
        setShowSuccessMessage(true);
        setTimeout(() => { setShowSuccessMessage(false) }, 3000)
      })
  }
  return (
    <div className="bg-white shadow-lg rounded-lg p-8 pb-12 mb-8 w-4/5 m-auto">
      <h3 className="text-xl mb-8 font-semibold border-b pb-4">Leave A Reply</h3>
      <div className="grid grid-cols-1 gap-4 mb-4">
        <input
          type="text"
          ref={nameEl}
          name="name"
          className="py-2 px-4 outline-none w-full rounded-lg focus:ring-2 focus:ring-gray-200 bg-gray-100 text-gray-700"
          placeholder="Name"
        />
        <input
          type="text"
          ref={emailEl}
          name="email"
          className="py-2 px-4 outline-none w-full rounded-lg focus:ring-2 focus:ring-gray-200 bg-gray-100 text-gray-700"
          placeholder="Photo Url"
        />
      </div>
      <div className="grid grid-cols-1 gap-4 mb-4">
        <div className="grid grid-cols-1 gap-4 mb-4">
          <textarea
            ref={bioEl}
            className="p-4 outline-none w-full rounded-lg focus:ring-2 focus:ring-gray-200 bg-gray-100 text-gray-700"
            placeholder="bio"
            name="comment"
          />

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

export default profile;