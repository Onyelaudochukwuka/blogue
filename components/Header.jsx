import React, { useContext, useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
const Header = () => {
    const [drop, setDrop] = useState(false)
  return (
    <>
    <div className="container mx-auto px-10 mb-8">
            <div className="border-b w-full inline-block border-blue-400 py-8">
                <div className="md:float-left inline-block mr-auto py-auto mt-[32.5px]">
                    <Link href="/">
                        <span className="cursor-pointer font-bold text-4xl text-white">
                            Blogue
                        </span>
                    </Link>
                </div>
                <div className="hidden md:float-left md:contents">
                <span className="md:float-right mt-2 align-middle text-white ml-4 font-semibold cursor-pointer">
                <Image src="/../public/OIP.jfif" width="75px" height= "75px" className="rounded-full inline-block ring-2 ring-white" onClick={()=>setDrop((!drop))}/>
                 <div className={`${drop ? `flex` : `hidden`} transition duration-500 ease absolute right-6 flex-col bg-white shadow-lg rounded-lg p-4 mb-8`}>
                    <Link href="/profile"><span className="mb-8 font-black border-b border-gray-400 pb-4 md:float-right mt-2 align-middle text-black cursor-pointer hover:text-gray-400 z-10">
                    My Profile
                </span></Link>
                    <Link href="/settings"><span className="mb-8 font-black border-b border-gray-400 pb-4 md:float-right mt-2 align-middle text-black cursor-pointer hover:text-gray-400 z-10">
                    Settings
                </span></Link>
                    <Link href="/create"><span className="mb-8 font-black border-b border-gray-400 pb-4 md:float-right mt-2 align-middle text-black cursor-pointer hover:text-gray-400 z-10">
                    Create Post
                </span></Link>
                </div>
                </span>
                </div>
            </div>

      </div>
        {/* {categories.map((category)=>(
            <Link key={category.slug} href={`/category/${category.slug}`}>
                <span className="md:float-right mt-2 align-middle text-white ml-4 font-semibold cursor-pointer">
                    {category.name}
                </span>
            </Link>
        ))} */}
        </>
  )
}

export default Header