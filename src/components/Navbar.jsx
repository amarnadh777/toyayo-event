import React from 'react';
import toyatoLogo from "../assets/toyota.svg"
import arabicLogo from "../assets/80.svg"
const Navbar = () => {
  return (
    <nav className="w-full bg-white px-6 py-4 shadow-sm border-b border-gray-100 flex justify-between items-center" dir="ltr">
      
      {/* LEFT: Toyota Logo */}
      <div className="flex items-center gap-2 text-[#EB0A1E]"> {/* Toyota Red */}
        {/* Toyota Icon SVG */}
       <img src={toyatoLogo} alt="Logo" height={40} />
        
      
      </div>

      {/* RIGHT: Abdul Latif Jameel & 80 Years Logo */}
      <div className="flex items-center h-full">
        
        {/* Text and Icon Group */}
        <div className="flex items-center gap-3">
       
    <img src={arabicLogo} alt="Logo" height={40} />
     
          <div className="text-slate-600">
           
          </div>
        </div>


       

      </div>
    </nav>
  );
};

export default Navbar;