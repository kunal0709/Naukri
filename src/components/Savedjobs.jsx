






import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { removeSave, setSavedJobs } from '../applicationSlice';
import { Link, useNavigate } from 'react-router-dom';
import { HiOutlineBookmark, HiOutlineTrash, HiOutlineCurrencyDollar, HiOutlineLocationMarker, HiOutlineArrowLeft, HiOutlineSearch } from 'react-icons/hi';

export default function Savedjobs() {
  const { savedJobs } = useSelector(state => state.applicationHistory);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  
  const [savedJobss, setSavedJob] = useState(() => {
    const jobs = JSON.parse(localStorage.getItem("savedJobs")) || [];
    return jobs;
  });

  useEffect(() => {
    const jobs = JSON.parse(localStorage.getItem("savedJobs")) || [];
    dispatch(setSavedJobs(jobs));
  }, [dispatch]);

  useEffect(() => {
    setSavedJob(savedJobs || []);
  }, [savedJobs]);

  useEffect(() => {
    localStorage.setItem("savedJobs", JSON.stringify(savedJobss));
  }, [savedJobss]);

  const handleRemove = (index) => {
    const updatedJobs = savedJobss.filter((_, i) => i !== index);
    setSavedJob(updatedJobs);
    dispatch(removeSave({ index }));
  };

  return (
    <div className="min-h-screen bg-[#fcfdff] py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        
        {/* --- HEADER --- */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <button 
              onClick={() => navigate(-1)}
              className="flex items-center gap-2 text-slate-400 hover:text-blue-600 font-bold text-xs uppercase tracking-[0.2em] mb-4 transition-all"
            >
              <HiOutlineArrowLeft /> Go Back
            </button>
            <div className="flex items-center gap-4">
              <h1 className="text-4xl md:text-5xl font-black text-slate-900 tracking-tight">
                Saved <span className="text-blue-600">Jobs</span>
              </h1>
              <span className="bg-blue-600 text-white px-3 py-1 rounded-full text-xs font-black">
                {savedJobss.length}
              </span>
            </div>
          </div>
        </div>

        {/* --- CONTENT --- */}
        {savedJobss.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {savedJobss.map((job, index) => (
              <div
                key={job.id || index}
                className="group bg-white rounded-[2.5rem] p-8 border border-slate-100 shadow-sm hover:shadow-2xl hover:shadow-blue-900/5 transition-all duration-500 flex flex-col justify-between relative overflow-hidden"
              >
                {/* Decoration */}
                <div className="absolute top-0 right-0 w-24 h-24 bg-blue-50/50 rounded-bl-[3rem] -z-0 group-hover:bg-blue-600 transition-colors duration-500"></div>
                <HiOutlineBookmark className="absolute top-6 right-6 text-blue-600 group-hover:text-white transition-colors duration-500" size={24} />

                <div className="relative z-10">
                  <Link
                    to={`/applyto/${encodeURIComponent(job?.category)}/${job?.id}`}
                    className="block space-y-4"
                  >
                    <div className="pr-10">
                      <h3 className="text-xl font-black text-slate-800 group-hover:text-blue-600 transition-colors leading-tight mb-1">
                        {job.title}
                      </h3>
                      <p className="text-blue-600 font-bold text-sm tracking-wide uppercase">
                        {job.company_name}
                      </p>
                    </div>

                    <div className="flex flex-wrap gap-2">
                      {job.tags?.slice(0, 2).map((tag, i) => (
                        <span key={i} className="px-3 py-1 bg-slate-50 text-slate-500 text-[10px] font-black uppercase tracking-widest rounded-lg border border-slate-100">
                          {tag}
                        </span>
                      ))}
                    </div>

                    <div className="pt-4 space-y-2 border-t border-slate-50">
                      <div className="flex items-center gap-2 text-slate-500 text-sm font-bold">
                        <HiOutlineCurrencyDollar className="text-blue-500" />
                        <span>{job.salary || "Not Disclosed"}</span>
                      </div>
                      <div className="flex items-center gap-2 text-slate-500 text-sm font-bold">
                        <HiOutlineLocationMarker className="text-blue-500" />
                        <span>{job.candidate_required_location || "Remote"}</span>
                      </div>
                    </div>
                  </Link>
                </div>

                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    handleRemove(index);
                  }}
                  className="mt-8 w-full flex items-center justify-center gap-2 py-4 bg-slate-50 text-slate-400 font-black text-xs uppercase tracking-widest rounded-2xl hover:bg-red-50 hover:text-red-600 transition-all active:scale-95"
                >
                  <HiOutlineTrash size={18} /> Remove from Saved
                </button>
              </div>
            ))}
          </div>
        ) : (
          /* --- EMPTY STATE --- */
          <div className="flex flex-col items-center justify-center py-32 bg-white rounded-[3rem] border border-dashed border-slate-200 shadow-inner">
            <div className="w-24 h-24 bg-slate-50 rounded-full flex items-center justify-center text-slate-200 mb-6">
              <HiOutlineSearch size={48} />
            </div>
            <h3 className="text-2xl font-black text-slate-800">No jobs saved yet</h3>
            <p className="text-slate-500 mt-2 font-medium">Browse our latest listings and find your dream role.</p>
            <Link to="/">
              <button className="mt-8 px-10 py-4 bg-blue-600 text-white font-black rounded-2xl shadow-xl shadow-blue-200 hover:bg-blue-700 transition-all hover:-translate-y-1 active:scale-95">
                Start Exploring
              </button>
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}