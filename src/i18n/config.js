import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

const resources = {
  en: {
    translation: {
      "title": "Nepal Election Results 2026",
      "live_updates": "Live Updates",
      "dashboard": "Dashboard",
      "federal": "Federal",
      "provincial": "Provincial",
      "local": "Local",
      "search_placeholder": "Search constituency or district...",
      "breaking_news": "Breaking News",
      "seats_won": "Seats Won",
      "total_seats": "Total Seats",
      "loading": "Loading updates...",
      "last_updated": "Last updated: {{time}}",
    }
  },
  ne: {
    translation: {
      "title": "नेपाल निर्वाचन परिणाम २०८१",
      "live_updates": "प्रत्यक्ष अपडेट",
      "dashboard": "ड्यासबोर्ड",
      "federal": "संघीय",
      "provincial": "प्रादेशिक",
      "local": "स्थानीय",
      "search_placeholder": "निर्वाचन क्षेत्र वा जिल्ला खोज्नुहोस्...",
      "breaking_news": "ताजा समाचार",
      "seats_won": "जितेको सिट",
      "total_seats": "कुल सिट",
      "loading": "अपडेट लोड हुँदैछ...",
      "last_updated": "अन्तिम अपडेट: {{time}}",
    }
  }
};

i18n
  .use(initReactI18next)
  .init({
    resources,
    lng: 'en',
    interpolation: {
      escapeValue: false
    }
  });

export default i18n;
