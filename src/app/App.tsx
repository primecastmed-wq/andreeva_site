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
import { MessageCircle } from "lucide-react";

export default function App() {
  const scrollToCTA = () => {
    const element = document.getElementById("cta");
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

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

      <div className="fixed bottom-4 right-4 z-50 flex flex-col items-end gap-3">
        <a
          href="https://t.me/AndreevaSvetlana_bot"
          target="_blank"
          rel="noreferrer"
          className="h-12 w-12 rounded-full bg-sky-500 hover:bg-sky-600 text-white flex items-center justify-center shadow-lg"
          aria-label="Написать в Telegram"
        >
          <MessageCircle size={22} />
        </a>
        <button
          onClick={scrollToCTA}
          className="bg-orange-500 hover:bg-orange-600 text-white font-semibold px-5 py-3 rounded-full shadow-lg text-sm md:text-base"
        >
          Записаться бесплатно
        </button>
      </div>
    </div>
  );
}
