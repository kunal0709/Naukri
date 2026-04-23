
// import React, { useEffect, useState } from 'react';
// import { auth, provider } from '../firebase';
// import { signInWithPopup, signOut } from 'firebase/auth';

// export default function Register() {
//   const [signedUpUser, setSignedUpUser] = useState(
//     JSON.parse(localStorage.getItem("user")) || null
//   );

//   useEffect(() => {
//     const storedUser = JSON.parse(localStorage.getItem("user"));
//     if (storedUser) setSignedUpUser(storedUser);
//   }, []);

//   async function handleSignUp() {
//     let res = await signInWithPopup(auth, provider);
//     const user = res.user;
//     setSignedUpUser(user);
//     localStorage.setItem("user", JSON.stringify(user));
//   }

//   async function handleSignOut() {
//     await signOut(auth);
//     localStorage.removeItem("user");
//     setSignedUpUser(null);
//   }

//   return (
//     <div className="flex flex-col items-center justify-center min-h-screen bg-linear-to-br from-blue-100 via-blue-50 to-white p-6">
      
//       {signedUpUser ? (
//         <div className="bg-white shadow-2xl rounded-xl p-8 md:p-12 text-center w-full max-w-md flex flex-col items-center space-y-6">
//           <h1 className="text-3xl md:text-4xl font-bold text-green-700">
//             Welcome, {signedUpUser.displayName}
//           </h1>
//           <p className="text-gray-500 text-sm md:text-base">
//             You are signed in with Google
//           </p>
//           <button
//             onClick={handleSignOut}
//             className="w-full bg-red-500 hover:bg-red-600 text-white font-semibold py-3 rounded-lg shadow-lg transition-colors duration-300"
//           >
//             Sign Out
//           </button>
//         </div>
//       ) : (
//         <div className="bg-white shadow-2xl rounded-xl p-8 md:p-12 text-center w-full max-w-md flex flex-col items-center space-y-6">
//           <h1 className="text-2xl md:text-3xl font-bold text-gray-800">
//             Sign Up with Google
//           </h1>
//           <p className="text-gray-500 text-sm md:text-base">
//             Quickly login using your Google account
//           </p>
//           <button
//             onClick={handleSignUp}
//             className="w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold py-3 rounded-lg shadow-lg transition-colors duration-300"
//           >
//             Sign Up with Google
//           </button>
//         </div>
//       )}
//     </div>
//   );
// }


















import React, { useEffect, useState } from 'react';
import { auth, provider } from '../firebase';
import { signInWithPopup, signOut } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import { FcGoogle } from "react-icons/fc";
import { HiOutlineBadgeCheck, HiOutlineSparkles, HiOutlineArrowRight } from "react-icons/hi";

export default function Register() {
  const navigate = useNavigate();
  const [signedUpUser, setSignedUpUser] = useState(
    JSON.parse(localStorage.getItem("user")) || null
  );

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    if (storedUser) setSignedUpUser(storedUser);
  }, []);

  async function handleSignUp() {
    try {
      let res = await signInWithPopup(auth, provider);
      const user = res.user;
      setSignedUpUser(user);
      localStorage.setItem("user", JSON.stringify(user));
      // User ko login ke baad direct home ya profile pe bhej sakte hain
      setTimeout(() => navigate("/"), 1500);
    } catch (err) {
      console.error("Sign up error:", err);
    }
  }

  async function handleSignOut() {
    await signOut(auth);
    localStorage.removeItem("user");
    setSignedUpUser(null);
  }

  return (
    <div className="min-h-screen bg-[#f8fafc] flex items-center justify-center p-6 relative overflow-hidden">
      
      {/* Background Decorations */}
      <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-blue-100/50 rounded-full blur-[120px] -z-10"></div>
      <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-indigo-100/50 rounded-full blur-[120px] -z-10"></div>

      <div className="w-full max-w-4xl grid md:grid-cols-2 bg-white rounded-[2.5rem] shadow-2xl shadow-blue-900/10 overflow-hidden border border-slate-100">
        
        {/* LEFT SIDE: VALUE PROPOSITION */}
        <div className="bg-slate-900 p-10 md:p-16 flex flex-col justify-center text-white relative">
          <div className="absolute top-0 left-0 w-full h-full opacity-10 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')]"></div>
          
          <div className="relative z-10">
            <div className="w-12 h-12 bg-blue-600 rounded-2xl flex items-center justify-center mb-8 shadow-lg shadow-blue-500/20">
              <HiOutlineSparkles size={28} />
            </div>
            <h2 className="text-3xl md:text-4xl font-black mb-6 leading-tight">
              Start Your <br /> 
              <span className="text-blue-400">Career Journey</span> With Us.
            </h2>
            
            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <HiOutlineBadgeCheck className="text-blue-400 mt-1 shrink-0" size={20} />
                <p className="text-slate-300 text-sm font-medium">Access to 10,000+ premium remote job listings worldwide.</p>
              </div>
              <div className="flex items-start gap-4">
                <HiOutlineBadgeCheck className="text-blue-400 mt-1 shrink-0" size={20} />
                <p className="text-slate-300 text-sm font-medium">One-click apply using your verified Google profile.</p>
              </div>
            </div>
          </div>
        </div>

        {/* RIGHT SIDE: LOGIN ACTIONS */}
        <div className="p-10 md:p-16 flex flex-col justify-center bg-white">
          {signedUpUser ? (
            <div className="text-center animate-in fade-in zoom-in duration-500">
              <div className="relative inline-block mb-6">
                <img 
                  src={signedUpUser.photoURL} 
                  alt="avatar" 
                  className="w-24 h-24 rounded-3xl border-4 border-blue-50 p-1 shadow-xl shadow-blue-100 mx-auto"
                />
                <div className="absolute -bottom-2 -right-2 bg-green-500 w-8 h-8 rounded-full border-4 border-white flex items-center justify-center">
                  <HiOutlineBadgeCheck className="text-white" />
                </div>
              </div>
              
              <h1 className="text-2xl font-black text-slate-900 mb-2">
                Hi, {signedUpUser.displayName?.split(" ")[0]}!
              </h1>
              <p className="text-slate-500 text-sm mb-8 font-medium">
                Redirecting you to your dashboard...
              </p>
              
              <button
                onClick={handleSignOut}
                className="text-red-500 font-black text-xs uppercase tracking-widest hover:text-red-700 transition"
              >
                Not you? Sign Out
              </button>
            </div>
          ) : (
            <div className="animate-in slide-in-from-right-8 duration-500">
              <h1 className="text-2xl font-black text-slate-900 mb-2">Create Account</h1>
              <p className="text-slate-500 text-sm mb-10 font-medium">Join Naukri and find your next big opportunity.</p>
              
              <button
                onClick={handleSignUp}
                className="w-full flex items-center justify-center gap-4 bg-white border-2 border-slate-100 py-4 rounded-2xl font-bold text-slate-700 hover:bg-slate-50 hover:border-blue-200 transition-all duration-300 shadow-sm active:scale-[0.98]"
              >
                <FcGoogle size={24} />
                Continue with Google
              </button>

              <div className="mt-10 pt-10 border-t border-slate-50 text-center">
                <p className="text-xs text-slate-400 font-bold uppercase tracking-widest leading-loose">
                  By signing up, you agree to our <br />
                  <span className="text-blue-600 cursor-pointer">Terms & Conditions</span>
                </p>
              </div>
            </div>
          )}
        </div>

      </div>
    </div>
  );
}