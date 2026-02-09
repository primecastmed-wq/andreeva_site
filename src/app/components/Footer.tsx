import { Mail, Linkedin, MessageCircle } from "lucide-react";

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-900 text-white py-12 px-4">
      <div className="container mx-auto">
        <div className="grid md:grid-cols-3 gap-8 mb-8">
          <div>
            <div className="flex items-center space-x-2 mb-4">
              <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-xl">МА</span>
              </div>
              <div>
                <h3 className="font-bold text-lg">MarketVantage</h3>
                <p className="text-xs text-gray-400">Аудиты с результатом</p>
              </div>
            </div>
            <p className="text-gray-400 text-sm">
              Профессиональные маркетинговые аудиты и аудиты отдела продаж
              для роста вашего бизнеса
            </p>
          </div>

          <div>
            <h4 className="font-semibold mb-4">Услуги</h4>
            <ul className="space-y-2 text-sm text-gray-400">
              <li>
                <a href="#services" className="hover:text-white transition-colors">
                  Маркетинговый аудит
                </a>
              </li>
              <li>
                <a href="#services" className="hover:text-white transition-colors">
                  Аудит отдела продаж
                </a>
              </li>
              <li>
                <a href="#services" className="hover:text-white transition-colors">
                  Комплексный аудит
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-4">Контакты</h4>
            <div className="space-y-3">
              <a
                href="mailto:svetlana@marketvantage.ru"
                className="flex items-center gap-2 text-sm text-gray-400 hover:text-white transition-colors"
              >
                <Mail size={16} />
                svetlana@marketvantage.ru
              </a>
              <a
                href="#"
                className="flex items-center gap-2 text-sm text-gray-400 hover:text-white transition-colors"
              >
                <Linkedin size={16} />
                LinkedIn
              </a>
              <a
                href="#"
                className="flex items-center gap-2 text-sm text-gray-400 hover:text-white transition-colors"
              >
                <MessageCircle size={16} />
                Telegram
              </a>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-800 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-gray-400">
            <p>© {currentYear} MarketVantage. Все права защищены.</p>
            <div className="flex gap-6">
              <a href="#" className="hover:text-white transition-colors">
                Политика конфиденциальности
              </a>
              <a href="#" className="hover:text-white transition-colors">
                Условия использования
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
