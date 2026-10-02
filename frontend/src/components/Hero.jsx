import { ArrowDown, Sparkles } from "lucide-react";

function Hero() {
  const scrollToAI = () => {
    document.getElementById("ai")?.scrollIntoView({
      behavior: "smooth",
    });
  };

  const scrollToProjects = () => {
    document.getElementById("projects")?.scrollIntoView({
      behavior: "smooth",
    });
  };

  return (
    <section id="home" className="hero">

      <div className="hero-layout">

        {/* =========================
            PROFILE PHOTO
        ========================== */}
        <div className="hero-photo-column">

          <div className="hero-photo-glow"></div>

          <div className="hero-photo-wrap">
            <img
              src="/Abhay-linkedin-pp-half.png"
              alt="Abhay Kumar Chaudhary"
              className="hero-photo"
            />
          </div>

        </div>


        {/* =========================
            HERO CONTENT
        ========================== */}
        <div className="hero-content">

          <div className="hero-badge">
            <span className="status-dot"></span>
            Available for opportunities
          </div>

          <p className="hero-greeting">
            Hi, I'm
          </p>

          <h1 className="hero-name">
            <span>Abhay</span>{" "}
            <span className="hero-name-white">Kumar</span>{" "}
            <span className="hero-name-white">Chaudhary</span>
          </h1>

          <h2>
            Full Stack Developer & AI Enthusiast
          </h2>

          <p className="hero-description">
            I build full-stack web applications and AI-powered
            solutions using modern technologies.
          </p>

          <div className="hero-buttons">

            <button
              className="primary-btn"
              onClick={scrollToAI}
            >
              <Sparkles size={18} />
              Ask My AI
            </button>

            <button
              className="secondary-btn"
              onClick={scrollToProjects}
            >
              View My Projects
              <ArrowDown size={17} />
            </button>

          </div>

        </div>

      </div>

    </section>
  );
}

export default Hero;