import React from "react";

function LearnWithUs() {
  const tutorials = [
    { title: "Simple Kolam for Beginners", src: "/videos/video1.mp4" },
    { title: "Kolam with Dots", src: "/videos/video2.mp4" },
    { title: "Creative Rangoli Kolam", src: "/videos/video3.mp4" },
    { title: "Traditional Festival Kolam", src: "/videos/video4.mp4" },
    { title: "Quick Daily Kolam", src: "/videos/video5.mp4" },
    { title: "Advanced Kolam Design", src: "/videos/video6.mp4" },
  ];

  return (
    <div className="learn-container">
      <h1 className="learn-title">Learn With Us</h1>
      <div className="video-container">
        {tutorials.map((t, i) => (
          <div className="video-card" key={i}>
            <video controls>
              <source src={t.src} type="video/mp4" />
              Your browser does not support the video tag.
            </video>
            <p>{t.title}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default LearnWithUs;
