"use client"
import React, { useState, useEffect } from 'react';
import { auth, db } from '../../../Firebase/firebase-config';
import { collection, query, getDocs, doc, updateDoc } from 'firebase/firestore';
import {  Spinner, Alert, AlertIcon, AlertTitle, AlertDescription } from '@chakra-ui/react';
import DiaryList from '../DiaryList/DiaryList';
import DiaryModal from '../DiaryModal/DiaryModal'; 


const ViewDiaries = () => {
  const [diaries, setDiaries] = useState([]);
  const [selectedDiary, setSelectedDiary] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const user = auth.currentUser;

  useEffect(() => {
    const fetchDiaries = async () => {
      if (user) {
        setLoading(true);
        setError(null);
        try {
          const userDocRef = doc(db, 'users', user.uid);
          const diaryCollectionRef = collection(userDocRef, 'diaries');
          const q = query(diaryCollectionRef);
          const querySnapshot = await getDocs(q);

          const fetchedDiaries = querySnapshot.docs.map((docSnap) => ({
            ...docSnap.data(),
            id: docSnap.id,
            date: new Date(docSnap.data().date), 
          }));
          setDiaries(fetchedDiaries);
        } catch (error) {
          console.error('Error fetching diaries:', error.message);
          setError('Failed to fetch diaries. Please try again later.');
        } finally {
          setLoading(false);
        }
      }
    };

    fetchDiaries();
  }, [user]);

  const handleCardClick = (diary) => {
    setSelectedDiary(diary);
  };

  const handleLikeClick = async (diary) => {
    const userDocRef = doc(db, 'users', user.uid);
    const diaryDocRef = doc(userDocRef, 'diaries', diary.id);

    const updatedLike = !diary.liked;
    const updatedLikesCount = updatedLike ? (diary.likes || 0) + 1 : (diary.likes || 0) - 1;

    try {
      await updateDoc(diaryDocRef, { liked: updatedLike, likes: updatedLikesCount });

      const updatedDiaries = diaries.map((d) =>
        d.id === diary.id ? { ...d, liked: updatedLike, likes: updatedLikesCount } : d
      );
      setDiaries(updatedDiaries);
    } catch (error) {
      console.error('Error liking the diary:', error.message);
      setError('Failed to like the diary. Please try again.');
    }
  };

  return (
    <div className="fixed flex flex-col items-center justify-center p-6">
      <h2 className="mb-6 font-serif text-3xl font-extrabold text-center text-white">E-Diaries List</h2>

      {loading && (
        <div className="flex items-center justify-center my-4">
          <Spinner size="xl" />
        </div>
      )}

      {error && (
        <Alert status="error" mb={4}>
          <AlertIcon />
          <AlertTitle mr={2}>Error!</AlertTitle>
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      <DiaryList diaries={diaries} onCardClick={handleCardClick} onLikeClick={handleLikeClick} />

      {selectedDiary && (
        <DiaryModal diary={selectedDiary} isOpen={Boolean(selectedDiary)} onClose={() => setSelectedDiary(null)} />
      )}
    </div>
  );
};

export default ViewDiaries;
