import React from "react";


function AboutUs() {
  return (
    <div className="about-container">
      {/* Title */}
      <h1 className="about-title">About Us</h1>

      {/* Section 1 */}
      <section className="about-section">
        <div className="about-text">
          <h2>Our Mission</h2>
          <p>
            Kolam is more than just floor art – it's a meditation, a prayer, and
            a connection to our ancestors. Every morning, millions of women
            across South India create these intricate patterns as a way to
            welcome prosperity and ward off negative energy.
          </p>
          <p>
            Our app aims to preserve this dying art form by making it accessible
            to everyone, regardless of their location or background. We provide
            step-by-step tutorials, pattern libraries, and a community where
            kolam enthusiasts can share their creations.
          </p>
        </div>
        <div className="about-image">
          <img src="/images/about1.png" alt="Kolam Mission" />
        </div>
      </section>

      {/* Section 2 */}
      <section className="about-section reverse">
        <div className="about-text">
          <h2>Traditional Art, Modern Technology</h2>
          <p>
            Kolam is a form of drawing that is drawn by using rice flour, chalk
            powder, or white rock powder, often using naturally or synthetically
            colored powders. It's traditionally created by women in front of
            their homes every morning.
          </p>
          <p>
            Our app brings this beautiful tradition into the digital age, making
            it accessible to everyone while preserving its cultural significance
            and spiritual meaning.
          </p>
        </div>
        <div className="about-image">
          <img src="/images/about6.jpeg" alt="Traditional Kolam" />
        </div>
      </section>

      {/* Section 3 */}
      <section className="about-grid">
        <div className="grid-item">
          <img src="/images/about2.png" alt="Artisan" />
          <h3>Traditional Craftsmanship</h3>
          <p>
            Watch master artisans create intricate kolam patterns with precision
            and devotion, passed down through generations.
          </p>
        </div>
        <div className="grid-item">
          <img src="/images/about3.png" alt="Sacred Spaces" />
          <h3>Sacred Spaces</h3>
          <p>
            Kolams transform ordinary courtyards into sacred spaces, welcoming
            prosperity and positive energy into homes.
          </p>
        </div>
        <div className="grid-item">
          <img src="/images/about4.png" alt="Geometric Beauty" />
          <h3>Geometric Beauty</h3>
          <p>
            Explore the mathematical precision and artistic beauty of geometric
            kolam patterns that represent cosmic harmony.
          </p>
        </div>
        <div className="grid-item">
          <img src="/images/about1.png" alt="Festival Celebrations" />
          <h3>Festival Celebrations</h3>
          <p>
            During festivals like Diwali, kolams become even more elaborate,
            combining with diyas to create magical celebrations.
          </p>
        </div>
      </section>
    </div>
  );
}

export default AboutUs;
