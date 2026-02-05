import React, { useState } from 'react';
import { Flashlight, Scan } from 'lucide-react';
import bgCrop from "../assets/bgCroped.png"; // Ensure this path matches your file structure

const ScannerPage = () => {
  // State to toggle flashlight purely for visual feedback
  const [isFlashOn, setIsFlashOn] = useState(false);

  return (
    <div className="relative h-screen w-full overflow-hidden bg-black font-sans">
      
      {/* ------------------------------------------------------
         1. BACKGROUND LAYER
         ------------------------------------------------------ */}
      <div className="absolute inset-0 z-0">
        <img 
          src={bgCrop} 
          alt="Toyota RAV4 Background" 
          className="h-full w-full object-cover"
        />
        {/* Gradient overlay to ensure top text is readable */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-transparent to-black/20" />
      </div>

      {/* ------------------------------------------------------
         2. MAIN UI CONTAINER
         ------------------------------------------------------ */}
      <div className="relative z-10 flex h-full flex-col justify-between p-6">
        
        {/* HEADER REMOVED */}

        {/* Center Scanner Section 
            Added 'flex-1' here. This forces this section to grow and take up 
            all available space, effectively centering the scanner vertically.
        */}
        <div className="flex-1 flex flex-col items-center justify-center gap-8 -mt-20">
            
            {/* RAV4 Title */}
            <div className="text-center space-y-1">
                <h1 className="text-4xl font-black tracking-[0.4em] text-white/90 drop-shadow-md">
                    RAV 4
                </h1>
                <p className="text-[#EB0A1E] font-medium text-lg tracking-wide">
                    2026 الجديدة كلياً
                </p>
            </div>

            {/* The Scanner Frame & QR Code */}
            <div className="relative">
                {/* Custom SVG Frame */}
                <div className="absolute -inset-6 pointer-events-none">
                    <svg className="w-full h-full text-white" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 100 100" preserveAspectRatio="none">
                        <path d="M 25 10 L 15 10 Q 10 10 10 25 L 10 35" />
                        <path d="M 75 10 L 85 10 Q 90 10 90 25 L 90 35" />
                        <path d="M 10 65 L 10 75 Q 10 90 25 90 L 35 90" />
                        <path d="M 90 65 L 90 75 Q 90 90 75 90 L 65 90" />
                    </svg>
                </div>

                {/* QR Code Container */}
                <div className="h-48 w-48 bg-white p-3 rounded-xl shadow-2xl overflow-hidden">
                    <img 
                        src="https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=ToyotaRAV4" 
                        alt="QR Code" 
                        className="h-full w-full object-contain"
                    />
                </div>
            </div>

            {/* User Name */}
            <p className="text-white/60 font-bold tracking-widest text-sm uppercase">
                Daniel Cooper
            </p>
        </div>

        {/* Bottom Control Pill */}
        <div className="pb-12 flex justify-center">
            <div className="flex h-12 w-48 items-center rounded-full bg-white/90 backdrop-blur-md shadow-lg px-2">
                
                {/* Flashlight Button */}
                <button 
                    onClick={() => setIsFlashOn(!isFlashOn)}
                    className={`flex-1 flex justify-center items-center h-full rounded-l-full transition-colors ${isFlashOn ? 'text-yellow-600' : 'text-gray-800'}`}
                >
                    <Flashlight size={20} fill={isFlashOn ? "currentColor" : "none"} />
                </button>

                {/* Divider */}
                <div className="h-5 w-[1px] bg-gray-300"></div>

                {/* Zoom Button */}
                <button className="flex-1 flex justify-center items-center h-full text-sm font-bold text-gray-800">
                    1x
                </button>
            </div>
        </div>

      </div>
    </div>
  );
};

export default ScannerPage;