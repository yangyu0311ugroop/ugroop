import React from 'react';

function UGSplash() {
  return (
    <div id="da-slider" className="da-slider">
      <div className="da-slide">
        <h2 style={{ textTransform: 'uppercase' }}>
          MANAGE ALL YOUR SCHOOL STUDY TOURS - Splash
        </h2>
        <p style={{ top: '150px;' }}>
          ügroop – a one-stop-shop solution for group tours organisers,
          teachers, students, parents and relatives to quickly and efficiently
          plan, prepare and promote upcoming tours, easily communicate during
          the tour and finally evaluate the tour outcomes, issues and
          experiences.
        </p>
        <a href=" " className="da-link">
          Read more
        </a>
        <div className="da-img">
          <img src="./assets/ugroop-family-school.png" alt="" />
        </div>
      </div>
      <div className="da-slide">
        <h2 style={{ textTransform: 'uppercase' }}>WORRY-FREE FAMILY</h2>
        <p style={{ top: '150px' }}>
          ügroop – Understandably parents would be concerned about sending their
          child overseas; safety and security is foremost in everyone’s
          thoughts. The ability to keep track of where they are, what is
          happening, how things are going and just to stay in touch, from any
          device, is key to peace of mind.
        </p>
        <a href=" " className="da-link">
          Read more
        </a>
        <div className="da-img">
          <img
            src="./assets/ugroop-group-student-sufing-ugroop-site.png"
            alt=""
          />
        </div>
      </div>
      <div className="da-slide">
        <h2 style={{ textTransform: 'uppercase;' }}>
          ACCESS ANYTIME, ANYWHERE
        </h2>
        <p style={{ top: '150px !important' }}>
          everything about your tour is securely stored and at your fingertips
          24x7 from school, home or on the move. From detailed itineraries,
          plans and activities, any side tours, student details and medical
          records through to risk assessments, daily organiser reports,
          messages, pictures and videos, ügroop is the vital link for every
          stakeholder to stay connected.
        </p>
        <a href="~/User/Registration" className="da-link">
          Register Now
        </a>
        <div className="da-img">
          <img src="./assets/ugroop-group-icon.png" alt="" />
        </div>
      </div>
      <nav className="da-arrows">
        <span className="da-arrows-prev" />
        <span className="da-arrows-next" />
      </nav>
    </div>
  );
}

export default UGSplash;
