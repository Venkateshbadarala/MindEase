import React from 'react';
import Smash from '../../Assets/images/games/Smash-karts.png'; 
import Subway from '../../Assets/images/games/subwaysurfers.webp';
import Parkour from '../../Assets/images/games/orig.png';
import Red from '../../Assets/images/games/Red.webp';
import Temple from '../../Assets/images/games/Temple.png';
import Racer from '../../Assets/images/games/mr.avif';
import Image from 'next/image';

const cardData = [
  {
    title: "Smash Karts",
    image: Smash, 
    link: "https://www.crazygames.com/game/smash-karts",
    desc: "Battle it out in this fun kart racing game!",
  },
  {
    title: "Subway Surfers",
    image: Subway, 
    link: "https://poki.com/en/g/subway-surfers",
    desc: "Dash through the subway and escape the inspector! 🚄",
  },
  {
    title: "Parkour Race",
    image: Parkour, 
    link: "https://poki.com/en/g/parkour-race",
    desc: "Race through challenging parkour courses! 🏃",
  },
  {
    title: "Red Ball 4",
    image: Red, 
    link: "https://poki.com/en/g/red-ball-4",
    desc: "Roll, jump, and bounce your way to victory! 🎮",
  },
  {
    title: "Temple Run",
    image: Temple, 
    link: "https://poki.com/en/g/temple-run",
    desc: "Run for your life in this thrilling endless runner! 📈",
  },
  {
    title: "Mr Racer Car Racing",
    image: Racer, 
    link: "https://poki.com/en/g/mr-racer-car-racing",
    desc: "Race against others in high-speed car races! 🏎️",
  },
];

const GameContainer = () => {
  return (
    <div className="grid max-w-5xl grid-cols-1 gap-8 py-8 mx-auto sm:grid-cols-2 lg:grid-cols-3">
      {cardData.map((card, index) => (
        <div
          key={index}
          className="overflow-hidden transition-transform duration-300 ease-in-out transform bg-white rounded-lg shadow-lg hover:scale-102"
        >
          <Image
            src={card.image}
            alt={card.title}
            width={500}
            height={500}
            className="object-cover w-full h-40"
          />
          <div className="p-4">
            <h2 className="mb-2 text-xl font-bold">{card.title}</h2>
            <p className="mb-4 text-gray-600">{card.desc}</p>
            <a
              href={card.link}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block w-full px-4 py-2 text-center text-white transition-colors duration-200 bg-blue-500 rounded hover:bg-blue-600"
            >
              Play Now
            </a>
          </div>
        </div>
      ))}
    </div>
  );
};

export default GameContainer;
