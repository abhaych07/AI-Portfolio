import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import AIChat from "../components/AIChat";
import About from "../components/About";
import Skills from "../components/Skills";
import Projects from "../components/Projects";
import Resume from "../components/Resume";
import Footer from "../components/Footer";

function Home() {
  return (
    <>
      <Navbar />

      <main>
        <Hero />

        <AIChat />

        <About />

        <Skills />

        <Projects />

        <Resume />
      </main>

      <Footer />
    </>
  );
}

export default Home;