







// import React, { useContext, useEffect, useState } from 'react';
// import { useSelector } from 'react-redux';
// import { myContext } from '../App';
// import { Link } from 'react-router-dom';
// import { GiPreviousButton, GiNextButton } from "react-icons/gi";

// export default function Home() {

//   const isLoggedIn = useSelector(state => state.login.isLoggedIn);
//   const { jobsArray } = useContext(myContext);

//   const [jobCategory, setJobCategory] = useState([]);
//   const [hiringCompanies, setHiringCompanies] = useState([]);
//   const [startIndex, setStartIndex] = useState(0);
//   const [companiesToShow, setCompaniesToShow] = useState([]);

//   // ---------- SLIDER CONTROLS ----------

//   function nextSlide() {
//     if (startIndex + 12 < hiringCompanies.length) {
//       setStartIndex(prev => prev + 1);
//     }
//   }

//   function prevSlide() {
//     if (startIndex > 0) {
//       setStartIndex(prev => prev - 1);
//     }
//   }

//   // ---------- JOB CATEGORY COUNT ----------

//   useEffect(() => {
//     if (!jobsArray?.jobs?.length) return;

//     const categoryMap = {};

//     jobsArray.jobs.forEach((job) => {
//       categoryMap[job.category] = (categoryMap[job.category] || 0) + 1;
//     });

//     const updatedCategories = Object.entries(categoryMap).map(
//       ([category, count]) => ({
//         category,
//         numofjobs: count
//       })
//     );

//     setJobCategory(updatedCategories);
//   }, [jobsArray]);

//   // ---------- TOP COMPANIES ----------

//   useEffect(() => {
//     if (!jobsArray?.jobs?.length) return;

//     const uniqueCompanies = [
//       ...new Set(jobsArray.jobs.map(job => job.company_name).filter(Boolean))
//     ];

//     setHiringCompanies(uniqueCompanies);

//   }, [jobsArray]);

//   // ---------- SLIDER DATA ----------

//   useEffect(() => {
//     if (hiringCompanies.length > 0) {
//       const slice = hiringCompanies.slice(startIndex, startIndex + 12);
//       setCompaniesToShow(slice);
//     }
//   }, [hiringCompanies, startIndex]);

//   // ---------- UI ----------

//   return (
//     <div className="min-h-screen bg-#fffff">

//       {/* MAIN CONTENT */}
//       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-16 pb-36">

//         {/* JOB CATEGORIES */}
//         <section>

//           <h1 className="text-3xl md:text-4xl font-bold text-blue-700 mb-6">
//             Job Categories
//           </h1>

//           <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">

//             {jobCategory.length > 0 ? (

//               jobCategory.map((job, index) => (

//                 <Link
//                   to={`/jobs/${encodeURIComponent(job.category)}`}
//                   key={index}
//                   className="bg-white p-6 rounded-xl shadow-md hover:shadow-xl transition transform hover:-translate-y-1"
//                 >

//                   <h2 className="text-xl font-semibold text-gray-800">
//                     {job.category}
//                   </h2>

//                   <p className="text-gray-500 mt-2">
//                     Around {job.numofjobs} jobs
//                   </p>

//                 </Link>

//               ))

//             ) : (

//               <p className="text-gray-500">Loading...</p>

//             )}

//           </div>

//         </section>

//       </div>


//       {/* ---------------- STICKY + SCROLLABLE TOP COMPANIES BAR ---------------- */}

//       <section className="fixed bottom-0 left-0 w-full bg-white shadow-lg">

//         <div className="max-w-7xl mx-auto px-4 py-3">

//           <h4 className="text-lg md:text-xl font-bold text-blue-700 mb-2 text-center">
//             Top Hiring Companies
//           </h4>


//           <div className="relative flex items-center">

//             {/* PREVIOUS BUTTON (HIDDEN ON MOBILE) */}
//             <button
//               onClick={prevSlide}
//               disabled={startIndex === 0}
//               className="absolute left-0 p-2 bg-white shadow-md rounded-full hover:bg-blue-100 transition disabled:opacity-50 disabled:cursor-not-allowed z-10 hidden md:flex"
//             >
//               <GiPreviousButton className="text-xl text-blue-700" />
//             </button>


//             {/* COMPANIES LIST */}
//             <ul className="flex space-x-4 px-12 py-2 w-full overflow-x-scroll scroll-smooth snap-x snap-mandatory no-scrollbar touch-pan-x select-none">

//               {companiesToShow.length > 0 ? (

//                 companiesToShow.map((company, index) => (

