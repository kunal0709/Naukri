
  // import React, { useContext, useEffect, useState } from "react";
  // import { useParams } from "react-router-dom";
  // import { myContext } from "../App";
  // import { useDispatch } from "react-redux";
  // import { addJob } from "../applicationSlice";

  // export default function TopCompanydata() {
  //   const { company } = useParams();
  //   const decodeCompany = decodeURIComponent(company).toLowerCase().trim();
  //   const dispatch = useDispatch();
  //   const { jobsArray } = useContext(myContext);

  //   const [jobsAvailable, setJobsAvailable] = useState([]);
  //   const [loading, setLoading] = useState(true);

  //   useEffect(() => {
  //     if (!jobsArray?.jobs?.length) return;

  //     const filtered = jobsArray.jobs.filter(job => {
  //       if (!job.company_name) return false;
  //       return job.company_name.toLowerCase().includes(decodeCompany);
  //     });

  //     setJobsAvailable(filtered);
  //     setLoading(false);
  //   }, [jobsArray, decodeCompany]);

  //   if (loading) {
  //     return (
  //       <p className="text-center text-gray-500 text-lg animate-pulse mt-10">
  //         Loading...
  //       </p>
  //     );
  //   }

  //   return (
  //     <div className="min-h-screen bg-gray-50 py-10 px-4 sm:px-6 lg:px-8">
  //       <h1 className="text-3xl md:text-4xl font-bold text-blue-700 mb-8 ">
  //         Jobs at {decodeCompany.charAt(0).toUpperCase() + decodeCompany.slice(1)}
  //       </h1>

  //       {jobsAvailable.length > 0 ? (
  //         <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
  //           {jobsAvailable.map((job) => (
  //             <div
  //               key={job.id}
  //               className="bg-white p-6 rounded-lg shadow-md hover:shadow-xl transition transform hover:-translate-y-1 flex flex-col justify-between"
  //             >
  //               <h2 className="text-xl font-semibold text-gray-800">{job.title}</h2>
  //               <p className="text-gray-500 mt-1">{job.company_name}</p>
  //               <div
  //                 className="text-gray-600 text-sm mt-2 overflow-hidden"
  //                 dangerouslySetInnerHTML={{ __html: job.description }}
  //               />
  //               <a
  //                 href={job.url}
  //                 target="_blank"
  //                 rel="noreferrer"
  //                 onClick={() => dispatch(addJob(job))}
  //                 className="mt-4 inline-block text-center bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-lg transition shadow-lg"
  //               >
  //                 Apply Now
  //               </a>
  //             </div>
  //           ))}
  //         </div>
  //       ) : (
  //         <p className="text-center text-gray-500 text-lg mt-10 animate-pulse">
  //           No jobs found for {decodeCompany}
  //         </p>
  //       )}
  //     </div>
  //   );
  // }




  import React, { useContext, useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { myContext } from "../App";
import { useDispatch } from "react-redux";
import { addJob } from "../applicationSlice";
import { HiOutlineOfficeBuilding, HiOutlineArrowLeft, HiOutlineBriefcase, HiOutlineExternalLink } from "react-icons/hi";

export default function TopCompanydata() {
  const { company } = useParams();
  const navigate = useNavigate();
  const decodeCompany = decodeURIComponent(company).toLowerCase().trim();
  const dispatch = useDispatch();
  const { jobsArray } = useContext(myContext);

  const [jobsAvailable, setJobsAvailable] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!jobsArray?.jobs?.length) return;

    const filtered = jobsArray.jobs.filter(job => {
      if (!job.company_name) return false;
      return job.company_name.toLowerCase().includes(decodeCompany);
    });

    setJobsAvailable(filtered);
    setLoading(false);
  }, [jobsArray, decodeCompany]);

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-slate-50">
        <div className="w-12 h-12 border-4 border-blue-600/20 border-t-blue-600 rounded-full animate-spin mb-4"></div>
        <p className="text-slate-400 font-black uppercase tracking-widest text-xs animate-pulse">
          Fetching Company Insights...
        </p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#f8fafc] py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        
        {/* --- DYNAMIC HEADER --- */}
        <div className="mb-12 relative">
          <button 
            onClick={() => navigate(-1)}
            className="flex items-center gap-2 text-slate-400 hover:text-blue-600 font-bold text-xs uppercase tracking-widest mb-6 transition-all"
          >
            <HiOutlineArrowLeft /> Explore More Companies
          </button>
          
          <div className="flex flex-col md:flex-row items-start md:items-center gap-6 bg-white p-8 rounded-[2.5rem] border border-slate-100 shadow-xl shadow-blue-900/5">
            <div className="w-20 h-20 bg-blue-600 rounded-3xl flex items-center justify-center text-white shadow-lg shadow-blue-200 shrink-0">
              <HiOutlineOfficeBuilding size={40} />
            </div>
            <div>
              <h1 className="text-3xl md:text-5xl font-black text-slate-900 tracking-tight">
                {decodeCompany.charAt(0).toUpperCase() + decodeCompany.slice(1)} <span className="text-blue-600">Careers.</span>
              </h1>
              <p className="text-slate-500 font-medium mt-1 flex items-center gap-2">
                <HiOutlineBriefcase className="text-blue-500" /> Currently hiring for {jobsAvailable.length} positions
              </p>
            </div>
          </div>
        </div>

        {/* --- JOBS GRID --- */}
        {jobsAvailable.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {jobsAvailable.map((job) => (
              <div
                key={job.id}
                className="group bg-white rounded-[2rem] p-8 border border-slate-100 shadow-sm hover:shadow-2xl hover:shadow-blue-900/5 hover:-translate-y-2 transition-all duration-500 flex flex-col justify-between"
              >
                <div>
                  <div className="flex justify-between items-start mb-6">
                    <span className="px-3 py-1 bg-blue-50 text-blue-600 text-[10px] font-black uppercase tracking-widest rounded-lg">
                      {job.job_type || "Remote"}
                    </span>
                  </div>
                  
                  <h2 className="text-xl font-black text-slate-800 leading-tight mb-2 group-hover:text-blue-600 transition-colors">
                    {job.title}
                  </h2>
                  <p className="text-slate-400 font-bold text-xs uppercase tracking-widest mb-6">
                    {job.company_name}
                  </p>

                  {/* Description Preview (Limited for clean grid) */}
                  <div
                    className="text-slate-500 text-sm leading-relaxed line-clamp-3 mb-8 prose prose-sm"
                    dangerouslySetInnerHTML={{ __html: job.description }}
                  />
                </div>

                <a
                  href={job.url}
                  target="_blank"
                  rel="noreferrer"
                  onClick={() => dispatch(addJob(job))}
                  className="w-full flex items-center justify-center gap-2 py-4 bg-slate-900 text-white font-black text-sm rounded-2xl hover:bg-blue-600 shadow-lg shadow-slate-200 transition-all active:scale-95"
                >
                  Apply Now <HiOutlineExternalLink />
                </a>
              </div>
            ))}
          </div>
        ) : (
          /* --- EMPTY STATE --- */
          <div className="flex flex-col items-center justify-center py-20 bg-white rounded-[3rem] border border-dashed border-slate-200">
            <div className="w-16 h-16 bg-slate-50 rounded-full flex items-center justify-center text-slate-300 mb-4">
              <HiOutlineOfficeBuilding size={32} />
            </div>
            <h3 className="text-xl font-black text-slate-800 italic uppercase tracking-wider">No active openings</h3>
            <p className="text-slate-400 mt-1 font-medium italic">Is company mein abhi vacancies nahi hain. Please later check karein.</p>
          </div>
        )}
      </div>
    </div>
  );
}