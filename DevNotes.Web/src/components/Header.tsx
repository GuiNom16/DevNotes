import React from "react";
import { Moon, Sun, LogIn, LogOut } from "lucide-react";
import { useNavigate } from "react-router-dom";

interface HeaderProps {
  isDarkMode: boolean;
  toggleDarkMode: () => void;
  isSignedIn: boolean;
  onAuthToggle: () => void;
}

const Header: React.FC<HeaderProps> = ({
  isDarkMode,
  toggleDarkMode,
  isSignedIn,
  onAuthToggle,
}) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    onAuthToggle(); // Optional: If you still want to call this for state update
    navigate("/wip");
  };

  return (
    <header className="w-full bg-gray-100 text-zinc-800 dark:bg-zinc-900 dark:text-gray-100 px-6 py-4 flex items-center justify-between shadow-md transition-colors">
      {/* Left - Logo */}
      <div className="text-xl font-semibold tracking-wide">📝 DevNotes</div>

      {/* Right - Dark mode & Auth */}
      <div className="flex items-center gap-4">
        <button
          onClick={toggleDarkMode}
          className="p-2 rounded hover:bg-zinc-200 dark:hover:bg-zinc-700 transition"
          title="Toggle Dark Mode"
        >
          {isDarkMode ? <Sun size={20} /> : <Moon size={20} />}
        </button>

        <button
          onClick={isSignedIn ? handleLogout : onAuthToggle}
          className="p-2 rounded hover:bg-zinc-200 dark:hover:bg-zinc-700 transition"
          title={isSignedIn ? "Sign Out" : "Sign In"}
        >
          {isSignedIn ? <LogOut size={20} /> : <LogIn size={20} />}
        </button>
      </div>
    </header>
  );
};

export default Header;
