import React, { useEffect, useRef, useState } from 'react';
import { Flashlight } from 'lucide-react';
import QrScanner from 'qr-scanner';
import RAV4 from "../assets/rav4.svg"; 
import { useNavigate } from 'react-router-dom';

const ScannerPage = () => {
  const [isFlashOn, setIsFlashOn] = useState(false);
  const videoRef = useRef(null);
  const scannerRef = useRef(null);
  const overlayRef = useRef(null);
  const navigate = useNavigate();
const [zoomLevel, setZoomLevel] = useState(1)
const trackRef = useRef(null);


async function zoom() {
  console.log("Zoom button clicked");
  const track = trackRef.current;

   if (!track) return;
   const capabilities = track.getCapabilities();
   if (!capabilities.zoom) {
     alert("Zoom not supported on this device/camera.");
     return;
   } 

  try {
        let newZoom = zoomLevel + 0.5;

        
    if (newZoom > capabilities.zoom.max) {
      newZoom = capabilities.zoom.min;
    }
    await track.applyConstraints({
      advanced: [{ zoom: newZoom }]
    });
 setZoomLevel(newZoom);
  } catch (error) {
       console.error("Zoom error:", err);
  }

}






  const toggleFlash = async () => {
    if (videoRef.current && videoRef.current.srcObject) {
      const track = videoRef.current.srcObject.getVideoTracks()[0];
      const capabilities = track.getCapabilities();
      if (capabilities.torch) {
        try {
          await track.applyConstraints({ advanced: [{ torch: !isFlashOn }] });
          setIsFlashOn(!isFlashOn);
        } catch (err) {
          console.error("Flashlight error:", err);
        }
      } else {
        alert("Flashlight not supported on this device/camera.");
      }
    }
  };

  useEffect(() => {
    const video = videoRef.current;
    const overlay = overlayRef.current;
    
    const qrScanner = new QrScanner(
      video,
      (result) => {
      
        console.log("QR Code detected:", result);
        if(result) {

          console.log("QR Code detected:", result);
          
          
          navigate("/home",
          {
            state: { scanStatus: "success"   , result: result.data }
          }
        );
      
      
      }
      },
      {
        returnDetailedScanResult: true,
        highlightScanRegion: true,
        highlightCodeOutline: true,
        overlay: overlay, 
      }
    );

    scannerRef.current = qrScanner;
    qrScanner.start().catch((err) => console.error("QR Scanner error:", err));

    return () => {
      qrScanner.stop();
      qrScanner.destroy();
    };
  }, [navigate]);





  return (
    // MAIN CONTAINER: Fixed to screen height, no scrolling
    <div className="relative h-screen w-full overflow-hidden bg-black font-sans">
      
      {/* 1. Camera Feed */}
      <video
        ref={videoRef}
        className="absolute top-0 left-0 w-full h-full object-cover"
        playsInline
        muted
      ></video>

      {/* 2. Scanner Highlight Overlay */}
      <div 
        ref={overlayRef} 
        className="absolute top-0 left-0 w-full h-full pointer-events-none"
        style={{ filter: 'hue-rotate(200deg) brightness(1.5)' }}
      ></div>



      {/* 3. UI Layer: Flex column to manage vertical space */}
      <div className="absolute inset-0 z-10 flex flex-col items-center pointer-events-none">
        
        {/* --- Top Header --- */}
        <div className="mt-8 sm:mt-12 flex-none">
          <img src={RAV4} alt="RAV4" className="h-8 drop-shadow-md" />
        </div>

        {/* --- Main Content Area (Takes all remaining space) --- */}
        <div className="flex-1 flex flex-col items-center justify-center w-full">
            
            {/* A. The Viewfinder Box */}
            <div className="relative w-64 h-64 sm:w-72 sm:h-72">
                {/* Corners */}
                <div className="absolute top-0 left-0 w-8 h-8 border-t-[3px] border-l-[3px] border-gray-300 rounded-tl-2xl"></div>
                <div className="absolute top-0 right-0 w-8 h-8 border-t-[3px] border-r-[3px] border-gray-300 rounded-tr-2xl"></div>
                <div className="absolute bottom-0 left-0 w-8 h-8 border-b-[3px] border-l-[3px] border-gray-300 rounded-bl-2xl"></div>
                <div className="absolute bottom-0 right-0 w-8 h-8 border-b-[3px] border-r-[3px] border-gray-300 rounded-br-2xl"></div>

                {/* Crosshair & Text */}
                <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-[120%] h-[2px] border-t-[2px] border-dashed border-blue-400 absolute opacity-60"></div>
                    <div className="h-[120%] w-[2px] border-l-[2px] border-dashed border-blue-400 absolute opacity-60"></div>
                    <div className="relative z-10 text-blue-400 text-lg font-light tracking-widest animate-pulse drop-shadow-[0_0_10px_rgba(59,130,246,0.8)]">
                        
                    </div>
                </div>
            </div>

            {/* B. Footer Controls (Immediately below scanner) */}
            <div className="mt-12 pointer-events-auto">
                <div className="flex items-center justify-between w-[20em] h-14 bg-gray-200/90 backdrop-blur-sm rounded-full px-1 shadow-lg border border-white/20">
                    <button 
                        onClick={toggleFlash}
                        className={`flex-1 h-full flex items-center justify-center rounded-l-full transition-colors ${isFlashOn ? 'text-yellow-600' : 'text-gray-700'}`}
                    >
                        <Flashlight size={24} fill={isFlashOn ? "currentColor" : "none"} />
                    </button>
                    <div className="w-[1px] h-6 bg-gray-400 opacity-50"></div>
                    <button className="flex-1 h-full flex items-center justify-center text-gray-900 font-bold text-lg rounded-r-full"
                    
                    onClick={zoom}
                    >
                        1x
                    </button>
                </div>
            </div>

        </div> 
        {/* End of Main Content Area */}

      </div>
    </div>
  );
};

export default ScannerPage;