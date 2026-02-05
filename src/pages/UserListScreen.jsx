import React from 'react';
import { QrCode } from 'lucide-react';
import Navbar from '../components/Navbar';
import StatCard from '../components/StatsCard';
import UserList from '../components/UserList';
import ScanSuccessModal from '../components/ScanSuccessModal';
import ScanFailModal from '../components/ScanFailModal';
import InvalidQrModal from '../components/InvalidQrModal';
import AlreadyCheckedInModal from '../components/AlreadyCheckedInModal';

const UserListScreen = () => {
  // Mock data
  const users = [
    { id: '01', name: 'John Smith', time: '09:15 am' },
    { id: '02', name: 'Alex Johnson', time: '09:10 am' },
    { id: '03', name: 'Priya Sharma', time: '08:00 am' },
    { id: '04', name: 'Daniel Kim', time: '08:13 am' },
    { id: '05', name: 'Maria Gonzalez', time: '09:13 am' },
    { id: '06', name: 'Aisha Khan', time: '09:29 am' },
    { id: '07', name: 'Michael Brown', time: '09:13 am' },
    { id: '08', name: 'Emily Chen', time: '08:00 am' },
    { id: '09', name: 'Robert Wilson', time: '09:13 am' },
    { id: '10', name: 'Sofia Martinez', time: '10:07 am' },
    { id: '11', name: 'Liam O\'Connor', time: '10:05 am' },
    { id: '12', name: 'Noah Patel', time: '10:51 am' },
    { id: '13', name: 'John Laby', time: '09:45 am' },
  ];

  return (
    // Changed: Uses h-dvh (dynamic viewport height) to fit mobile screens perfectly
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

      {/* User List Section - Grows to fill remaining space */}
     <UserList/>
     {/* <ScanSuccessModal isOpen={true}  /> */}
     {/* <ScanFailModal isOpen={true}/> */}
     {/* <InvalidQrModal isOpen={true}/> */}
     {/* <AlreadyCheckedInModal isOpen={true}/> */}
    </div>
  );
};

export default UserListScreen;