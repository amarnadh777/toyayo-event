import React from 'react';
import { UserCheck } from 'lucide-react'; // Icon matches the "User Checked" look
import userTick from "../assets/user-tick.svg"
const AlreadyCheckedInModal = ({ 
    isOpen, 
    onClose, 
    data = { name: "John Smith", time: "09:15 am", listNo: "01" } 
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-6">

      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/60 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      ></div>

      {/* Modal Card */}
      <div className="relative w-full max-w-sm bg-white rounded-[2rem] px-6 pb-6 pt-16 text-center shadow-2xl animate-in fade-in zoom-in duration-300">

        {/* FLOATING ICON (Blue Gradient) */}
        <div className="absolute -top-10 left-1/2 -translate-x-1/2 flex size-20 items-center justify-center rounded-[1.5rem] bg-gradient-to-b from-white to-[#C6E3FB] shadow-sm">
         <img src={userTick} alt="" className='size-12' />
        </div>

        {/* Title & Subtitle */}
        <h2 className="text-2xl font-bold text-gray-900">Already Checked In</h2>
        <p className="mt-2 text-gray-500 text-sm px-4">
           This QR code has already been scanned.
        </p>

        {/* Divider Top */}
        <div className="mt-6 mb-4 border-t border-gray-100 w-3/4 mx-auto"></div>

        {/* Data Grid (List No & Time) */}
        <div className="grid grid-cols-2 gap-4 mb-4">
            <div className="text-center border-r border-gray-100 last:border-0">
                <p className="text-xs text-gray-500 mb-1 font-medium">List No.</p>
                <p className="text-lg font-bold text-gray-900">{data.listNo}</p>
            </div>
            <div className="text-center">
                <p className="text-xs text-gray-500 mb-1 font-medium">Time</p>
                <p className="text-lg font-bold text-gray-900">{data.time}</p>
            </div>
        </div>

        {/* Divider Bottom */}
        <div className="mb-6 border-t border-gray-100 w-3/4 mx-auto"></div>

        {/* Registration Info */}
        <div className="mb-8 space-y-2">
          <p className="text-gray-500 font-medium text-sm">Registration Name</p>
          <p className="text-3xl font-bold text-[#EB0A1E]">{data.name}</p>
        </div>

        {/* Close Button */}
        <button
            onClick={onClose}
            className="mx-auto flex w-[155px] items-center justify-center rounded-[14px] border border-black py-4 text-lg font-bold text-black transition-colors hover:bg-gray-50 active:bg-gray-100"
        >
            Close
        </button>

      </div>
    </div>
  );
};

export default AlreadyCheckedInModal;