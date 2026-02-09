
/**
 * Сервис для отправки уведомлений в Telegram.
 */

/**
 * Экранирует спецсимволы HTML, чтобы не ломать parse_mode: 'HTML' в Telegram.
 * Telegram очень чувствителен к незакрытым тегам и символам < > &.
 */
const escapeHTML = (text: string): string => {
  if (!text) return '';
  return text
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;');
};

export const sendTelegramNotification = async (message: string) => {
  try {
    const response = await fetch('/api/telegram', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        message,
      }),
    });

    const result = await response.json();
    if (!response.ok) {
      console.error('Telegram API Error Response:', result);
      throw new Error(`Telegram API Error: ${result.description}`);
    }
    console.log('Уведомление в Telegram успешно отправлено');
  } catch (error) {
    console.error('Ошибка при отправке в Telegram:', error);
    throw error;
  }
};

export const formatLeadMessage = (data: {
  name: string;
  company?: string;
  method: string;
  contact: string;
}) => {
  const name = escapeHTML(data.name);
  const company = escapeHTML(data.company || 'Не указана');
  const contact = escapeHTML(data.contact);
  const methodLabel = data.method === 'direct' ? 'ПРЯМАЯ СВЯЗЬ' : data.method.toUpperCase();
  
  return `
<b>🚀 НОВАЯ ЗАЯВКА С САЙТА</b>

<b>👤 Имя:</b> ${name}
<b>🏢 Компания:</b> ${company}
<b>🛠 Способ связи:</b> ${methodLabel}
<b>📱 Контакт:</b> <code>${contact}</code>

_________________________
<i>Отправлено из MarketVantage AI</i>
  `.trim();
};

export const formatAuditLeadMessage = (businessInfo: string, summary: string, leadEmail: string) => {
  const safeEmail = escapeHTML(leadEmail);
  const safeInfo = escapeHTML(businessInfo.substring(0, 500));
  const safeSummary = escapeHTML(summary);

  return `
<b>🤖 ИИ-АУДИТ ВЫПОЛНЕН (+ ЛИД)</b>

<b>📧 Email клиента:</b> <code>${safeEmail}</code>

<b>📝 Описание бизнеса:</b>
<i>${safeInfo}${businessInfo.length > 500 ? '...' : ''}</i>

<b>📊 Краткое резюме ИИ:</b>
${safeSummary}

⚠️ <i>Клиент заполнил форму email, чтобы увидеть этот результат.</i>
  `.trim();
};
