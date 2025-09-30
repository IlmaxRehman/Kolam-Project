import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./homepage/Navbar";
import Hero from "./homepage/Hero";
import Footer from "./homepage/Footer";
import AboutUs from "./AboutUs.jsx";       // if you have About page
import Collections from "./collections/Collections";   
import "./index.css"; 
import LearnWithUs from "./LearnWithUs.jsx";

function App() {
  return (
    <Router>
      <Navbar /> {/* Navbar stays consistent across pages */}

      <Routes>
        <Route path="/" element={<Hero />} />       {/* homepage */}
        
        <Route path="/collections" element={<Collections />} /> {/* collections page */}
         <Route path="/learn" element={<LearnWithUs />} />
         <Route path="/about" element={<AboutUs />} />
       
      </Routes>

      <Footer /> {/* Footer stays consistent across pages */}
    </Router>
  );
}

export default App;
