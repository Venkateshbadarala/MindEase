"use client";
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import Image from 'next/image';
import swiggy from '../../../Assets/images/swiggy.png';
import zomato from '../../../Assets/images/zomato.png';

const FoodCard = () => {
  const router = useRouter();

  const foodItems = [
    {
      id: 1,
      name: 'Swiggy',
      image: swiggy,
      link:'https://www.zomato.com/',
      description: 'Food delivery service that brings your favorite meals to your door.',
    },
    {
      id: 2, 
      name: 'Zomato', 
      image: zomato, 
      link:'https://www.swiggy.com/',
      description: 'Explore restaurants and order food online with ease.',
    },
  ];

  

  return (
    <div className="flex items-center justify-center pt-[20%] gap-4 p-10">
      {foodItems.map((food) => (
        <motion.div
          key={food.id} 
          className="transition-transform bg-white rounded-lg shadow-lg cursor-pointer hover:shadow-xl hover:scale-105 w-[30rem] border overflow-hidden"
          onClick={() => router.push(food.link)}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <Image
            src={food.image}
            alt={food.name}
            width={300}
            height={200}
            className="object-fit w-full rounded-t-lg h-[10rem] p-2 overflow-hidden border border-black"
          />
          <div className="p-3 text-center">
            <h3 className="text-lg font-semibold text-gray-800">{food.name}</h3>
            <p className="mt-1 text-sm text-gray-600">{food.description}</p>
          </div>
        </motion.div>
      ))}
    </div>
  );
};

export default FoodCard;
