"use client";
import { MdArrowBackIosNew } from "react-icons/md";
import { useRouter } from 'next/navigation';

const BackButton = ({ href = '/', className = '', size = 20, position = { top: '50px', left: '30px' } }) => {
  const router = useRouter();

  return (
    <button
      onClick={() => router.push(href)} 
      className={`absolute p-2 text-white bg-gray-800 rounded-full hover:bg-gray-700 ${className}`}
      style={{ top: position.top, left: position.left }} 
    >
      <MdArrowBackIosNew size={size} />
    </button>
  );
};

export default BackButton;
