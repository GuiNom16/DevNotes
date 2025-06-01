// WorkInProgressPage.tsx
import React from "react";
import { useNavigate } from "react-router-dom";
import Lottie from "lottie-react";
import wipAnimation from "../assets/lottie/lottie_WIP.json"; // Adjust path

const WorkInProgressPage = () => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-white dark:bg-gray-900">
      <div>
        <Lottie animationData={wipAnimation} loop autoplay />
      </div>
      <h1 className="text-2xl font-semibold mt-4 text-gray-800 dark:text-gray-100">
        Work in Progress
      </h1>
      <p className="text-gray-600 dark:text-gray-300 mt-2 text-center px-4">
        This feature is under construction. Stay tuned!
      </p>
      <button
        onClick={() => navigate("/")}
        className="mt-6 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
      >
        Back to Home
      </button>
    </div>
  );
};

export default WorkInProgressPage;
