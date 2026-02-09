import axiosInstance from "./apiInstance";

export const scanParticipant = async (qrCode) => {
  const response = await axiosInstance.post(
    "/participants/scan",
    { qrCode }
  );
  return response.data;
};
export const fetchParticipants = async () => {
  try {
    const response = await axiosInstance.get("/participants/list");
    return response.data;
  } catch (error) {
    console.error("Error fetching participants:", error);
    throw error;
  }
}

export const createParticipant = async (participantData) => {

  const response = await axiosInstance.post("/participants/create", participantData);
  return response.data;
}

export const generatdPdf = async (participantsId) => {
  try {
    
    const response = await axiosInstance.get(`/participants/pdf/${participantsId}`, {
      responseType: 'blob'
    });
    const url = window.URL.createObjectURL(new Blob([response.data]));
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', 'participants.pdf');
    document.body.appendChild(link);
    link.click(); 
  } catch (error) {
    console.error("Error generating PDF:", error);  
    
  }
}