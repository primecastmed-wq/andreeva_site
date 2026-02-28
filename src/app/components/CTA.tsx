import { useState } from "react";
import { Send, Mail, MessageSquare, Phone, Clock } from "lucide-react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import { Card } from "./ui/card";

export function CTA() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });
  const [status, setStatus] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setStatus("Отправка...");

    const telegramMessage = `
<b>🚀 НОВАЯ ЗАЯВКА С САЙТА</b>

<b>👤 Имя:</b> ${formData.name}
<b>📧 Email:</b> <code>${formData.email}</code>
<b>📱 Телефон:</b> <code>${formData.phone}</code>
<b>💬 Сообщение:</b> ${formData.message || "Не указано"}
    `.trim();

    try {
      const response = await fetch("/api/telegram", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: telegramMessage }),
      });
      const data = await response.json();
      if (!response.ok || !data?.ok) {
        throw new Error("Telegram send failed");
      }

      setStatus(
        data?.message_id
          ? `Заявка отправлена (ID: ${data.message_id}).`
          : "Заявка отправлена."
      );
      setFormData({ name: "", email: "", phone: "", message: "" });
      if (
        typeof window !== "undefined" &&
        typeof (window as any).ym === "function"
      ) {
        (window as any).ym(106751172, "reachGoal", "lead_form_submit");
      }
    } catch {
      setStatus("Не удалось отправить заявку. Попробуйте еще раз.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <section id="cta" className="py-20 px-4 bg-gradient-to-br from-blue-600 to-purple-600">
      <div className="container mx-auto">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="text-white">
            <div className="inline-block bg-yellow-400 text-gray-900 px-4 py-2 rounded-full font-semibold mb-6 animate-pulse">
              ⚡ Только в феврале: бонус-чек-лист в подарок
            </div>

            <h2 className="text-4xl lg:text-5xl font-bold mb-6">
              Получите бесплатную 30-минутную консультацию
            </h2>
            
            <p className="text-xl text-blue-100 mb-4">
              На консультации я:
            </p>
            <ul className="text-blue-100 space-y-3 mb-8 text-lg">
              <li className="flex items-start gap-2">
                <span className="text-yellow-400 font-bold">✓</span>
                <span>Изучу вашу текущую ситуацию</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-yellow-400 font-bold">✓</span>
                <span>Дам 3-5 быстрых рекомендаций для роста</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-yellow-400 font-bold">✓</span>
                <span>Расскажу, как аудит поможет вашему бизнесу</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-yellow-400 font-bold">✓</span>
                <span>Отвечу на все ваши вопросы</span>
              </li>
            </ul>

            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-white/20 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Clock className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="font-semibold text-lg mb-1">
                    Без обязательств
                  </h3>
                  <p className="text-blue-100">
                    Консультация бесплатная, никакого давления
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-white/20 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Mail className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="font-semibold text-lg mb-1">Быстрый ответ</h3>
                  <p className="text-blue-100">
                    Отвечу в течение 2 часов в рабочее время
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-white/20 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Phone className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="font-semibold text-lg mb-1">
                    Удобный формат
                  </h3>
                  <p className="text-blue-100">
                    Zoom, Google Meet или телефон — как вам удобнее
                  </p>
                </div>
              </div>
            </div>

            <div className="mt-8 p-4 bg-white/10 rounded-lg border-2 border-yellow-400">
              <p className="text-yellow-100 font-semibold">
                🎁 При заказе аудита в феврале — чек-лист "27 точек роста для бизнеса" в подарок (стоимость 15 000 ₽)
              </p>
            </div>
          </div>

          <Card className="p-8 shadow-2xl">
            <h3 className="text-2xl font-bold mb-2">Оставить заявку</h3>
            <p className="text-gray-600 mb-6">
              Заполните форму, и я свяжусь с вами для назначения консультации
            </p>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label htmlFor="name" className="block text-sm font-medium mb-2">
                  Ваше имя *
                </label>
                <Input
                  id="name"
                  name="name"
                  type="text"
                  required
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Как к вам обращаться?"
                  className="h-12"
                />
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-medium mb-2">
                  Email *
                </label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  required
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="your@email.com"
                  className="h-12"
                />
              </div>

              <div>
                <label htmlFor="phone" className="block text-sm font-medium mb-2">
                  Телефон *
                </label>
                <Input
                  id="phone"
                  name="phone"
                  type="tel"
                  required
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder="+7 (___) ___-__-__"
                  className="h-12"
                />
              </div>

              <div>
                <label htmlFor="message" className="block text-sm font-medium mb-2">
                  Расскажите о вашем бизнесе
                </label>
                <Textarea
                  id="message"
                  name="message"
                  rows={4}
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="Какой у вас бизнес? Какие цели? Что хотите улучшить?"
                />
              </div>

              <Button
                type="submit"
                className="w-full bg-blue-600 hover:bg-blue-700 text-lg py-6"
                disabled={isSubmitting}
              >
                {isSubmitting ? "Отправка..." : "Получить консультацию бесплатно"}
                <Send className="ml-2" size={20} />
              </Button>
              {status && <p className="text-sm text-blue-700 font-medium">{status}</p>}

              <p className="text-xs text-gray-500 text-center leading-relaxed">
                Нажимая кнопку, вы соглашаетесь с обработкой персональных данных и политикой конфиденциальности
              </p>
            </form>

            <div className="mt-6 pt-6 border-t">
              <div className="flex items-center justify-center gap-8 text-sm text-gray-600">
                <a
                  href="https://t.me/AndreevaSvetlana_bot"
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center gap-2 hover:text-blue-600 transition-colors"
                >
                  <MessageSquare size={16} className="text-blue-600" />
                  <span>Telegram</span>
                </a>
                <a
                  href="mailto:Im@andreeva1.ru"
                  className="flex items-center gap-2 hover:text-blue-600 transition-colors"
                >
                  <Mail size={16} className="text-blue-600" />
                  <span>Im@andreeva1.ru</span>
                </a>
                <div className="flex items-center gap-2">
                  <Phone size={16} className="text-blue-600" />
                  <span>Звонок</span>
                </div>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </section>
  );
}
