import React, { useContext, useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
const Header = () => {
    const [drop, setDrop] = useState(false)
  return (
    <>
    <div className="container mx-auto px-10 mb-8">
            <div className="border-b w-full inline-block border-blue-400 py-8">
                <div className="md:float-left block mr-auto">
                    <Link href="/">
                        <span className="cursor-pointer font-bold text-4xl text-white">
                            Blogue
                        </span>
                    </Link>
                </div>
                <div className="hidden md:float-left md:contents">
                <span className="md:float-right mt-2 align-middle text-white ml-4 font-semibold cursor-pointer">
                <Image src="/../public/OIP.jfif" width="75px" height= "75px" className="rounded-full" onClick={()=>setDrop((!drop))}/>
                { drop && <div className="absolute right-">
                    <Link href="/profile"><span className="md:float-right mt-2 align-middle text-white ml- font-semibold cursor-pointer">
                    My Profile
                </span></Link>
                    <Link href="/settings"><span className="md:float-right mt-2 align-middle text-white ml- font-semibold cursor-pointer">
                    Settings
                </span></Link>
                    <Link href="/create"><span className="md:float-right mt-2 align-middle text-white ml- font-semibold cursor-pointer">
                    Create Post
                </span></Link>
                </div>}
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