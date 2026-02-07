import React, { useEffect, useState } from 'react';
import Navbar from '../components/Navbar';
import StatCard from '../components/StatsCard';
import UserList from '../components/UserList';
import ScanSuccessModal from '../components/ScanSuccessModal';
import ScanFailModal from '../components/ScanFailModal';
import InvalidQrModal from '../components/InvalidQrModal';
import AlreadyCheckedInModal from '../components/AlreadyCheckedInModal';
import { useLocation, useNavigate } from "react-router-dom";
import { fetchParticipants } from '../api/api';

const UserListScreen = () => {
  const location = useLocation();
  const navigate = useNavigate();
  // 1. Initialize local state directly from the navigation state
  // This captures 'success', 'fail', 'invalid', etc., or null if nothing was passed.
  const [activeModal, setActiveModal] = useState(location.state?.scanStatus || null);
 const [totalRegistration, setTotalRegistration] = useState(0);
 const [scannedParticipants, setScannedParticipants] = useState(0);
 const [userList, setUserList] = useState([]);
  // 2. Shared close handler for all modals
  const handleClose = () => {
    setActiveModal(null);
  };
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



  useEffect(() => {

    const fetchData = async () => {
      try {
        const response = await fetchParticipants();
        console.log("Participants data:", response);
        setTotalRegistration(response.totalRegistarion);
        setScannedParticipants(response.checkedInParticipants);
        const tranformedUserlist = response.participantsList.map((participant) => ({
          id: participant.listNumber,
          name: participant.name,
          time: participant.checkedInAt ? new Date(participant.checkedInAt).toLocaleTimeString("en-IN", {
            hour: "numeric",
            minute: "2-digit",
            hour12: true
          }) : "Unknown Time"
        }));
        setUserList(tranformedUserlist);
      } catch (error) {
        console.error("Error fetching participants:", error); 
      }
    }
    fetchData();
  }, []);

  return (
    <div className="w-full h-dvh bg-gray-100 flex flex-col font-sans overflow-hidden">
      
      {/* Navbar Section */}
      <div className="flex-none">
        <Navbar />
      </div>

      {/* Stats Cards Section */}
      <div className="flex-none px-6 py-6 flex gap-4">
        <StatCard number={totalRegistration} label={"Total Registration"}/>
        <StatCard number={scannedParticipants} label={"Scanned Users"}/>
      </div>

      {/* User List Section */}
      <UserList users={userList}/>

      {/* 3. Modal Rendering Logic 
          We check 'activeModal' instead of 'scanStatus'.
          When handleClose runs, activeModal becomes null, and these disappear.
      */}
      
      {activeModal === "success" && (
        <ScanSuccessModal 
          isOpen={true} 
          onClose={handleClose} 
          name={location.state?.participant?.name || "Unknown User"}
        />
      )}

      {activeModal === "server_error" && (
        <ScanFailModal 
          isOpen={true} 
          onClose={handleClose} 
        />
      )}

      {activeModal === "invalid_qrcode"  && (
        <InvalidQrModal 
          isOpen={true} 
          onClose={handleClose} 
          onRetry={() =>{
            navigate("/scanner")
          }}
        />
      )}

      {activeModal === "already_checked_in" && (
    <AlreadyCheckedInModal 
  isOpen={true} 
  onClose={handleClose} 
  data={{
    name: location.state?.participant?.name || "Unknown User",

    time: location.state?.participant?.checkedInAt
      ? new Date(location.state.participant.checkedInAt)
          .toLocaleTimeString("en-IN", {
            hour: "numeric",
            minute: "2-digit",
            hour12: true
          })
      : "Unknown Time",

    listNo: location.state?.participant?.listNumber || "Unknown List No."
  }}
/>

      )}

    </div>
  );
};

export default UserListScreen;