import React from 'react';
import Card from '../Card/DailyTaskCard';
import Diary from '../../../Assets/images/diary.png';
import Food from '../../../Assets/images/hamburger.png';
import Analy from '../../../Assets/images/statistics.png';
import Walk from '../../../Assets/images/walking.png';
import Play from '../../../Assets/images/Playing.png';
import Yoga from '../../../Assets/images/yoga.png';

const cardData = [
  {
    title: "Journal",
    image: Diary, 
    link: "/dashboard/diary",
    desc: "Creative Journal Diary"
  },
  {
    title: "Food",
    image: Food, 
    link: "/dashboard/food",
    desc: "Order Your Fav Food😋"
  },
  {
    title: "Walk",
    image: Walk, 
    link: "/dashboard/walk",
    desc: "Let's Walk 🚶"
  },
  {
    title: "Games",
    image: Play, 
    link: "/dashboard/game",
    desc: "Time for Fun & Games 🎮"
  },
  {
    title: "Analytics",
    image: Analy, 
    link: "/dashboard/analytics",
    desc: "Track Your Progress 📊"
  },
  {
    title: "Yoga",
    image: Yoga, 
    link: "/dashboard/yoga",
    desc: "Relax and Rejuvenate 🧘"
  },
];

const CardContainer = () => {
  return (
    <div className="grid grid-cols-1 gap-[2rem]  py-1 sm:grid-cols-2 lg:grid-cols-3">
      {cardData.map((card, index) => (
        <Card 
          key={index}
          title={card.title}
          image={card.image}
          link={card.link}
          desc={card.desc}
        />
      ))}
    </div>
  );
}

export default CardContainer;
