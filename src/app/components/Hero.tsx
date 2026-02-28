import { ArrowRight, TrendingUp } from "lucide-react";
import { Button } from "./ui/button";

export function Hero() {
  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section className="pt-32 pb-20 px-4 bg-gradient-to-br from-blue-50 via-white to-purple-50">
      <div className="container mx-auto">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <div className="inline-flex items-center gap-2 bg-blue-100 text-blue-700 px-4 py-2 rounded-full mb-6">
              <TrendingUp size={16} />
              <span className="text-sm font-medium">Средний рост продаж клиентов +67%</span>
            </div>
            
            <h1 className="text-5xl lg:text-6xl font-bold mb-6 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Увеличьте продажи на 30-200% за 3 месяца
            </h1>
            
            <p className="text-xl text-gray-700 mb-4">
              <strong>Маркетинговые аудиты под ключ</strong> с конкретным планом действий и гарантией результата
            </p>
            
            <p className="text-lg text-gray-600 mb-8">
              Я найду все проблемы в вашем маркетинге и отделе продаж, дам готовый план внедрения с расчетом ROI и помогу получить результат
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4">
              <Button
                onClick={() => scrollToSection("cta")}
                size="lg"
                className="bg-blue-600 hover:bg-blue-700 text-lg px-8"
              >
                Бесплатная консультация
                <ArrowRight className="ml-2" size={20} />
              </Button>
              <Button
                onClick={() => scrollToSection("results")}
                size="lg"
                variant="outline"
                className="text-lg px-8"
              >
                Смотреть кейсы
              </Button>
            </div>

            <div className="mt-8 p-4 bg-green-50 border-l-4 border-green-600 rounded">
              <p className="text-green-800 font-semibold">
                🎁 Бонус: Чек-лист из 27 точек роста для вашего бизнеса — в подарок при заказе аудита
              </p>
            </div>

            <div className="grid grid-cols-3 gap-8 mt-12 pt-12 border-t">
              <div>
                <div className="text-3xl font-bold text-blue-600 mb-1">67%</div>
                <div className="text-sm text-gray-600">Средний рост продаж</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-blue-600 mb-1">50+</div>
                <div className="text-sm text-gray-600">Довольных клиентов</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-blue-600 mb-1">5</div>
                <div className="text-sm text-gray-600">Дипломов MBA</div>
              </div>
            </div>
          </div>

          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-br from-blue-400 to-purple-400 rounded-3xl blur-3xl opacity-20"></div>
            <img
              src="https://images.unsplash.com/photo-1589113367450-9a7b2a2177bc?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwcm9mZXNzaW9uYWwlMjBidXNpbmVzcyUyMG1hcmtldGluZyUyMHN0cmF0ZWd5fGVufDF8fHx8MTc3MDY0MTAxMXww&ixlib=rb-4.1.0&q=80&w=1080"
              alt="Marketing Strategy"
              className="relative rounded-3xl shadow-2xl w-full h-[500px] object-cover"
            />
          </div>
        </div>
      </div>
    </section>
  );
}