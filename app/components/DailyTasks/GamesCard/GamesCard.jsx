import React from 'react';

const GamesCard = () => {
  return (
    <div className='p-5 rounded-[10px] border bg-white border-violet-600 shadow-md border-opacity-20 shadow-violet-400'>
        <h1 className='p-2'>Games Card</h1>
        <div className='border h-[6rem] p-3 flex justify-center items-center'>
            <h1>No Games Available</h1>
        </div>
    </div>
  );
};

export default GamesCard;
