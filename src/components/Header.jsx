// import heroImage from "../assets/hero.png";
import { useEffect, useRef, useState } from "react";

export function Header({ onApply }) {
  const heroVideoRef = useRef(null);
  const [isMuted, setIsMuted] = useState(false);

  const toggleHeroSound = () => {
    const video = heroVideoRef.current;
    if (!video) return;

    if (video.muted) {
      video.muted = false;
      setIsMuted(false);
      if (!video.paused) return;

      video.play().catch(() => {
        video.muted = true;
        setIsMuted(true);
        video.play().catch((error) => {
          if (error.name !== "NotAllowedError") {
            console.warn("Could not resume hero video.", error);
          }
        });
      });
      return;
    }

    video.muted = true;
    setIsMuted(true);
  };

  useEffect(() => {
    const video = heroVideoRef.current;
    if (!video) return;

    const startVideo = () => {
      video.muted = false;
      setIsMuted(false);
      video.play().catch(() => {
        video.muted = true;
        setIsMuted(true);
        video.play().catch((error) => {
          if (error.name !== "NotAllowedError") {
            console.warn("Could not start hero video.", error);
          }
        });
      });
    };

    const resumeVideo = () => {
      if (document.hidden || !video.paused) return;

      video.play().catch((error) => {
        video.muted = true;
        setIsMuted(true);
        video.play().catch((resumeError) => {
          if (resumeError.name !== "NotAllowedError") {
            console.warn("Could not resume hero video.", error, resumeError);
          }
        });
      });
    };

    document.addEventListener("visibilitychange", resumeVideo);
    startVideo();

    return () => {
      document.removeEventListener("visibilitychange", resumeVideo);
    };
  }, []);

  return (
    <header className="hero">
      <div className="hero-visual">
        <div className="hero-showreel">
          <video
            ref={heroVideoRef}
            src="https://ik.imagekit.io/1chlmqpwh/SWATHI%20GYNEC%20MAM%20200K%20VIDEO_3.mp4"
            loop
            playsInline
            preload="auto"
            disablePictureInPicture
            controlsList="nodownload noplaybackrate"
            webkit-playsinline="true"
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
          <span className="break-line">
            {" "}
            turn attention into real opportunities.
          </span>
        </p>
        <p className="tagline">Unga experience-ku oru strong, trusted face.</p>
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
