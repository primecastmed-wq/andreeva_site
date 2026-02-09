import { BarChart3, Users, Target, CheckCircle2 } from "lucide-react";
import { Card } from "./ui/card";
import { Button } from "./ui/button";

export function Services() {
  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  const services = [
    {
      icon: <BarChart3 className="w-12 h-12 text-blue-600" />,
      title: "Маркетинговый аудит",
      price: "от 150 000 ₽",
      duration: "14-21 день",
      description: "Глубокий анализ всех маркетинговых каналов и стратегий",
      features: [
        "Анализ целевой аудитории и позиционирования",
        "Оценка эффективности рекламных каналов",
        "Аудит сайта и конверсий",
        "Конкурентный анализ",
        "План улучшений с ROI прогнозом",
      ],
    },
    {
      icon: <Users className="w-12 h-12 text-purple-600" />,
      title: "Аудит отдела продаж",
      price: "от 130 000 ₽",
      duration: "10-14 дней",
      description: "Комплексная проверка процессов и эффективности продаж",
      features: [
        "Анализ воронки продаж",
        "Оценка работы менеджеров",
        "Аудит скриптов и CRM-системы",
        "Выявление узких мест",
        "Разработка системы мотивации",
      ],
      badge: "Хит",
    },
    {
      icon: <Target className="w-12 h-12 text-green-600" />,
      title: "Комплексный аудит под ключ",
      price: "от 250 000 ₽",
      duration: "21-30 дней",
      description: "Полная диагностика маркетинга и продаж с планом внедрения",
      features: [
        "Маркетинг + Отдел продаж",
        "Интеграция маркетинга и продаж",
        "Сквозная аналитика",
        "Детальный план внедрения",
        "Поддержка на этапе запуска",
      ],
      badge: "Выгодно -15%",
      popular: true,
    },
  ];

  return (
    <section id="services" className="py-20 px-4 bg-gradient-to-br from-gray-50 to-blue-50">
      <div className="container mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-4">Тарифы и услуги</h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Выберите подходящий формат аудита для вашего бизнеса
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {services.map((service, index) => (
            <Card
              key={index}
              className={`overflow-hidden hover:shadow-xl transition-shadow relative ${
                service.popular ? "border-2 border-blue-600" : ""
              }`}
            >
              {service.badge && (
                <div className="absolute top-4 right-4 bg-blue-600 text-white px-3 py-1 rounded-full text-sm font-semibold z-10">
                  {service.badge}
                </div>
              )}
              <div className="p-6">
                <div className="mb-4">{service.icon}</div>
                <h3 className="text-2xl font-bold mb-2">{service.title}</h3>
                <div className="flex items-baseline gap-2 mb-2">
                  <span className="text-3xl font-bold text-blue-600">
                    {service.price}
                  </span>
                </div>
                <div className="text-sm text-gray-600 mb-4">
                  Срок: {service.duration}
                </div>
                <p className="text-gray-600 mb-6">{service.description}</p>
                <ul className="space-y-3 mb-6">
                  {service.features.map((feature, idx) => (
                    <li key={idx} className="flex items-start gap-2">
                      <CheckCircle2 className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                      <span className="text-sm text-gray-700">{feature}</span>
                    </li>
                  ))}
                </ul>
                <Button
                  onClick={() => scrollToSection("cta")}
                  className={`w-full ${
                    service.popular
                      ? "bg-blue-600 hover:bg-blue-700"
                      : "bg-gray-900 hover:bg-gray-800"
                  }`}
                >
                  Заказать аудит
                </Button>
              </div>
            </Card>
          ))}
        </div>

        <div className="bg-white rounded-2xl p-8 shadow-lg">
          <h3 className="text-2xl font-bold mb-6 text-center">
            Гарантия результата
          </h3>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <CheckCircle2 className="w-8 h-8 text-green-600" />
              </div>
              <h4 className="font-semibold mb-2">100% возврат</h4>
              <p className="text-sm text-gray-600">
                Если не найду точки роста, верну деньги полностью
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <CheckCircle2 className="w-8 h-8 text-blue-600" />
              </div>
              <h4 className="font-semibold mb-2">Поддержка 30 дней</h4>
              <p className="text-sm text-gray-600">
                Бесплатные консультации при внедрении
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <CheckCircle2 className="w-8 h-8 text-purple-600" />
              </div>
              <h4 className="font-semibold mb-2">Конкретика</h4>
              <p className="text-sm text-gray-600">
                План внедрения с приоритетами и расчетом эффекта
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
