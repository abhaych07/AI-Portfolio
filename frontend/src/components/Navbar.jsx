import { useEffect, useState } from "react";
import { Sparkles } from "lucide-react";

function Navbar() {
  const [activeSection, setActiveSection] = useState("home");

  const scrollToSection = (sectionId) => {
    const section = document.getElementById(sectionId);

    if (section) {
      section.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  };

  useEffect(() => {
    const sections = document.querySelectorAll(
      "#home, #ai-assistant, #about, #skills, #projects, #resume, #contact"
    );

    const observer = new IntersectionObserver(
      (entries) => {
        const visibleSections = entries
          .filter((entry) => entry.isIntersecting)
          .sort(
            (a, b) =>
              b.intersectionRatio - a.intersectionRatio
          );

        if (visibleSections.length > 0) {
          setActiveSection(visibleSections[0].target.id);
        }
      },
      {
        root: null,
        threshold: 0.25,
        rootMargin: "-80px 0px -45% 0px",
      }
    );

    sections.forEach((section) => observer.observe(section));

    return () => {
      sections.forEach((section) => observer.unobserve(section));
    };
  }, []);

  return (
    <nav className="navbar">
      <div className="navbar-container">

        {/* LOGO */}
        <div
          className="logo"
          onClick={() => scrollToSection("home")}
        >
          &lt;Abhay/&gt;
        </div>

        {/* NAV LINKS */}
        <div className="nav-links">

          <button
            className={activeSection === "home" ? "active" : ""}
            onClick={() => scrollToSection("home")}
          >
            Home
          </button>

          <button
            className={
              activeSection === "ai-assistant" ? "active" : ""
            }
            onClick={() => scrollToSection("ai-assistant")}
          >
            <span className="ai-nav-link">
              <Sparkles size={15} />
              AI Assistant
            </span>
          </button>

          <button
            className={activeSection === "about" ? "active" : ""}
            onClick={() => scrollToSection("about")}
          >
            About
          </button>

          <button
            className={activeSection === "skills" ? "active" : ""}
            onClick={() => scrollToSection("skills")}
          >
            Skills
          </button>

          <button
            className={activeSection === "projects" ? "active" : ""}
            onClick={() => scrollToSection("projects")}
          >
            Projects
          </button>

          <button
            className={activeSection === "resume" ? "active" : ""}
            onClick={() => scrollToSection("resume")}
          >
            Resume
          </button>

        </div>

        {/* CONTACT */}
        <button
          className="nav-contact"
          onClick={() => scrollToSection("contact")}
        >
          Let's Connect
        </button>

      </div>
    </nav>
  );
}

export default Navbar;