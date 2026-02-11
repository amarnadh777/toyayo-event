import React, { useEffect, useRef, useState } from 'react';
import { Flashlight } from 'lucide-react';
import QrScanner from 'qr-scanner';
import RAV4 from "../assets/rav4.svg"; 
import { useNavigate } from 'react-router-dom';
import { scanParticipant } from '../api/api';

const ScannerPage = () => {
  const [isFlashOn, setIsFlashOn] = useState(false);
  const [zoomLevel, setZoomLevel] = useState(1);
  
  const videoRef = useRef(null);
  const scannerRef = useRef(null);
  const overlayRef = useRef(null);
  const navigate = useNavigate();
  
  const scanSoundRef = useRef(new Audio("/scanSound.mp3"));
  const invalidSoundRef = useRef(new Audio("/invalid.mp3"));

  const handleZoom = async () => {
    const nextZoom = zoomLevel === 1 ? 2 : zoomLevel === 2 ? 4 : 1;
    const video = videoRef.current;
    if (!video || !video.srcObject) {
        setZoomLevel(nextZoom); 
        return;
    }

    const track = video.srcObject.getVideoTracks()[0];
    if (!track) return;

    const capabilities = track.getCapabilities();

    if ('zoom' in capabilities) {
      try {
        const maxZoom = capabilities.zoom.max;
        const targetZoom = Math.min(nextZoom, maxZoom);
        await track.applyConstraints({
          advanced: [{ zoom: targetZoom }]
        });
        setZoomLevel(nextZoom);
      } catch (err) {
        console.error("Zoom failed:", err);
      }
    } else {
      setZoomLevel(nextZoom);
    }
  };

  const toggleFlash = async () => {
    const video = videoRef.current;
    if (!video || !video.srcObject) return;

    const track = video.srcObject.getVideoTracks()[0];
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
  };

  useEffect(() => {
    const video = videoRef.current;
    const overlay = overlayRef.current;
    if (!video) return;

    let isScanning = true;

    const qrScanner = new QrScanner(
      video,
      async (result) => {
        if (!isScanning) return;
        isScanning = false;

        try {
          const qrCode = result.data;
          const response = await scanParticipant(qrCode);
          
          if(response.result === "success") {
            try {
                scanSoundRef.current.currentTime = 0;
                await scanSoundRef.current.play();
                if (navigator.vibrate) navigator.vibrate(200);
            } catch(e) { console.error(e); }
          }
          
          if(response.result === "invalid_qrcode" || response.result === "already_checked_in") {
             try {
                invalidSoundRef.current.currentTime = 0;
                await invalidSoundRef.current.play();
                if (navigator.vibrate) navigator.vibrate([200]);
             } catch(e) { console.error(e); }
          }

          qrScanner.stop();
          navigate("/home", {
            state: {
              scanStatus: response.result,
              participant: response.participant || null,
              message: response.message
            }
          });

        } catch (error) {
          console.error("Scan API error:", error);
          qrScanner.stop();
          navigate("/home", {
            state: {
              scanStatus: "server_error",
              message: "Server error"
            }
          });
        }
      },
      {
        returnDetailedScanResult: true,
        highlightScanRegion: true,
        highlightCodeOutline: true,
        overlay: overlay,
        preferredCamera: 'environment'
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
    <div className="relative h-[100dvh] w-full overflow-hidden bg-black font-sans overscroll-none touch-none">
 
      {/* 1. Camera Feed */}
      <video
        ref={videoRef}
        className="absolute top-0 left-0 w-full h-full object-cover transition-transform duration-300"
        style={{ transform: `scale(${zoomLevel})` }}
        playsInline
        muted
      ></video>
  
      {/* 2. Scanner Highlight Overlay */}
      <div 
        ref={overlayRef} 
        className="absolute top-0 left-0 w-full h-full pointer-events-none"
        style={{ filter: 'hue-rotate(200deg) brightness(1.5)' }}
      ></div>
      
      {/* 3. The CSS Mask Overlay */}
      <div className="overlay-content pointer-events-none">
        <div></div>
      </div>

      {/* 4. UI Layer */}
      <div className="absolute inset-0 z-10 flex flex-col items-center justify-center pointer-events-none">
        
        {/* --- Logo positioned ABOVE the scanner box --- */}
        <div className="mb-12">
          <img src={RAV4} alt="RAV4 Logo" className="h-8 drop-shadow-md" />
        </div>

        {/* Viewfinder Box */}
        <div className="relative w-64 h-64 sm:w-72 sm:h-72">
            {/* Corners */}
            <div className="absolute top-0 left-0 w-8 h-8 border-t-[3px] border-l-[3px] border-gray-300 rounded-tl-2xl"></div>
            <div className="absolute top-0 right-0 w-8 h-8 border-t-[3px] border-r-[3px] border-gray-300 rounded-tr-2xl"></div>
            <div className="absolute bottom-0 left-0 w-8 h-8 border-b-[3px] border-l-[3px] border-gray-300 rounded-bl-2xl"></div>
            <div className="absolute bottom-0 right-0 w-8 h-8 border-b-[3px] border-r-[3px] border-gray-300 rounded-br-2xl"></div>

            {/* Crosshair */}
            <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-[120%] h-[2px] border-t-[2px] border-dashed border-blue-400 absolute opacity-60"></div>
                <div className="h-[120%] w-[2px] border-l-[2px] border-dashed border-blue-400 absolute opacity-60"></div>
            </div>
        </div>

        {/* Footer Controls - Positioned below the box */}
        <div className="mt-12 pointer-events-auto">
            <div className="flex items-center justify-between w-[210px] h-[33px] bg-gradient-to-b from-[#BABEC5] to-[#F3F3F3] backdrop-blur-sm rounded-full px-1 shadow-lg border border-white/20">
                <button 
                    onClick={toggleFlash}
                    className={`flex-1 h-full flex items-center justify-center rounded-l-full transition-colors ${isFlashOn ? 'text-yellow-600' : 'text-gray-700'}`}
                >
                    <Flashlight size={24} fill={isFlashOn ? "currentColor" : "none"} />
                </button>
                <div className="w-[1px] h-6 bg-gray-400 opacity-50"></div>
                <button 
                    className="flex-1 h-full flex items-center justify-center text-gray-900 font-bold text-lg rounded-r-full"
                    onClick={handleZoom}
                >
                    {zoomLevel}x
                </button>
            </div>
        </div>

      </div>
    </div>
  );
};

export default ScannerPage;