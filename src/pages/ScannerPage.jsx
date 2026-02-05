import React, { useEffect, useRef, useState } from 'react';
import { Flashlight } from 'lucide-react';
import bgCrop from "../assets/bgCroped.png"; 

const ScannerPage = () => {
  const [isFlashOn, setIsFlashOn] = useState(false);
  const videoRef = useRef(null);

  useEffect(() => {
    let stream;

    const startCamera = async () => {
      try {
        // Request the back camera specifically ('environment')
        stream = await navigator.mediaDevices.getUserMedia({ 
            video: { 
                facingMode: "environment" 
            } 
        });
        
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
          // Wait for metadata to load to prevent layout shifts
          videoRef.current.onloadedmetadata = () => {
            videoRef.current.play().catch(err => console.error("Play error:", err));
          };
        }
      } catch (error) {
        console.error("Error accessing camera:", error);
      }
    };

    startCamera();

    // Cleanup function to stop camera when leaving page
    return () => {
      if (stream) {
        stream.getTracks().forEach(track => track.stop());
      }
    };
  }, []);

  return (
    <div className="relative h-screen w-full overflow-hidden bg-black font-sans">
      
      {/* 1. BACKGROUND LAYER */}
      <div className="absolute inset-0 z-0">
        <img 
          src={bgCrop} 
          alt="Toyota RAV4 Background" 
          className="h-full w-full object-cover"
        />
        {/* Dark overlay to make text pop */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-transparent to-black/20" />
      </div>

      {/* 2. MAIN UI CONTAINER */}
      <div className="relative z-10 flex h-full flex-col p-6">
        
        {/* CENTER SECTION */}
        <div className="flex-1 flex flex-col items-center justify-center gap-8 -mt-20">
            
            {/* Title */}
            <div className="text-center space-y-1">
                <h1 className="text-4xl font-black tracking-[0.4em] text-white/90 drop-shadow-md">
                    RAV 4
                </h1>
                <p className="text-[#EB0A1E] font-medium text-lg tracking-wide">
                    2026 الجديدة كلياً
                </p>
            </div>

            {/* SCANNER FRAME SECTION */}
            <div className="relative">
                
                {/* A. The White Corners Overlay (SVG) */}
                {/* This sits ON TOP of the video to give the scanner look */}
                <div className="absolute -inset-6 pointer-events-none z-20">
                    <svg className="w-full h-full text-white" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 100 100" preserveAspectRatio="none">
                        <path d="M 25 10 L 15 10 Q 10 10 10 25 L 10 35" />
                        <path d="M 75 10 L 85 10 Q 90 10 90 25 L 90 35" />
                        <path d="M 10 65 L 10 75 Q 10 90 25 90 L 35 90" />
                        <path d="M 90 65 L 90 75 Q 90 90 75 90 L 65 90" />
                    </svg>
                </div>

                {/* B. The Video Container */}
                {/* 'overflow-hidden' + 'rounded-xl' crops the video to rounded corners */}
                <div className="h-48 w-48 bg-black/50 backdrop-blur-sm rounded-xl shadow-2xl overflow-hidden border border-white/10 relative">
                    <video
                        ref={videoRef}
                        // 'object-cover' forces the video to fill the square completely
                        className="h-full w-full object-cover" 
                        playsInline
                        muted
                    ></video>
                </div>
            </div>

            {/* CONTROLS */}
            <div className="flex h-12 w-48 items-center rounded-full bg-white/90 backdrop-blur-md shadow-lg px-2">
                <button 
                    onClick={() => setIsFlashOn(!isFlashOn)}
                    className={`flex-1 flex justify-center items-center h-full rounded-l-full transition-colors ${isFlashOn ? 'text-yellow-600' : 'text-gray-800'}`}
                >
                    <Flashlight size={20} fill={isFlashOn ? "currentColor" : "none"} />
                </button>
                <div className="h-5 w-[1px] bg-gray-300"></div>
                <button className="flex-1 flex justify-center items-center h-full text-sm font-bold text-gray-800">
                    1x
                </button>
            </div>

            {/* User Name */}
            <p className="text-white/60 font-bold tracking-widest text-sm uppercase">
                Daniel Cooper
            </p>
        </div>

      </div>
    </div>
  );
};

export default ScannerPage;