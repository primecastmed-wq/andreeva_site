import { Header } from "./components/Header";
import { Hero } from "./components/Hero";
import { Services } from "./components/Services";
import { Results } from "./components/Results";
import { About } from "./components/About";
import { Certifications } from "./components/Certifications";
import { Benefits } from "./components/Benefits";
import { Testimonials } from "./components/Testimonials";
import { FAQ } from "./components/FAQ";
import { CTA } from "./components/CTA";
import { Footer } from "./components/Footer";

export default function App() {
  return (
    <div className="min-h-screen bg-white">
      <Header />
      <Hero />
      <Results />
      <Services />
      <About />
      <Certifications />
      <Benefits />
      <Testimonials />
      <FAQ />
      <CTA />
      <Footer />
    </div>
  );
}