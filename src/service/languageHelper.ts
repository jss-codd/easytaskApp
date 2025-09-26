import i18n from "./i18n";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const changeLanguage = (lang: string) => {
  i18n.changeLanguage(lang);
  AsyncStorage.setItem('language', lang);
};

export const getCurrentLanguage = () => i18n.language;
