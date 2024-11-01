"use client"
import { useEffect, useState } from "react";
import Lottie from "lottie-react";
import walkingAnimation from "../../Assets/Animations/walking.json"; 

const WalkingMonitor = () => {
  const [timeElapsed, setTimeElapsed] = useState(0); // Time in seconds
  const [level, setLevel] = useState("Inactive");
  const [isActive, setIsActive] = useState(false);

  // Determine level based on elapsed time
  const getWalkingLevel = (seconds) => {
    if (seconds >= 20 * 60) return "High";
    if (seconds >= 10 * 60) return "Moderate";
    if (seconds >= 5 * 60) return "Low";
    return "Inactive";
  };

  const toggleActive = () => setIsActive(!isActive);
  const reset = () => {
    setTimeElapsed(0);
    setLevel("Inactive");
    setIsActive(false);
  };

  useEffect(() => {
    if (isActive) {
      const interval = setInterval(() => {
        setTimeElapsed((prev) => prev + 1);
        setLevel(getWalkingLevel(timeElapsed + 1));
      }, 1000);
      return () => clearInterval(interval);
    }
  }, [isActive, timeElapsed]);

  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${minutes.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-6 ">
      <h1 className="mb-4 text-3xl font-bold">Walking Monitor</h1>

      <div className="relative p-6 text-center bg-white rounded-lg w-80">
        <Lottie animationData={walkingAnimation} loop={true} className="w-[20rem] h-[20rem] mx-auto mb-4 bg-violet-300 bg-opacity-10 rounded-full" />
        <p className="text-lg font-semibold">Time Elapsed: {formatTime(timeElapsed)}</p>
        <p className={`text-lg mt-2 ${
          level === "High" ? "text-red-500" : level === "Moderate" ? "text-yellow-500" : level === "Low" ? "text-green-500" : "text-gray-500"
        }`}>
          Level: {level}
        </p>

        <div className="flex justify-between gap-10 mt-6">
          <button onClick={toggleActive} className="px-4 py-2 text-white bg-blue-500 rounded-lg hover:bg-blue-600 text-[20px] w-[10rem]">
            {isActive ? "Pause" : "Start"}
          </button>
          <button onClick={reset} className="px-4 py-2 text-gray-700 bg-gray-300 rounded-lg hover:bg-gray-400 text-[20px] w-[10rem]">Reset</button>
        </div>
      </div>
    </div>
  );
};

export default WalkingMonitor;
