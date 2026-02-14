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

  // Modal state
  const [activeModal, setActiveModal] = useState(null);

  // Store participant safely
  const [modalParticipant, setModalParticipant] = useState(null);

  // Stats state
  const [totalRegistration, setTotalRegistration] = useState(0);
  const [scannedParticipants, setScannedParticipants] = useState(0);

  // User list
  const [userList, setUserList] = useState([]);

  // Close modal
  const handleClose = () => {
    setActiveModal(null);
  };

  // Capture navigation state safely
  useEffect(() => {

    if (location.state?.scanStatus) {

      setActiveModal(location.state.scanStatus);

      setModalParticipant(location.state.participant || null);

      // Clear navigation state AFTER saving data
      navigate(location.pathname, { replace: true });

    }

  }, []);

  // Fetch participants
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
  time: participant.checkedInAt
    ? new Date(participant.checkedInAt).toLocaleTimeString("en-SA", {
        timeZone: "Asia/Riyadh",   // 🇸🇦 Saudi Arabia timezone
        hour: "2-digit",
        minute: "2-digit",
        hour12: true
      })
    : "Unknown Time"
}));


        setUserList(tranformedUserlist);

      }
      catch (error) {

        console.error("Error fetching participants:", error);

      }

    };

    fetchData();

  }, []);

  return (

    <div className="w-full h-dvh bg-gray-100 flex flex-col font-sans overflow-hidden">

      {/* Navbar */}
      <div className="flex-none">
        <Navbar />
      </div>

      {/* Stats */}
      <div className="flex-none px-6 py-6 flex gap-4 items-center justify-center">

        <StatCard
          number={totalRegistration}
          label={"Total Registration"}
        />

        <StatCard
          number={scannedParticipants}
          label={"Scanned Users"}
        />

      </div>

      {/* User list */}
      <UserList users={userList} />

      {/* Success Modal */}
      {activeModal === "success" && (

        <ScanSuccessModal
          isOpen={true}
          onClose={handleClose}
          name={modalParticipant?.name || "Unknown User"}
        />

      )}

      {/* Server Error */}
      {activeModal === "server_error" && (

        <ScanFailModal
          isOpen={true}
          onClose={handleClose}
        />

      )}

      {/* Invalid QR */}
      {activeModal === "invalid_qrcode" && (

        <InvalidQrModal
          isOpen={true}
          onClose={handleClose}
          onRetry={() => navigate("/scanner")}
        />

      )}

      {/* Already Checked In */}
      {activeModal === "already_checked_in" && (

        <AlreadyCheckedInModal
          isOpen={true}
          onClose={handleClose}
          data={{

            name: modalParticipant?.name || "Unknown User",

            time: modalParticipant?.checkedInAt
              ? new Date(modalParticipant.checkedInAt)
                  .toLocaleTimeString("en-IN", {
                    hour: "numeric",
                    minute: "2-digit",
                    hour12: true
                  })
              : "Unknown Time",

            listNo: modalParticipant?.listNumber
              || "Unknown List No."

          }}
        />

      )}

    </div>

  );

};

export default UserListScreen;
