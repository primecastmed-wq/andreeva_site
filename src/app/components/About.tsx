import { Award, Briefcase, GraduationCap, TrendingUp } from "lucide-react";
import profilePhoto from "../../assets/2fbb72934fb705942eab788137886363d6b0b3ff.png";

export function About() {
  const highlights = [
    {
      icon: <GraduationCap className="w-8 h-8 text-blue-600" />,
      title: "MBA в маркетинге",
      description: "Grenoble Ecole de Management, Moscow Institute, OEAEP",
    },
    {
      icon: <Award className="w-8 h-8 text-purple-600" />,
      title: "Google Cloud Certified",
      description: "Cloud Digital Leader - современные технологии",
    },
    {
      icon: <Briefcase className="w-8 h-8 text-green-600" />,
      title: "5+ лет опыта",
      description: "Практикующий маркетолог с реальными кейсами",
    },
    {
      icon: <TrendingUp className="w-8 h-8 text-orange-600" />,
      title: "Результаты клиентов",
      description: "Увеличение продаж от 30% до 200%",
    },
  ];

  return (
    <section id="about" className="py-20 px-4 bg-gradient-to-br from-gray-50 to-blue-50">
      <div className="container mx-auto">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="order-2 lg:order-1">
            <h2 className="text-4xl font-bold mb-6">
              Светлана Андреева
            </h2>
            <p className="text-lg text-gray-700 mb-6">
              Практикующий маркетолог с MBA и международными сертификациями.
              Специализируюсь на комплексных аудитах маркетинга и отделов продаж
              для B2B и B2C компаний.
            </p>
            <p className="text-lg text-gray-700 mb-6">
              Моя задача — не просто найти проблемы, а дать вам конкретный план
              действий с прогнозируемым результатом. Каждый аудит включает
              детальный анализ, приоритизацию действий и расчет окупаемости.
            </p>
            <p className="text-lg text-gray-700 mb-8">
              Работаю с компаниями от стартапов до крупного бизнеса, помогая
              увеличить эффективность маркетинга и продаж на основе данных и
              лучших практик.
            </p>

            <div className="grid grid-cols-2 gap-6">
              {highlights.map((item, index) => (
                <div key={index} className="flex gap-3">
                  <div className="flex-shrink-0">{item.icon}</div>
                  <div>
                    <h4 className="font-semibold mb-1">{item.title}</h4>
                    <p className="text-sm text-gray-600">{item.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="relative order-1 lg:order-2">
            <div className="absolute inset-0 bg-gradient-to-br from-blue-400 to-purple-400 rounded-3xl blur-3xl opacity-20"></div>
            <div className="relative">
              <img
                src={profilePhoto}
                alt="Светлана Андреева - Маркетолог MBA"
                className="relative rounded-3xl shadow-2xl w-full object-cover"
              />
            </div>
            
            <div className="mt-8 relative bg-white p-8 rounded-3xl shadow-2xl">
              <h3 className="text-2xl font-bold mb-6">Мой подход</h3>
              <div className="space-y-6">
                <div className="flex gap-4">
                  <div className="w-8 h-8 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center font-bold flex-shrink-0">
                    1
                  </div>
                  <div>
                    <h4 className="font-semibold mb-1">Глубокий анализ</h4>
                    <p className="text-sm text-gray-600">
                      Изучаю ваш бизнес, конкурентов, рынок и аудиторию
                    </p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="w-8 h-8 bg-purple-100 text-purple-600 rounded-full flex items-center justify-center font-bold flex-shrink-0">
                    2
                  </div>
                  <div>
                    <h4 className="font-semibold mb-1">Выявление проблем</h4>
                    <p className="text-sm text-gray-600">
                      Нахожу узкие места и упущенные возможности
                    </p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="w-8 h-8 bg-green-100 text-green-600 rounded-full flex items-center justify-center font-bold flex-shrink-0">
                    3
                  </div>
                  <div>
                    <h4 className="font-semibold mb-1">Конкретный план</h4>
                    <p className="text-sm text-gray-600">
                      Разрабатываю приоритизированный план с расчетом ROI
                    </p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="w-8 h-8 bg-orange-100 text-orange-600 rounded-full flex items-center justify-center font-bold flex-shrink-0">
                    4
                  </div>
                  <div>
                    <h4 className="font-semibold mb-1">Поддержка внедрения</h4>
                    <p className="text-sm text-gray-600">
                      Помогаю с запуском изменений и отслеживанием результатов
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
