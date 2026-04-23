
// import React from 'react';

// export default function Settings() {
//   return (
//     <div className="min-h-screen bg-gray-50 flex items-center justify-center p-6">
//       <div className="w-full max-w-4xl bg-white shadow-2xl rounded-xl p-8 md:p-12 space-y-6">
//         <h1 className="text-3xl md:text-4xl font-bold text-blue-700">
//           Help Centre
//         </h1>
//         <p className="text-gray-600 text-base md:text-lg leading-relaxed">
//           Welcome to the Help Centre. Here you can find resources and support for using our
//           application. If you have any questions, feel free to reach out!
//         </p>

//         <div className="mt-6">
//           <a
//             href="mailto:support@jobportal.com"
//             className="inline-block bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-lg shadow-lg transition duration-300"
//           >
//             Contact Support
//           </a>
//         </div>
//       </div>
//     </div>
//   );
// }












import React from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  HiOutlineMail, 
  HiOutlineQuestionMarkCircle, 
  HiOutlineBookOpen, 
  HiOutlineShieldCheck,
  HiOutlineArrowLeft 
} from 'react-icons/hi';

export default function Settings() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-[#fcfdff] py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto">
        
        {/* --- HEADER --- */}
        <div className="mb-12">
          <button 
            onClick={() => navigate(-1)}
            className="flex items-center gap-2 text-slate-400 hover:text-blue-600 font-bold text-xs uppercase tracking-[0.2em] mb-4 transition-all"
          >
            <HiOutlineArrowLeft /> Back
          </button>
          <h1 className="text-4xl md:text-6xl font-black text-slate-900 tracking-tight">
            Help <span className="text-blue-600">Centre.</span>
          </h1>
          <p className="text-slate-500 mt-4 text-lg font-medium max-w-2xl">
            Aapko jo bhi madad chahiye, hum yahan hain. Browse kijiye humare resources ya humse seedha baat kijiye.
          </p>
        </div>

        {/* --- SUPPORT CARDS GRID --- */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
          <SupportCard 
            icon={<HiOutlineBookOpen size={28} />}
            title="User Guides"
            desc="Sikhiye kaise apply karna hai aur profile manage karni hai."
          />
          <SupportCard 
            icon={<HiOutlineShieldCheck size={28} />}
            title="Privacy Policy"
            desc="Aapka data kaise secure rehta hai, yahan jaaniye."
          />
          <SupportCard 
            icon={<HiOutlineQuestionMarkCircle size={28} />}
            title="FAQs"
            desc="Aksar pooche jaane wale sawalon ke turant jawab."
          />
        </div>

        {/* --- FAQ SECTION PREVIEW --- */}
        <div className="bg-white rounded-[3rem] p-8 md:p-12 border border-slate-100 shadow-xl shadow-blue-900/5 mb-16">
          <h2 className="text-2xl font-black text-slate-800 mb-8">Popular Questions</h2>
          <div className="space-y-6">
            <FaqItem 
              ques="How to apply for remote jobs?" 
              ans="Simply click on a job card, read the description, and hit the 'Apply Now' button to be redirected to the official application page."
            />
            <FaqItem 
              ques="Is my data safe with Google Login?" 
              ans="Yes, we only use your basic profile info for authentication and never share your private data with third parties."
            />
          </div>
        </div>

        {/* --- CONTACT CTA --- */}
        <div className="bg-slate-900 rounded-[3rem] p-10 md:p-16 text-center relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-blue-600/20 blur-[100px] rounded-full"></div>
          
          <div className="relative z-10">
            <div className="w-16 h-16 bg-blue-600 rounded-2xl flex items-center justify-center text-white mx-auto mb-6 shadow-xl shadow-blue-500/20">
              <HiOutlineMail size={32} />
            </div>
            <h2 className="text-3xl font-black text-white mb-4">Still need help?</h2>
            <p className="text-slate-400 mb-10 max-w-md mx-auto">
              Humari support team 24/7 available hai aapki query solve karne ke liye.
            </p>
            <a
              href="mailto:support@jobportal.com"
              className="inline-flex items-center gap-3 bg-white text-slate-900 font-black py-4 px-10 rounded-2xl hover:bg-blue-600 hover:text-white transition-all duration-300 shadow-xl"
            >
              Contact Support <HiOutlineMail size={20} />
            </a>
          </div>
        </div>

      </div>
    </div>
  );
}

// Reusable Small Components
function SupportCard({ icon, title, desc }) {
  return (
    <div className="bg-white p-8 rounded-[2.5rem] border border-slate-100 shadow-sm hover:shadow-xl hover:border-blue-200 transition-all duration-300 group">
      <div className="text-blue-600 mb-6 group-hover:scale-110 transition-transform origin-left">{icon}</div>
      <h3 className="text-xl font-black text-slate-800 mb-2">{title}</h3>
      <p className="text-slate-500 text-sm font-medium leading-relaxed">{desc}</p>
    </div>
  );
}

function FaqItem({ ques, ans }) {
  return (
    <div className="border-b border-slate-50 pb-6">
      <h4 className="text-lg font-bold text-slate-800 mb-2 flex items-center gap-2">
        <span className="w-1.5 h-1.5 bg-blue-600 rounded-full"></span> {ques}
      </h4>
      <p className="text-slate-500 text-sm leading-relaxed pl-3.5">{ans}</p>
    </div>
  );
}