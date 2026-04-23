
// import React, { useContext, useEffect, useState } from "react";
// import { Link, useParams } from "react-router-dom";
// import { myContext } from "../App";
// import { useDispatch } from "react-redux";
// import { addSave } from "../applicationSlice";

// export default function Jobs() {
//   const { category } = useParams();
//   const dispatch = useDispatch();
//   const decodedCategory = decodeURIComponent(category);
//   const { jobsArray } = useContext(myContext);
//   const [filteredJobs, setFilteredJobs] = useState([]);

//   useEffect(() => {
//     const filteredArray = jobsArray?.jobs?.filter(
//       (job) => job.category === decodedCategory
//     );
//     setFilteredJobs(filteredArray);
//   }, [category, jobsArray]);

//   return (
//     <div className="min-h-screen  py-10 px-4 sm:px-6 lg:px-8">
//       <h1 className="text-3xl md:text-4xl font-bold text-blue-700 mb-8">
//         Jobs in {decodedCategory}
//       </h1>

//       {filteredJobs?.length > 0 ? (
//         <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
//           {filteredJobs.map((job) => {
//             const publishedDate = new Date(job.publication_date);
//             const now = new Date();
//             const diffMs = now - publishedDate;
//             const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));

//             return (
//               <div
//                 key={job.id}
//                 className="bg-white p-6 rounded-lg shadow-md hover:shadow-xl transition transform hover:-translate-y-1 flex flex-col justify-between"
//               >
//                 <Link
//                   to={`/applyto/${encodeURIComponent(job.category)}/${job.id}`}
//                   className="space-y-2 flex-1"
//                 >
//                   <h3 className="text-xl font-semibold text-gray-900 hover:text-blue-700 transition">
//                     {job.title}
//                   </h3>
//                   <span className="text-gray-500">{job.company_name}</span>
//                   <p className="text-gray-600 text-sm">
//                     {job.tags?.join(" , ")}
//                   </p>
//                   <p className="text-gray-600 text-sm">
//                     Salary:{" "}
//                     {job.salary === "" ? "Not disclosed" : job.salary}
//                   </p>
//                   <p className="text-gray-400 text-sm">
//                     Posted {diffDays} days ago
//                   </p>
//                 </Link>

//                 <button
//                   onClick={() => {
//                     alert("Job saved!!");
//                     dispatch(addSave({ newJob: job }));
//                   }}
//                   className="mt-4 w-full bg-blue-600 text-white font-semibold py-2 rounded-lg shadow hover:bg-blue-700 transition"
//                 >
//                   Save
//                 </button>
//               </div>
//             );
//           })}
//         </div>
//       ) : (
//         <p className="text-center text-gray-500 text-lg animate-pulse">
//           Try again later...
//         </p>
//       )}
//     </div>
//   );
// }















import React, { useContext, useEffect, useState } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import { myContext } from "../App";
import { useDispatch } from "react-redux";
import { addSave } from "../applicationSlice";
import { HiOutlineBookmark, HiOutlineClock, HiOutlineCurrencyDollar, HiOutlineArrowLeft, HiOutlineBriefcase } from "react-icons/hi";

