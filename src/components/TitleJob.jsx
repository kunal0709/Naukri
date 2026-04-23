
// import React, { useContext, useEffect, useState } from 'react'
// import { useParams } from 'react-router-dom'
// import { myContext } from '../App';
 
// export default function TitleJob() {
//   const { title } = useParams()
//   const decodedTitle = decodeURIComponent(title)

//   const { jobsArray } = useContext(myContext)
//   const [filteredJobs, setFilteredJobs] = useState([])

//   useEffect(() => {
//     const filteredData = jobsArray?.jobs?.filter((job) => {
//       return job.title == decodedTitle
//     })
//     setFilteredJobs(filteredData)
//   }, [jobsArray, decodedTitle])

//   return (
//     <div className="min-h-screen bg-gray-50 py-10 px-4">
      
//       {/* Header */}
//       <div className="max-w-5xl mx-auto text-center mb-8">
//         <h1 className="text-3xl md:text-4xl font-bold text-blue-700">
//           Jobs for "{decodedTitle}"
//         </h1>
//         <p className="text-gray-500 mt-2">
//           Find the best opportunities matching your search
//         </p>
//       </div>

//       {/* Content */}
//       <div className="max-w-5xl mx-auto">
//         {
//           filteredJobs?.length > 0 ?
//           <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
//             {filteredJobs.map((job, index) => {
//               return (
//                 <div 
//                   key={index} 
//                   className="bg-white rounded-xl shadow-md hover:shadow-xl transition transform hover:-translate-y-1 p-6 flex flex-col justify-between"
//                 >
//                   <div>
//                     <h2 className="text-xl font-semibold text-gray-800">
//                       {job.title}
//                     </h2>

//                     <p className="text-gray-500 mt-1">
//                       {job.company_name}
//                     </p>
//                   </div>

//                   <a 
//                     href={job.url}
//                     target="_blank" 
//                     rel="noopener noreferrer"
//                     className="mt-4 inline-block text-center bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 rounded-lg transition shadow-md"
//                   >
//                     Apply Now
//                   </a>
//                 </div>
//               )
//             })}
//           </div>
//           : 
//           <div className="text-center mt-20">
//             <p className="text-gray-500 text-lg animate-pulse">
//               Try again later ...
//             </p>
//           </div>
//         }
//       </div>

//     </div>
//   )
// }










import React, { useContext, useEffect, useState } from 'react'
import { useParams, useNavigate, Link } from 'react-router-dom'
import { myContext } from '../App';
import { HiOutlineSearch, HiOutlineArrowLeft, HiOutlineExternalLink, HiOutlineOfficeBuilding } from 'react-icons/hi';

export default function TitleJob() {
  const { title } = useParams()
  const navigate = useNavigate();
  const decodedTitle = decodeURIComponent(title)

  const { jobsArray } = useContext(myContext)
  const [filteredJobs, setFilteredJobs] = useState([])

  useEffect(() => {
    // Exact match ki jagah thoda 'includes' use karna better rehta hai search ke liye
    const filteredData = jobsArray?.jobs?.filter((job) => {
      return job.title.toLowerCase().includes(decodedTitle.toLowerCase())
    })
    setFilteredJobs(filteredData)
  }, [jobsArray, decodedTitle])

  return (
    <div className="min-h-screen bg-[#f8fafc] py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        
        {/* --- HEADER SECTION --- */}
        <div className="mb-12">
          <button 
            onClick={() => navigate(-1)}
            className="flex items-center gap-2 text-slate-400 hover:text-blue-600 font-bold text-xs uppercase tracking-widest mb-4 transition-all"
          >
            <HiOutlineArrowLeft /> Back to Search
          </button>
          
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div>
              <div className="flex items-center gap-3 mb-2">
                <div className="p-2 bg-blue-600 rounded-lg text-white">
                  <HiOutlineSearch size={20} />
                </div>
                <span className="text-blue-600 font-black text-xs uppercase tracking-widest">
                  Search Results
                </span>
              </div>
              <h1 className="text-3xl md:text-5xl font-black text-slate-900 tracking-tight">
                Showing jobs for <span className="text-blue-600">"{decodedTitle}"</span>
              </h1>
            </div>
            
            <div className="bg-white px-6 py-3 rounded-2xl border border-slate-100 shadow-sm">
              <p className="text-slate-400 text-xs font-bold uppercase tracking-widest">Opportunities Found</p>
              <p className="text-2xl font-black text-slate-800">{filteredJobs?.length || 0}</p>
            </div>
          </div>
        </div>

        {/* --- CONTENT GRID --- */}
        {filteredJobs?.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {filteredJobs.map((job, index) => (
              <div 
                key={index} 
                className="group bg-white rounded-[2.5rem] border border-slate-100 p-8 shadow-sm hover:shadow-2xl hover:shadow-blue-900/5 hover:border-blue-200 transition-all duration-500 flex flex-col justify-between"
              >
                <div>
                  <div className="flex justify-between items-start mb-6">
                    <div className="w-14 h-14 bg-slate-50 rounded-2xl flex items-center justify-center text-slate-300 group-hover:bg-blue-50 group-hover:text-blue-600 transition-colors duration-500">
                      <HiOutlineOfficeBuilding size={28} />
                    </div>
                    <span className="px-4 py-1.5 bg-green-50 text-green-600 rounded-full text-[10px] font-black uppercase tracking-widest">
                      Remote Available
                    </span>
                  </div>

                  <h2 className="text-2xl font-black text-slate-800 leading-tight mb-2 group-hover:text-blue-600 transition-colors">
                    {job.title}
                  </h2>
                  <p className="text-slate-500 font-bold flex items-center gap-2 mb-6">
                    {job.company_name}
                  </p>

                  <div className="flex flex-wrap gap-2 mb-8">
                    {job.tags?.slice(0, 3).map((tag, i) => (
                      <span key={i} className="text-[10px] font-black uppercase tracking-widest text-slate-400 py-1 px-3 bg-slate-50 rounded-lg border border-slate-100">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="flex gap-4">
                  <Link 
                    to={`/applyto/${encodeURIComponent(job.category)}/${job.id}`}
                    className="flex-1 text-center py-4 bg-slate-900 text-white font-black text-sm rounded-2xl hover:bg-slate-800 transition-all active:scale-95"
                  >
                    Details
                  </Link>
                  <a 
                    href={job.url}
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="flex-[2] flex items-center justify-center gap-2 py-4 bg-blue-600 text-white font-black text-sm rounded-2xl hover:bg-blue-700 shadow-lg shadow-blue-200 transition-all active:scale-95"
                  >
                    Quick Apply <HiOutlineExternalLink size={18} />
                  </a>
                </div>
              </div>
            ))}
          </div>
        ) : (
          /* --- EMPTY STATE --- */
          <div className="text-center py-32 bg-white rounded-[3rem] border border-dashed border-slate-200">
            <div className="w-20 h-20 bg-slate-50 rounded-full flex items-center justify-center mx-auto mb-6">
              <HiOutlineSearch size={32} className="text-slate-300" />
            </div>
            <h3 className="text-2xl font-black text-slate-800">No exact matches found</h3>
            <p className="text-slate-500 mt-2 font-medium">Try searching with broader keywords or check other categories.</p>
            <button 
              onClick={() => navigate("/")}
              className="mt-8 px-10 py-4 bg-blue-600 text-white font-black rounded-2xl shadow-xl shadow-blue-200 hover:bg-blue-700 transition-all"
            >
              Back to Home
            </button>
          </div>
        )}
      </div>
    </div>
  )
}