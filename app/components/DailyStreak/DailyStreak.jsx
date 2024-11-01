import { useState, useEffect } from 'react';
import dayjs from 'dayjs';
import { Box, Typography, Button } from '@mui/material';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import { motion } from 'framer-motion';
import WhatshotIcon from '@mui/icons-material/Whatshot';
import { useAuth } from '../../context/Authcontext';
import { doc, collection, getDocs, addDoc } from 'firebase/firestore';
import { auth, db } from '../../Firebase/firebase-config'; // Ensure this path is correct

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
  const user = auth.currentUser;
  const userId = user ? user.uid : null; // Use uid instead of id
  console.log("userId", userId);
  const [currentDate, setCurrentDate] = useState(dayjs());
  const [loginDays, setLoginDays] = useState([]);
  const [calendarDays, setCalendarDays] = useState([]);
  const [streak, setStreak] = useState(0);

  useEffect(() => {
    const fetchDiaryEntries = async () => {
      if (!userId) return;

      const diaryCollectionRef = collection(doc(db, 'users', userId), 'diaries');
      const diarySnapshot = await getDocs(diaryCollectionRef);

      diarySnapshot.docs.forEach(doc => {
        console.log(doc.data()); // Log the data to see the structure
      });

      const entries = diarySnapshot.docs.map(doc => {
        const data = doc.data();
        // Check the type of date and convert accordingly
        if (data.date instanceof Date) {
          return dayjs(data.date); // If date is a JavaScript Date object
        } else if (data.date && data.date.toDate) {
          return dayjs(data.date.toDate()); // If date is a Firestore Timestamp
        } else {
          return dayjs(data.date); // If date is a string or timestamp
        }
      });

      setLoginDays(entries);
      calculateStreak(entries); // Calculate streak whenever loginDays updates
    };

    fetchDiaryEntries();
    setCalendarDays(generateCalendarDays(currentDate.year(), currentDate.month()));
  }, [currentDate, userId]);

  const calculateStreak = (entries) => {
    if (entries.length === 0) return setStreak(0);

    let currentStreak = 0;
    let checkDate = dayjs().startOf('day');

    while (entries.some(entry => entry.isSame(checkDate, 'day'))) {
      currentStreak++;
      checkDate = checkDate.subtract(1, 'day'); // Move to the previous day
    }
    
    setStreak(currentStreak);
  };

  const isLoggedInDate = (date) => {
    return loginDays.some((loginDate) => loginDate.isSame(date, 'day'));
  };

  const goToPreviousMonth = () => {
    setCurrentDate(currentDate.subtract(1, 'month'));
  };

  const goToNextMonth = () => {
    setCurrentDate(currentDate.add(1, 'month'));
  };

  const handleJournalEntry = async () => {
    const today = dayjs().startOf('day');
    if (!isLoggedInDate(today)) {
      // Mark the day as a login day
      try {
        const diaryCollectionRef = collection(doc(db, 'users', userId), 'diaries');
        await addDoc(diaryCollectionRef, { date: today.toDate() }); // Save the current date as a diary entry
        setLoginDays([...loginDays, today]); // Update local state
        console.log(`Journal entry made for: ${today.format('YYYY-MM-DD')}`);
      } catch (error) {
        console.error("Error adding diary entry: ", error);
      }
    } else {
      console.log(`Journal already written for: ${today.format('YYYY-MM-DD')}`);
    }
  };

  return (
    <Box
      sx={{
        p: 3,
        border: '2px solid #6b46c1',
        borderRadius: 4,
        height: 450, // Increased height for better visibility
        width: 450,
        backgroundColor: '#ffffff',
        mx: 'auto',
        textAlign: 'center',
        zIndex:-10
      }}
    >
      <div className='flex items-center justify-between'>
        <Typography variant="h5" sx={{ mb: 2, color: '#3f51b5', fontWeight: 'bold' }}>
          Streak
        </Typography>

        <Typography variant="h6" sx={{ mb: 3, color: '#ff7043', fontWeight: 'bold' }} className='flex items-center justify-center'>
          <WhatshotIcon />: {streak} {/* Display the streak count */}
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
              handleJournalEntry();
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
