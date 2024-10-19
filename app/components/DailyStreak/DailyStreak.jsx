"use client";
import { useState, useEffect } from 'react';
import dayjs from 'dayjs';
import { Box, Typography, Button } from '@mui/material';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import { motion } from 'framer-motion';
import WhatshotIcon from '@mui/icons-material/Whatshot';
import { db } from '../../Firebase/firebase-config'
import { doc, getDoc, setDoc, arrayUnion } from 'firebase/firestore';
import { useSession } from "next-auth/react";

const generateCalendarDays = (year, month) => {
  const firstDayOfMonth = dayjs().year(year).month(month).startOf('month');
  const lastDayOfMonth = dayjs().year(year).month(month).endOf('month');
  const calendarDays = [];
  for (let i = 0; i < lastDayOfMonth.date(); i++) {
    calendarDays.push(firstDayOfMonth.add(i, 'day'));
  }
  return calendarDays;
};

const StreakDaily = () => {
  const { data: session } = useSession();
  const userId = session?.user?.id;
  const [currentDate, setCurrentDate] = useState(dayjs());
  const [loginDays, setLoginDays] = useState([]);
  const [calendarDays, setCalendarDays] = useState([]);

  useEffect(() => {
    if (userId) {
      const fetchLoginDays = async () => {
        try {
          const docRef = doc(db, "users", userId);
          const docSnap = await getDoc(docRef);

          if (docSnap.exists()) {
            setLoginDays(docSnap.data().loginDays.map(date => dayjs(date)));
          } else {
            console.log("No such document!");
          }
        } catch (error) {
          console.error('Error fetching login days:', error);
        }
      };

      fetchLoginDays();
    }
  }, [userId]);

  useEffect(() => {
    setCalendarDays(generateCalendarDays(currentDate.year(), currentDate.month()));
  }, [currentDate]);

  const isLoggedInDate = (date) => {
    return loginDays.some((loginDate) => loginDate.isSame(date, 'day'));
  };

  const goToPreviousMonth = () => {
    setCurrentDate(currentDate.subtract(1, 'month'));
  };

  const goToNextMonth = () => {
    setCurrentDate(currentDate.add(1, 'month'));
  };

  const handleLogin = async () => {
    const today = dayjs().startOf('day');
    if (!isLoggedInDate(today)) {
      try {
        const docRef = doc(db, "users", userId);
        await setDoc(docRef, {
          loginDays: arrayUnion(today.format()),
        }, { merge: true });
        setLoginDays([...loginDays, today]);
      } catch (error) {
        console.error('Error updating login streak:', error);
      }
    }
  };

  return (
    <Box
      sx={{
        p: 3,
        border: '2px solid #6b46c1',
        borderRadius: 4,
        height: 410,
        width: 450,
        backgroundColor: '#ffffff',
        mx: 'auto',
        textAlign: 'center',
      }}
    >
      <div className='flex items-center justify-between'>
        <Typography variant="h5" sx={{ mb: 2, color: '#3f51b5', fontWeight: 'bold' }}>
          Streak
        </Typography>

        <Typography variant="h6" sx={{ mb: 3, color: '#ff7043', fontWeight: 'bold' }} className='flex items-center justify-center'>
          <WhatshotIcon />: {loginDays.length}
        </Typography>
      </div>

      <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
        <Button onClick={goToPreviousMonth}>
          <ArrowBackIosIcon />
        </Button>
        <Typography variant="h6" sx={{ color: '#1a237e', fontWeight: 'bold' }}>
          {currentDate.format('MMMM YYYY')}
        </Typography>
        <Button onClick={goToNextMonth}>
          <ArrowForwardIosIcon />
        </Button>
      </Box>

      <Box display="grid" gridTemplateColumns="repeat(7, 1fr)" gap={1}>
        {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((day) => (
          <Typography
            key={day}
            textAlign="center"
            sx={{ fontWeight: 'bold', color: '#3f51b5' }}
          >
            {day}
          </Typography>
        ))}

        {calendarDays.map((day, index) => (
          <motion.div
            key={index}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => {
              setCurrentDate(day);
              handleLogin();
            }}
            style={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              width: 40,
              height: 40,
              borderRadius: '50%',
              backgroundColor: isLoggedInDate(day) ? '#ff7043' : 'inherit',
              color: day.isSame(currentDate, 'month') ? 'black' : 'gray',
              cursor: 'pointer',
              border: day.isSame(dayjs(), 'day') ? '2px solid #ff7043' : '1px solid #ddd',
            }}
          >
            {day.date()}
          </motion.div>
        ))}
      </Box>
    </Box>
  );
};

export default StreakDaily;
