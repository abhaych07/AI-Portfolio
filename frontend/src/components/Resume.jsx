import { Download, FileText } from "lucide-react";

function Resume() {
  return (
    <section id="resume" className="content-section">

      <div className="section-label">
        <span>05</span>
        RESUME
      </div>

      <div className="resume-card">

        <div className="resume-icon">
          <FileText size={32} />
        </div>

        <div className="resume-info">

          <h2>
            Want to know more?
          </h2>

          <p>
            Take a look at my complete resume.
          </p>

        </div>

        <a
          href="/Abhay_Resume_FS1.pdf"
          target="_blank"
          rel="noopener noreferrer"
          className="resume-button"
        >
          <Download size={18} />
          View Resume
        </a>

      </div>

    </section>
  );
}

export default Resume;