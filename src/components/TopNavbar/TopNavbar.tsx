import { SearchIcon, BellIcon, SettingsIcon, SunIcon, MoonIcon } from "lucide-react";
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { User } from "../../screens/Dashboard";


export const TopNavbar = (): JSX.Element => {
  const [isDarkMode, setIsDarkMode] = useState(true);

  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      const parsedUser: User = JSON.parse(storedUser);
      setUser(parsedUser); // ✅ Save to state
    }
  }, []);

  // Initialize theme from localStorage or default to dark
  useEffect(() => {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
      setIsDarkMode(savedTheme === 'dark');
    } else {
      // Default to dark mode
      setIsDarkMode(true);
      localStorage.setItem('theme', 'dark');
    }
  }, []);


  // Apply theme to document
  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
      document.documentElement.classList.remove('light');
    } else {
      document.documentElement.classList.add('light');
      document.documentElement.classList.remove('dark');
    }
  }, [isDarkMode]);

  const toggleTheme = () => {
    const newTheme = !isDarkMode;
    setIsDarkMode(newTheme);
    localStorage.setItem('theme', newTheme ? 'dark' : 'light');
  };






  return (
    <div className="h-16 bg-[#0a0a0a] dark:bg-[#0a0a0a] light:bg-white border-b border-[#333333] dark:border-[#333333] light:border-gray-200 px-4 sm:px-6 flex items-center justify-between sticky top-0 z-50 transition-colors duration-300">
      {/* Logo */}
      <Link to="/dashboard" className="flex items-center">
        <div className="text-[#30bdee] dark:text-[#30bdee] light:text-blue-600 text-xl font-bold font-['Rajdhani',Helvetica] tracking-wider transition-colors duration-300">
          THE UNNAMED
        </div>
      </Link>

      {/* Search Bar */}
      <div className="flex-1 max-w-md mx-4 sm:mx-8">
        <div className="relative">
          <Input
            className="h-10 bg-[#1a1a1a] dark:bg-[#1a1a1a] light:bg-gray-100 border-[#333333] dark:border-[#333333] light:border-gray-300 rounded-lg pl-10 pr-4 font-['Rajdhani',Helvetica] font-medium text-white dark:text-white light:text-gray-900 placeholder:text-[#ffffffb2] dark:placeholder:text-[#ffffffb2] light:placeholder:text-gray-500 focus:border-[#30bdee] dark:focus:border-[#30bdee] light:focus:border-blue-500 focus:bg-[#222222] dark:focus:bg-[#222222] light:focus:bg-white transition-all text-sm"
            placeholder="Search"
          />
          <SearchIcon className="absolute w-4 h-4 top-3 left-3 text-[#ffffffb2] dark:text-[#ffffffb2] light:text-gray-500" />
        </div>
      </div>

      {/* Right Side Icons */}
      <div className="flex items-center gap-3">
        {/* Dark/Light Mode Toggle */}
        <Button
          variant="ghost"
          onClick={toggleTheme}
          className="w-10 h-10 p-0 bg-[#1a1a1a] dark:bg-[#1a1a1a] light:bg-gray-100 rounded-lg hover:bg-[#333333] dark:hover:bg-[#333333] light:hover:bg-gray-200 transition-colors group"
          title={isDarkMode ? "Switch to Light Mode" : "Switch to Dark Mode"}
        >
          {isDarkMode ? (
            <SunIcon className="w-5 h-5 text-[#ffffffb2] dark:text-[#ffffffb2] light:text-gray-600 group-hover:text-yellow-400 transition-colors" />
          ) : (
            <MoonIcon className="w-5 h-5 text-[#ffffffb2] dark:text-[#ffffffb2] light:text-gray-600 group-hover:text-blue-400 transition-colors" />
          )}
        </Button>

        {/* Notification Bell */}
        <Button
          variant="ghost"
          className="w-10 h-10 p-0 bg-[#1a1a1a] dark:bg-[#1a1a1a] light:bg-gray-100 rounded-lg hover:bg-[#333333] dark:hover:bg-[#333333] light:hover:bg-gray-200 transition-colors relative"
        >
          <BellIcon className="w-5 h-5 text-[#ffffffb2] dark:text-[#ffffffb2] light:text-gray-600" />
          {/* Notification Badge */}
          <div className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full" />
        </Button>

        {/* Settings */}
        <Button
          variant="ghost"
          className="w-10 h-10 p-0 bg-[#1a1a1a] dark:bg-[#1a1a1a] light:bg-gray-100 rounded-lg hover:bg-[#333333] dark:hover:bg-[#333333] light:hover:bg-gray-200 transition-colors"
        >
          <SettingsIcon className="w-5 h-5 text-[#ffffffb2] dark:text-[#ffffffb2] light:text-gray-600" />
        </Button>

        {/* User Avatar */}
        <Link to="/profile">
          <div className="w-10 h-10 bg-gradient-to-br from-[#30bdee] to-[#65cbff] dark:from-[#30bdee] dark:to-[#65cbff] light:from-blue-500 light:to-blue-600 rounded-lg flex items-center justify-center cursor-pointer hover:scale-105 transition-transform shadow-lg overflow-hidden">
            <img
              src={user?.image}
              alt="User Avatar"
              className="w-full h-full object-cover"
            />
          </div>
        </Link>
      </div>
    </div>
  );
};