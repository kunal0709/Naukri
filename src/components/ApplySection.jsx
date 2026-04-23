
// import React, { useEffect, useState } from "react";
// import { useNavigate, useParams } from "react-router-dom";
// import { addJob } from "../applicationSlice";
// import { useDispatch } from "react-redux";

// export default function ApplySection() {
//   const isLoggedin = JSON.parse(localStorage.getItem("user")) || null;
//   const { category, id } = useParams();
//   let decodedCategory = decodeURIComponent(category);
//   let [categoryJobs, setCategoryjobs] = useState([]);
//   let [desiredJob, setDesiredJob] = useState(null);

//   const navigate = useNavigate();
//   const dispatch = useDispatch();

//   useEffect(() => {
//     async function getData() {
//       try {
//         let res = await fetch(
//           `https://remotive.com/api/remote-jobs?category=${decodedCategory}&limit=1000`
//         );
//         let data = await res.json();
//         setCategoryjobs(data);
//       } catch (err) {
//         console.log(err);
//       }
//     }
//     getData();
//   }, [category]);

//   useEffect(() => {
//     let filteredJob = categoryJobs?.jobs?.filter(
//       (job) => Number(job.id) === Number(id)
//     );
//     setDesiredJob(filteredJob);
//   }, [id, categoryJobs]);

//   return (
//     <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
//       {desiredJob != null ? (
//         <div className="bg-white shadow-lg rounded-lg p-6 md:p-10 space-y-6">
//           {/* Job Title */}
//           <h2 className="text-3xl md:text-4xl font-bold text-blue-700">
//             {desiredJob[0]?.title}
//           </h2>

//           {/* Company Name */}
//           <h3 className="text-xl md:text-2xl font-semibold text-gray-700">
//             {desiredJob[0]?.company_name}
//           </h3>

//           {/* Job Description */}
//           <div
//             className="prose prose-sm md:prose lg:prose-lg max-w-full text-gray-800"
//             dangerouslySetInnerHTML={{
//               __html: desiredJob && desiredJob[0]?.description,
//             }}
//           ></div>

//           {/* Buttons */}
//           <div className="flex flex-col md:flex-row gap-4 mt-6">
//             {isLoggedin === null ? (
//               <button
//                 onClick={() => navigate("/register")}
//                 className="w-full md:w-auto px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg shadow hover:bg-blue-700 transition"
//               >
//                 Login to Proceed
//               </button>
//             ) : (
//               <button
//                 onClick={() => {
//                   dispatch(addJob(desiredJob[0]));
//                   window.open(desiredJob[0].url, "_blank");
//                 }}
//                 className="w-full md:w-auto px-6 py-3 bg-green-600 text-white font-semibold rounded-lg shadow hover:bg-green-700 transition"
//               >
//                 Proceed to Apply
//               </button>
//             )}
//           </div>
//         </div>
//       ) : (
//         <p className="text-center text-gray-500 text-lg animate-pulse">
//           Loading...
//         </p>
//       )}
//     </div>
//   );
// }









import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { addJob } from "../applicationSlice";
import { useDispatch } from "react-redux";
import { HiOutlineArrowLeft, HiOutlineBriefcase, HiOutlineExternalLink, HiOutlineLockClosed } from "react-icons/hi";

