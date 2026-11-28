import { useEffect, useRef, useState } from "react";
import teamImage from "../assets/team.jpg";
import glowRoshImage from "../assets/glow_rosh.jpg";
import coachRakaniyaImage from "../assets/coach_rakaniya.jpg";
import drMokanalakshmiImage from "../assets/dr.mokanalakshmi_derm.jpg";
import drHananImage from "../assets/dr_hanan_derm.jpg";
import arunAnnaduraiImage from "../assets/arunannadurai.jpg";
import madhuKumareshImage from "../assets/madhu_kumaresh.jpg";
import drSwatiImage from "../assets/dr.swati.jpg";

export function StatementSection() {
  return (
    <section>
      <div className="wrap">
        <p className="scrub">
          You know your name should carry weight. What’s missing isn’t talent.
          It’s the time, the team and a system to do it properly.
        </p>
      </div>
    </section>
  );
}

export function UrgencySection() {
  const growthCases = [
    {
      name: "glow.rosh",
      role: "Glow with Rosh · Founder",
      experience: "Nature | Skincare | Organic",
      posts: "87 posts",
      followers: "150K followers",
      following: "1 following",
      growth: "100K",
      timeline: "1 month",
      initials: "GR",
      image: glowRoshImage,
    },
    {
      name: "coach_rakaniya",
      role: "Coach · Rakaniya",
      experience: "Lead a Healthy Active Lifestyle",
      posts: "225 posts",
      followers: "107K followers",
      following: "151 following",
      growth: "100K",
      timeline: "3 months",
      initials: "CR",
      image: coachRakaniyaImage,
    },
    {
      name: "dr.mokanalakshmi_derm",
      role: "Dr. R. M. Mokanalakshmi · Dermatologist",
      experience: "Dermatologist | Hair Transplant Surgeon",
      posts: "397 posts",
      followers: "1M followers",
      following: "8 following",
      growth: "100K",
      timeline: "13 reels",
      initials: "DM",
      image: drMokanalakshmiImage,
    },
    {
      name: "dr.hanan_derm",
      role: "Dr. Amin Hanan · Dermatologist",
      experience: "Dermatologist · Hair Transplant · Dermatology Clinic",
      posts: "460 posts",
      followers: "412K followers",
      following: "639 following",
      growth: "100K",
      timeline: "2 months",
      initials: "DH",
      image: drHananImage,
    },
    {
      name: "arunannadurai_official",
      role: "Arun Annadurai · Digital Creator",
      experience: "Fun | Life Lessons | Food",
      posts: "190 posts",
      followers: "161K followers",
      following: "1,903 following",
      growth: "58K",
      timeline: "6 months",
      initials: "AA",
      image: arunAnnaduraiImage,
    },
    {
      name: "madhu_kumaresh",
      role: "Madhu Kumaresh · Entrepreneur",
      experience: "Founder · Tanjore Paintings · Motivational Speaker",
      posts: "132 posts",
      followers: "181K followers",
      following: "1 following",
      growth: "100K",
      timeline: "3 months",
      initials: "MK",
      image: madhuKumareshImage,
    },
    {
      name: "dr.chen_yourgutbuddy",
      role: "Chenduran Suguna Navaladi Kirthi",
      experience: "Gastroenterology & Advanced Therapeutic Endoscopy",
      posts: "78 posts",
      followers: "135K followers",
      following: "0 following",
      growth: "135K",
      timeline: "3 months",
      initials: "DC",
    },
    {
      name: "drramyaja_smiles",
      role: "Dr Ramyaja Shusruth",
      experience: "Smile Specialist · Orthodontist",
      posts: "88 posts",
      followers: "95.8K followers",
      following: "2 following",
      growth: "95.8K",
      timeline: "1.5 months",
      timelineIsIllustrative: true,
      initials: "DR",
    },
    {
      name: "drsmahalakshmi",
      role: "Dr Mahalakshmi S",
      experience: "Fertility Doctor · Reproductive Medicine",
      posts: "229 posts",
      followers: "168K followers",
      following: "0 following",
      growth: "168K",
      timeline: "100K in 17 reels",
      timelineIsIllustrative: true,
      initials: "DM",
    },
    {
      name: "varifiedva",
      role: "Ari · Vardhini",
      experience: "Love & Growth",
      posts: "126 posts",
      followers: "56.6K followers",
      following: "8 following",
      growth: "56.6K",
      timeline: "1 month",
      timelineIsIllustrative: true,
      initials: "VV",
    },
    {
      name: "dr.manodarshini_manimaran",
      role: "Dr Manodarshini Manimaran",
      experience: "Obstetrician & Gynecologist",
      posts: "71 posts",
      followers: "54.3K followers",
      following: "4 following",
      growth: "54.3K",
      timeline: "2 months",
      timelineIsIllustrative: true,
      initials: "DM",
    },
    {
      name: "naren_sage",
      role: "Naren",
      experience: "Founder · Sage Hair Studio",
      posts: "119 posts",
      followers: "152K followers",
      following: "3 following",
      growth: "152K",
      timeline: "6 months",
      initials: "NS",
    },
    {
      name: "karupatti_murali",
      role: "Murali Thangam",
      experience: "Founder · Karupatti Coffee Brand",
      posts: "16 posts",
      followers: "13.1K followers",
      following: "2 following",
      growth: "13.1K",
      timeline: "1 Month",
      timelineIsIllustrative: true,
      initials: "KM",
    },
    {
      name: "diademstore.in",
      role: "Diadem",
      experience: "Silk Sarees · Bridal Sarees · Lehengas",
      posts: "5,119 posts",
      followers: "153K followers",
      following: "7 following",
      growth: "153K",
      timeline: "100K in 30 reels",
      timelineIsIllustrative: true,
      initials: "DS",
    },
    {
      name: "nutritionist_sandhyamanian",
      role: "Sandhya Manian",
      experience: "Holistic Nutritionist",
      posts: "932 posts",
      followers: "120K followers",
      following: "1,636 following",
      growth: "120K",
      timeline: "3 months",
      timelineIsIllustrative: true,
      initials: "NS",
    },
    {
      name: "suchitra_raghavan",
      role: "Suchitra Raghavan",
      experience: "Founder · Kalki Artz",
      posts: "77 posts",
      followers: "46.8K followers",
      following: "1 following",
      growth: "46.8K",
      timeline: "1.5 months",
      timelineIsIllustrative: true,
      initials: "SR",
    },
    {
      name: "choice.of.sudha",
      role: "Choice of Sudha",
      experience: "Boutique Collection · Personalized Designs",
      posts: "47 posts",
      followers: "40K followers",
      following: "1 following",
      growth: "40K",
      timeline: "1 month",
      timelineIsIllustrative: true,
      initials: "CS",
    },
    {
      name: "drlokesh_plasticsurgeon",
      role: "Dr Lokesh Suryanarayanan",
      experience: "Plastic & Reconstructive Surgeon",
      posts: "204 posts",
      followers: "159K followers",
      following: "0 following",
      growth: "159K",
      timeline: "150 videos",
      initials: "DL",
    },
    {
      name: "dr_nishaa",
      role: "Nisha R Srinivas",
      experience: "Dermatologist · Board Certified",
      posts: "1,278 posts",
      followers: "153K followers",
      following: "1,848 following",
      growth: "153K",
      timeline: "100K in 25 reels",
      timelineIsIllustrative: true,
      initials: "DN",
    },
    {
      name: "shreevarma_tamil",
      role: "Shreevarma Tamil",
      experience: "Integrated Healing & Wellness",
      posts: "2,680 posts",
      followers: "210K followers",
      following: "113 following",
      growth: "210K",
      timeline: "6 months",
      timelineIsIllustrative: true,
      initials: "ST",
    },
    {
      name: "_growwithmani",
      role: "GrowWithMani",
      experience: "Founder & CEO · Financial Services",
      posts: "199 posts",
      followers: "64K followers",
      following: "0 following",
      growth: "64K",
      timeline: "2 months",
      timelineIsIllustrative: true,
      initials: "GM",
    },
    {
      name: "dr.swati_nethaji",
      role: "Dr Swati Nethaji",
      experience: "Obstetrician · Laparoscopic Surgeon",
      posts: "206 posts",
      followers: "206K followers",
      following: "2 following",
      growth: "206K",
      timeline: "5 months",
      initials: "DN",
      image: drSwatiImage,
    },
    {
      name: "pothys.ramesh",
      role: "Sadayandi Ramesh Pothy",
      experience: "Managing Director · Pothys",
      posts: "17 posts",
      followers: "48.7K followers",
      following: "18 following",
      growth: "48.7K",
      timeline: "1 month",
      timelineIsIllustrative: true,
      initials: "PR",
    },
    {
      name: "iamdoctorfarmer",
      role: "Dr Prabhakar Raj",
      experience: "Doctor · Founder & Mentor",
      posts: "606 posts",
      followers: "620K followers",
      following: "443 following",
      growth: "620K",
      timeline: "6 months",
      timelineIsIllustrative: true,
      initials: "DF",
    },
    {
      name: "Dr. Abinaya Vijayan",
      role: "Fertility Specialist",
      experience: "Medical expertise to a trusted brand",
      posts: "29 reels",
      followers: "202K followers",
      following: "Growing organically",
      growth: "171K",
      timeline: "29 reels",
      initials: "AV",
    },
    {
      name: "Tech with Kavitha",
      role: "Technology Creator",
      experience: "Clear, consistent tech storytelling",
      posts: "Growth case",
      followers: "100K followers",
      following: "Organic growth",
      growth: "100K",
      timeline: "100K in 17 videos",
      timelineIsIllustrative: true,
      initials: "TK",
    },
  ];
  const [growthIndex, setGrowthIndex] = useState(19);
  const [isGrowthHovered, setIsGrowthHovered] = useState(false);
  const [isGrowthFocused, setIsGrowthFocused] = useState(false);

  const moveGrowthCase = (step) => {
    setGrowthIndex(
      (current) => (current + step + growthCases.length) % growthCases.length,
    );
  };

  useEffect(() => {
    if (
      isGrowthHovered ||
      isGrowthFocused ||
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
    ) {
      return;
    }

    const intervalId = window.setInterval(() => {
      setGrowthIndex((current) => (current + 1) % growthCases.length);
    }, 6000);

    return () => window.clearInterval(intervalId);
  }, [growthCases.length, isGrowthFocused, isGrowthHovered]);

  const item = growthCases[growthIndex];

  return (
    <section className="urgency-section">
      <div className="wrap">
        <div className="urgency-grid">
          <div
            className="visibility-graph"
            role="img"
            aria-label="Qualitative comparison of personal visibility: Sadayandi Ramesh of Pothys has high personal visibility, represented by Founder Visibility, Public Presence, and Personal Brand. K. P. Ramasamy of KPR Group has comparatively lower media visibility, represented by Business Reputation, Industry Presence, and Limited Founder-led Content. The bars are qualitative, not numerical metrics."
          >
            <div className="visibility-graph-heading">
              <h2>
                Two Successful Business Leaders. Different Levels of Personal
                Visibility.
              </h2>
              <p>
                Your business may already have credibility. But how visible are
                you as the person behind it?
              </p>
            </div>

            <div className="visibility-plot">
              <div className="visibility-bars" aria-hidden="true">
                <div className="visibility-bar-column visibility-bar-column--high">
                  <span className="visibility-level">
                    HIGH PERSONAL VISIBILITY
                  </span>
                  <div className="visibility-bar-track visibility-bar-track--high">
                    <span className="visibility-bar-fill visibility-bar-fill--high" />
                    <img
                      className="visibility-bar-avatar"
                      src="/pothys.png"
                      alt=""
                    />
                  </div>
                </div>
                <div className="visibility-bar-column visibility-bar-column--low">
                  <span className="visibility-level">
                    LOWER MEDIA VISIBILITY
                  </span>
                  <div className="visibility-bar-track visibility-bar-track--low">
                    <span className="visibility-bar-fill visibility-bar-fill--low" />
                    <img
                      className="visibility-bar-avatar"
                      src="/ram.png"
                      alt=""
                    />
                  </div>
                </div>
              </div>
            </div>

            <div className="visibility-bar-labels" aria-hidden="true">
              <div>
                <strong>Sadayandi Ramesh</strong>
                <span>Pothys</span>
                <ul className="visibility-descriptors">
                  <li>Founder Visibility</li>
                  <li>Public Presence</li>
                  <li>Personal Brand</li>
                </ul>
              </div>
              <div>
                <strong>K. P. Ramasamy</strong>
                <span>KPR Group</span>
                <ul className="visibility-descriptors">
                  <li>Business Reputation</li>
                  <li>Industry Presence</li>
                  <li>Limited Founder-led Content</li>
                </ul>
              </div>
            </div>
          </div>

          <div
            className="growth-case-wrap"
            onMouseEnter={() => setIsGrowthHovered(true)}
            onMouseLeave={() => setIsGrowthHovered(false)}
            onFocusCapture={() => setIsGrowthFocused(true)}
            onBlurCapture={(event) => {
              if (!event.currentTarget.contains(event.relatedTarget)) {
                setIsGrowthFocused(false);
              }
            }}
          >
            <div className="growth-case-heading">Our Results</div>
            <article className="growth-case" key={item.name}>
              <div className="growth-profile">
                <div className="growth-profile-avatar">
                  {item.image ? (
                    <img src={item.image} alt={item.name} />
                  ) : (
                    item.initials
                  )}
                </div>
                <div className="growth-profile-copy">
                  <strong>{item.name}</strong>
                  <span>
                    {item.role} · {item.experience}
                  </span>
                  <small>
                    {item.posts} · {item.followers} · {item.following}
                  </small>
                </div>
              </div>

              <div className="growth-result">
                <div className="growth-result-heading">
                  <span aria-hidden="true" />
                  <small>GROWTH</small>
                  <span aria-hidden="true" />
                </div>

                <div className="growth-result-main">
                  <svg
                    className="growth-trend-icon"
                    viewBox="0 0 130 112"
                    fill="none"
                    aria-hidden="true"
                  >
                    <path
                      d="M8 96 44 59 67 78 115 28M88 28l27-6-3 27"
                      stroke="currentColor"
                      strokeWidth="10"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                  <div className="growth-result-copy">
                    <strong>{item.growth}</strong>
                    <span>Followers Gained</span>
                  </div>
                </div>

                <div className="growth-timeline-pill">
                  <svg
                    className="growth-calendar-icon"
                    viewBox="0 0 48 48"
                    fill="none"
                    aria-hidden="true"
                  >
                    <rect
                      x="7"
                      y="11"
                      width="34"
                      height="30"
                      rx="3"
                      stroke="currentColor"
                      strokeWidth="4"
                    />
                    <path
                      d="M15 6v10M33 6v10M8 20h32M16 27h3M24 27h3M32 27h3M16 34h3M24 34h3"
                      stroke="currentColor"
                      strokeWidth="4"
                      strokeLinecap="round"
                    />
                  </svg>
                  <span
                    className="growth-timeline-divider"
                    aria-hidden="true"
                  />
                  <span className="growth-timeline-copy">
                    <small>TIMELINE</small>
                    <strong>{item.timeline}</strong>
                  </span>
                </div>
              </div>

              <div className="growth-controls">
                <span className="growth-progress">
                  {String(growthIndex + 1).padStart(2, "0")}
                  <span aria-hidden="true"> / </span>
                  {String(growthCases.length).padStart(2, "0")}
                </span>
                <span>
                  <button
                    type="button"
                    aria-label="Previous growth case"
                    onClick={() => moveGrowthCase(-1)}
                  >
                    ←
                  </button>
                  <button
                    type="button"
                    aria-label="Next growth case"
                    onClick={() => moveGrowthCase(1)}
                  >
                    →
                  </button>
                </span>
              </div>
            </article>
          </div>
        </div>
      </div>
    </section>
  );
}

