"use client";
import { useState } from "react";
import { motion } from "framer-motion";
import { db, auth } from "../../Firebase/firebase-config"; 
import { addDoc, collection, doc } from "firebase/firestore"; 
import { toast, Toaster } from "react-hot-toast";
import { useRouter } from "next/navigation";

const MultiStep = () => {
  const router = useRouter();
  const [step, setStep] = useState(0);
  const [formData, setFormData] = useState({
    personalInfo: {},
    healthInfo: {},
    favorites: {},
  });

  const steps = [
    { label: "Personal Information" },
    { label: "Health Information" },
    { label: "Favorites" },
  ];

  const handleNext = async () => {
    const user = auth.currentUser;
    if (!user) {
      toast.error("User is not authenticated!");
      return;
    }

    if (step === steps.length - 1) {
      // Start loading toast
      const toastId = toast.loading("Submitting your data...");

      try {
        const userDocRef = doc(db, "users", user.uid);
        const infoCollectionRef = collection(userDocRef, "Information");

        await addDoc(infoCollectionRef, formData);

        // Dismiss loading toast and show success message
        toast.dismiss(toastId);
        toast.success("Form submitted successfully! 🎉");
        router.push('/dashboard');
      } catch (error) {
        console.error("Error adding document: ", error);

        // Dismiss loading toast and show error message
        toast.dismiss(toastId);
        toast.error("Submission failed. Please try again. 😞");
      }
    } else {
      setStep((prevStep) => prevStep + 1);
    }
  };

  const handleBack = () => {
    if (step > 0) setStep((prevStep) => prevStep - 1);
  };

  const handleInputChange = (e, category) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [category]: { ...prevData[category], [name]: value },
    }));
  };

  return (
    <div className="flex flex-col items-center justify-center w-full min-h-screen py-10">
      <Toaster />
      <div className="relative p-10 bg-white rounded-lg  w-full max-w-[80vw] md:max-w-[60vw] lg:max-w-[50vw]">
        <h1 className="absolute top-0 px-8 py-2 text-2xl font-bold text-white transform -translate-x-1/2 -translate-y-1/2 rounded-full shadow-lg left-1/2 bg-gradient-to-r from-purple-500 to-pink-500">
          Fill Your Details
        </h1>

        <div className="fixed flex items-center justify-center w-[42rem] p-6 mt-12 mb-8">
          <div className="w-full h-2 bg-gray-300 rounded-full">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${((step + 1) / steps.length) * 100}%` }}
              className="h-2 rounded-full bg-gradient-to-r from-indigo-500 to-pink-500"
              transition={{ duration: 0.5, ease: "easeInOut" }}
            />
          </div>

          <div className="absolute flex justify-between w-full -translate-y-1/2 top-1/2 ">
            {steps.map((_, index) => (
              <motion.div
                key={index}
                className={`w-8 h-8 rounded-full flex items-center justify-center font-semibold 
                  ${step >= index ? "bg-purple-600 text-white shadow-lg" : "bg-gray-300 text-gray-500"}`}
                initial={{ scale: 0 }}
                animate={{ scale: step >= index ? 1.2 : 1 }}
                transition={{ duration: 0.5, ease: "easeInOut" }}
              >
                {index + 1}
              </motion.div>
            ))}
          </div>
        </div>

        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, ease: "easeInOut" }}
          key={step}
          className="space-y-6 mt-[8rem]"
        >
          {step === 0 && (
            <div>
              <h1 className="pb-6 text-3xl font-bold text-center text-indigo-700">Personal Information</h1>
              <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
                {['First Name', 'Second Name', 'Phone Number', 'Email', 'Address', 'Job'].map((label, i) => (
                  <div className="flex flex-col gap-1" key={i}>
                    <label className="text-lg font-bold text-indigo-600">{label}</label>
                    <input
                      type={label === 'Email' ? 'email' : label === 'Phone Number' ? 'tel' : 'text'}
                      placeholder={label}
                      name={label.split(' ').join('').toLowerCase()}
                      onChange={(e) => handleInputChange(e, "personalInfo")}
                      className="p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
                    />
                  </div>
                ))}
              </div>
            </div>
          )}

          {step === 1 && (
            <div>
              <h1 className="pb-6 text-3xl font-bold text-center text-indigo-700">Health Information</h1>
              <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
                {['Age', 'Height (cm)', 'Weight (kg)', 'Allergies'].map((label, i) => (
                  <div className="flex flex-col gap-1" key={i}>
                    <label className="text-lg font-bold text-indigo-600">{label}</label>
                    <input
                      type={label === 'Age' || label.includes('cm') || label.includes('kg') ? 'number' : 'text'}
                      placeholder={label}
                      name={label.split(' ').join('').toLowerCase()}
                      onChange={(e) => handleInputChange(e, "healthInfo")}
                      className="p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
                    />
                  </div>
                ))}
              </div>
            </div>
          )}

          {step === 2 && (
            <div>
              <h1 className="pb-6 text-3xl font-bold text-center text-indigo-700">Favorites</h1>
              <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
                {['Favorite Food', 'Favorite Drink', 'Favorite Playlist', 'Favorite Hero', 'Favorite Sport'].map((label, i) => (
                  <div className="flex flex-col gap-1" key={i}>
                    <label className="text-lg font-bold text-indigo-600">{label}</label>
                    <input
                      type="text"
                      placeholder={label}
                      name={label.split(' ').join('').toLowerCase()}
                      onChange={(e) => handleInputChange(e, "favorites")}
                      className="p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
                    />
                  </div>
                ))}
              </div>
            </div>
          )}
        </motion.div>

        <div className="flex justify-between mt-8">
          <button onClick={handleBack} disabled={step === 0} className="px-6 py-3 text-white bg-gray-500 rounded-md disabled:opacity-50">
            Back
          </button>
          <button onClick={handleNext} className="px-6 py-3 text-white rounded-md bg-gradient-to-r from-purple-500 to-pink-500">
            {step === steps.length - 1 ? "Submit" : "Next"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default MultiStep;
