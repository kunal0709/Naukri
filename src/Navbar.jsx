





import React, { useContext, useEffect, useState } from "react";
import { FaSearch } from "react-icons/fa";
import { HiOutlineCalendar, HiOutlineClock, HiOutlineBookmark } from "react-icons/hi";
import { Link } from "react-router-dom";
import ProfileComp from "./components/ProfileComp";
import Overlay from "./components/Overlay";
import { myContext } from "./App";

export default function Navbar() {
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [userSearch, setUserSearch] = useState("");
  const [showSuggestions, setShowSuggestions] = useState(false);
  const { jobsArray } = useContext(myContext);
  const [filteredData, setFilteredData] = useState([]);

  // --- LIVE CLOCK & DATE LOGIC ---
  const [dateTime, setDateTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setDateTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const formatDate = (date) => {
    return date.toLocaleDateString('en-US', { day: 'numeric', month: 'short' });
  };

  const formatTime = (date) => {
    return date.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: true });
  };

  // --- SEARCH LOGIC ---
  useEffect(() => {
    if (userSearch.trim() === "") {
      setShowSuggestions(false);
      return;
    }
    const filtered = jobsArray.jobs
      ?.filter(j => j.title.toLowerCase().includes(userSearch.toLowerCase()))
      .filter((j, index, arr) => index === arr.findIndex((t) => t.title === j.title));
    setFilteredData(filtered.slice(0, 8));
  }, [userSearch, jobsArray.jobs]);

  const userLoggedIn = JSON.parse(localStorage.getItem("user")) || null;

  return (
    <>
      {isProfileOpen && (
        <>
          <Overlay setIsProfileOpen={setIsProfileOpen} />
          <ProfileComp setIsProfileOpen={setIsProfileOpen} />
        </>
      )}

      <nav className="bg-white border-b border-slate-100 sticky top-0 z-50 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-20 items-center">
            
            {/* 1. LOGO & TIME WIDGET */}
            <div className="flex items-center gap-8">
              <Link to="/" className="flex items-center gap-2 group">
                <div className="w-10 h-10 bg-blue-700 rounded-xl flex items-center justify-center shadow-lg group-hover:rotate-6 transition-transform">
                  <span className="text-white font-black text-xl italic">N</span>
                </div>
                <span className="text-2xl font-black text-slate-800 hidden sm:block">Naukri</span>
              </Link>

              {/* LIVE TIME & DATE */}
              <div className="hidden xl:flex items-center gap-4 bg-slate-50 px-4 py-2 rounded-2xl border border-slate-100">
                <div className="flex items-center gap-2 text-slate-500 border-r border-slate-200 pr-4">
                  <HiOutlineCalendar className="text-blue-600" />
                  <span className="text-xs font-bold uppercase tracking-wider">{formatDate(dateTime)}</span>
                </div>
                <div className="flex items-center gap-2 text-slate-500">
                  <HiOutlineClock className="text-blue-600" />
                  <span className="text-xs font-bold uppercase tracking-wider">{formatTime(dateTime)}</span>
                </div>
              </div>
            </div>

            {/* 2. SEARCH BAR (CENTER) */}
            <div className="flex-1 max-w-md mx-8 hidden md:block relative">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Find your dream job..."
                  value={userSearch}
                  onChange={(e) => { setUserSearch(e.target.value); setShowSuggestions(true); }}
                  className="w-full pl-11 pr-4 py-2.5 bg-slate-100 border-none rounded-2xl focus:ring-2 focus:ring-blue-500/20 focus:bg-white transition-all font-medium text-sm"
                />
                <FaSearch className="absolute left-4 top-3 text-slate-400" />
              </div>
              
              {showSuggestions && (
                <div className="absolute top-full mt-2 w-full bg-white rounded-2xl shadow-2xl border border-slate-100 overflow-hidden">
                  {filteredData.map((job, i) => (
                    <Link key={i} to={`/search/${encodeURIComponent(job.title)}`} onClick={() => setShowSuggestions(false)}
                      className="block px-5 py-3 hover:bg-blue-50 text-sm font-bold text-slate-700 border-b border-slate-50 last:border-none">
                      {job.title}
                    </Link>
                  ))}
                </div>
              )}
            </div>

            {/* 3. USER ACTIONS */}
            <div className="flex items-center gap-4">
              {userLoggedIn && (
                <Link to="/savedjobs" className="p-2.5 rounded-xl text-slate-500 hover:bg-blue-50 hover:text-blue-600 transition">
                  <HiOutlineBookmark size={22} />
                </Link>
              )}

              {userLoggedIn ? (
                <button 
                  onClick={() => setIsProfileOpen(true)}
                  className="flex items-center gap-3 pl-1 pr-3 py-1 bg-white border border-slate-200 rounded-full hover:shadow-md transition shadow-sm"
                >
                  <div className="w-9 h-9 rounded-full bg-blue-700 flex items-center justify-center text-white font-bold text-sm border-2 border-white overflow-hidden">
                    {userLoggedIn.photoURL ? <img src={userLoggedIn.photoURL} alt="p" /> : userLoggedIn.displayName?.charAt(0)}
                  </div>
                  <span className="hidden lg:block text-sm font-bold text-slate-700">
                    {userLoggedIn.displayName?.split(" ")[0]}
                  </span>
                </button>
              ) : (
                <div className="flex items-center gap-2">
                  <Link to="/login" className="px-5 py-2 text-sm font-bold text-slate-600 hover:text-blue-700 transition">Login</Link>
                  <Link to="/register" className="px-5 py-2 bg-blue-700 text-white rounded-xl text-sm font-bold hover:bg-blue-800 shadow-lg shadow-blue-200 transition">Register</Link>
                </div>
              )}
            </div>

          </div>
        </div>
      </nav>
    </>
  );
}