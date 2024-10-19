"use client";
import DailyStreak from '../components/DailyStreak/DailyStreak';
import EmotionBoard from '../components/EmotionsBoard/EmotionBoard';
import Suggestions from '../components/Suggestions/Suggestions';
import React, { useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import CardData from '../components/DailyTasks/CardData/CardData';
import DairyList from '../components/Diary/DiaryList/DiaryList'

const Dashboard = () => {
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === 'loading') return; 

    if (status === 'unauthenticated') {
      router.push('/login'); 
    } else if (status === 'authenticated') {
     
      router.push('/dashboard');
    }
  }, [status, router]);

  if (status === 'loading') {
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
      <div className='flex flex-col gap-10 pt-10'>
        <h1 className='text-[2rem]'>Recent Journals</h1>
      <DairyList/>
      </div>
    </div>
  );
};

export default Dashboard;
