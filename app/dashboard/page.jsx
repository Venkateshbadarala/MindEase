"use client";
import DailyStreak from '../components/DailyStreak/DailyStreak';
import EmotionBoard from '../components/EmotionsBoard/EmotionBoard';
import Suggestions from '../components/Suggestions/Suggestions';
import React, { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import CardData from '../components/DailyTasks/CardData/CardData';
import DairyList from '../components/Diary/DiaryList/DiaryList';
import { useAuth } from '../../app/context/Authcontext';
import ViewDiaries from '../components/Diary/ViewDiary/ViewDiary';

const Dashboard = () => {
  const { userData } = useAuth(); // use userData to check if authenticated
  const router = useRouter();

  useEffect(() => {
    if (!userData) {
      router.push('/login'); 
    }
  }, [userData, router]);

  if (!userData) {
    return <p>Loading...</p>;
  }

  return (
    <div className='flex flex-col p-10'>
      <h1 className='p-4 text-[2rem]'>Dashboard</h1>
      <div className='flex justify-center gap-10'>
        <div className='flex flex-col gap-2'>
          <EmotionBoard />
          <Suggestions />
        </div>
        <div>
          <DailyStreak />
        </div>
      </div>
      <div className='flex flex-col gap-10 pt-10'>
        <h1 className='text-[2rem]'>TaskHorizon</h1>
        <CardData />
      </div>
      <div className='flex flex-col gap-10 pt-10 h-[40vh]'>
        <h1 className='text-[2rem]'>Recent Journals</h1>
        <ViewDiaries/>
      </div>
    </div>
  );
};

export default Dashboard;
