import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import * as RNLocalize from "react-native-localize";
import en from "../locales/en.json";
import hi from "../locales/hi.json";

const resources = { en: { translation: en }, hi: { translation: hi } };

i18n
  .use(initReactI18next)
  .init({
    compatibilityJSON: 'v4',
    resources,
    lng: RNLocalize.getLocales()[0].languageCode,
    fallbackLng: "en",
    interpolation: { escapeValue: false },
  });

export default i18n;
