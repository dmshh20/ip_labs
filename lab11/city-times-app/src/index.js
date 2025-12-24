import { formatInTimeZone } from 'date-fns-tz';
import './styles/main.scss';

// Список міст з їх часовими зонами та локалями
// Спочатку базові міста, потім додамо ще 4
const cities = [
  { name: 'Київ', timezone: 'Europe/Kyiv', locale: 'uk-UA' },
  { name: 'Лондон', timezone: 'Europe/London', locale: 'en-GB' },
  { name: 'Нью-Йорк', timezone: 'America/New_York', locale: 'en-US' },
  { name: 'Токіо', timezone: 'Asia/Tokyo', locale: 'ja-JP' },
  { name: 'Париж', timezone: 'Europe/Paris', locale: 'fr-FR' },
  { name: 'Берлін', timezone: 'Europe/Berlin', locale: 'de-DE' },
  { name: 'Мадрид', timezone: 'Europe/Madrid', locale: 'es-ES' },
  { name: 'Ріо-де-Жанейро', timezone: 'America/Sao_Paulo', locale: 'pt-BR' },
  { name: 'Москва', timezone: 'Europe/Moscow', locale: 'ru-RU' },
  { name: 'Пекін', timezone: 'Asia/Shanghai', locale: 'zh-CN' },
  { name: 'Дубай', timezone: 'Asia/Dubai', locale: 'ar-AE' },
  { name: 'Мумбаї', timezone: 'Asia/Kolkata', locale: 'hi-IN' },
  { name: 'Сеул', timezone: 'Asia/Seoul', locale: 'ko-KR' },
  // Додаткові 4 міста
  { name: 'Сідней', timezone: 'Australia/Sydney', locale: 'en-AU' },
  { name: 'Торонто', timezone: 'America/Toronto', locale: 'en-CA' },
  { name: 'Амстердам', timezone: 'Europe/Amsterdam', locale: 'nl-NL' },
  { name: 'Сінгапур', timezone: 'Asia/Singapore', locale: 'en-SG' }
];

// Функція для оновлення часу
function updateTime() {
  const now = new Date();
  const container = document.getElementById('cities-container');
  
  container.innerHTML = cities.map(city => {
    // Використовуємо toLocaleString для форматування з урахуванням локалі
    const dateTime = new Date(formatInTimeZone(now, city.timezone, 'yyyy-MM-dd HH:mm:ss'));
    
    const formattedDate = dateTime.toLocaleDateString(city.locale, {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit'
    });
    
    const formattedTime = dateTime.toLocaleTimeString(city.locale, {
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      hour12: city.locale.includes('en-US') || city.locale.includes('en-CA') || city.locale.includes('en-AU')
    });
    
    return `
      <div class="city-card">
        <div class="city-name">${city.name}</div>
        <div class="city-time">${formattedTime}</div>
        <div class="city-date">${formattedDate}</div>
        <div class="timezone">${city.timezone}</div>
      </div>
    `;
  }).join('');
}

// Оновлення часу кожну секунду
updateTime();
setInterval(updateTime, 1000);

