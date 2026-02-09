import React from 'react';
import { QrCode } from 'lucide-react';
import qrcodesvg from "../assets/qrcodesvg.svg"
import { useNavigate } from 'react-router-dom';

const UserRow = ({ id, name, time }) => (
  <div className="flex items-center justify-between py-3.5 px-2 border-b border-gray-100 last:border-0 hover:bg-gray-50 transition-colors cursor-pointer group">
    <div className="flex items-center gap-4">
      <div className="w-[38px] h-[31px] rounded-[10px] bg-gradient-to-b from-[#EFF3FB] to-[#DBE4F5] text-black font-bold text-sm flex items-center justify-center shadow-sm group-hover:from-blue-100 group-hover:to-blue-200 transition-all">
        {id}
      </div>
      <span className="text-gray-800 text-[15px] font-semibold tracking-tight">
        {name}
      </span>
    </div>
    <span className="text-black text-xs font-semibold tracking-wide">
      {time}
    </span>
  </div>
);

const UserList = ({users}) => {
  const navigate = useNavigate()
 
  return (
    // 1. OUTER BORDER WRAPPER
    <div className="flex-1 mt-4 relative flex flex-col rounded-t-[30px] pt-[1px]  pb-0 bg-gradient-to-r from-[#DFDFDF] via-[#BCBCBC] to-[#DFDFDF] overflow-hidden isolate shadow-[0_-8px_30px_rgba(0,0,0,0.04)]">
      
      {/* 2. MAIN CONTAINER BACKGROUND */}
      <div className="flex-1 w-full h-full bg-gradient-to-b from-[#FFFFFF] to-[#E3F0FC] rounded-t-[29px] flex flex-col relative overflow-hidden">
        
        {/* HEADER */}
        <div className="flex-none px-7 pt-7 pb-0">
          <h2 className="font-bold text-gray-900 text-[15px]">User List</h2>
          <div className="w-full h-[1px] bg-gray-100 mt-4 mb-2"></div>
        </div>

        {/* LIST SECTION - SCROLLBAR FIX 
            1. overflow-y-auto: Enables scrolling
            2. pr-2: Adds right padding so scrollbar doesn't overlap text
            3. [&::-webkit...]: Customizes the bar to be thin and grey
        */}
        <div className="flex-1 overflow-y-auto px-5 pb-32 pr-2
            [&::-webkit-scrollbar]:w-[10px] 
         
       
            [&::-webkit-scrollbar-track]:bg-[#F2F2F2]
            [&::-webkit-scrollbar-track]:border-[#D0D0D0]
            [&::-webkit-scrollbar-thumb]:rounded-full
            [&::-webkit-scrollbar-track]:border-[#D0D0D0]
          [&::-webkit-scrollbar-track]:rounded-full
            [&::-webkit-scrollbar-track]:border
            [&::-webkit-scrollbar-thumb]:bg-[#B2B2B2]
            [&::-webkit-scrollbar-thumb]:rounded-full"
        >
          {users.map((user) => (
            <UserRow 
              key={user.id} 
              id={user.id} 
              name={user.name} 
              time={user.time} 
            />
          ))}
        </div>

        {/* --- FIXED DARK GRADIENT --- */}
        <div className="absolute bottom-0 w-full h-[56px] rounded-t-[20px] bg-[radial-gradient(circle_at_top,#2E5BA9_0%,#000000_100%)] shadow-[0_-17px_30px_-20px_rgba(0,0,0,0.25)] border-t border-white/10 z-10"></div>

        {/* BUTTON */}
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-20">
            <button className="w-[66px] h-[66px] rounded-[20px] flex items-center justify-center shadow-2xl border border-white/10 relative active:scale-95 transition-transform group bg-[radial-gradient(50%_50%_at_50%_50%,#254A88_0%,#1A3460_57%,#040910_100%)]"
            onClick={() => { navigate("/scanner") }}
            >
            <img src={qrcodesvg} alt="Scan QR" className="w-8 h-8 z-10" />
            <div className="absolute inset-3.5 border border-dashed border-gray-500/40 rounded-xl"></div>
            <div className="absolute inset-0 rounded-[20px] bg-gradient-to-t from-white/5 to-transparent pointer-events-none"></div>
            </button>
        </div>

      </div>
    </div>
  );
};

export default UserList;