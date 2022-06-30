import React, { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import { submitPost, submitImage, submitCategory, publishImage, publishPost, publishCategory, getCategories, updateCategory } from '../services'
const create = () => {
  const [error, setError] = useState(false);
  const [tags, setTags] = useState([]);
  const [titleError, setTitleError] = useState(false);
  const [contentError, setContentError] = useState(false);
  const [coverTextError, setCoverTextError] = useState(false);
  const [fileError, setFileError] = useState(false);
  const [textError, setTextError] = useState(false);
  const [text, setText] = useState("");
  const [tlError, setTlError] = useState(false);
  const [value, setValue] = useState("")
  const [author, setAuthor] = useState("")
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  const [details, setDetails] = useState(false);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    setDetails(JSON.parse(window.localStorage.getItem("userDetails")));
  }, []);
    const titleEl = useRef();
    const coverTextEl = useRef();
    const contentEl = useRef();
    const fileEl = useRef();
  const changeTag = (e) => {
    if (textError || tlError) return;
    if (e.target.value == "") return;
     tags.length <= 4 ? tags.indexOf(e.target.value) < 0 ? e.key == "Enter" ? (setTags((prev) => [...prev, e.target.value]), setText("")) : "" : (setTlError(true), setTimeout(() => setTlError(false), 3000)) : (setTextError(true), setTimeout(() => setTextError(false), 3000));
  }
  useEffect(() => {
    setInterval(() => {
      setAuthor(()=>JSON.parse(window.localStorage.getItem('author')));
      console.log(author)
    },5000);
  }, [])
  
  const parser = (arg) => {
    const length = arg.toLowerCase().replace(' ', '-');

    return length.indexOf(' ') > 0 ? parser(length) : length;
  }
  const handleCommentSubmission = () => {
    setLoading(true);
    const { value: title } = titleEl.current;
    const { value: content } = contentEl.current;
    const { value: excerpt } = coverTextEl.current;
    const { value: featuredImage } = fileEl.current;
    const slug = parser(title);
    const featredPost = true;

    if (!title || !content || content.length < 160 || !excerpt || !featuredImage) {
      setError(true);
      setTimeout(() => {
        setError(false);
      }, 3000);
      if (!title) {
        setTitleError(true);
        setTimeout(() => {
          setTitleError(false);
        }, 3000);
      }
      if (!content) {
        setContentError(true);
        setTimeout(() => {
          setContentError(false);
        }, 3000);
      }
      if (!content || content.length < 160) {
        setContentError(true);
        setTimeout(() => {
          setContentError(false);
        }, 3000);
      }
      if (!excerpt) {
        setCoverTextError(true);
        setTimeout(() => {
          setCoverTextError(false);
        }, 3000);
      }
      if (!featuredImage || featuredImage.type.indexOf("image") < 0) {
        setFileError(true);
        setTimeout(() => {
          setFileError(false);
        }, 3000);
      }
      setLoading(false);
      return;
    }
    var author = JSON.parse(window.localStorage.getItem('author')).createAuthor.id;
    const objCreate = (title,
      content,
      excerpt,
      featredPost,
      slug,
      featuredImage,
      author
    ) => {
      return {
        title,
        content,
        excerpt,
        featredPost,
        slug,
        featuredImage,
        author
      }
    }
    
    submitImage(featuredImage)
      .then((res)=>res.id)
      .then((res) => {
        publishImage({ id: res});
       return submitPost(objCreate(title,
          content,
          excerpt,
          featredPost,
          slug,
          res,
          author
        ))
      })
      .then((res) => res.createPost)
      .then((res) => res.id)
      .then((res) => {
        publishPost({id: res });
        tags.map((tag) => {
          const categoryObj = {
            name: tag,
            slug: parser(tag),
            id: res
          }
          getCategories()
            .then((res) => res.map((obj) => obj.slug), console.log(res))
            .then((categories) => categories.includes(categoryObj.slug), console.log(categories))
    
            .then(async (exist) => {
              console.log(exist);
            return  !exist
                ?
                submitCategory(categoryObj)
                  .then((res) => res.createCategory)
                  .then((res) => res.id)
                  .then((res) => publishCategory({ id: res }))
                :
                updateCategory({ id: res, slug: categoryObj.slug });
            })
        })
      })
      .then(() => {
        setLoading(false);
        setShowSuccessMessage(true);
        setTimeout(() => { setShowSuccessMessage(false) }, 5000 )
    })
    }
  return details == false || !details ? 
    <div className="bg-white shadow-lg rounded-lg p-8 pb-12 mb-8 w-4/5 m-auto">
      <div className="flex flex-col gap-6 it">
        <h1 className="text-center font-bold lg:text-xl text-lg">You have to need a  <Link href="/profile"><span className="text-blue-400 cursor-pointer">Profile</span></Link> to create a post create on</h1>
      </div>
    </div>
  : (
    <div className="bg-white shadow-lg rounded-lg p-8 pb-12 mb-8 w-4/5 m-auto">
    <h3 className="text-xl mb-8 font-semibold border-b pb-4">Create Content</h3>
    
    <div className="grid grid-cols-1 gap-4 mb-4">
        <div className="flex flex-col-reverse gap-4 mb-2">
        {titleError && <span className="text-red-400 text-xs">Cover text is required</span>}
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
          {coverTextError && <span className="text-red-400 text-xs">Cover text is required</span>}
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
          {fileError && <p className="text-red-400 text-xs mt-4 transition-all duration-500 ease">Select A Valid File</p>}
      <input
      type="url" 
      className="py-2 px-4 w-full outline-none rounded-lg ring-2 ring-gray-300 focus:ring-2 focus:ring-gray-500 bg-gray-100 text-gray-700 peer"
            ref={fileEl}
            accept="image/*"
            // onChange={(file) => {
            //   const reader = new FileReader();
            //   reader.addEventListener("load", () => {
            //     setUrl(reader.result);
            //     console.log(typeof url)
            //   });
            //   reader.readAsDataURL(file.target.files[0]);
    
            // }}
          />
          <label htmlFor="coverText" className="font-bold lg:text-xl text-base text-gray-700 lg:peer-focus:text-2xl peer-focus:text-lg transition-all duration-300 ease-in">Cover Image</label>

        </div>
        <div className="flex flex-col-reverse gap-4">
          {contentError && <p className="text-red-400 text-xs mt-4 transition-all duration-500 ease">Enter Atleast 160 characters</p>}
          <span className="p-3 bg-yellow-300 rounded-full w-10 h-10 my-auto align-middle">{value.length}</span>
          <textarea placeholder="Content In Markdown"
            className="p-4 outline-none w-full rounded-lg ring-2 ring-gray-300 focus:ring-2 focus:ring-gray-500 bg-gray-100 text-gray-700 h-72 peer"
            value={value}
            onChange={(e)=>setValue(e.target.value)}
            ref={contentEl}
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
          <input type="text" placeholder="Tags" 
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
            disabled={loading && true}
      >
            {!loading ? "Post Comment " : <div className="text-sm flex display-row"><svg
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
}

export default create