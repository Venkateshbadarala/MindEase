"use client";
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import Image from 'next/image';

const YogaCard = ({ pose }) => {
  const router = useRouter();

  const handleClick = () => {
    router.push(`/dashboard/${pose.id}`);
  };

  return (
    <motion.div
      className="transition-transform bg-white rounded-lg shadow-sm cursor-pointer hover:scale-105"
      onClick={handleClick}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
    >
      <Image
        src={pose.image}
        alt={pose.name}
        width={400}
        height={300}
        className="object-cover w-full mb-1 rounded-md h-[14rem]"
      />
      <h3 className="p-3 text-lg font-semibold text-center text-gray-700">{pose.name}</h3>
    </motion.div>
  );
};

export default YogaCard;
