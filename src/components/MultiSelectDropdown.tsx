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

const MultiSelectDropdown: React.FC<MultiSelectDropdownProps> = ({
  data,
  selectedValues,
  placeholder = 'Select options',
  onChange,
  buttonStyle,
  buttonTextStyle,
  menuStyle,
  showTags = true,
}) => {
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
        {/* Button */}
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

        {/* Tags */}
      </View>
    </TouchableWithoutFeedback>
  );
};

export default MultiSelectDropdown;

const styles = StyleSheet.create({
  dropdownButtonStyle: {
    flexDirection:'row',
    width: '100%',
    height: 56,
    backgroundColor: Colors.WHITE,
    borderRadius: 12,
    justifyContent: 'space-between',
    alignItems:'center',
    paddingHorizontal: 16,
    borderWidth: 1,
    borderColor: '#DDD',
    marginBottom: 8,
  },
  dropdownButtonTxtStyle: {
    fontSize: metrics.fontSize(13),
    fontWeight: '400',
    color: Colors.BLACK,

  },
  dropdownMenuStyle: {
    backgroundColor: '#FFF',
    borderRadius: 8,
    maxHeight: 200,
    marginTop: 8,
    borderWidth: 1,
    borderColor: '#DDD',
    paddingVertical: 8,
    elevation: 3,
  },
  dropdownItemStyle: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  dropdownItemTxtStyle: {
    fontSize: 14,
    color: '#000',
  },
  tagsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: 10,
    gap: 8,
  },
  tag: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#E9ECEF',
    paddingVertical: 6,
    paddingHorizontal: 10,
    borderRadius: 16,
    marginRight: 6,
    marginBottom: 6,
  },
  tagText: {
    fontSize: 14,
    color: '#333',
    marginRight: 6,
  },
  removeIcon: {
    color: '#999',
    fontSize: 16,
    fontWeight: 'bold',
  },
  noDataContainer: {
    padding: 16,
    alignItems: 'center',
  },
  noDataText: {
    fontSize: 14,
    color: '#999',
  },
});

// {open && (
//   <ScrollView
//     style={[styles.dropdownMenuStyle, menuStyle]}
//     nestedScrollEnabled
//   >
//     {data.map((item, index) => {
//       const isSelected = selectedValues.includes(item.value);
//       return (
//         <TouchableOpacity
//           key={index}
//           style={[
//             styles.dropdownItemStyle,
//             isSelected && { backgroundColor: '#D2D9DF' },
//           ]}
//           onPress={e => {
//             e.stopPropagation();
//             toggleSelection(item);
//           }}
//         >
//           <Text style={styles.dropdownItemTxtStyle}>{item.label}</Text>
//           {/* {isSelected && (
//             <Text style={{ color: 'green', fontWeight: 'bold' }}>✓</Text>
//           )} */}
//         </TouchableOpacity>
//       );
//     })}
//   </ScrollView>
// )}
