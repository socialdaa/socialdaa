// import heroImage from "../assets/hero.png";
import { useRef, useState } from "react";

export function Header({ onApply }) {
  const heroVideoRef = useRef(null);
  const [isMuted, setIsMuted] = useState(true);

  const toggleHeroSound = () => {
    const video = heroVideoRef.current;
    if (!video) return;

    if (video.muted) {
      video.muted = false;
      setIsMuted(false);
      video.play().catch(() => {
        video.muted = true;
        setIsMuted(true);
      });
      return;
    }

    video.muted = true;
    setIsMuted(true);
  };

  return (
    <header className="hero">
      <div className="hero-visual">
        <div className="hero-showreel">
          <video
            ref={heroVideoRef}
            src="https://ik.imagekit.io/1chlmqpwh/SWATHI%20GYNEC%20MAM%20200K%20VIDEO_3.mp4"
            muted
            autoPlay
            loop
            playsInline
            preload="metadata"
            aria-label="Socialdaa showreel"
          />
          <button
            className="hero-sound-button"
            type="button"
            aria-label={isMuted ? "Unmute hero video" : "Mute hero video"}
            aria-pressed={!isMuted}
            onClick={toggleHeroSound}
          >
            {isMuted ? "🔇" : "🔊"}
          </button>
        </div>
        <div className="hero-glow" />
      </div>

      <div className="top">
        <a className="logo" href="#top">
          <img src="/logo.png" alt="Socialdaa" />
        </a>
      </div>

      <div className="hero-content">
        <div className="hero-eyebrow">
          Founders, CXOs, Professionals &amp; Industry Experts — This Is for You
        </div>
        <h1>
          We Turn Founders Into <span className="highlight">Authorities.</span>
        </h1>
        <p className="sub">
          We build personal brands that earn trust, create authority and
          <br />
          turn attention into real opportunities.
        </p>
        <p className="tagline">Unga expertise-ku oru strong, trusted face.</p>
        <p className="service-line">Strategy · Scripting · Shoot · Editing</p>
        <button className="btn btn-wide" onClick={onApply}>
          Build My Personal Brand
        </button>
        <p className="note">Selective Partnerships · Limited Monthly Slots</p>
      </div>

      {/* <div className="hero-proof" aria-label="Socialdaa service proof">
        <div>
          <strong>Strategic</strong>
          <small>Personal positioning</small>
        </div>
        <div>
          <strong>Done for you</strong>
          <small>Script to final edit</small>
        </div>
        <div>
          <strong>Built for trust</strong>
          <small>Not vanity content</small>
        </div>
      </div> */}
    </header>
  );
}
