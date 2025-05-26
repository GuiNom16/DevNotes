import React from "react";
import { Github, Linkedin } from "lucide-react";

const Footer: React.FC = () => {
  return (
    <footer className="w-full mt-12 py-6 bg-gray-100 border-t border-zinc-200 dark:bg-zinc-900 dark:border-zinc-700 text-center text-sm text-zinc-600 dark:text-zinc-400">
      <div className="flex justify-center space-x-6 mb-2">
        <a
          href="https://github.com/GuiNom16"
          target="_blank"
          rel="noopener noreferrer"
          className="hover:text-amber-600 transition"
        >
          <Github className="w-6 h-6" />
        </a>
        <a
          href="https://www.linkedin.com/in/jeremie-nombro-2749b7239/"
          target="_blank"
          rel="noopener noreferrer"
          className="hover:text-amber-600 transition"
        >
          <Linkedin className="w-6 h-6" />
        </a>
      </div>
      <p>© {new Date().getFullYear()} Jeremie Nombro. All rights reserved.</p>
    </footer>
  );
};

export default Footer;
