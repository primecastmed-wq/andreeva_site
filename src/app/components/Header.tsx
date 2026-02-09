import { Menu, X } from "lucide-react";
import { useState } from "react";
import { Button } from "./ui/button";

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
      setIsMenuOpen(false);
    }
  };

  return (
    <header className="fixed top-0 left-0 right-0 bg-white/95 backdrop-blur-sm z-50 border-b">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-xl">МА</span>
            </div>
            <div>
              <h1 className="font-bold text-lg">MarketVantage</h1>
              <p className="text-xs text-gray-600">Аудиты с результатом</p>
            </div>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <button
              onClick={() => scrollToSection("services")}
              className="text-gray-700 hover:text-blue-600 transition-colors"
            >
              Услуги
            </button>
            <button
              onClick={() => scrollToSection("about")}
              className="text-gray-700 hover:text-blue-600 transition-colors"
            >
              Обо мне
            </button>
            <button
              onClick={() => scrollToSection("certifications")}
              className="text-gray-700 hover:text-blue-600 transition-colors"
            >
              Квалификация
            </button>
            <Button
              onClick={() => scrollToSection("cta")}
              className="bg-blue-600 hover:bg-blue-700"
            >
              Получить консультацию
            </Button>
          </nav>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <nav className="md:hidden mt-4 pb-4 flex flex-col space-y-4">
            <button
              onClick={() => scrollToSection("services")}
              className="text-gray-700 hover:text-blue-600 transition-colors text-left"
            >
              Услуги
            </button>
            <button
              onClick={() => scrollToSection("about")}
              className="text-gray-700 hover:text-blue-600 transition-colors text-left"
            >
              Обо мне
            </button>
            <button
              onClick={() => scrollToSection("certifications")}
              className="text-gray-700 hover:text-blue-600 transition-colors text-left"
            >
              Квалификация
            </button>
            <Button
              onClick={() => scrollToSection("cta")}
              className="bg-blue-600 hover:bg-blue-700 w-full"
            >
              Получить консультацию
            </Button>
          </nav>
        )}
      </div>
    </header>
  );
}
