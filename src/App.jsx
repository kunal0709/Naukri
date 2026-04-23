import React, { createContext, useEffect, useState } from 'react';
import Navbar from './Navbar.jsx';
import { Route, Routes } from 'react-router-dom';
import Home from './components/Home';
import Settings from './components/Settings';
import Jobs from './components/Jobs.jsx';
import ApplySection from './components/ApplySection';
import TopCompanydata from './components/TopCompanyData';
import Register from './components/Register';
import TitleJob from './components/TitleJob';
import Savedjobs from './components/Savedjobs';
import ApplicationHistory from './components/ApplicationHistory'


export const myContext = createContext();

export default function App() {
  const [jobsArray, setJobs] = useState([]);

  useEffect(() => {
    async function gettingJobs() {
      fetch('https://remotive.com/api/remote-jobs?category=all&limit=200')
        .then(res => res.json())
        .then(data => {
          setJobs(data);
        })
        .catch(err => console.error(err));
    }
    gettingJobs();
  }, []);

  return (
    <div className="min-h-screen bg-linear-to-b from-blue-300 via-white to-#FFFFFF">
      <myContext.Provider value={{ jobsArray }}>
        {/* Navbar always visible */}
        <Navbar />

        {/* Main Content */}
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 md:py-10 space-y-10">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/help-centre" element={<Settings />} />
            <Route path="/jobs/:category" element={<Jobs />} />
            <Route path="/applyto/:category/:id" element={<ApplySection />} />
            <Route path="/top-hiring-company/:company" element={<TopCompanydata />} />
            <Route path="/register" element={<Register />} />
            <Route path="/search/:title" element={<TitleJob />} />
            <Route path="/savedjobs" element={<Savedjobs />} />
            <Route path="/application-history" element={<ApplicationHistory />} />

          </Routes>
        </main>
      </myContext.Provider>
    </div>
  );
}
