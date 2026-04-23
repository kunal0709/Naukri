// import React from 'react'
// // import "../Stylesheets/Overlay.css"
// export default function Overlay({setIsProfileOpen}) {
//   return (
//     <div 
//     onClick={()=> setIsProfileOpen(false)}
//     className="fixed inset-0 bg-black opacity-25  bg-opacity-50 z-50 border-3 border-blue-700"></div>
//   )
// }




import React from 'react'

export default function Overlay({ setIsProfileOpen }) {
  return (
    <div 
      onClick={() => setIsProfileOpen(false)}
      className="fixed inset-0 z-[60] 
                 bg-slate-900/40 
                 backdrop-blur-[6px] 
                 transition-all duration-500 ease-in-out
                 animate-in fade-in"
      style={{
        // Custom animation agar tailwind config mein na ho
        animation: 'overlayShow 0.4s ease-out'
      }}
    >
      {/* Optional: Agar aapko thoda sa gradient touch chahiye niche se */}
      <div className="absolute inset-0 bg-gradient-to-t from-blue-900/20 to-transparent pointer-events-none"></div>

      <style jsx>{`
        @keyframes overlayShow {
          from { opacity: 0; backdrop-filter: blur(0px); }
          to { opacity: 1; backdrop-filter: blur(6px); }
        }
      `}</style>
    </div>
  )
}