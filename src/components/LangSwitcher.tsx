import React, { useEffect, useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet, Modal } from "react-native";
import { changeLanguage } from "../service/languageHelper";
import Colors from "../constants/color";
import FONT_FAMILY from "../constants/FontFamily";
import metrics from "../constants/metrics";
import LanguageIcon from "../Icons/LanguageIcon";
import i18n from "../service/i18n";
import AsyncStorage from "@react-native-async-storage/async-storage";

interface Language {
  code: string;
  name: string;
}

const languages: Language[] = [
  { code: "en", name: "Eng" },
  { code: "hi", name: "हिन्दी" },
];

export default function LanguageSwitcher() {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedLanguage, setSelectedLanguage] = useState(i18n.language || "en");

  useEffect(() => {
    setSelectedLanguage(i18n.language);
  }, [i18n.language]);

  const handleLanguageChange = (languageCode: string) => {
    setSelectedLanguage(languageCode);
    changeLanguage(languageCode);
    AsyncStorage.setItem('language', languageCode);
    setIsModalVisible(false);
    i18n.changeLanguage(languageCode);
  };

  const currentLanguage = languages.find(lang => lang.code === selectedLanguage) || languages[0];

  return (
    <>
      <TouchableOpacity
        style={styles.languageButton}
        onPress={() => setIsModalVisible(true)}
        activeOpacity={0.7}
      >
        <Text style={styles.flagText}><LanguageIcon size={20} color={Colors.WHITE} /></Text>
        <Text style={styles.languageText}>{currentLanguage.name}</Text>
      </TouchableOpacity>

      <Modal
        visible={isModalVisible}
        transparent={true}
        animationType="fade"
        onRequestClose={() => setIsModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>Select Language</Text>
              <TouchableOpacity
                style={styles.closeButton}
                onPress={() => setIsModalVisible(false)}
                activeOpacity={0.7}
              >
                <Text style={styles.closeButtonText}>×</Text>
              </TouchableOpacity>
            </View>
            <View>
              {languages.map((language) => (
                <TouchableOpacity
                  key={language.code}
                  style={[
                    styles.languageOption,
                    selectedLanguage === language.code && styles.selectedOption
                  ]}
                  onPress={() => handleLanguageChange(language.code)}
                  activeOpacity={0.7}
                >
                  <Text style={[
                    styles.optionText,
                    selectedLanguage === language.code && styles.selectedText
                  ]}>
                    {language.name}
                  </Text>

                </TouchableOpacity>
              ))}
            </View>
          </View>
        </View>
      </Modal>
    </>
  );
}

const styles = StyleSheet.create({
  languageButton: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: Colors.BUTTON_BACKGROUND,
    paddingHorizontal: metrics.paddingHorizontal(10),
    paddingVertical: metrics.paddingVertical(5),
    borderRadius: metrics.borderRadius(12),
    borderWidth: 1,
    borderColor: Colors.MAIN_COLOR,
    shadowColor: Colors.BLACK,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 5,
    gap: metrics.gap(6),
  },
  modalHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  flagText: {
    fontSize: metrics.fontSize(16),
  },
  languageText: {
    fontSize: metrics.fontSize(12),
    fontWeight: "600",
    color: Colors.WHITE,
    fontFamily: FONT_FAMILY.MEDIUM,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: metrics.paddingHorizontal(20),
  },
  modalContent: {
    backgroundColor: Colors.WHITE,
    borderRadius: metrics.borderRadius(16),
    padding: metrics.padding(20),
    width: "100%",
    maxWidth: 300,
    shadowColor: Colors.BLACK,
    shadowOffset: {
      width: 0,
      height: 10,
    },
    shadowOpacity: 0.25,
    shadowRadius: 10,
    elevation: 10,
  },
  modalTitle: {
    fontSize: metrics.fontSize(14),
    fontWeight: "600",
    color: Colors.CHARCOAL_GRAY,
    textAlign: "center",
    marginBottom: metrics.marginBottom(20),
    fontFamily: FONT_FAMILY.SEMI_BOLD,
  },
  languageOption: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: metrics.paddingVertical(12),
    paddingHorizontal: metrics.paddingHorizontal(16),
    borderRadius: metrics.borderRadius(12),
    marginBottom: metrics.marginBottom(8),
    backgroundColor: Colors.LIGHT_BLUE,
    borderWidth: 1,
    borderColor: "transparent",
  },
  selectedOption: {
    backgroundColor: Colors.MAIN_COLOR,
    borderColor: Colors.MAIN_COLOR,
  },

  optionText: {
    fontSize: metrics.fontSize(14),
    fontWeight: "500",
    color: Colors.CHARCOAL_GRAY,
    flex: 1,
    fontFamily: FONT_FAMILY.MEDIUM,
  },
  selectedText: {
    color: Colors.WHITE,
    fontWeight: "600",
    fontFamily: FONT_FAMILY.SEMI_BOLD,
  },
  closeButton: {
    marginBottom: metrics.marginBottom(16),
  },
  closeButtonText: {
    fontSize: metrics.fontSize(16),
    fontWeight: "600",
    color: Colors.CHARCOAL_GRAY,
    fontFamily: FONT_FAMILY.SEMI_BOLD,
  },
});
