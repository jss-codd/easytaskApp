import React from 'react';
import {
  View,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Text,
} from 'react-native';
import SearchIcon from '../Icons/SearchIcon';
import Colors from '../constants/color';
import metrics from '../constants/metrics';

interface SearchInputProps {
  value: string;
  onChangeText: (text: string) => void;
  placeholder?: string;
  containerStyle?: object;
  inputStyle?: object;
  autoFocus?: boolean;
  inputRef?: React.RefObject<TextInput>;
}

const SearchInput: React.FC<SearchInputProps> = ({
  value,
  onChangeText,
  placeholder = 'Search...',
  containerStyle,
  inputStyle,
  autoFocus = false,
  inputRef,
}) => {
  return (
    <View style={[styles.container, containerStyle]}>
      <SearchIcon size={20} color="#777" />
      <TextInput
        style={[styles.input, inputStyle]}
        placeholder={placeholder}
        placeholderTextColor={Colors.GREY}
        value={value}
        onChangeText={onChangeText}
        returnKeyType="search"
        autoCorrect={false}
        clearButtonMode="never"
        autoFocus={autoFocus}
        ref={inputRef}
      />
      {value.length > 0 && (
        <TouchableOpacity onPress={() => onChangeText('')}>
          <Text style={styles.clearIcon}>x</Text>
          {/* <ClearIcon size={20} color="#777" /> */}
        </TouchableOpacity>
      )}
    </View>
  );
};

export default SearchInput;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.WHITE,
    borderRadius: metrics.borderRadius(10),
    paddingHorizontal: metrics.padding(12),
    height: metrics.height(40),

    borderColor: Colors.GREY,
  },
  icon: {
    marginRight: metrics.margin(8),
  },
  clearIcon: {
    marginLeft: metrics.margin(8),
    fontSize: metrics.fontSize(15),
    color: '#000',
  },
  input: {
    flex: 1,
    fontSize: metrics.fontSize(15),
    color: '#000',
  },
});