//                   <Link
//                     key={index}
//                     to={`/top-hiring-company/${encodeURIComponent(company)}`}
//                   >

//                     <li className="min-w-[170px] snap-start bg-blue-50 p-3 rounded-lg shadow hover:shadow-lg hover:bg-blue-100 transition text-center text-gray-800 font-medium cursor-pointer">

//                       {company}

//                     </li>

//                   </Link>

//                 ))

//               ) : (

//                 <span className="text-gray-500">Loading...</span>

//               )}

//             </ul>


//             {/* NEXT BUTTON (HIDDEN ON MOBILE) */}
//             <button
//               onClick={nextSlide}
//               disabled={startIndex + 12 >= hiringCompanies.length}
//               className="absolute right-0 p-2 bg-white shadow-md rounded-full hover:bg-blue-100 transition disabled:opacity-50 disabled:cursor-not-allowed z-10 hidden md:flex"
//             >
//               <GiNextButton className="text-xl text-blue-700" />
//             </button>

//           </div>

//         </div>

//       </section>

//     </div>
//   );
// }











import React, { useContext, useEffect, useState } from 'react';
import { myContext } from '../App';
import { Link } from 'react-router-dom';
import { GiPreviousButton, GiNextButton } from "react-icons/gi";
import { HiOutlineArrowRight, HiOutlineViewGrid, HiOutlineOfficeBuilding } from "react-icons/hi";

