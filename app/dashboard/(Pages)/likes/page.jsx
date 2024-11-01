"use client"
import React from 'react'

import LikeComponent from '../../../components/LikeComponent/LikeComponent'

const Likes = () => {
 
  return (
    <div className='pt-[8%]'>
      <h2 className="mb-6 font-serif text-3xl font-extrabold text-center ">Liked Diaries</h2>
    <LikeComponent/>
    </div>
  )
}

export default Likes