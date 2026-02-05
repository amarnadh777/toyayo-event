
import React from 'react';
import banIcon from "../assets/ban.svg"

const InvalidQrModal = ({ isOpen, onClose, onRetry }) => {
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
        
        {/* FLOATING ICON (Red Gradient) */}
        <div className="absolute -top-10 left-1/2 -translate-x-1/2 flex size-20 items-center justify-center rounded-[1.5rem] bg-gradient-to-b from-white to-[#FDCED2] shadow-sm">
           {/* Using CircleBan for the "Prohibited/Invalid" look */}
           {/* <CircleBan size={32} className="text-black rotate-90" strokeWidth={1.5} /> */}
           <img src={banIcon} alt="" />
        </div>
        
        {/* Title Text (Red) */}
        <h2 className="text-2xl font-bold text-[#EB0A1E]">Invalid QR Code</h2>
        
        {/* Subtitle Text (Gray) */}
        <p className="mt-2 text-gray-500 mb-8 px-4 text-sm leading-relaxed">
           This QR code isn’t valid. <br/> Please try scanning a different code.
        </p>

        {/* Buttons Container */}
        <div className="flex flex-col gap-4">
            
            {/* PRIMARY BUTTON: Scan Again (Dark Blue Gradient) */}
            <button 
                onClick={onRetry}
                className="mx-auto flex w-[220px] items-center justify-center rounded-[14px] bg-gradient-to-b from-[#000000] to-[#183059] py-4 text-lg font-bold text-white shadow-lg transition-transform active:scale-95"
            >
                Scan Again
            </button>

            {/* SECONDARY BUTTON: Close */}
            <button
                onClick={onClose}
                className="mx-auto flex w-[220px] items-center justify-center rounded-[14px] border border-black py-4 text-lg font-bold text-black transition-colors hover:bg-gray-50 active:bg-gray-100"
            >
                Close
            </button>
        </div>

      </div>
    </div>
  );
};

export default InvalidQrModal;