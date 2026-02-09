import { CheckCircle2, Clock, FileText, Lightbulb, PieChart, Rocket } from "lucide-react";

export function Benefits() {
  const benefits = [
    {
      icon: <PieChart className="w-10 h-10 text-blue-600" />,
      title: "Данные, а не догадки",
      description: "Все выводы основаны на анализе данных и метрик",
    },
    {
      icon: <Lightbulb className="w-10 h-10 text-purple-600" />,
      title: "Конкретные решения",
      description: "Не просто проблемы, а готовый план действий",
    },
    {
      icon: <Clock className="w-10 h-10 text-green-600" />,
      title: "Быстрая реализация",
      description: "Приоритизация задач по срокам и эффекту",
    },
    {
      icon: <FileText className="w-10 h-10 text-orange-600" />,
      title: "Подробный отчет",
      description: "Детальная презентация с графиками и расчетами",
    },
    {
      icon: <Rocket className="w-10 h-10 text-red-600" />,
      title: "Прогноз ROI",
      description: "Расчет окупаемости предлагаемых изменений",
    },
    {
      icon: <CheckCircle2 className="w-10 h-10 text-teal-600" />,
      title: "Поддержка внедрения",
      description: "Помощь на этапе запуска рекомендаций",
    },
  ];

  return (
    <section className="py-20 px-4 bg-gradient-to-br from-gray-50 to-blue-50">
      <div className="container mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-4">Что вы получите</h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Не просто аудит, а инструмент для роста бизнеса
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {benefits.map((benefit, index) => (
            <div
              key={index}
              className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-shadow"
            >
              <div className="mb-4">{benefit.icon}</div>
              <h3 className="text-xl font-bold mb-2">{benefit.title}</h3>
              <p className="text-gray-600">{benefit.description}</p>
            </div>
          ))}
        </div>

        <div className="mt-16 bg-white rounded-3xl p-8 md:p-12 shadow-xl">
          <h3 className="text-3xl font-bold mb-8 text-center">
            Что входит в аудит
          </h3>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <CheckCircle2 className="w-6 h-6 text-green-600 flex-shrink-0 mt-1" />
                <div>
                  <h4 className="font-semibold mb-1">Первичная консультация</h4>
                  <p className="text-sm text-gray-600">
                    Обсуждение целей, задач и текущей ситуации
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <CheckCircle2 className="w-6 h-6 text-green-600 flex-shrink-0 mt-1" />
                <div>
                  <h4 className="font-semibold mb-1">Сбор и анализ данных</h4>
                  <p className="text-sm text-gray-600">
                    Работа с аналитикой, CRM, рекламными кабинетами
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <CheckCircle2 className="w-6 h-6 text-green-600 flex-shrink-0 mt-1" />
                <div>
                  <h4 className="font-semibold mb-1">Конкурентный анализ</h4>
                  <p className="text-sm text-gray-600">
                    Изучение стратегий конкурентов и лучших практик
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <CheckCircle2 className="w-6 h-6 text-green-600 flex-shrink-0 mt-1" />
                <div>
                  <h4 className="font-semibold mb-1">Аудит процессов</h4>
                  <p className="text-sm text-gray-600">
                    Проверка маркетинговых и продажных процессов
                  </p>
                </div>
              </div>
            </div>
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <CheckCircle2 className="w-6 h-6 text-green-600 flex-shrink-0 mt-1" />
                <div>
                  <h4 className="font-semibold mb-1">Выявление проблем</h4>
                  <p className="text-sm text-gray-600">
                    Поиск узких мест и упущенных возможностей
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <CheckCircle2 className="w-6 h-6 text-green-600 flex-shrink-0 mt-1" />
                <div>
                  <h4 className="font-semibold mb-1">План улучшений</h4>
                  <p className="text-sm text-gray-600">
                    Конкретные рекомендации с приоритетами
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <CheckCircle2 className="w-6 h-6 text-green-600 flex-shrink-0 mt-1" />
                <div>
                  <h4 className="font-semibold mb-1">Расчет эффективности</h4>
                  <p className="text-sm text-gray-600">
                    Прогноз результатов и ROI для каждой рекомендации
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <CheckCircle2 className="w-6 h-6 text-green-600 flex-shrink-0 mt-1" />
                <div>
                  <h4 className="font-semibold mb-1">Презентация результатов</h4>
                  <p className="text-sm text-gray-600">
                    Детальный отчет и личная встреча для обсуждения
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
