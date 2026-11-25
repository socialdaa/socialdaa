// import heroImage from "../assets/hero.png";

export function Header({ onApply }) {
  return (
    <header className="hero">
      <div className="hero-visual">
        <div className="hero-showreel">
          <video
            src="https://ik.imagekit.io/1chlmqpwh/SWATHI%20GYNEC%20MAM%20200K%20VIDEO_3.mp4"
            muted
            autoPlay
            loop
            playsInline
            preload="metadata"
            aria-label="Socialdaa showreel"
          />
        </div>
        <div className="hero-glow" />
      </div>

      <div className="top">
        <a className="logo" href="#top">
          SOCIAL<i>DAA</i>
        </a>
      </div>

      <div className="hero-content">
        <div className="hero-eyebrow">
          Attention: founders, CXOs &amp; experts
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
        <p className="note">Application-based · Limited monthly onboarding</p>
      </div>

      <div className="hero-proof" aria-label="Socialdaa service proof">
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
      </div>
    </header>
  );
}
