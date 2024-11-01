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
      link: 'https://www.swiggy.com/',
      description: 'Food delivery service that brings your favorite meals to your door.',
    },
    {
      id: 2,
      name: 'Zomato',
      image: zomato,
      link: 'https://www.zomato.com/',
      description: 'Explore restaurants and order food online with ease.',
    },
  ];

  return (
    <div className=' h-[100vh] bg-gradient-to-b from-orange-100 via-white to-orange-50 rounded-3xl'>
    <div className="flex flex-wrap justify-center gap-8 p-10 pt-[20%]">
      {foodItems.map((food) => (
        <motion.div
          key={food.id}
          className="transition-transform bg-white rounded-xl shadow-lg cursor-pointer hover:shadow-2xl hover:scale-102 w-[30rem] overflow-hidden border border-gray-200"
          onClick={() => router.push(food.link)}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <Image
            src={food.image}
            alt={food.name}
            width={300}
            height={200}
            className="object-contain w-full h-[12rem] rounded-t-xl"
          />
          <div className="p-4 text-center">
            <h3 className="text-xl font-bold text-gray-900">{food.name}</h3>
            <p className="mt-2 text-sm leading-relaxed text-gray-700">{food.description}</p>
          </div>
        </motion.div>
      ))}
    </div>
    </div>
  );
};

export default FoodCard;
