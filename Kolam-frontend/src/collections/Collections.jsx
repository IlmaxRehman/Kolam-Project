// Kolam-frontend/src/Collections.jsx
import React from "react";
import Navbar from "../homepage/Navbar";
import Footer from "../homepage/Footer";


function Collections() {
  const images = [
    "/images/img1.jpg",
    "/images/img2.jpg",
    "/images/img3.jpg",
    "/images/img4.jpg",
    "/images/img5.jpg",
    "/images/img6.jpg",
    "/images/img7.jpg",
    "/images/img8.jpg",
    "/images/img9.jpg",
    "/images/img10.jpg",
    "/images/img11.jpg",
    "/images/img12.jpg",
    "/images/img13.jpg",
    "/images/img14.jpg",
    "/images/img15.jpg",
    "/images/img16.jpg",
    "/images/img17.jpg",
    "/images/img18.jpg",
    "/images/img19.jpg",
    "/images/image20.jpg",
    "/images/image21.jpg",
  ];

  return (
    <div>
      <Navbar />
     

      <main className="gallery">
        {images.map((src, i) => (
          <div className="card" key={i}>
            <img src={src} alt={`Kolam ${i + 1}`} />
          </div>
        ))}
      </main>

  
    </div>
  );
}

export default Collections;
