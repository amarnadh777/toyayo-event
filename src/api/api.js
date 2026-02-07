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