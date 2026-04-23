
// import React from "react";
// import { RxCross1 } from "react-icons/rx";
// import { useDispatch, useSelector } from "react-redux";
// import { Link } from "react-router-dom";
// import { signOut } from "firebase/auth";
// import { auth } from "../firebase";
// import { removeUser } from "../toolkit/LoginSlice";

// export default function ProfileComp({ setIsProfileOpen }) {
//   const dispatch = useDispatch();
//   const userLoggedIn = JSON.parse(localStorage.getItem("user")) || null;
//   const user = useSelector((state) => state.login.user);

//   return (
//     <div
//       className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 
//       bg-white rounded-xl shadow-2xl w-11/12 max-w-md p-6 md:p-8 z-50
//       flex flex-col space-y-4"
//     >
//       {/* Close Button */}
//       <button
//         onClick={() => setIsProfileOpen(false)}
//         className="self-end text-gray-500 hover:text-blue-700 transition"
//       >
//         <RxCross1 size={26} />
//       </button>

//       {/* User Info */}
//       {userLoggedIn ? (
//         <div className="text-center space-y-2">
//           <h2 className="text-xl font-bold text-gray-800">
//             {userLoggedIn.displayName}
//           </h2>
//           <p className="text-gray-500 text-sm">Full Stack Developer</p>
//           <Link to="/application-history" onClick={() => setIsProfileOpen(false)}>
//             <button className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 rounded-lg transition">
//               Application History
//             </button>
//           </Link>
//         </div>
//       ) : (
//         <button className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 rounded-lg transition">
//           Please login to proceed
//         </button>
//       )}

//       {/* MOBILE NAV BUTTONS */}
//       <div className="block sm:hidden space-y-2">
//         <Link to="/" onClick={() => setIsProfileOpen(false)}>
//           <button className="w-full bg-blue-600 hover:bg-blue-700 mb-4 text-white font-semibold py-2 rounded-lg transition shadow-md">
//             Home
//           </button>
//         </Link>

//         {userLoggedIn && (
//           <Link to="/savedjobs" onClick={() => setIsProfileOpen(false)}>
//             <button className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 rounded-lg transition shadow-md">
//               Saved Jobs
//             </button>
//           </Link>
//         )}
//       </div>

//       {/* Help Centre */}
//       <Link to="/help-centre">
//         <button
//           onClick={() => setIsProfileOpen(false)}
//           className="w-full bg-white border border-gray-300 hover:border-blue-600 hover:bg-blue-50
//           text-gray-700 font-medium py-2 rounded-lg transition"
//         >
//           Help Centre
//         </button>
//       </Link>

//       {/* Logout */}
//       {userLoggedIn && (
//         <button
//           onClick={async () => {
//             await signOut(auth);
//             localStorage.removeItem("user");
//             dispatch(removeUser());
//             setIsProfileOpen(false);
//           }}
//           className="w-full bg-red-600 hover:bg-red-700 text-white font-semibold py-2 rounded-lg transition"
//         >
//           Logout
//         </button>
//       )}
//     </div>
//   );
// }
 









import React from "react";
import { RxCross2 } from "react-icons/rx";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { signOut } from "firebase/auth";
import { auth } from "../firebase";
import { removeUser } from "../toolkit/LoginSlice";
import { 
  HiOutlineUser, 
  HiOutlineClipboardList, 
  HiOutlineBookmark, 
  HiOutlineQuestionMarkCircle, 
  HiOutlineLogout,
  HiOutlineHome 
} from "react-icons/hi";

