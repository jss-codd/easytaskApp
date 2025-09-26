import React, { useState } from 'react';
import {
    View,
    Text,
    TextInput,
    StyleSheet,
    TextInputProps,
    TouchableOpacity,
} from 'react-native';
import Colors from '../constants/color';
import metrics from '../constants/metrics';
import EyeIcon from '../Icons/EyeIcon';

interface AppPasswordInputProps extends TextInputProps {
    label?: string;
    error?: string;
    touched?: boolean;
}

const CustomPasswordInput=({
    label,
    error,
    touched,
    placeholder,
    ...props
}: AppPasswordInputProps) => {
    const [isSecure, setIsSecure] = useState(true);
    const showError = touched && error;

    return (
        <View style={styles.inputContainer}>
            {label ? <Text style={styles.label}>{label}</Text> : null}

            <View style={[styles.inputWrapper, showError && styles.inputError]}>
                <TextInput
                    style={styles.input}
                    placeholderTextColor={Colors.GREY}
                    placeholder={placeholder}
                    secureTextEntry={isSecure}
                    {...props}
                />

                <TouchableOpacity onPress={() => setIsSecure(!isSecure)}>
                    {isSecure ? (
                        <EyeIcon.EyeIcon color={Colors.GREY} />
                    ) : (
                        <EyeIcon.OpenEyeIcon color={Colors.GREY} />
                    )
                    }
                </TouchableOpacity>
            </View>

            {showError ? <Text style={styles.errorText}>{error}</Text> : null}
        </View>
    );
};

const styles = StyleSheet.create({
    inputContainer: {
        marginBottom: metrics.marginBottom(5),
        marginTop: metrics.marginTop(15),
    },
    label: {
        fontSize: metrics.fontSize(14),
        fontWeight: '600',
        color: '#1a1a1a',
        marginBottom: metrics.marginBottom(6),
    },
    inputWrapper: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: Colors.WHITE,
        borderWidth: metrics.borderWidth(1),
        borderColor: '#e1e5e9',
        borderRadius: metrics.borderRadius(12),
        paddingHorizontal: metrics.paddingHorizontal(12),
    },
    input: {
        flex: 1,
        paddingVertical: metrics.paddingVertical(14),
        fontSize: metrics.fontSize(14),
        color: '#1a1a1a',
    },
    inputError: {
        borderColor: Colors.RED_ERROR,
    },
    errorText: {
        marginTop: metrics.marginTop(6),
        fontSize: metrics.fontSize(13),
        color: Colors.RED_ERROR,
    },
});

export default CustomPasswordInput;
