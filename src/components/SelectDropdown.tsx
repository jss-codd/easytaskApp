import { StyleSheet, Text, View } from 'react-native';
import SelectDropdown from 'react-native-select-dropdown';
import Colors from '../constants/color';
import metrics from '../constants/metrics';
import { ArrowDown } from '../Icons/BackIcon';
const SelDropdown = ({
  data,
  onSelect,
  renderButton,
  renderItem,
  showsVerticalScrollIndicator,
  dropdownStyle,
  placeholder,
}: any) => {
  return (
    <SelectDropdown
      data={data}
      onSelect={(selectedItem, index) => {
        onSelect(selectedItem, index);
      }}
      renderButton={(selectedItem, isOpened) => {
        return (
          <View style={styles.dropdownButtonStyle}>
            <Text style={[styles.dropdownButtonTxtStyle, { color: Colors.BLACK }]}>
              {(selectedItem && selectedItem.label) || placeholder}
            </Text>
            <ArrowDown />
            {/* <Icon name={isOpened ? 'chevron-up' : 'chevron-down'} style={styles.dropdownButtonArrowStyle} /> */}
          </View>
        );
      }}
      // renderItem={(item, index, isSelected) => {
      //   return (
      //     <View
      //       style={{
      //         ...styles.dropdownItemStyle,
      //         ...(isSelected && { backgroundColor: '#F1F3F6' }),
      //       }}
      //     >
      //       <Text style={styles.dropdownItemTxtStyle}>{item.label}</Text>
      //     </View>
      //   );
      // }}
      renderItem={(item, index, isSelected) => {
        return data.length === 0 ? (
          <View style={styles.noDataContainer}>
            <Text style={styles.noDataText}>No options available</Text>
          </View>
        ) : (
          <View
            style={{
              ...styles.dropdownItemStyle,
              ...(isSelected && { backgroundColor: '#F1F3F6' }),
            }}
          >
            <Text style={styles.dropdownItemTxtStyle}>{item.label}</Text>
          </View>
        );
      }}
      showsVerticalScrollIndicator={false}
      dropdownStyle={styles.dropdownMenuStyle}
    />
  );
};
const styles = StyleSheet.create({
  noDataContainer: {
    padding: 16,
    alignItems: 'center',
  },
  noDataText: {
    fontSize: 14,
    color: '#999',
  },
  dropdownButtonStyle: {
    flexDirection: 'row',
    width: '100%',
    height: 56,
    backgroundColor: Colors.WHITE,
    borderRadius: 12,
    justifyContent: 'space-between',
    alignItems: 'center',
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
  dropdownButtonArrowStyle: {
    justifyContent: 'flex-end',
  },

  dropdownMenuStyle: {
    backgroundColor: '#FFF',
    borderRadius: 8,
    paddingVertical: 8,
  },
  dropdownItemStyle: {
    width: '100%',
    flexDirection: 'row',
    paddingHorizontal: 12,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 8,
  },
  dropdownItemTxtStyle: {
    flex: 1,
    fontSize: 14,
    fontWeight: '400',
    color: '#000',
  },
  dropdownItemIconStyle: { fontSize: 28, marginRight: 8 },
});
export default SelDropdown;
