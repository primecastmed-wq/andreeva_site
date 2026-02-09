import { Star, Quote } from "lucide-react";
import { Card } from "./ui/card";

export function Testimonials() {
  const testimonials = [
    {
      name: "Алексей Петров",
      position: "Основатель интернет-магазина",
      company: "FashionStore.ru",
      text: "После аудита от Светланы мы увеличили продажи на 127% за 2 месяца. Она нашла 15 точек роста, которые мы не замечали. Особенно помог аудит рекламных каналов — снизили CPA на 43%, а конверсию подняли почти в 2 раза. Окупилось в первый же месяц!",
      rating: 5,
      result: "+127% продаж",
    },
    {
      name: "Мария Соколова",
      position: "Директор по маркетингу",
      company: "TechSolutions B2B",
      text: "Работали с Светланой над аудитом маркетинга и отдела продаж. Получили детальный отчет на 80+ страниц с конкретными шагами. Внедрили 70% рекомендаций за 3 месяца. Результат: +210% качественных лидов и сокращение цикла сделки на 35%. Профессионал!",
      rating: 5,
      result: "+210% лидов",
    },
    {
      name: "Дмитрий Иванов",
      position: "Владелец клиники",
      company: "BeautyMed",
      text: "Отдел продаж работал спустя рукава, теряли клиентов. Светлана провела аудит, выявила проблемы в скриптах и мотивации менеджеров. После внедрения её рекомендаций конверсия звонок→запись выросла на 156%, а средний чек на 43%. Очень благодарен!",
      rating: 5,
      result: "+89% выручки",
    },
    {
      name: "Ольга Романова",
      position: "Коммерческий директор",
      company: "ProМебель",
      text: "Светлана провела аудит нашего отдела продаж. Нашла узкие места в воронке, неэффективные процессы и проблемы с CRM. Дала четкий план с приоритетами. За 4 месяца закрытых сделок стало на 73% больше. ROI аудита — 1:15. Лучшая инвестиция года!",
      rating: 5,
      result: "+73% сделок",
    },
    {
      name: "Сергей Козлов",
      position: "CEO стартапа",
      company: "FinTech Startup",
      text: "Нужно было быстро найти точки роста для презентации инвесторам. Светлана за 2 недели провела комплексный аудит, показала, где теряем деньги и как это исправить. Инвесторы оценили профессиональный подход. Внедрили 90% рекомендаций.",
      rating: 5,
      result: "1:12 ROI",
    },
    {
      name: "Елена Волкова",
      position: "Маркетолог",
      company: "EduPlatform",
      text: "Обратилась к Светлане за аудитом маркетинга образовательной платформы. Получила детальный разбор всех каналов, рекомендации по оптимизации бюджета и улучшению конверсий. Снизили стоимость лида на 38%, увеличили LTV на 95%. Супер!",
      rating: 5,
      result: "+95% LTV",
    },
  ];

  return (
    <section className="py-20 px-4 bg-gradient-to-br from-gray-50 to-blue-50">
      <div className="container mx-auto">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 bg-yellow-100 text-yellow-700 px-4 py-2 rounded-full mb-4">
            <Star size={20} fill="currentColor" />
            <span className="font-medium">Отзывы клиентов</span>
          </div>
          <h2 className="text-4xl font-bold mb-4">
            Что говорят клиенты
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Реальные отзывы от компаний, с которыми я работала
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <Card key={index} className="p-6 hover:shadow-xl transition-shadow">
              <div className="flex items-start justify-between mb-4">
                <Quote className="w-8 h-8 text-blue-600 opacity-20" />
                <div className="flex gap-1">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star
                      key={i}
                      size={16}
                      className="text-yellow-500 fill-yellow-500"
                    />
                  ))}
                </div>
              </div>

              <p className="text-gray-700 mb-6 leading-relaxed">
                "{testimonial.text}"
              </p>

              <div className="border-t pt-4">
                <div className="flex items-center justify-between">
                  <div>
                    <div className="font-semibold">{testimonial.name}</div>
                    <div className="text-sm text-gray-600">
                      {testimonial.position}
                    </div>
                    <div className="text-sm text-blue-600">
                      {testimonial.company}
                    </div>
                  </div>
                  <div className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm font-semibold">
                    {testimonial.result}
                  </div>
                </div>
              </div>
            </Card>
          ))}
        </div>

        <div className="mt-16 text-center">
          <div className="bg-white rounded-2xl p-8 inline-block shadow-lg">
            <div className="flex items-center justify-center gap-8">
              <div>
                <div className="text-4xl font-bold text-blue-600 mb-1">4.9/5</div>
                <div className="flex gap-1 mb-2 justify-center">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      size={20}
                      className="text-yellow-500 fill-yellow-500"
                    />
                  ))}
                </div>
                <div className="text-sm text-gray-600">Средняя оценка</div>
              </div>
              <div className="h-16 w-px bg-gray-300"></div>
              <div>
                <div className="text-4xl font-bold text-blue-600 mb-1">50+</div>
                <div className="text-sm text-gray-600">Довольных клиентов</div>
              </div>
              <div className="h-16 w-px bg-gray-300"></div>
              <div>
                <div className="text-4xl font-bold text-blue-600 mb-1">100%</div>
                <div className="text-sm text-gray-600">Рекомендуют друзьям</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
