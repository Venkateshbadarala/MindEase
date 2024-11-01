import Image from 'next/image';
import React from 'react';

const DiaryModal = ({ diary, isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center transition-opacity duration-300 ease-in-out bg-black bg-opacity-70">
      
      <div className="transition-transform duration-300 transform scale-100 bg-white rounded-lg shadow-2xl w-[60rem] hover:scale-103">
        <header className="flex items-center justify-between p-4 border-b border-gray-300">
          <h2 className="text-2xl font-semibold text-center text-gray-800">{diary.title}</h2>
          <button className="text-3xl text-red-600 transition-colors hover:text-red-800" onClick={onClose}>
            &times;
          </button>
        </header>
        <div className="flex gap-10 p-8">
          <div>
          <div className="mb-4">
            <h3 className="text-xl text-bold gray-700 font-">Title:</h3>
            <p className="text-gray-600">{diary.title}</p>
          </div>
          <div className="mb-4">
            <h3 className="text-xl text-bold gray-700 font-">Content:</h3>
            <p className="text-gray-600">{diary.content}</p>
          </div>
          <div className="mb-4">
            <h3 className="text-xl text-bold gray-700 font-">Date:</h3>
            <p className="text-gray-500">{new Date(diary.date).toLocaleDateString()}</p>
          </div>
          </div>
           <div>
          {diary.imageUrl && (
            <div className="mb-4">
              <h3 className="text-xl text-bold gray-700 font-">Image:</h3>
              <Image src={diary.imageUrl} width={500}  height={500} alt="Diary entry" className="object-cover w-full h-48 transition-transform duration-200 rounded-lg shadow-md hover:scale-105" />
            </div>
          )}

          {diary.audioUrl && (
            <div className="mb-4">
              <h3 className="text-xl text-bold gray-700 font-">Audio:</h3>
              <audio controls className="w-full rounded-lg ">
                <source src={diary.audioUrl} type="audio/mpeg" />
                Your browser does not support the audio tag.
              </audio>
            </div>
          )}
        </div>
        </div>
      </div>
    </div>
  );
};

export default DiaryModal;