export default function Home() {
  const { jobsArray } = useContext(myContext);
  const [jobCategory, setJobCategory] = useState([]);
  const [hiringCompanies, setHiringCompanies] = useState([]);
  const [startIndex, setStartIndex] = useState(0);
  const [companiesToShow, setCompaniesToShow] = useState([]);

  useEffect(() => {
    if (!jobsArray?.jobs?.length) return;
    const categoryMap = jobsArray.jobs.reduce((acc, job) => {
      acc[job.category] = (acc[job.category] || 0) + 1;
      return acc;
    }, {});
    setJobCategory(Object.entries(categoryMap).map(([category, count]) => ({ category, numofjobs: count })));
    setHiringCompanies([...new Set(jobsArray.jobs.map(j => j.company_name).filter(Boolean))]);
  }, [jobsArray]);

  useEffect(() => {
    setCompaniesToShow(hiringCompanies.slice(startIndex, startIndex + 12));
  }, [hiringCompanies, startIndex]);

  const nextSlide = () => startIndex + 12 < hiringCompanies.length && setStartIndex(prev => prev + 1);
  const prevSlide = () => startIndex > 0 && setStartIndex(prev => prev - 1);

  return (
    <div className="min-h-screen bg-[#fcfdff] text-slate-900 pb-32 overflow-x-hidden">
      
      {/* --- BACKGROUND DECORATION --- */}
      <div className="absolute top-0 right-0 w-[50%] h-[500px] bg-gradient-to-bl from-blue-50/50 to-transparent -z-10 rounded-bl-[100px]"></div>
      <div className="absolute top-20 left-10 w-64 h-64 bg-indigo-50/50 blur-3xl rounded-full -z-10"></div>

      {/* --- 1. HERO SECTION --- */}
      <section className="max-w-7xl mx-auto px-6 pt-24 pb-16 relative">
        <div className="flex flex-col md:flex-row items-center justify-between gap-12">
          <div className="max-w-2xl text-center md:text-left">
            <span className="inline-block px-4 py-1.5 mb-6 text-xs font-black uppercase tracking-widest text-blue-700 bg-blue-50 rounded-full border border-blue-100">
              ⚡ 100+ New Openings Today
            </span>
            <h1 className="text-5xl md:text-7xl font-black tracking-tighter leading-[1.1] text-slate-900 mb-8">
              Unlock Your <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-500">
                Career Path.
              </span>
            </h1>
            <p className="text-slate-500 text-lg md:text-xl font-medium leading-relaxed max-w-lg mb-10">
              Duniya ki top companies mein apni jagah banayein. Browse karein categories aur aaj hi apply karein.
            </p>
            <div className="flex flex-wrap gap-4 justify-center md:justify-start">
              <button className="px-8 py-4 bg-blue-600 text-white font-bold rounded-2xl shadow-xl shadow-blue-200 hover:bg-blue-700 transition-all hover:-translate-y-1">
                Explore Jobs
              </button>
              <button className="px-8 py-4 bg-white text-slate-700 font-bold rounded-2xl border border-slate-200 hover:bg-slate-50 transition-all">
                Post a Job
              </button>
            </div>
          </div>

          <div className="hidden lg:block relative">
            <div className="w-96 h-96 bg-white border border-slate-100 rounded-[3rem] shadow-2xl rotate-3 flex items-center justify-center relative overflow-hidden group">
               <div className="absolute inset-0 bg-blue-600/5 group-hover:scale-110 transition-transform duration-500"></div>
               <HiOutlineViewGrid className="text-blue-600/20 text-[15rem]" />
               <div className="absolute bottom-10 left-10 right-10 p-6 bg-white/80 backdrop-blur-md rounded-2xl border border-white shadow-lg">
                 <p className="font-bold text-slate-800">Popular Choice</p>
                 <p className="text-xs text-slate-500 uppercase font-black tracking-widest mt-1">Software Engineering</p>
               </div>
            </div>
          </div>
        </div>
      </section>

      {/* --- 2. JOB CATEGORIES --- */}
      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="flex items-center gap-4 mb-12">
          <h2 className="text-sm font-black text-slate-400 uppercase tracking-[0.3em]">
            Browse Categories
          </h2>
          <div className="h-px flex-1 bg-slate-100"></div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {jobCategory.map((job, index) => (
            <Link
              key={index}
              to={`/jobs/${encodeURIComponent(job.category)}`}
              className="group relative bg-white p-8 rounded-[2rem] border border-slate-100 shadow-sm hover:shadow-2xl hover:shadow-blue-900/5 hover:border-blue-400/30 transition-all duration-500 overflow-hidden"
            >
              {/* Card Decor */}
              <div className="absolute -top-10 -right-10 w-24 h-24 bg-blue-50 rounded-full group-hover:scale-[3] transition-transform duration-700 -z-0"></div>
              
              <div className="relative z-10 flex flex-col h-full">
                <div className="w-12 h-12 bg-blue-600 rounded-xl flex items-center justify-center text-white mb-6 shadow-lg shadow-blue-200">
                  <HiOutlineViewGrid size={24} />
                </div>
                <h3 className="text-xl font-black text-slate-800 mb-2 leading-tight">
                  {job.category}
                </h3>
                <div className="mt-6 flex items-center justify-between">
                  <span className="text-xs font-black text-blue-600 uppercase tracking-widest bg-blue-50 px-3 py-1 rounded-lg">
                    {job.numofjobs} Openings
                  </span>
                  <div className="p-2 rounded-full bg-slate-50 text-slate-400 group-hover:bg-blue-600 group-hover:text-white transition-all">
                    <HiOutlineArrowRight size={18} />
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>

      {/* --- 3. PREMIUM FOOTER DOCK --- */}
      <footer className="fixed bottom-6 left-1/2 -translate-x-1/2 w-[95%] max-w-6xl z-50">
        <div className="bg-slate-900/95 backdrop-blur-xl rounded-[2.5rem] p-4 border border-white/10 shadow-2xl">
          <div className="flex flex-col md:flex-row items-center gap-6">
            
            <div className="shrink-0 flex items-center gap-3 pl-4 border-r border-white/10 pr-8 hidden md:flex">
              <HiOutlineOfficeBuilding className="text-blue-400 text-2xl" />
              <div>
                <p className="text-[10px] font-black text-white uppercase tracking-widest">Global</p>
                <p className="text-[10px] font-black text-blue-400 uppercase tracking-widest">Partners</p>
              </div>
            </div>

            <div className="flex items-center w-full relative group gap-2">
              <button 
                onClick={prevSlide} 
                disabled={startIndex === 0}
                className="p-3 rounded-full bg-white/5 text-white hover:bg-blue-600 disabled:opacity-0 transition-all shadow-xl"
              >
                <GiPreviousButton size={20} />
              </button>

              <div className="flex items-center space-x-3 overflow-x-auto no-scrollbar scroll-smooth px-2 py-1 flex-1">
                {companiesToShow.map((company, index) => (
                  <Link
                    key={index}
                    to={`/top-hiring-company/${encodeURIComponent(company)}`}
                    className="shrink-0 px-6 py-2.5 rounded-2xl bg-white/5 border border-white/5 text-xs font-bold text-slate-300 hover:bg-white hover:text-slate-900 transition-all hover:scale-105 active:scale-95"
                  >
                    {company}
                  </Link>
                ))}
              </div>

              <button 
                onClick={nextSlide} 
                disabled={startIndex + 12 >= hiringCompanies.length}
                className="p-3 rounded-full bg-white/5 text-white hover:bg-blue-600 disabled:opacity-0 transition-all shadow-xl"
              >
                <GiNextButton size={20} />
              </button>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}