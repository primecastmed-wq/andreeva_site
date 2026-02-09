import { TrendingUp, DollarSign, Users, Target } from "lucide-react";
import { Card } from "./ui/card";

export function Results() {
  const cases = [
    {
      industry: "Интернет-магазин одежды",
      problem: "Высокая стоимость привлечения клиента, низкая конверсия сайта",
      result: "+127% продаж за 2 месяца",
      metrics: [
        { label: "Снижение CPA", value: "-43%" },
        { label: "Рост конверсии", value: "+89%" },
        { label: "ROI аудита", value: "1:18" },
      ],
      icon: <TrendingUp className="w-8 h-8 text-green-600" />,
    },
    {
      industry: "B2B SaaS компания",
      problem: "Низкое качество лидов, долгий цикл сделки",
      result: "+210% квалифицированных лидов",
      metrics: [
        { label: "Качество лидов", value: "+210%" },
        { label: "Сокращение цикла", value: "-35%" },
        { label: "Рост LTV", value: "+156%" },
      ],
      icon: <Target className="w-8 h-8 text-blue-600" />,
    },
    {
      industry: "Клиника эстетической медицины",
      problem: "Неэффективная работа отдела продаж, потеря клиентов",
      result: "+89% выручки за 3 месяца",
      metrics: [
        { label: "Конверсия звонок→запись", value: "+156%" },
        { label: "Средний чек", value: "+43%" },
        { label: "Повторные продажи", value: "+92%" },
      ],
      icon: <DollarSign className="w-8 h-8 text-purple-600" />,
    },
    {
      industry: "Производственная компания",
      problem: "Отдел продаж работал без системы, низкая мотивация",
      result: "+73% закрытых сделок",
      metrics: [
        { label: "Эффективность менеджеров", value: "+134%" },
        { label: "Средняя сделка", value: "+28%" },
        { label: "Цикл сделки", value: "-41%" },
      ],
      icon: <Users className="w-8 h-8 text-orange-600" />,
    },
  ];

  return (
    <section id="results" className="py-20 px-4 bg-white">
      <div className="container mx-auto">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 bg-green-100 text-green-700 px-4 py-2 rounded-full mb-4">
            <TrendingUp size={20} />
            <span className="font-medium">Реальные результаты</span>
          </div>
          <h2 className="text-4xl font-bold mb-4">
            Кейсы: что получили мои клиенты
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Конкретные цифры роста после внедрения рекомендаций из аудита
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 mb-12">
          {cases.map((caseItem, index) => (
            <Card
              key={index}
              className="p-8 hover:shadow-xl transition-shadow border-2"
            >
              <div className="flex items-start justify-between mb-4">
                <div>
                  <div className="text-sm font-medium text-blue-600 mb-2">
                    {caseItem.industry}
                  </div>
                  <div className="mb-4">{caseItem.icon}</div>
                </div>
              </div>

              <div className="mb-4">
                <div className="text-sm text-gray-600 mb-2">
                  <strong>Проблема:</strong> {caseItem.problem}
                </div>
              </div>

              <div className="bg-gradient-to-br from-green-50 to-blue-50 p-4 rounded-xl mb-4">
                <div className="text-2xl font-bold text-green-600 mb-1">
                  {caseItem.result}
                </div>
              </div>

              <div className="grid grid-cols-3 gap-4">
                {caseItem.metrics.map((metric, idx) => (
                  <div key={idx} className="text-center">
                    <div className="text-xl font-bold text-blue-600 mb-1">
                      {metric.value}
                    </div>
                    <div className="text-xs text-gray-600">{metric.label}</div>
                  </div>
                ))}
              </div>
            </Card>
          ))}
        </div>

        <div className="bg-gradient-to-br from-blue-600 to-purple-600 rounded-3xl p-8 md:p-12 text-white text-center">
          <h3 className="text-3xl font-bold mb-4">
            Средний ROI внедрения рекомендаций
          </h3>
          <div className="text-6xl font-bold mb-4">1:12</div>
          <p className="text-xl text-blue-100 max-w-2xl mx-auto">
            На каждый рубль, вложенный в аудит и внедрение рекомендаций,
            клиенты получают в среднем 12 рублей дополнительной прибыли
          </p>
        </div>
      </div>
    </section>
  );
}
