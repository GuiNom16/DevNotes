import React, { useState } from "react";
import NotesPage from "./features/notes/components/NotesPage";
import Header from "./components/Header";
import Footer from "./components/Footer";

const App: React.FC = () => {
  const [isDarkMode, setIsDarkMode] = useState(true);

  return (
    <div className={isDarkMode ? "dark" : ""}>
      <div className="min-h-screen bg-white text-black dark:bg-[#242424] dark:text-gray-100 transition-colors">
        <Header
          isDarkMode={isDarkMode}
          toggleDarkMode={() => setIsDarkMode(!isDarkMode)}
          isSignedIn={true}
          onAuthToggle={() => {}}
        />
        <NotesPage />
        <Footer />
      </div>
    </div>
  );
};

export default App;
