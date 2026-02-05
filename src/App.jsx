import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import './App.css';
import Navbar from './components/Navbar';
import UserListScreen from './pages/UserListScreen';
import ScannerPage from "./pages/ScannerPage";

function App() {
  return (
    <BrowserRouter>
   
      <Routes>
        {/* Default route "/" redirects to "/home" */}
        <Route path="/" element={<Navigate to="/home" replace />} />
        <Route path="/home" element={<UserListScreen />} />
        <Route path="/scanner" element={<ScannerPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