export function ProcessSection() {
  const metrics = [
    ["20M+", "Followers"],
    ["5B+", "Organic Views"],
    // ["12,000+", "Leads"],
    ["25,000+", "Content Delivered"],
  ];

  return (
    <section className="how-section">
      <div className="wrap">
        <div className="how-grid">
          <div className="how-title">
            <div className="eyebrow">Our approach</div>
            <h2>
              Our Track
              <br />
              Record
            </h2>
          </div>

          <div className="how-metrics">
            {metrics.map(([value, label]) => (
              <div className="how-metric" key={label}>
                <span className="metric-icon">✦</span>
                <div>
                  <strong>{value}</strong>
                  <small>{label}</small>
                </div>
              </div>
            ))}
          </div>

          <div className="how-story">
            <div className="how-portraits">
              <div className="portrait portrait-team">
                <img
                  src={teamImage}
                  alt="The Socialdaa team outside the Socialdaa office"
                />
              </div>
            </div>
            <p>
              From strategic Reels and thought-provoking carousels to
              storytelling, personal insights and daily Stories, we craft your
              content end-to-end to position you as an authority in your
              industry. We help founders, professionals, experts and
              entrepreneurs build visibility, credibility and a strong digital
              presence that attracts the right audience and creates meaningful
              opportunities.
            </p>
          </div>

          <blockquote className="how-quote">
            Like Thalaivar says, “Enga Vazhi, Thani Vazhi”
            <span>
              we help you build a personal brand that stands out, your way.
            </span>
          </blockquote>
        </div>
      </div>
    </section>
  );
}

