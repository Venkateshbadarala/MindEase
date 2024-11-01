import React from 'react'
import ViewDiaries from '../../../components/Diary/ViewDiary/ViewDiary'

const page = () => {
  return (
    <div className='pt-[8%]'>
      <h2 className="mb-6 font-serif text-3xl font-extrabold text-center ">E-Diaries List</h2>
      <ViewDiaries/>
    </div>
  )
}

export default page