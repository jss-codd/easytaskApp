import React from 'react';
import { View, TouchableOpacity, Text, StyleSheet } from 'react-native';
import Colors from '../constants/color';
import metrics from '../constants/metrics';

const TabButton = ({
  options = [],
  selectedIndex = 0,
  onSelect,
}: {
  options: string[];
  selectedIndex: number;
  onSelect: (index: number) => void;
}) => {
  return (
    <View style={styles.container}>
      {options.map((label, index) => {
        const isActive = index === selectedIndex;
        return (
          <TouchableOpacity
            key={index}
            style={[styles.button, isActive && styles.activeButton]}
            onPress={() => onSelect(index)}
          >
            <Text style={[styles.text, isActive && styles.activeText]}>
              {label}
            </Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    backgroundColor: Colors.BACKGROUND,
    //   alignSelf: 'center',
    paddingHorizontal: metrics.paddingHorizontal(15),
    width: '100%',
  },
  button: {
    flex: 1,
    paddingVertical: metrics.paddingVertical(10),
    alignItems: 'center',
    justifyContent: 'center',
  },
  activeButton: {
    borderBottomWidth: 2,
    borderBottomColor: Colors.MAIN_COLOR,
  },
  text: {
    fontSize: metrics.fontSize(16),
    fontWeight: '600',
    color: Colors.DARK_GREY,
    letterSpacing: 0.2,
  },
  activeText: {
    color: Colors.MAIN_COLOR,
  },
});

export default TabButton;
