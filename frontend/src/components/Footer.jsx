import { Mail, Phone, ArrowUp } from "lucide-react";

function Footer() {
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <footer id="contact" className="footer">

      <div className="footer-container">

        <div className="footer-top">

          <div className="footer-intro">

            <p className="footer-small-title">
              HAVE A PROJECT IN MIND?
            </p>

            <h2>
              Let's build something
              <span> amazing.</span>
            </h2>

            <p className="footer-description">
              I'm always open to discussing new projects,
              opportunities and interesting ideas.
            </p>

          </div>

          <div className="footer-connect">

            <a
              href="mailto:chaudharyabhay0077@gmail.com"
              className="footer-contact-item"
            >
              <Mail size={20} />

              <div>
                <span>Email</span>
                <strong>chaudharyabhay0077@gmail.com</strong>
              </div>

            </a>

            <a
              href="tel:+919919445598"
              className="footer-contact-item"
            >
              <Phone size={20} />

              <div>
                <span>Phone</span>
                <strong>+91 9919445598</strong>
              </div>

            </a>

          </div>

        </div>

        <div className="footer-social-section">

          <p>CONNECT WITH ME</p>

          <div className="footer-socials">

            <a
              href="https://github.com/abhaych07"
              target="_blank"
              rel="noopener noreferrer"
            >
              <span className="social-brand">GH</span>
              <span>GitHub</span>
            </a>

            <a
              href="https://www.linkedin.com/in/abhay-kumar-chaudhary-3a364929b/?isSelfProfile=true"
              target="_blank"
              rel="noopener noreferrer"
            >
              <span className="social-brand">in</span>
              <span>LinkedIn</span>
            </a>

            <a href="mailto:chaudharyabhay0077@gmail.com">
              <Mail size={19} />
              <span>Email</span>
            </a>

          </div>

        </div>

        <div className="footer-bottom">

          <p>
            © {new Date().getFullYear()} Abhay Kumar Chaudhary.
            All rights reserved.
          </p>

          <button
            className="back-to-top"
            onClick={scrollToTop}
          >
            Back to top
            <ArrowUp size={16} />
          </button>

        </div>

      </div>

    </footer>
  );
}

export default Footer;