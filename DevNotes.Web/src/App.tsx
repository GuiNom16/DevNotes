import React, { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import NotesPage from "./pages/NotesPage";
import WorkInProgressPage from "./pages/WorkInProgressPage";
import Header from "./components/Header";
import Footer from "./components/Footer";

const App: React.FC = () => {
  const [isDarkMode, setIsDarkMode] = useState(true);

  return (
    <BrowserRouter>
      <div className={isDarkMode ? "dark" : ""}>
        <div className="min-h-screen bg-white text-black dark:bg-[#242424] dark:text-gray-100 transition-colors flex flex-col">
          <Header
            isDarkMode={isDarkMode}
            toggleDarkMode={() => setIsDarkMode(!isDarkMode)}
            isSignedIn={true}
            onAuthToggle={() => {}}
          />

          {/* Page Content */}
          <main className="flex-1">
            <Routes>
              <Route path="/" element={<NotesPage />} />
              <Route path="/wip" element={<WorkInProgressPage />} />
            </Routes>
          </main>

          <Footer />
        </div>
      </div>
    </BrowserRouter>
  );
};

export default App;
