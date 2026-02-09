import { useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";

export function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const faqs = [
    {
      question: "Сколько времени занимает аудит?",
      answer:
        "В зависимости от объема: маркетинговый аудит — 14-21 день, аудит отдела продаж — 10-14 дней, комплексный — 21-30 дней. Я работаю параллельно с вашей командой, поэтому это не отвлекает от основных процессов.",
    },
    {
      question: "Что я получу по итогам аудита?",
      answer:
        "Вы получите детальный отчет (обычно 60-100 страниц) с анализом текущей ситуации, выявленными проблемами, конкретным планом действий с приоритетами, расчетом ROI для каждой рекомендации и презентацию результатов. Плюс 30 дней бесплатной поддержки при внедрении.",
    },
    {
      question: "Как вы гарантируете результат?",
      answer:
        "Если я не найду точки роста для вашего бизнеса, я верну 100% стоимости аудита. За 5 лет работы это не случалось ни разу — всегда находятся возможности для улучшения. Средний ROI внедрения моих рекомендаций — 1:12.",
    },
    {
      question: "Нужно ли мне присутствовать на всех этапах?",
      answer:
        "Нет, я работаю максимально автономно. От вас потребуется: первичная встреча (1-2 часа), предоставление доступов к аналитике/CRM, несколько коротких созвонов для уточнения деталей и финальная презентация результатов (1.5-2 часа).",
    },
    {
      question: "Подойдет ли аудит для моей ниши?",
      answer:
        "Я работаю с B2B и B2C компаниями в разных нишах: e-commerce, услуги, производство, образование, медицина, SaaS и другие. Методология аудита универсальна и адаптируется под специфику вашего бизнеса.",
    },
    {
      question: "Что если у меня маленький бизнес?",
      answer:
        "Аудит подходит для бизнеса с выручкой от 3 млн руб/месяц. Если меньше — рекомендую сначала внедрить базовые процессы. Если больше — аудит точно окупится многократно.",
    },
    {
      question: "Вы помогаете с внедрением рекомендаций?",
      answer:
        "Да, в каждом тарифе включена 30-дневная поддержка при внедрении. Отвечаю на вопросы, помогаю адаптировать рекомендации, консультирую команду. Также могу взять на себя внедрение как отдельный проект.",
    },
    {
      question: "Какие данные вам нужны для аудита?",
      answer:
        "Доступ к Google Analytics/Яндекс.Метрике, рекламным кабинетам, CRM-системе, данные о продажах и воронке. Все данные используются строго конфиденциально, подписываем NDA.",
    },
    {
      question: "Чем ваш аудит отличается от других?",
      answer:
        "Я не просто выдаю список проблем, а даю готовый план внедрения с приоритетами и расчетом эффекта. У меня 5 дипломов MBA, опыт работы с 50+ компаниями и средний рост продаж клиентов +67%. Плюс гарантия 100% возврата, если не найду точки роста.",
    },
    {
      question: "Можно ли оплатить в рассрочку?",
      answer:
        "Да, возможна рассрочка 50% при старте и 50% при получении отчета. Также работаю с юридическими лицами по договору с отсрочкой платежа.",
    },
  ];

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="py-20 px-4 bg-white">
      <div className="container mx-auto max-w-4xl">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-4">Частые вопросы</h2>
          <p className="text-xl text-gray-600">
            Ответы на вопросы, которые чаще всего задают клиенты
          </p>
        </div>

        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <div
              key={index}
              className="border rounded-xl overflow-hidden bg-white shadow-sm hover:shadow-md transition-shadow"
            >
              <button
                onClick={() => toggleFAQ(index)}
                className="w-full px-6 py-5 flex items-center justify-between text-left hover:bg-gray-50 transition-colors"
              >
                <span className="font-semibold text-lg pr-4">
                  {faq.question}
                </span>
                {openIndex === index ? (
                  <ChevronUp className="w-5 h-5 text-blue-600 flex-shrink-0" />
                ) : (
                  <ChevronDown className="w-5 h-5 text-gray-400 flex-shrink-0" />
                )}
              </button>
              {openIndex === index && (
                <div className="px-6 pb-5">
                  <p className="text-gray-700 leading-relaxed">{faq.answer}</p>
                </div>
              )}
            </div>
          ))}
        </div>

        <div className="mt-12 text-center bg-gradient-to-br from-blue-50 to-purple-50 rounded-2xl p-8">
          <h3 className="text-2xl font-bold mb-2">Не нашли ответ?</h3>
          <p className="text-gray-600 mb-4">
            Оставьте заявку на бесплатную консультацию, и я отвечу на все ваши вопросы
          </p>
          <a
            href="#cta"
            className="inline-block bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-lg font-semibold transition-colors"
          >
            Задать вопрос
          </a>
        </div>
      </div>
    </section>
  );
}
