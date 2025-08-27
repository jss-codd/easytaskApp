import React from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TextInputProps,
  KeyboardTypeOptions,
  Pressable,
} from 'react-native';
import Colors from '../constants/color';
import metrics from '../constants/metrics';
import LocationIcon from '../Icons/LocationIcon';

interface AppTextInputProps extends TextInputProps {
  label?: string;
  error?: string;
  touched?: boolean;
  textInputContainerStyle?: any;
  keyboardType?: KeyboardTypeOptions;
  placeholder?: string;
  multiline?: boolean;
  numberOfLines?: number;
  disabled?: boolean;
  showChevron?: boolean;
  onPress?: () => void;
  containerStyle?: any;
}

const CustomInput: React.FC<AppTextInputProps> = ({
  label,
  error,
  touched,
  textInputContainerStyle,
  placeholder,
  disabled,
  keyboardType,
  multiline = false,
  numberOfLines = 1,
  showChevron,
  onPress,
  containerStyle,
  ...props
}) => {
  return (
    <View>
      {label && (
        <View style={styles.labelContainer}>
          <Text style={[styles.labelText]}>{label}</Text>
        </View>
      )}
      <Pressable
        onPress={onPress ? onPress : null}
        style={[
          containerStyle ? containerStyle : null,
          error ? styles.errorContainer : null,
        ]}
      >
        <View style={[styles.inputContainer, textInputContainerStyle]}>
          <TextInput
            style={[styles.input, error && styles.inputError]}
            placeholder={placeholder}
            placeholderTextColor={Colors.LIGHT_GREY}
            editable={disabled ? false : true}
            keyboardType={keyboardType}
            multiline={multiline}
            numberOfLines={numberOfLines}
            {...props}
          />
          {showChevron && (
            <View style={styles.categoryIconContainer}>
              <LocationIcon color="green" />
            </View>
          )}
        </View>
        {error ? <Text style={styles.errorText}>{error}</Text> : null}
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  inputContainer: {
    marginTop: metrics.marginTop(5),
    marginBottom: metrics.marginBottom(2),
    flexDirection: 'row',
    backgroundColor: '#ffffff',
    borderWidth: 1,
    borderRadius: metrics.borderRadius(12),
    borderColor: Colors.LIGHT_GREY,
    marginVertical: metrics.marginVertical(1),
  },
  labelContainer: {
    flexDirection: 'row',
    paddingTop: metrics.paddingTop(5),
  },

  labelText: {
    fontSize: metrics.fontSize(13),
    fontWeight: '600',
    color: Colors.DARK_GREY,
    // marginBottom: metrics.marginBottom(5),
  },
  input: {
    paddingHorizontal: metrics.paddingHorizontal(8),
    height: metrics.height(40),
    borderRadius: metrics.borderRadius(15),
    // backgroundColor: 'white',
    flex: 1,
    fontSize: metrics.fontSize(14),
  },
  inputError: {
    borderColor: Colors.RED_ERROR,
  },
  errorContainer: {
    backgroundColor: 'transparent',
    borderRadius: metrics.borderRadius(10),
  },
  errorText: {
    flexWrap: 'wrap',
    overflow: 'hidden',
    // flex: 1,
    color: Colors.RED_ERROR,
    fontSize: metrics.fontSize(12),
  },
  categoryIconContainer: {
    flex: 0.15,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default CustomInput;