export default function ProfileComp({ setIsProfileOpen }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const userLoggedIn = JSON.parse(localStorage.getItem("user")) || null;

  const handleLogout = async () => {
    await signOut(auth);
    localStorage.removeItem("user");
    dispatch(removeUser());
    setIsProfileOpen(false);
    navigate("/");
  };

  return (
    <div className="fixed top-0 right-0 h-full w-full max-w-[350px] bg-white shadow-[-10px_0_30px_rgba(0,0,0,0.1)] z-[70] transition-all duration-300 ease-in-out flex flex-col">
      
      {/* 1. HEADER SECTION */}
      <div className="p-6 border-b border-slate-100 flex justify-between items-center bg-slate-50/50">
        <h2 className="text-xl font-black text-slate-800 tracking-tight">Account</h2>
        <button
          onClick={() => setIsProfileOpen(false)}
          className="p-2 rounded-full hover:bg-white hover:shadow-md transition-all text-slate-400 hover:text-red-500"
        >
          <RxCross2 size={22} />
        </button>
      </div>

      <div className="flex-1 overflow-y-auto p-6 space-y-8">
        
        {/* 2. USER PROFILE INFO */}
        {userLoggedIn ? (
          <div className="flex flex-col items-center text-center pb-4">
            <div className="w-20 h-20 rounded-3xl bg-blue-600 flex items-center justify-center text-white text-3xl font-black shadow-xl shadow-blue-200 mb-4 border-4 border-white">
              {userLoggedIn.photoURL ? (
                <img src={userLoggedIn.photoURL} alt="p" className="w-full h-full object-cover rounded-3xl" />
              ) : (
                userLoggedIn.displayName?.charAt(0)
              )}
            </div>
            <h3 className="text-lg font-black text-slate-800">{userLoggedIn.displayName}</h3>
            <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mt-1">
              Premium Candidate
            </p>
          </div>
        ) : (
          <div className="p-6 bg-blue-50 rounded-2xl text-center">
            <p className="text-blue-700 font-bold mb-4">Join our community to apply for jobs!</p>
            <Link to="/register" onClick={() => setIsProfileOpen(false)}>
              <button className="w-full py-3 bg-blue-600 text-white rounded-xl font-bold shadow-lg shadow-blue-200">
                Register Now
              </button>
            </Link>
          </div>
        )}

        {/* 3. MENU LINKS */}
        <div className="space-y-2">
          <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mb-4">Navigation</p>
          
          <MenuLink to="/" icon={<HiOutlineHome size={20}/>} label="Home" onClick={() => setIsProfileOpen(false)} hideOnDesktop={false} />
          
          {userLoggedIn && (
            <>
              <MenuLink to="/application-history" icon={<HiOutlineClipboardList size={20}/>} label="Application History" onClick={() => setIsProfileOpen(false)} />
              <MenuLink to="/savedjobs" icon={<HiOutlineBookmark size={20}/>} label="Saved Jobs" onClick={() => setIsProfileOpen(false)} />
            </>
          )}
          
          <MenuLink to="/help-centre" icon={<HiOutlineQuestionMarkCircle size={20}/>} label="Help Centre" onClick={() => setIsProfileOpen(false)} />
        </div>
      </div>

      {/* 4. FOOTER / LOGOUT */}
      {userLoggedIn && (
        <div className="p-6 border-t border-slate-100">
          <button
            onClick={handleLogout}
            className="w-full flex items-center justify-center gap-2 py-4 bg-red-50 text-red-600 font-black rounded-2xl hover:bg-red-600 hover:text-white transition-all duration-300 group"
          >
            <HiOutlineLogout className="group-hover:-translate-x-1 transition-transform" />
            Logout Account
          </button>
        </div>
      )}
    </div>
  );
}

// Reusable Menu Component for Clean Code
function MenuLink({ to, icon, label, onClick }) {
  return (
    <Link 
      to={to} 
      onClick={onClick}
      className="flex items-center gap-4 p-4 rounded-2xl text-slate-600 font-bold hover:bg-blue-50 hover:text-blue-600 transition-all group"
    >
      <span className="text-slate-400 group-hover:text-blue-600 transition-colors">{icon}</span>
      <span className="text-sm">{label}</span>
    </Link>
  );
}