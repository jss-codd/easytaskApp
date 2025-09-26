import { StyleSheet } from "react-native";
import metrics from "../../constants/metrics";
import Colors from "../../constants/color";

export const styles = StyleSheet.create({
  chatWindow: { 
    flex: 1, 
    backgroundColor: Colors.LIGHT_GREY 
  },
  chatContent: {
    flex: 1,
  },
  chatContainer: {
    flexGrow: 1,
    justifyContent: 'flex-end',
    paddingHorizontal: metrics.paddingHorizontal(16),
    paddingVertical: metrics.paddingVertical(8),
    paddingBottom: metrics.paddingBottom(20),
    minHeight: '100%',
  },
  messageContainer: {
    maxWidth: '80%',
    marginVertical: metrics.marginVertical(3),
    paddingHorizontal: metrics.paddingHorizontal(12),
    paddingVertical: metrics.paddingVertical(8),
    borderRadius: metrics.borderRadius(16),
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 1,
  },
  myMessage: {
    alignSelf: 'flex-end',
    backgroundColor: '#DCF8C6',
    borderBottomRightRadius: metrics.borderRadius(4),
  },
  theirMessage: {
    alignSelf: 'flex-start',
    backgroundColor: '#FFFFFF',
    borderBottomLeftRadius: metrics.borderRadius(4),
    borderWidth: 1,
    borderColor: '#E5E5EA',
  },
  messageText: { 
    fontSize: metrics.fontSize(15),
    lineHeight: metrics.fontSize(20),
    color: '#000',
  },
  timeText: {
    fontSize: metrics.fontSize(11),
    color: '#666',
    marginTop: metrics.marginTop(4),
    textAlign: 'right',
  },
  statusText: {
    fontSize: metrics.fontSize(12),
    color: '#888',
    marginTop: metrics.marginTop(2),
    textAlign: 'right',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    paddingHorizontal: metrics.paddingHorizontal(10),
    paddingVertical: metrics.paddingVertical(6),
    paddingBottom: metrics.paddingBottom(6),
    // borderTopWidth: 1,
    // borderColor: '#E5E5EA',
    backgroundColor: 'transparent',
    minHeight: metrics.height(60),
  },
  input: {
    flex: 1,
    backgroundColor: '#F8F9FA',
    paddingHorizontal: metrics.paddingHorizontal(14),
    paddingVertical: metrics.paddingVertical(12),
    borderRadius: metrics.borderRadius(24),
    marginRight: metrics.marginRight(12),
    fontSize: metrics.fontSize(15),
    maxHeight: metrics.height(100),
    borderWidth: 1,
    borderColor: '#E5E5EA',
  },
  sendButton: {
    backgroundColor: Colors.MAIN_COLOR,
    borderRadius: metrics.borderRadius(24),
    paddingHorizontal: metrics.paddingHorizontal(14),
    paddingVertical: metrics.paddingVertical(10),
    justifyContent: 'center',
    alignItems: 'center',
    minWidth: metrics.width(48),
    minHeight: metrics.height(48),
  },
  mediaButton: {
    borderRadius: metrics.borderRadius(20),
    paddingHorizontal: metrics.padding(10),
    justifyContent: 'center',
    alignItems: 'center',
  },
  sendText: { 
    color: '#FFFFFF', 
    fontWeight: 'bold', 
    fontSize: metrics.fontSize(16) 
  },
});