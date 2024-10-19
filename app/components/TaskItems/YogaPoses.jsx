"use client";
import YogaCard from '../TaskItems/YogaCard'; 
import poses from '../../Assets/Data/Yoga.jsx'; 
import BackButton from '../BackButton/BackButton' 

export default function YogaPoses() {
  

  return (
    <div className="relative flex flex-col items-center justify-between gap-8 p-8">
    
    <BackButton href="/dashboard" className="top-[10rem] left-9" size={20} />

   
      <h1 className='p-3 text-3xl text-center'>Yoga Asanas</h1>

      <div className="grid w-full grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3">
        {poses.map((pose) => (
          <YogaCard key={pose.id} pose={pose} /> 
        ))}
      </div>
    </div>
  );
}