export default function ApplySection() {
  const isLoggedin = JSON.parse(localStorage.getItem("user")) || null;
  const { category, id } = useParams();
  let decodedCategory = decodeURIComponent(category);
  let [categoryJobs, setCategoryjobs] = useState([]);
  let [desiredJob, setDesiredJob] = useState(null);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    async function getData() {
      try {
        let res = await fetch(
          `https://remotive.com/api/remote-jobs?category=${decodedCategory}&limit=1000`
        );
        let data = await res.json();
        setCategoryjobs(data);
      } catch (err) {
        console.log(err);
      }
    }
    getData();
  }, [decodedCategory]);

  useEffect(() => {
    let filteredJob = categoryJobs?.jobs?.filter(
      (job) => Number(job.id) === Number(id)
    );
    setDesiredJob(filteredJob && filteredJob[0]);
  }, [id, categoryJobs]);

  return (
    <div className="min-h-screen bg-slate-50 py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6">
        
        {/* Back Button */}
        <button 
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 text-slate-500 hover:text-blue-600 font-bold text-sm mb-8 transition-colors"
        >
          <HiOutlineArrowLeft /> Back to Listings
        </button>

        {desiredJob ? (
          <div className="space-y-8">
            {/* --- MAIN HEADER CARD --- */}
            <div className="bg-white rounded-[2.5rem] p-8 md:p-12 shadow-xl shadow-blue-900/5 border border-slate-100">
              <div className="border-l-4 border-blue-600 pl-6 mb-8">
                <p className="text-blue-600 font-black text-xs uppercase tracking-widest mb-2">
                  {desiredJob.job_type || 'Full Time'} • {desiredJob.candidate_required_location || 'Remote'}
                </p>
                <h2 className="text-3xl md:text-5xl font-black text-slate-900 tracking-tight mb-4">
                  {desiredJob.title}
                </h2>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center text-slate-400">
                    <HiOutlineBriefcase size={20} />
                  </div>
                  <h3 className="text-xl font-bold text-slate-600">
                    {desiredJob.company_name}
                  </h3>
                </div>
              </div>

              {/* Action Area for Top */}
              <div className="flex flex-wrap gap-3 mb-10">
                <span className="px-4 py-1.5 bg-blue-50 text-blue-700 rounded-full text-xs font-bold uppercase">
                  {decodedCategory}
                </span>
                <span className="px-4 py-1.5 bg-green-50 text-green-700 rounded-full text-xs font-bold uppercase">
                  Verified Posting
                </span>
              </div>

              <hr className="border-slate-100 mb-10" />

              {/* --- JOB DESCRIPTION --- */}
              <div className="prose prose-slate max-w-none 
                prose-headings:text-slate-900 prose-headings:font-black 
                prose-p:text-slate-600 prose-p:leading-relaxed 
                prose-li:text-slate-600 prose-strong:text-blue-700"
              >
                <h4 className="text-xl font-bold mb-4">About the role</h4>
                <div 
                  dangerouslySetInnerHTML={{ __html: desiredJob.description }} 
                />
              </div>
            </div>

            {/* --- STICKY / FLOATING APPLY BAR --- */}
            <div className="bg-slate-900 rounded-[2rem] p-6 md:p-8 shadow-2xl flex flex-col md:flex-row items-center justify-between gap-6 border border-white/10">
              <div className="text-center md:text-left">
                <p className="text-white font-bold text-lg">Ready to take the next step?</p>
                <p className="text-slate-400 text-sm">Review the details and submit your application.</p>
              </div>

              <div className="w-full md:w-auto">
                {isLoggedin === null ? (
                  <button
                    onClick={() => navigate("/register")}
                    className="w-full md:w-auto flex items-center justify-center gap-2 px-10 py-4 bg-white text-slate-900 font-black rounded-2xl hover:bg-blue-50 transition-all active:scale-95"
                  >
                    <HiOutlineLockClosed /> Login to Apply
                  </button>
                ) : (
                  <button
                    onClick={() => {
                      dispatch(addJob(desiredJob));
                      window.open(desiredJob.url, "_blank");
                    }}
                    className="w-full md:w-auto flex items-center justify-center gap-2 px-10 py-4 bg-blue-600 text-white font-black rounded-2xl hover:bg-blue-700 shadow-lg shadow-blue-500/30 transition-all active:scale-95"
                  >
                    Apply Now <HiOutlineExternalLink />
                  </button>
                )}
              </div>
            </div>
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-20">
            <div className="w-16 h-16 border-4 border-blue-600/20 border-t-blue-600 rounded-full animate-spin mb-4"></div>
            <p className="text-slate-400 font-bold animate-pulse uppercase tracking-widest text-xs">
              Fetching Job Details...
            </p>
          </div>
        )}
      </div>
    </div>
  );
}