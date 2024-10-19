"use client";
import { useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import poses from '../../Assets/Data/Yoga.jsx';
import Image from 'next/image.js';
import { MdArrowBackIosNew } from "react-icons/md"; 

const PosePage = () => {
  const { poseId } = useParams();
  const router = useRouter();
 

  const pose = poses.find((pose) => pose.id === parseInt(poseId));

  if (!pose) return <div>Pose not found</div>;

  return (
    <div
      className="relative flex flex-col items-start justify-between gap-8 p-8 md:flex-row"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
     
      <button
        onClick={() => router.push('/dashboard/yoga')}
        className="absolute p-2 text-white bg-gray-800 rounded-full top-14 left-10 hover:bg-gray-700"
      >
        <MdArrowBackIosNew size={20} />
      </button>

      
      <div className='flex flex-col px-6 py-10'>
        <h1 className='p-10 text-3xl'>{pose.name}</h1>
        <Image
          src={pose.image}
          alt={pose.name}
          width={1000}
          height={1000}
          className="w-[30rem] rounded-lg shadow-lg object-fit"
        />
      </div>

    
      <div className="flex flex-col gap-10 w-[40rem]">
        
        <div className='h-[18rem] p-6 rounded-md bg-slate-100'>
          <h1 className="mb-2 text-xl font-semibold text-center">Tips and Uses</h1>
          <p className="mb-4 text-gray-600">{pose.description}</p>
          <h2 className="text-lg font-semibold">Tips:</h2>
          <p className="mb-4 text-gray-600">{pose.tips}</p>
          <h2 className="text-lg font-semibold">Health Benefits:</h2>
          <p className="text-gray-600">{pose.healthBenefits}</p>
        </div>

       
        <iframe
          width="100%"
          height="315"
          src={`https://www.youtube.com/embed/${pose.videoId}`}
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          className='rounded-xl'
          allowFullScreen
        ></iframe>
      </div>
    </div>
  );
};

export default PosePage;
