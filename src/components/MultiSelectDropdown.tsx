import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  TouchableWithoutFeedback,
} from 'react-native';
import metrics from '../constants/metrics';
import Colors from '../constants/color';
import { ArrowDown } from '../Icons/BackIcon';

interface MultiSelectDropdownProps {
  data: { label: string; value: string | number }[];
  selectedValues: (string | number)[];
  placeholder?: string;
  onChange: (newValues: (string | number)[]) => void;
  buttonStyle?: object;
  buttonTextStyle?: object;
  menuStyle?: object;
  showTags?: boolean;
}

const MultiSelectDropdown = ({
  data,
  selectedValues,
  placeholder = 'Select options',
  onChange,
  buttonStyle,
  buttonTextStyle,
  menuStyle,
  showTags = true,
}: MultiSelectDropdownProps) => {
  const [open, setOpen] = useState(false);

  const toggleSelection = (item: { label: string; value: string | number }) => {
    let newValues = [...selectedValues];
    if (newValues.includes(item.value)) {
      newValues = newValues.filter(val => val !== item.value);
    } else {
      newValues.push(item.value);
    }
    onChange(newValues);
  };

  const removeTag = (value: string | number) => {
    const newValues = selectedValues.filter(val => val !== value);
    onChange(newValues);
  };

  const selectedLabels = data
    .filter(item => selectedValues.includes(item.value))
    .map(item => item.label)
    .join(', ');

  return (
    <TouchableWithoutFeedback onPress={() => setOpen(false)}>
      <View>
        <TouchableOpacity
          style={[styles.dropdownButtonStyle, buttonStyle]}
          onPress={e => {
            e.stopPropagation();
            setOpen(!open);
          }}
        >
          <Text style={[styles.dropdownButtonTxtStyle, buttonTextStyle]}>
            {selectedLabels || placeholder}
          </Text>
          <ArrowDown/>
        </TouchableOpacity>

        {showTags && selectedValues.length > 0 && (
          <View style={styles.tagsContainer}>
            {data
              .filter(item => selectedValues.includes(item.value))
              .map((item, index) => (
                <View key={index} style={styles.tag}>
                  <Text style={styles.tagText}>{item.label}</Text>
                  <TouchableOpacity onPress={() => removeTag(item.value)}>
                    <Text style={styles.removeIcon}>✕</Text>
                  </TouchableOpacity>
                </View>
              ))}
          </View>
        )}
        {open && (
          <ScrollView
            style={[styles.dropdownMenuStyle, menuStyle]}
            nestedScrollEnabled
          >
            {data.length === 0 ? (
              <View style={styles.noDataContainer}>
                <Text style={styles.noDataText}>No options available</Text>
              </View>
            ) : (
              data.map((item, index) => {
                const isSelected = selectedValues.includes(item.value);
                return (
                  <TouchableOpacity
                    key={index}
                    style={[
                      styles.dropdownItemStyle,
                      isSelected && { backgroundColor: '#D2D9DF' },
                    ]}
                    onPress={e => {
                      e.stopPropagation();
                      toggleSelection(item);
                    }}
                  >
                    <Text style={styles.dropdownItemTxtStyle}>
                      {item.label}
                    </Text>
                  </TouchableOpacity>
                );
              })
            )}
          </ScrollView>
        )}
      </View>
    </TouchableWithoutFeedback>
  );
};

export default MultiSelectDropdown;

const styles = StyleSheet.create({
  dropdownButtonStyle: {
    flexDirection:'row',
    width: '100%',
    height: metrics.height(56),
    backgroundColor: Colors.WHITE,
    borderRadius: metrics.borderRadius(12),
    justifyContent: 'space-between',
    alignItems:'center',
    paddingHorizontal: metrics.paddingHorizontal(16),
    borderWidth: 1,
    borderColor: '#DDD',
    marginBottom: metrics.marginBottom(8),
  },
  dropdownButtonTxtStyle: {
    fontSize: metrics.fontSize(13),
    fontWeight: '400',
    color: Colors.BLACK,

  },
  dropdownMenuStyle: {
    backgroundColor: Colors.WHITE,
    borderRadius: metrics.borderRadius(8),
    maxHeight: 200,
    marginTop: metrics.marginTop(8),
    borderWidth: 1,
    borderColor: '#DDD',
    paddingVertical: metrics.paddingVertical(8),
    elevation: 3,
  },
  dropdownItemStyle: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: metrics.paddingHorizontal(16),
    paddingVertical: metrics.paddingVertical(12),
  },
  dropdownItemTxtStyle: {
    fontSize: metrics.fontSize(14),
    color: '#000',
  },
  tagsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    // marginTop: metrics.marginTop(5),
    gap: metrics.gap(1),
  },
  tag: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.LIGHT_BLUE,
    paddingVertical: metrics.paddingVertical(5),
    paddingHorizontal: metrics.paddingHorizontal(10),
    borderRadius: metrics.borderRadius(16),
    marginRight: metrics.marginRight(5),
    marginBottom: metrics.marginBottom(5),
  },
  tagText: {
    fontSize: metrics.fontSize(14),
    color: Colors.LINK_COLOR,
    marginRight: metrics.marginRight(5),
  },
  removeIcon: {
    color: '#999',
    fontSize: metrics.fontSize(12),
    fontWeight: 'bold',
  },
  noDataContainer: {
    padding: metrics.padding(16),
    alignItems: 'center',
  },
  noDataText: {
    fontSize: metrics.fontSize(14),
    color: '#999',
  },
});

