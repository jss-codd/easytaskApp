// // src/i18n.ts
// import i18n from 'i18next';
// import { initReactI18next } from 'react-i18next';
// import * as RNLocalize from 'react-native-localize';
// import AsyncStorage from '@react-native-async-storage/async-storage';

// const resources = {
//   en: {
//     translation: {
//       hello: 'Hello',
//       welcome: 'Welcome to the app',
//       switchLang: 'Switch to Hindi',
//     },
//   },
//   hi: {
//     translation: {
//       hello: 'नमस्ते',
//       welcome: 'ऐप में आपका स्वागत है',
//       switchLang: 'अंग्रेज़ी में बदलें',
//     },
//   },
// };

// const fallback = { languageTag: 'en', isRTL: false };
// const { languageTag } =
//   RNLocalize.findBestAvailableLanguage(Object.keys(resources)) || fallback;

// // Load saved language from AsyncStorage
// const getSavedLanguage = async () => {
//   const savedLang = await AsyncStorage.getItem('appLanguage');
//   return savedLang || languageTag;
// };

// (async () => {
//   const lng = await getSavedLanguage();
//   i18n.use(initReactI18next).init({
//     compatibilityJSON: 'v3',
//     resources,
//     lng,
//     fallbackLng: 'en',
//     interpolation: {
//       escapeValue: false,
//     },
//   });
// })();

// export default i18n;
