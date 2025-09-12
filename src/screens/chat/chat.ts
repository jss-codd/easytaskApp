import { StyleSheet } from "react-native";
import metrics from "../../constants/metrics";
import Colors from "../../constants/color";

export const styles = StyleSheet.create({
    chatWindow: { flex: 1,backgroundColor: Colors.LIGHT_GREY },
    chatContainer: { padding: metrics.padding(10) },
    messageContainer: {
      maxWidth: '75%',
      marginVertical: metrics.marginVertical(4),
      padding: metrics.padding(10),
      borderRadius: metrics.borderRadius(10),
    },
    myMessage: {
      alignSelf: 'flex-end',
      backgroundColor: '#DCF8C6',
      fontSize: metrics.fontSize(12),
    },
    theirMessage: {
      alignSelf: 'flex-start',
      backgroundColor: '#E5E5EA',
      fontSize: metrics.fontSize(12),
    },
    messageText: { fontSize: metrics.fontSize(14) },
    timeText: {
      fontSize: metrics.fontSize(10),
      color: '#555',
      marginTop: metrics.margin(4),
      textAlign: 'right',
    },
    statusText: {
      fontSize: metrics.fontSize(12),
      color: '#888',
      marginTop: metrics.margin(2),
      textAlign: 'right',
    },
    inputContainer: {
      flexDirection: 'row',
      padding: metrics.padding(10),
      borderTopWidth: 1,
      borderColor: '#ccc',
      backgroundColor: '#fff',
    },
    input: {
      flex: 1,
      backgroundColor: '#f1f1f1',
      padding: metrics.padding(10),
      borderRadius: metrics.borderRadius(20),
      marginRight: metrics.margin(10),
    },
    sendButton: {
      backgroundColor: '#007AFF',
      borderRadius: metrics.borderRadius(20),
      paddingHorizontal: metrics.padding(15),
      justifyContent: 'center',
      alignItems: 'center',
    },
    mediaButton: {
      // backgroundColor: '#f1f1f1',
      borderRadius: metrics.borderRadius(20),
      paddingHorizontal: metrics.padding(10),
      justifyContent: 'center',
      alignItems: 'center',
    },
    sendText: { color: '#fff', fontWeight: 'bold', fontSize: metrics.fontSize(16) },
  });