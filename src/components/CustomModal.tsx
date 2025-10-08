import { Dimensions, Modal, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import metrics from "../constants/metrics";
import Colors from "../constants/color";
import React from "react";
import { InfoRow } from "./CustomComponents";
import { formatCurrency, formatDate2 } from "../utils/helper";

export interface CustomModalProps {
    visible: boolean;
    onClose: () => void;
    type: 'accept' | 'reject' | 'custom'; // NEW
    title: string;
    contractDetails?: any; // for accept modal
    placeholder?: string;
    value?: string;
    onChangeText?: (text: string) => void;
    onAccept?: () => void;
    onReject?: () => void;
    children?: React.ReactNode;
}

export const CustomModal = ({
    visible,
    onClose,
    type,
    title,
    contractDetails = [],
    placeholder = "Enter text here...",
    value = "",
    onChangeText,
    onAccept,
    onReject,
    children,
}: CustomModalProps) => {
    const screenWidth = Dimensions.get('window').width;
    const modalWidth = screenWidth * 0.9;

    return (
        <Modal visible={visible} transparent animationType="fade" onRequestClose={onClose}>
            <View style={modalStyles.overlay}>
                <View style={[modalStyles.modalContainer, { width: modalWidth }]}>
                    {/* Header */}
                    <View style={modalStyles.header}>
                        <Text style={modalStyles.title}>{title}</Text>
                        <TouchableOpacity onPress={onClose} style={modalStyles.closeButton}>
                            <Text style={modalStyles.closeButtonText}>×</Text>
                        </TouchableOpacity>
                    </View>

                    {/* Body */}
                    <View style={modalStyles.body}>
                        {type === "accept" && contractDetails ? (
                            <>
                                <InfoRow label="Final Budget" value={formatCurrency(contractDetails.finalPrice)} />
                                <InfoRow label="Start Date" value={formatDate2(contractDetails.startDate)} />
                                <InfoRow label="Scope" value={contractDetails.scope?.trim() || "N/A"} />
                            </>
                        ) : type === "custom" ? (
                            <>
                                <View style={modalStyles.rateContainer}>
                                    {children}
                                </View>
                                <TextInput
                                    style={modalStyles.textInput}
                                    placeholder={placeholder}
                                    placeholderTextColor={Colors.GREY}
                                    value={value}
                                    onChangeText={onChangeText}
                                // keyboardType="numeric"
                                />
                            </>
                        ) : (
                            <TextInput
                                style={modalStyles.textInput}
                                placeholder={placeholder}
                                placeholderTextColor={Colors.GREY}
                                value={value}
                                onChangeText={onChangeText}
                                multiline
                                numberOfLines={4}
                                textAlignVertical="top"
                            />
                        )}
                    </View>

                    <View style={modalStyles.footer}>
                        {type === "accept" || type === "custom" ? (
                            <>
                                <TouchableOpacity style={modalStyles.secondaryBtn} onPress={onClose}>
                                    <Text style={modalStyles.secondaryText}>Close</Text>
                                </TouchableOpacity>
                                <TouchableOpacity style={modalStyles.primaryBtn} onPress={onAccept}>
                                    <Text style={modalStyles.primaryText}>{type === "accept" ? "Accept" : "Add"}</Text>
                                </TouchableOpacity>
                            </>
                        ) : (
                            <>
                                <TouchableOpacity style={modalStyles.secondaryBtn} onPress={onClose}>
                                    <Text style={modalStyles.secondaryText}>Cancel</Text>
                                </TouchableOpacity>
                                <TouchableOpacity style={modalStyles.rejectBtn} onPress={onReject}>
                                    <Text style={modalStyles.rejectText}>Reject</Text>
                                </TouchableOpacity>
                            </>
                        )}
                    </View>
                </View>
            </View>
        </Modal>
    );
};
const modalStyles = StyleSheet.create({
    overlay: {
        flex: 1,
        backgroundColor: 'rgba(0,0,0,0.5)',
        justifyContent: 'center',
        alignItems: 'center',
    },
    modalContainer: {
        backgroundColor: Colors.BACKGROUND,
        borderRadius: metrics.borderRadius(12),
        borderWidth: metrics.borderWidth(1),
        borderColor: Colors.LIGHT_GREY,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 4,
        },
        shadowOpacity: 0.3,
        shadowRadius: 8,
        elevation: 8,
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: metrics.paddingHorizontal(16),
        paddingVertical: metrics.paddingVertical(12),
        borderBottomWidth: metrics.borderWidth(1),
        borderBottomColor: Colors.LIGHT_GREY,
    },
    title: {
        fontSize: metrics.fontSize(16),
        fontWeight: '500',
        color: Colors.BLACK,
        flex: 1,
    },
    closeButton: {
        padding: metrics.padding(4),
    },
    closeButtonText: {
        fontSize: metrics.fontSize(20),
        color: Colors.BLACK,
        fontWeight: 'bold',
    },
    inputContainer: {
        padding: metrics.padding(16),
    },
    rateContainer: {
        alignItems: 'center',
        padding: metrics.padding(5),
    },
    textInput: {
        backgroundColor: Colors.BACKGROUND,
        borderWidth: metrics.borderWidth(1),
        borderColor: Colors.LIGHT_GREY,
        borderRadius: metrics.borderRadius(8),
        padding: metrics.padding(12),
        fontSize: metrics.fontSize(12),
        color: Colors.BLACK,
        minHeight: metrics.height(100),
        textAlignVertical: 'top',
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingHorizontal: metrics.paddingHorizontal(16),
        paddingBottom: metrics.paddingBottom(16),
        gap: metrics.gap(12),
    },
    button: {
        flex: 1,
        backgroundColor: Colors.MAIN_COLOR,
        borderWidth: metrics.borderWidth(1),
        borderColor: Colors.LIGHT_GREY,
        borderRadius: metrics.borderRadius(8),
        paddingVertical: metrics.paddingVertical(10),
        alignItems: 'center',
    },
    buttonText: {
        fontSize: metrics.fontSize(14),
        color: Colors.WHITE,
        fontWeight: '500',
        textTransform: 'capitalize'
    },
    body: {
        padding: metrics.padding(16),
    },
    textBold: {
        fontWeight: "600",
        fontSize: metrics.fontSize(15),
        color: Colors.BLACK,
    },
    textMuted: {
        fontSize: metrics.fontSize(14),
        color: Colors.GREY,
    },

    footer: {
        flexDirection: "row",
        justifyContent: "flex-end",
        gap: metrics.gap(12),
        paddingHorizontal: metrics.paddingHorizontal(16),
        paddingBottom: metrics.paddingBottom(16),
    },

    secondaryBtn: {
        backgroundColor: "#E9ECEF",
        borderRadius: 8,
        paddingVertical: 10,
        paddingHorizontal: 20,
    },
    secondaryText: {
        color: Colors.BLACK,
        fontSize: metrics.fontSize(14),
        fontWeight: "500",
    },

    primaryBtn: {
        backgroundColor: "green",
        borderRadius: 8,
        paddingVertical: 10,
        paddingHorizontal: 20,
    },
    primaryText: {
        color: Colors.WHITE,
        fontWeight: "600",
        fontSize: metrics.fontSize(14),
    },

    rejectBtn: {
        backgroundColor: "red",
        borderRadius: 8,
        paddingVertical: 10,
        paddingHorizontal: 20,
    },
    rejectText: {
        color: Colors.WHITE,
        fontWeight: "600",
        fontSize: metrics.fontSize(14),
    },

});