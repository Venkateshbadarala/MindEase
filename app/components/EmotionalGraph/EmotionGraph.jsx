"use client";
import React, { useEffect, useState } from 'react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer
} from 'recharts';
import {
  Box,
  Text,
  Spinner,
  Alert,
  AlertIcon,
  HStack,
  Stat,
  StatLabel,
  StatNumber,
  Divider
} from '@chakra-ui/react';

const EmotionalGraph = () => {
  const [emotionsData, setEmotionsData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [averageEmotion, setAverageEmotion] = useState(null);
  const [mostFrequentEmotion, setMostFrequentEmotion] = useState(null);

  const emotionMapping = {
    joy: 3,
    neutral: 2,
    sadness: 1,
    angry: 0,
  };

  const reverseEmotionMapping = {
    3: 'Joy',
    2: 'Neutral',
    1: 'Sadness',
    0: 'Angry',
  };

  useEffect(() => {
    const fakeData = [
      { date: '2024-10-01', emotionValue: 3 },
      { date: '2024-10-02', emotionValue: 2 },
      { date: '2024-10-03', emotionValue: 1 },
      { date: '2024-10-04', emotionValue: 0 },
      { date: '2024-10-05', emotionValue: 2 },
      { date: '2024-10-06', emotionValue: 3 },
      { date: '2024-10-07', emotionValue: 2 },
      { date: '2024-10-08', emotionValue: 0 },
      { date: '2024-10-09', emotionValue: 1 },
      { date: '2024-10-10', emotionValue: 3 },
      { date: '2024-10-11', emotionValue: 2 },
      { date: '2024-10-12', emotionValue: 1 },
      { date: '2024-10-13', emotionValue: 0 },
      { date: '2024-10-14', emotionValue: 3 },
    ];

    setTimeout(() => {
      setEmotionsData(fakeData);
      setLoading(false);

      const totalEmotionValue = fakeData.reduce((acc, curr) => acc + curr.emotionValue, 0);
      setAverageEmotion(totalEmotionValue / fakeData.length);

      const emotionCount = fakeData.reduce((acc, curr) => {
        acc[curr.emotionValue] = (acc[curr.emotionValue] || 0) + 1;
        return acc;
      }, {});
      const mostFrequent = Object.keys(emotionCount).reduce((a, b) =>
        emotionCount[a] > emotionCount[b] ? a : b
      );
      setMostFrequentEmotion(reverseEmotionMapping[mostFrequent]);
    }, 1000);
  }, []);

  return (
    <div className="flex flex-col items-center gap-10 pt-10 h-[90vh] bg-gray-50">
      <Text className="text-[2rem] pt-6 font-semibold text-indigo-600 mb-6 font-serif text-3xl  text-center ">Analysis Zone</Text>
      
      <HStack spacing={4} justifyContent="center" bg="white" p={15} rounded="lg" shadow="lg" w="30%" >
        <Stat>
          <StatLabel>Average Emotion</StatLabel>
          <StatNumber fontSize="2xl" color="purple.500">
          <p className='text-violet-500'>{reverseEmotionMapping[Math.round(averageEmotion)] || "N/A"}</p>  
          </StatNumber>
        </Stat>
        <Divider orientation="vertical" height="auto" />
        <Stat>
          <StatLabel>Most Frequent Emotion</StatLabel>
          <StatNumber fontSize="2xl" color="purple.500">
          <p className='text-violet-500'>{mostFrequentEmotion || "N/A"}</p>  
          </StatNumber>
        </Stat>
      </HStack>

      <Box w="100%" maxW="1200px" h="500px" mt={4} p={4} bg="white" rounded="md" shadow="xl">
        <Text fontSize="xl" fontWeight="bold" textAlign="center" mb={4} color="teal.600">
          Emotion Over Time
        </Text>

        {loading ? (
          <Box display="flex" justifyContent="center" alignItems="center" h="100%">
            <Spinner size="lg" color="blue.500" />
          </Box>
        ) : error ? (
          <Alert status="error">
            <AlertIcon />
            {error}
          </Alert>
        ) : emotionsData.length === 0 ? (
          <Text textAlign="center" color="gray.500">
            No emotions to display.
          </Text>
        ) : (
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={emotionsData} margin={{ top: 20, right: 20, left: 20, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#ccc" />
              <XAxis dataKey="date" />
              <YAxis
                label={{ angle: -90, position: 'insideLeft', fill: '#666' }}
                ticks={[0, 1, 2, 3]}
                tickFormatter={(tick) => reverseEmotionMapping[tick] || 'Unknown'}
              />
              <Tooltip
                labelFormatter={(label) => `Date: ${label}`}
                formatter={(value) => reverseEmotionMapping[value] || 'Unknown'}
              />
              <Legend verticalAlign="top" height={36} />
              <Line
                type="monotone"
                dataKey="emotionValue"
                name="Emotion"
                stroke="#8884d8"
                strokeWidth={3}
                activeDot={{ r: 10 }}
              />
            </LineChart>
          </ResponsiveContainer>
        )}
      </Box>
    </div>
  );
};

export default EmotionalGraph;
