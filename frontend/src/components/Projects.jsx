const projects = [
  {
    number: "01",
    title: "Wayfare",
    description:
      "A full-stack travel listing platform with authentication, listings, reviews, image uploads and maps.",
    technologies:
      "Node.js · Express · MongoDB · EJS · Cloudinary · Leaflet",
    status: "Live",
    statusType: "live",
    link: "https://wayfare-1-rznj.onrender.com/listings",
    linkText: "View Project ↗",
  },

  {
    number: "02",
    title: "Simon Says Game",
    description:
      "An interactive memory game built with HTML, CSS and JavaScript featuring progressively challenging gameplay.",
    technologies:
      "HTML · CSS · JavaScript",
    status: "Live",
    statusType: "live",
    link: "https://abhaych07.github.io/Simon-Say-Game/",
    linkText: "View Project ↗",
  },

  {
    number: "03",
    title: "StreamHive",
    description:
      "A backend-focused video platform API with authentication, subscriptions, playlists, likes and aggregation pipelines.",
    technologies:
      "Node.js · Express · MongoDB · JWT · Cloudinary",
    status: "In Progress",
    statusType: "progress",
    link: null,
    linkText: "Under Development",
  },
];

function Projects() {
  return (
    <section id="projects" className="content-section">

      <div className="section-label">
        <span>04</span>
        PROJECTS
      </div>

      <h2 className="section-title">
        Things I've built
      </h2>

      <div className="projects-grid">

        {projects.map((project) => {

          const CardContent = (
            <>
              <div className="project-header">

                <span className="project-number">
                  {project.number}
                </span>

                <span
                  className={`project-status ${project.statusType}`}
                >
                  <span className="status-dot-small"></span>
                  {project.status}
                </span>

              </div>

              <h3>{project.title}</h3>

              <p>
                {project.description}
              </p>

              <div className="project-tech">
                {project.technologies}
              </div>

              <div className="project-link-text">
                {project.linkText}
              </div>
            </>
          );

          // Live projects → clickable
          if (project.link) {
            return (
              <a
                href={project.link}
                target="_blank"
                rel="noopener noreferrer"
                className="project-card"
                key={project.number}
              >
                {CardContent}
              </a>
            );
          }

          // Projects without a link → normal card
          return (
            <div
              className="project-card project-disabled"
              key={project.number}
            >
              {CardContent}
            </div>
          );
        })}

      </div>

    </section>
  );
}

export default Projects;