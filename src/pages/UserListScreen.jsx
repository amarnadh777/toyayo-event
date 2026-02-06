import React, { useState } from 'react';
import Navbar from '../components/Navbar';
import StatCard from '../components/StatsCard';
import UserList from '../components/UserList';
import ScanSuccessModal from '../components/ScanSuccessModal';
import ScanFailModal from '../components/ScanFailModal';
import InvalidQrModal from '../components/InvalidQrModal';
import AlreadyCheckedInModal from '../components/AlreadyCheckedInModal';
import { useLocation } from "react-router-dom";

const UserListScreen = () => {
  const location = useLocation();

  // 1. Initialize local state directly from the navigation state
  // This captures 'success', 'fail', 'invalid', etc., or null if nothing was passed.
  const [activeModal, setActiveModal] = useState(location.state?.scanStatus || null);

  // 2. Shared close handler for all modals
  const handleClose = () => {
    setActiveModal(null);
  };

  const users = [
    { id: '01', name: 'John Smith', time: '09:15 am' },
    { id: '02', name: 'Alex Johnson', time: '09:10 am' },
    // ... rest of your users
  ];

  return (
    <div className="w-full h-dvh bg-gray-100 flex flex-col font-sans overflow-hidden">
      
      {/* Navbar Section */}
      <div className="flex-none">
        <Navbar />
      </div>

      {/* Stats Cards Section */}
      <div className="flex-none px-6 py-6 flex gap-4">
        <StatCard number={60} label={"Total Registration"}/>
        <StatCard number={36} label={"Scanned Users"}/>
      </div>

      {/* User List Section */}
      <UserList/>

      {/* 3. Modal Rendering Logic 
          We check 'activeModal' instead of 'scanStatus'.
          When handleClose runs, activeModal becomes null, and these disappear.
      */}
      
      {activeModal === "success" && (
        <ScanSuccessModal 
          isOpen={true} 
          onClose={handleClose} 
        />
      )}

      {activeModal === "fail" && (
        <ScanFailModal 
          isOpen={true} 
          onClose={handleClose} 
        />
      )}

      {activeModal === "invalid" && (
        <InvalidQrModal 
          isOpen={true} 
          onClose={handleClose} 
        />
      )}

      {activeModal === "already_checked_in" && (
        <AlreadyCheckedInModal 
          isOpen={true} 
          onClose={handleClose} 
        />
      )}

    </div>
  );
};

export default UserListScreen;