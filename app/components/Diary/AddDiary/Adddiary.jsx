"use client";
import React, { useState, useEffect, useRef } from 'react';
import { auth, db, storage } from '../../../Firebase/firebase-config';
import { doc, collection, setDoc } from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { MdOutlineAudiotrack } from "react-icons/md";
import { FaImage } from "react-icons/fa6";
import { RxCross2 } from "react-icons/rx";
import { TiDocumentAdd } from "react-icons/ti";
import { toast } from 'react-hot-toast'; 
import Image from 'next/image';

const AddDiary = () => {
  const [content, setContent] = useState('');
  const [title, setTitle] = useState('');
  const [date, setDate] = useState('');
  const [image, setImage] = useState(null);
  const [audio, setAudio] = useState(null);
  const [imagePreview, setImagePreview] = useState('');
  const [audioPreview, setAudioPreview] = useState('');
  const [currentDate, setCurrentDate] = useState('');
  const [activity, setActivity] = useState('');
  const [musicRecommendation, setMusicRecommendation] = useState('');
  const [consecutiveNegDays, setConsecutiveNegDays] = useState(0);

  const imageInputRef = useRef(null);
  const audioInputRef = useRef(null);

  useEffect(() => {
    const today = new Date().toISOString().split('T')[0];
    setDate(today);
    setCurrentDate(today);
  }, []);

  useEffect(() => {
    if (image) {
      setImagePreview(URL.createObjectURL(image));
    } else {
      setImagePreview('');
    }
  }, [image]);

  useEffect(() => {
    if (audio) {
      setAudioPreview(URL.createObjectURL(audio));
    } else {
      setAudioPreview('');
    }
  }, [audio]);

  const handleAddDiary = async () => {
    try {
      const user = auth.currentUser;
      if (!user) {
        alert('You must be logged in to add a diary entry.');
        return;
      }

      const userDocRef = doc(db, 'users', user.uid);
      const diaryCollectionRef = collection(userDocRef, 'diaries');
      let imageUrl = '';
      let audioUrl = '';

      // Start loading toast
      const loadingToast = toast.loading("Uploading diary entry...");

      // Upload image to Firebase Storage
      if (image) {
        const imageRef = ref(storage, `diaries/${user.uid}/${date}/image`);
        const imageSnapshot = await uploadBytes(imageRef, image);
        imageUrl = await getDownloadURL(imageSnapshot.ref); // Get the image URL after upload
      }

      // Upload audio to Firebase Storage
      if (audio) {
        const audioRef = ref(storage, `diaries/${user.uid}/${date}/audio`);
        const audioSnapshot = await uploadBytes(audioRef, audio);
        audioUrl = await getDownloadURL(audioSnapshot.ref); // Get the audio URL after upload
      }

      // Store the diary entry in Firestore
      await setDoc(doc(diaryCollectionRef, date), {
        title,
        content,
        date: new Date(date).toISOString(),
        imageUrl, // URL of the uploaded image
        audioUrl, // URL of the uploaded audio
      });

      // Show success notification after the diary entry is added
      toast.success("Diary entry added!", { id: loadingToast }); // Notify user of successful addition
      resetForm(); // Reset the form after successful submission
    } catch (error) {
      console.error('Error adding diary entry:', error.message); // Log error message
      toast.error('Error adding diary entry: ' + error.message, { id: loadingToast }); // Show error notification
    }
  };

  const resetForm = () => {
    setContent(''); // Reset content state
    setTitle(''); // Reset title state
    setDate(currentDate); // Reset date to current date
    setImage(null); // Clear image state
    setAudio(null); // Clear audio state
    setActivity(''); // Reset activity state
    setMusicRecommendation(''); // Reset music recommendation state
    setConsecutiveNegDays(0); // Reset consecutive negative days count
  };

  return (
    <div className="flex items-center justify-center h-[90vh]">
      <div className="relative flex flex-col items-center justify-center w-full gap-6 p-8 rounded-lg">
        <h2 className="pb-3 text-3xl font-bold text-center text-violet-600">Add Diary Entry</h2>

        <div className="absolute flex items-center justify-center top-6 right-3">
          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            min={currentDate}
            max={currentDate}
            className="px-4 py-2 border rounded-lg outline-none text-violet-600 bg-gray-50"
          />
        </div>

        <input
          type="text"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-3/4 p-3 text-lg text-center border rounded-lg outline-none bg-gray-50"
        />

        <textarea
          placeholder="Diary Content"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          className="w-full p-4 border rounded-lg outline-none h-[23rem] bg-gray-50"
        />

        <div className="flex items-center justify-between gap-6">
          <div className="flex items-center gap-6">
            {imagePreview && (
              <div className="relative">
                <Image src={imagePreview} alt="Preview" className="object-cover w-20 h-20 rounded-lg shadow" />
                <button
                  onClick={() => setImage(null)}
                  className="absolute p-1 bg-red-500 rounded-full top-1 right-1 hover:bg-red-600"
                >
                  <RxCross2 size={16} className="text-white" />
                </button>
              </div>
            )}

            {audioPreview && (
              <div className="relative">
                <audio controls src={audioPreview} className="rounded-md shadow w-28" />
                <button
                  onClick={() => setAudio(null)}
                  className="absolute p-1 bg-red-500 rounded-full top-1 right-1 hover:bg-red-600"
                >
                  <RxCross2 size={16} className="text-white" />
                </button>
              </div>
            )}
          </div>

          <div className="flex gap-4">
            <button
              onClick={() => imageInputRef.current.click()}
              className="flex items-center justify-center w-10 h-10 text-white rounded-lg bg-violet-500 hover:bg-blue-600"
            >
              <FaImage size={20} />
            </button>
            <button
              onClick={() => audioInputRef.current.click()}
              className="flex items-center justify-center w-10 h-10 text-white rounded-lg bg-violet-500 hover:bg-blue-600"
            >
              <MdOutlineAudiotrack size={20} />
            </button>
            <button
              onClick={handleAddDiary}
              className="flex items-center justify-center w-24 h-10 text-white rounded-lg bg-violet-600 hover:bg-violet-600"
            >
              <TiDocumentAdd size={20} /> Save
            </button>
          </div>
        </div>

        {consecutiveNegDays > 0 && (
          <div className="mt-6 text-center">
            <p className="text-red-500">You've had {consecutiveNegDays} consecutive days of negative emotions.</p>
            <p>{activity}</p>
            <p>{musicRecommendation}</p>
          </div>
        )}

        <input
          type="file"
          accept="image/*"
          className="hidden"
          ref={imageInputRef}
          onChange={(e) => setImage(e.target.files[0])}
        />
        <input
          type="file"
          accept="audio/*"
          className="hidden"
          ref={audioInputRef}
          onChange={(e) => setAudio(e.target.files[0])}
        />
      </div>
    </div>
  );
};

export default AddDiary;
