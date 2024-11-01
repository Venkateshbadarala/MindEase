import React from 'react';
import Image from 'next/image';
import Link from 'next/link';

const Card = ({ image, title, link, desc }) => {
  return (
    <Link href={link}>
      <div className="flex flex-row relative justify-between items-center w-[23rem] h-[12rem] rounded-[10px] border bg-white border-violet-600 shadow-md shadow-violet-300 hover:shadow-violet-600 transition-shadow duration-300 ease-in-out p-4 -z-10">
        <div className="flex-shrink-0">
          <Image
            src={image}
            alt={`${title} image`}
            width={100}
            height={100}
            className="w-[8rem] drop-shadow-2xl"
            priority={false} 
          />
        </div>
        <div className="flex flex-col items-center">
          <h2 className="text-3xl font-bold tracking-wide">{title}</h2>
          <p className="text-[16px] text-center font-bold tracking-wide mt-2">{desc}</p>
        </div>
      </div>
    </Link>
  );
};

export default Card;
