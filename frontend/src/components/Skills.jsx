const skills = [
  "Java",
  "C",
  "Python",
  "JavaScript",
  "React",
  "Node.js",
  "Express.js",
  "MongoDB",
  "SQL",
  "Git",
  "GitHub",
  "REST APIs",
  "HTML",
  "CSS",
  "DSA",
];

function Skills() {
  return (
    <section id="skills" className="content-section">

      <div className="section-label">
        <span>03</span>
        SKILLS
      </div>

      <h2 className="section-title">
        Technologies I work with
      </h2>

      <div className="skills-grid">

        {skills.map((skill) => (
          <div
            className="skill-card"
            key={skill}
          >
            {skill}
          </div>
        ))}

      </div>

    </section>
  );
}

export default Skills;