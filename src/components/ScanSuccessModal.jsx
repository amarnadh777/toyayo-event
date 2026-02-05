import React from 'react';
import { ScanFace } from 'lucide-react';
import  idVerification from "../assets/user-id-verification.svg"
const ScanSuccessModal = ({ isOpen, onClose, name = "Daniel Cooper" }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-6">
      
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/60 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      ></div>

      {/* Modal Card 
         - Added 'overflow-visible' so the icon isn't cut off.
         - Changed padding to 'pt-16' to make room for the icon.
      */}
      <div className="relative w-full max-w-sm bg-white rounded-[2rem] px-6 pb-6 pt-16 text-center shadow-2xl overflow-visible animate-in fade-in zoom-in duration-300">
        
        {/* FLOATING ICON 
            - absolute: Removes it from normal flow
            - -top-10: Pulls it up by 2.5rem (40px), which is half its height
            - left-1/2 -translate-x-1/2: Centers it horizontally
        */}
        <div className="absolute -top-10 left-1/2 -translate-x-1/2 flex h-24 w-24 items-center justify-center rounded-[1.5rem] bg-gradient-to-b from-white to-[#C6FBD6] shadow-sm">
             {/* Note: I added 'border-black' (or white/transparent) just in case you want a cutout effect, 
                 but typically it just sits on top. Use 'border-white' if you want it to look fused. */}
          {/* <ScanFace size={40} strokeWidth={1.5} /> */}
          <img src={idVerification} alt=""  className='size-12'/>
        </div>
        
        {/* Title Text */}
        <h2 className="text-2xl font-bold text-gray-900">Scan Successful</h2>
        <p className="mt-2 text-gray-500">QR code scanned successfully.</p>

        {/* Divider */}
        <div className="my-6 border-t border-gray-100"></div>

        {/* Info */}
        <div className="mb-8 space-y-2">
          <p className="text-gray-500 font-medium">Registration Name</p>
          <p className="text-3xl font-bold text-[#EB0A1E]">{name}</p>
        </div>

        {/* Close Button */}
        <button
          onClick={onClose}
          className="mx-auto flex items-center justify-center rounded-[10px] border border-black py-5 px-[60px] text-lg font-bold text-black transition-colors hover:bg-gray-50 active:bg-gray-100"
        >
          Close
        </button>
      </div>
    </div>
  );
};

export default ScanSuccessModal;