export function FaqSection() {
  const faqs = [
    {
      question: "What does Socialdaa do?",
      answer:
        "Socialdaa helps founders and professionals build an organic Instagram presence through strategy, scripting, shoot planning, editing and consistent content publishing.",
    },
    {
      question: "Do I need to be confident on camera?",
      answer:
        "No. Our team guides you through the process on shoot day, from ideas and delivery to camera angles and retakes, so you can stay natural and comfortable.",
    },
    {
      question: "Will the content sound like me?",
      answer:
        "Yes. We work with your real voice, experience and expertise, then shape it into clear scripts and content formats your audience can understand.",
    },
    {
      question: "How often do you create content?",
      answer:
        "The content schedule is planned around your goals and availability. We agree on the shooting and publishing cadence before starting, so expectations are clear.",
    },
    {
      question: "Can Socialdaa guarantee follower growth?",
      answer:
        "No one can guarantee a specific result. Growth depends on your niche, consistency, content quality and audience response. Our role is to create and manage a strong, repeatable system.",
    },
    {
      question: "How do I apply to work with Socialdaa?",
      answer:
        "Select “Apply Now” and complete the short application form. Our team will review your profile and get in touch if we believe it is a strong fit.",
    },
  ];

  return (
    <section className="faq-section" id="faq">
      <div className="wrap">
        <div className="faq-heading">
          <div>
            <div className="eyebrow">Frequently asked questions</div>
            <h2>Questions, answered.</h2>
          </div>
          <p>
            Everything you need to know before taking the next step with
            Socialdaa.
          </p>
        </div>

        <div className="faq-list">
          {faqs.map((faq, index) => (
            <details className="faq-item" key={faq.question} open={index === 0}>
              <summary>
                <span>{faq.question}</span>
                <span className="faq-icon" aria-hidden="true" />
              </summary>
              <p>{faq.answer}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}

export function AudienceSection() {
  const audiences = [
    "Founders & Entrepreneurs",
    "MDs & CEOs",
    "CXOs & Senior Leaders",
    "Coaches & Consultants",
    "Professionals & Domain Experts",
    "Creators & Thought Leaders",
  ];

  return (
    <section className="audience-section">
      <div className="wrap">
        <div className="audience-heading">
          <div>
            <div className="eyebrow">Built for credible voices</div>
            <h2>Who Socialdaa is for</h2>
          </div>
          <p>
            For people who already have valuable expertise - and want it to
            reach the market clearly and consistently.
          </p>
        </div>
        <div className="audience-grid">
          {audiences.map((audience) => (
            <div className="audience-card" key={audience}>
              <span>✓</span>
              <strong>{audience}</strong>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export function WorkSection({ onApply }) {
  const videos = [
    {
      name: "Dr. Abinaya Vijayan",
      role: "100K followers in 29 reels",
      file: "iphone-compatible/abinaya.mp4",
    },
    {
      name: "Dr. Hanan",
      role: "100K followers in 2 months",
      file: "iphone-compatible/hanan.mp4",
    },
    {
      name: "Swathi",
      role: "100K followers · Architect & Luxury Interior Designer",
      file: "Swatrhi mam 100k remastered.mp4",
    },
    {
      name: "Arun Annadurai",
      role: "42K to 100K+ · Creator & Entrepreneur",
      file: "iphone-compatible/arun.mp4",
    },
    {
      name: "Dr. Sakthivel Sivasubramanian",
      role: "100K in 13 reels · Chief Endocrinologist",
      file:
        "100k in 13 Reels 😭❤️Sakthiiii sir you beauty! The Universe gave you what you exactly wanted.You.mp4",
    },
    {
      name: "Dr. Surya",
      role: "Dermatologist · 52K to 114K",
      file: "iphone-compatible/surya.mp4",
    },
  ];

  const [mutedVideos, setMutedVideos] = useState(
    () => new Set(videos.map((_, index) => index)),
  );
  const [videoProgress, setVideoProgress] = useState(() =>
    videos.map(() => ({ currentTime: 0, duration: 0 })),
  );
  const [failedVideos, setFailedVideos] = useState(() => new Set());
  const [canScrollPrevious, setCanScrollPrevious] = useState(false);
  const [canScrollNext, setCanScrollNext] = useState(true);
  const reelsRef = useRef(null);
  const getVideoSource = (file) =>
    `/videos/${file.split("/").map(encodeURIComponent).join("/")}`;

  useEffect(() => {
    const reels = reelsRef.current;
    if (!reels) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const video = entry.target;
          const index = Number(video.dataset.index);

          if (entry.isIntersecting) {
            video.play().catch((error) => {
              if (error.name !== "AbortError") {
                video.muted = true;
                setMutedVideos((current) => new Set(current).add(index));
                console.warn("Could not autoplay work video.", error);
              }
            });
          } else {
            video.pause();
            if (!video.muted) {
              video.muted = true;
              setMutedVideos((current) => new Set(current).add(index));
            }
          }
        });
      },
      { root: reels, threshold: 0.6 },
    );

    reels.querySelectorAll(".reel video").forEach((video) => {
      observer.observe(video);
    });

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const reels = reelsRef.current;
    if (!reels) return;

    const updateScrollControls = () => {
      setCanScrollPrevious(reels.scrollLeft > 1);
      setCanScrollNext(
        reels.scrollLeft + reels.clientWidth < reels.scrollWidth - 1,
      );
    };

    reels.addEventListener("scroll", updateScrollControls, { passive: true });
    window.addEventListener("resize", updateScrollControls);

    return () => {
      reels.removeEventListener("scroll", updateScrollControls);
      window.removeEventListener("resize", updateScrollControls);
    };
  }, []);

  const scrollReels = (direction) => {
    const reels = reelsRef.current;
    const firstReel = reels?.querySelector(".reel");
    if (!reels || !firstReel) return;

    const gap = Number.parseFloat(window.getComputedStyle(reels).columnGap);
    reels.scrollBy({
      left: direction * (firstReel.getBoundingClientRect().width + (gap || 0)),
      behavior: "smooth",
    });
  };

  const toggleVideoMute = (index) => {
    const video = reelsRef.current?.querySelectorAll(".reel video")[index];
    if (!video) return;

    video.muted = !video.muted;
    setMutedVideos((current) => {
      const next = new Set(current);
      if (video.muted) next.add(index);
      else next.delete(index);
      return next;
    });

    if (video.paused) {
      video.play().catch((error) => {
        video.muted = true;
        setMutedVideos((current) => new Set(current).add(index));
        if (error.name !== "AbortError") {
          console.warn("Could not start work video.", error);
        }
      });
    }
  };

  const updateVideoProgress = (index, video) => {
    setVideoProgress((current) =>
      current.map((progress, currentIndex) =>
        currentIndex === index
          ? {
              currentTime: video.currentTime,
              duration: Number.isFinite(video.duration) ? video.duration : 0,
            }
          : progress,
      ),
    );
  };

  const seekVideo = (index, currentTime) => {
    const video = reelsRef.current?.querySelectorAll(".reel video")[index];
    if (!video) return;

    video.currentTime = Number(currentTime);
    updateVideoProgress(index, video);
  };

  return (
    <section className="center-section work-section" id="work">
      <div className="wrap">
        <h2>Our Work.</h2>
        <p className="work-subtitle">
          Our curated variety of short-form contents.
        </p>
        <div className="reels-frame">
          <div className="reels" ref={reelsRef}>
            {videos.map((video, index) => (
              <div className="reel" key={video.file}>
                <video
                  data-index={index}
                  src={getVideoSource(video.file)}
                  muted
                  loop
                  playsInline
                  preload="metadata"
                  onLoadedMetadata={(event) =>
                    updateVideoProgress(index, event.currentTarget)
                  }
                  onTimeUpdate={(event) =>
                    updateVideoProgress(index, event.currentTarget)
                  }
                  onError={(event) => {
                    const failedIndex = Number(
                      event.currentTarget.dataset.index,
                    );
                    setFailedVideos((current) =>
                      new Set(current).add(failedIndex),
                    );
                    console.error(
                      "Could not load work video.",
                      event.currentTarget.currentSrc,
                      event.currentTarget.error,
                    );
                  }}
                  aria-label={`${video.name} video`}
                />
                {failedVideos.has(index) && (
                  <span className="reel-error" role="status">
                    Video couldn’t be played
                  </span>
                )}
                <span className="reel-caption">
                  <strong>{video.name}</strong>
                  <small>{video.role}</small>
                </span>
                <div className="reel-controls">
                  <button
                    className="reel-mute"
                    type="button"
                    aria-label={
                      mutedVideos.has(index)
                        ? `Unmute ${video.name} video`
                        : `Mute ${video.name} video`
                    }
                    aria-pressed={!mutedVideos.has(index)}
                    onClick={() => toggleVideoMute(index)}
                  >
                    {mutedVideos.has(index) ? "Unmute" : "Mute"}
                  </button>
                  <input
                    className="reel-seek"
                    type="range"
                    min="0"
                    max={Math.max(videoProgress[index].duration, 1)}
                    step="0.1"
                    value={Math.min(
                      videoProgress[index].currentTime,
                      Math.max(videoProgress[index].duration, 1),
                    )}
                    aria-label={`Seek ${video.name} video`}
                    onChange={(event) =>
                      seekVideo(index, event.target.value)
                    }
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="work-carousel-controls" aria-label="Video carousel">
          <button
            type="button"
            aria-label="Previous videos"
            onClick={() => scrollReels(-1)}
            disabled={!canScrollPrevious}
          >
            ←
          </button>
          <span>More client stories</span>
          <button
            type="button"
            aria-label="Next videos"
            onClick={() => scrollReels(1)}
            disabled={!canScrollNext}
          >
            →
          </button>
        </div>
        <p className="tap">
          Videos autoplay muted. Tap Unmute to hear the sound.
        </p>
        <button className="btn" onClick={onApply}>
          Apply Now
        </button>
      </div>
    </section>
  );
}

// export function FounderSection({ onApply }) {
//   return (
//     <section>
//       <div className="wrap">
//         <div className="founder-grid">
//           <div className="founder-photo">[Founder photo]</div>
//           <div>
//             <div className="eyebrow">The people behind it</div>
//             <h2>
//               Led by <span className="highlight">[Founder Name].</span>
//             </h2>
//             <div className="founder-name">
//               [Founder Name]
//               <small>[Title · e.g. Founder, Socialdaa]</small>
//             </div>
//             <div className="stats">
//               <div>
//                 <b>[Stat]</b>
//                 <small>[Label]</small>
//               </div>
//               <div>
//                 <b>[Stat]</b>
//                 <small>[Label]</small>
//               </div>
//               <div>
//                 <b>[Stat]</b>
//                 <small>[Label]</small>
//               </div>
//             </div>
//             <p className="founder-copy">
//               [Two or three lines on the founder’s experience, credentials and
//               why Socialdaa exists. Use only verified facts.]
//             </p>
//             <button className="btn" onClick={onApply}>
//               Apply Now
//             </button>
//           </div>
//         </div>
//         <div className="logos">
//           <span>[Logo]</span>
//           <span>[Logo]</span>
//           <span>[Logo]</span>
//           <span>[Logo]</span>
//         </div>
//       </div>
//     </section>
//   );
// }

export function BenefitsSection() {
  const items = [
    "opens the right doors",
    "builds authority in your field",
    "gets you remembered",
    "earns trust before the first meeting",
    "makes your name carry weight",
    "builds a legacy beyond your title",
  ];
  return (
    <section className="benefits-section">
      <div className="wrap">
        <div className="eyebrow">A powerful personal brand…</div>
        {items.map((item) => (
          <p className="benefit" key={item}>
            {item}
          </p>
        ))}
      </div>
    </section>
  );
}

export function TestimonialsSection() {
  const testimonials = [
    {
      quote:
        "Reaching 100K followers in just 29 reels felt surreal! Having a single reel cross 15.7 million views and bring in 35K followers in just two days completely transformed my page.",
      name: "Dr. Abinaya Vijayan",
      role: "Fertility Specialist · 100K in 29 reels",
    },
    {
      quote:
        "Crossing 100K followers wouldn't have been possible without Socialdaa and my husband Saravanan. From scripting and videography to editing, everyone played a crucial role.",
      name: "Swathi",
      role: "Architect & Luxury Interior Designer · 100K",
    },
    {
      quote:
        "Hitting 100K followers in just 2 months has been an incredible journey! We didn't miss the mark this time - we nailed it.",
      name: "Dr. Hanan",
      role: "Dermatologist · 100K in 2 months",
    },
    {
      quote:
        "Crossing the 100K family milestone has been amazing! Even through the behind-the-scenes retakes and laughs during shoots, the team made the entire process seamless and fun.",
      name: "Dr. Surya",
      role: "Dermatologist · 52K to 114K",
    },
    {
      quote:
        "Partnering with Socialdaa completely changed the game - taking us to 100K followers in a record-breaking 13 videos and now past 200K.",
      name: "Dr. Sakthivel Sivasubramanian",
      role: "Chief Endocrinologist · 100K in 13 videos",
    },
    {
      quote:
        "Crossing 100K on my personal page is a huge step toward hitting 1 million. Team Socialdaa has been my biggest backbone and support.",
      name: "Arun Annadurai",
      role: "Creator & Entrepreneur · 42K to 100K+",
    },
  ];

  const [index, setIndex] = useState(0);
  const move = (step) =>
    setIndex(
      (current) => (current + step + testimonials.length) % testimonials.length,
    );

  return (
    <section className="center-section testimonial-section">
      <div className="wrap">
        <div className="eyebrow">Client voices</div>
        {testimonials.map(
          (testimonial, i) =>
            i === index && (
              <div className="testimonial-slide" key={testimonial.name}>
                <blockquote>“{testimonial.quote}”</blockquote>
                <div className="testimonial-person">
                  <span className="avatar" />
                  <div>
                    {testimonial.name}
                    <small>{testimonial.role}</small>
                  </div>
                </div>
              </div>
            ),
        )}
        <div className="carousel-controls">
          <button onClick={() => move(-1)} aria-label="Previous testimonial">
            ←
          </button>
          <div className="dots">
            {testimonials.map((_, i) => (
              <i
                className={i === index ? "on" : ""}
                key={i}
                onClick={() => setIndex(i)}
              />
            ))}
          </div>
          <button onClick={() => move(1)} aria-label="Next testimonial">
            →
          </button>
        </div>
      </div>
    </section>
  );
}

export function ObjectionsSection() {
  const cards = [
    [
      "I don’t have time",
      "We script, shoot and edit everything. Your part is to show up on shoot days. Unga time-ah namma paathukrom.",
    ],
    [
      "I’m not sure what to say",
      "We draw out your story and write every script in your own voice.",
    ],
    [
      "I’m not good on camera",
      "Our team guides you on shoot day, line by line. Camera-la comfortable-ah irukka help pannuvom.",
    ],
    [
      "I don’t understand social media",
      "You don’t have to. We handle the strategy, the edits and the posting plan.",
    ],
  ];
  const rail = useRef(null);
  const [flipped, setFlipped] = useState([]);
  return (
    <section>
      <div className="wrap">
        <div className="eyebrow">Be honest</div>
        <h2>What’s stopping you?</h2>
        <p className="section-copy">
          Every leader has a reason to wait. Tap the one that sounds like you.
        </p>
        <div className="objection-cards" ref={rail}>
          {cards.map(([front, back], index) => (
            <button
              className={`objection-card ${flipped.includes(index) ? "flipped" : ""}`}
              key={front}
              onClick={() =>
                setFlipped((current) =>
                  current.includes(index)
                    ? current.filter((i) => i !== index)
                    : [...current, index],
                )
              }
            >
              <span className="card-inner">
                <span className="card-face">
                  <small>+ Tap</small>
                  <strong>{front}</strong>
                </span>
                <span className="card-back">{back}</span>
              </span>
            </button>
          ))}
        </div>
        <div className="scroll-controls">
          <button
            onClick={() =>
              rail.current?.scrollBy({ left: -310, behavior: "smooth" })
            }
          >
            ‹
          </button>
          <span>Swipe</span>
          <button
            onClick={() =>
              rail.current?.scrollBy({ left: 310, behavior: "smooth" })
            }
          >
            ›
          </button>
        </div>
      </div>
    </section>
  );
}

export function FinalCta({ onApply }) {
  return (
    <section className="center-section final-cta">
      <div className="wrap">
        <h2>
          Your industry already has a few familiar faces.{" "}
          <em>Will you be one of them?</em>
        </h2>
        <button className="btn" onClick={onApply}>
          Apply Now
        </button>
        <p className="note">Application-based · Takes 2 minutes</p>
      </div>
    </section>
  );
}

export function Footer() {
  return (
    <footer>
      <div className="wrap">
        <div className="footer-row">
          <a href="mailto:hello@socialdaa.com">hello@socialdaa.com</a>
          <a className="logo" href="#top">
            <img src="/logo.png" alt="Socialdaa" />
          </a>
          <a
            href="https://www.instagram.com/socialdaa/"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Visit Socialdaa on Instagram"
          >
            Instagram
          </a>
          <a href="#">Terms &amp; Conditions</a>
        </div>
        <p className="footer-fine">
          © 2026 Socialdaa. All rights reserved. Individual results vary with
          niche, consistency and audience.
        </p>
      </div>
    </footer>
  );
}
