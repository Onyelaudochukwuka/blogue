import React, { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/router';
import Image from "next/image";
import { publishAuthor, publishImage, submitAuthor, submitImage } from '../services';
const profile = () => {
  const router = useRouter()
  let [error, setError] = useState(false);
  let [showSuccessMessage, setShowSuccessMessage] = useState(false);
  const [res, setRes] = useState(false);
  const [loading, setLoading] = useState(false);
  const [details, setDetails] = useState(false);
  const bioEl = useRef();
  const nameEl = useRef();
  const emailEl = useRef();

  useEffect(() => {
    window.localStorage.setItem("author", JSON.stringify(res));
    setDetails(JSON.parse(window.localStorage.getItem("userDetails")));
  }, [res])
  useEffect(() => {
    setDetails(JSON.parse(window.localStorage.getItem("userDetails")));
  }, []);
  const handleCommentSubmission = () => {
    setLoading(true);
    setError(false);
    const { value: bio } = bioEl.current;
    const { value: name } = nameEl.current;
    const { value: photo } = emailEl.current;
    if (!bio || !name || !photo) {
      setError(true);
      return setLoading(false);
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
      .then((photo) => {
        publishImage({id: photo});
        return submitAuthor(objCreate(name, bio, photo));
      })
      .then((res) => {
        publishAuthor({ id: res.createAuthor.id });
        setRes(res)
      })
      .then(() => setLoading(false))
      .then(() => window.localStorage.setItem("userDetails", JSON.stringify(objCreate(name, bio, photo))))
      .then((res) => {
        setShowSuccessMessage(true);
        setTimeout(() => { setShowSuccessMessage(false) }, 3000)
      })
  }
  return !details ? (
    <div className="bg-white shadow-lg rounded-lg p-8 pb-12 mb-8 w-4/5 m-auto">
      <h3 className="text-xl mb-8 font-semibold border-b pb-4">Create Author</h3>
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
          disabled={loading && true}
        >
         { !loading ? "Create An Account"  : <div className="text-sm flex display-row"><svg
            className="animate-spin w-6 h-6 fill-white" viewBox="0 0 26.349 26.35" >
            <g>
              <g>
                <circle cx="13.792" cy="3.082" r="3.082" />
                <circle cx="13.792" cy="24.501" r="1.849" />
                <circle cx="6.219" cy="6.218" r="2.774" />
                <circle cx="21.365" cy="21.363" r="1.541" />
                <circle cx="3.082" cy="13.792" r="2.465" />
                <circle cx="24.501" cy="13.791" r="1.232" />
                <path d="M4.694,19.84c-0.843,0.843-0.843,2.207,0,3.05c0.842,0.843,2.208,0.843,3.05,0c0.843-0.843,0.843-2.207,0-3.05
			C6.902,18.996,5.537,18.988,4.694,19.84z"/>
                <circle cx="21.364" cy="6.218" r="0.924" />
              </g>
            </g>
          </svg>
            <span className="my-auto align-middle font-bold">Processing...</span></div>}
        </button>
        {showSuccessMessage && <span className="text-xl float-right font-semibold mt-3 text-green-500">Comment submitted for review</span>}
      </div>
    </div>
  )
    :
    (
      <div className="bg-white shadow-lg rounded-lg p-8 pb-12 mb-8 w-4/5 m-auto">
        <div className="flex flex-col gap-6">
          <h1 className="text-align font-bold lg:text-xl text-lg">{details.name}</h1>
          <div className="block w-3/4 mx-auto">
            <img
            alt={details.name}
            src={details.photo}
          />
          </div>
          <p>{details.bio}</p>
          <button
            type="button"
            onClick={() => { window.localStorage.clear(), router.reload() }}
            className="transition duration-500 ease hover:text-gray-600 hover:bg-white inline-block text-lg font-bold rounded-full text-white shadow-lg bg-gray-600 p-3 px-8   cursor-pointer"
           
          >
            logOut
          </button>
        </div>
        </div>
        )
}

export default profile;