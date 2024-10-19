"use client"
// import { useState } from 'react';
// import Image from 'next/image'
import React from 'react'
// import Happy from './grinningsquintingface.png'
// import Neutral from './neutralfaceemoji.png'
// import Sad from './disappointed-face.png'
// const emotion = [
//   {
//     emoji:Happy,
//     count:0
//   },
//   {
//     emoji:Neutral,
//     count:0
//   },
//   {
//     emoji:Sad,
//     count:0
//   }
// ]

const EmotionBoard = () => {

  return (
    <div className='p-4  rounded-[10px]  w-[45vw] h-[20vh] border-2 border-blue-800 border-opacity-95  shadow-sm shadow-violet-300 ' >
        <h1 className='p-3 text-xl'>Emotions</h1>
        {/* <div className='flex p-4 justify-evenly'>
          {
            emotion.map((emoji,index)=>(
              <div key={index} className='flex items-center'>
              <Image  src={emoji.emoji} width={50} height={100} className='hover:scale:105' />
              <div>{count}</div>
          </div>
            ))
          }
        </div> */}
        <div className=' border h-[4rem] p-2 flex justify-center items-center'>
          <h2>Today Mood</h2>
        </div>
    </div>
  )
}

export default EmotionBoard