export default function Jobs() {
  const { category } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const decodedCategory = decodeURIComponent(category);
  const { jobsArray } = useContext(myContext);
  const [filteredJobs, setFilteredJobs] = useState([]);

  useEffect(() => {
    const filteredArray = jobsArray?.jobs?.filter(
      (job) => job.category === decodedCategory
    );
    setFilteredJobs(filteredArray);
  }, [category, jobsArray]);

  return (
    <div className="min-h-screen bg-slate-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        
        {/* --- HEADER SECTION --- */}
        <div className="mb-10 flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div>
            <button 
              onClick={() => navigate("/")}
              className="flex items-center gap-2 text-slate-500 hover:text-blue-600 font-bold text-sm mb-4 transition-colors"
            >
              <HiOutlineArrowLeft /> All Categories
            </button>
            <h1 className="text-4xl md:text-5xl font-black text-slate-900 tracking-tight">
              {decodedCategory} <span className="text-blue-600">Roles.</span>
            </h1>
            <p className="text-slate-500 mt-2 font-medium">
              Showing {filteredJobs?.length || 0} active opportunities
            </p>
          </div>
          
          <div className="hidden md:block">
            <span className="px-4 py-2 bg-white rounded-xl border border-slate-200 text-xs font-black uppercase tracking-widest text-slate-400">
              Live Updates
            </span>
          </div>
        </div>

        {/* --- JOBS GRID --- */}
        {filteredJobs?.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredJobs.map((job) => {
              const publishedDate = new Date(job.publication_date);
              const now = new Date();
              const diffMs = now - publishedDate;
              const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));

              return (
                <div
                  key={job.id}
                  className="group relative bg-white rounded-[2rem] p-8 border border-slate-100 shadow-sm hover:shadow-2xl hover:shadow-blue-900/5 hover:border-blue-200 transition-all duration-300 flex flex-col h-full"
                >
                  {/* Top Badges */}
                  <div className="flex justify-between items-start mb-6">
                    <div className="w-12 h-12 bg-blue-50 rounded-2xl flex items-center justify-center text-blue-600 group-hover:bg-blue-600 group-hover:text-white transition-colors duration-300">
                      <HiOutlineBriefcase size={24} />
                    </div>
                    <button
                      onClick={() => {
                        dispatch(addSave({ newJob: job }));
                        // Professional Toast style alert logic can be added here
                      }}
                      className="p-2.5 rounded-full bg-slate-50 text-slate-400 hover:bg-red-50 hover:text-red-500 transition-colors"
                      title="Save Job"
                    >
                      <HiOutlineBookmark size={20} />
                    </button>
                  </div>

                  {/* Content */}
                  <Link
                    to={`/applyto/${encodeURIComponent(job.category)}/${job.id}`}
                    className="flex-1"
                  >
                    <h3 className="text-xl font-black text-slate-800 leading-tight mb-2 group-hover:text-blue-600 transition-colors">
                      {job.title}
                    </h3>
                    <p className="text-blue-600 font-bold text-sm mb-4">
                      {job.company_name}
                    </p>
                    
                    {/* Tags */}
                    <div className="flex flex-wrap gap-2 mb-6">
                      {job.tags?.slice(0, 3).map((tag, i) => (
                        <span key={i} className="px-3 py-1 bg-slate-50 text-slate-500 text-[10px] font-black uppercase tracking-wider rounded-lg border border-slate-100">
                          {tag}
                        </span>
                      ))}
                    </div>

                    {/* Meta Info */}
                    <div className="space-y-3 pt-6 border-t border-slate-50">
                      <div className="flex items-center gap-2 text-slate-500 text-sm font-medium">
                        <HiOutlineCurrencyDollar className="text-blue-500" />
                        <span>{job.salary || "Competitive Pay"}</span>
                      </div>
                      <div className="flex items-center gap-2 text-slate-400 text-xs font-bold uppercase tracking-wide">
                        <HiOutlineClock className="text-blue-500" />
                        <span>Posted {diffDays === 0 ? "Today" : `${diffDays} days ago`}</span>
                      </div>
                    </div>
                  </Link>

                  {/* Footer Action */}
                  <Link
                    to={`/applyto/${encodeURIComponent(job.category)}/${job.id}`}
                    className="mt-8 w-full py-4 bg-slate-900 text-white text-center font-black text-sm rounded-2xl hover:bg-blue-600 transition-all active:scale-95"
                  >
                    View Details
                  </Link>
                </div>
              );
            })}
          </div>
        ) : (
          <div className="text-center py-32">
            <div className="inline-block p-6 bg-white rounded-full shadow-inner mb-6">
              <HiOutlineBriefcase className="text-slate-200 text-6xl" />
            </div>
            <h3 className="text-2xl font-black text-slate-800">No jobs found in this category</h3>
            <p className="text-slate-500 mt-2">Check back later for new opportunities.</p>
            <button 
              onClick={() => navigate("/")}
              className="mt-8 px-8 py-3 bg-blue-600 text-white font-bold rounded-xl hover:bg-blue-700 transition shadow-lg shadow-blue-200"
            >
              Explore Categories
            </button>
          </div>
        )}
      </div>
    </div>
  );
}