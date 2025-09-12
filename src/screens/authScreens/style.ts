import { StyleSheet } from 'react-native';
import metrics from '../../constants/metrics';
import Colors from '../../constants/color';

export const loginStyles = StyleSheet.create({
  container: {
    flex: 1,
    padding: metrics.padding(20),
    backgroundColor: Colors.BACKGROUND,
    justifyContent: 'center',
  },
  formContainer: {
 
    paddingHorizontal: metrics.padding(20),
    paddingVertical: metrics.padding(40),
    justifyContent: 'center',
  },
  loginButton: {
    marginTop: metrics.marginTop(15),
    backgroundColor:Colors.BUTTON_BACKGROUND,
    borderRadius: metrics.borderRadius(12),
    paddingVertical: metrics.padding(16),
    alignItems: 'center',
    shadowColor: Colors.BUTTON_BACKGROUND,
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
  },
  showPasswordButton: {
    paddingHorizontal: metrics.padding(16),
    paddingVertical: metrics.padding(12),
    justifyContent: 'center',
    alignItems: 'center',
  },
  showPasswordText: {
    fontSize: metrics.fontSize(20)
  },
  loginButtonText: {
    color: '#fff',
    fontWeight: '600',
    fontSize: metrics.fontSize(16),
  },
  loginButtonLoading: {
    backgroundColor: '#007AFF',
    borderRadius: metrics.borderRadius(12),
    paddingVertical: metrics.padding(16),
    alignItems: 'center',
    shadowColor: '#007AFF',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    opacity: 0.5,
  },
  forgotPassword: {
    alignSelf: 'flex-end',
    marginBottom: metrics.margin(24),
  },
  forgotPasswordText: {
    color: '#007AFF',
    fontSize: metrics.fontSize(14),
    fontWeight: '500',
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: metrics.margin(20),
  },
  footerText: {
    fontSize: metrics.fontSize(15),
    color: '#666',
  },
  signupLink: {
    fontSize: metrics.fontSize(15),
    color: '#007AFF',
    fontWeight: '600',
  },

  //register styles
  title: {
    fontSize: metrics.fontSize(24),
    fontWeight: 'bold',
    marginBottom: metrics.margin(20),
    textAlign: 'center',
  },
  header: {
    fontSize: metrics.fontSize(15),
    fontWeight: 'bold',
    marginBottom: metrics.margin(10),
    color: '#666',
  },
  radioContainer: {
    flexDirection: 'row',
    marginBottom: metrics.margin(20),
  },
  radioButton: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: metrics.margin(20),
  },
  radioCircle: {
    height: metrics.height(18),
    width: metrics.width(18),
    borderRadius: metrics.borderRadius(9),
    borderWidth: metrics.borderWidth(1),
    borderColor: '#333',
    marginRight: 6,
  },
  radioSelected: {
    backgroundColor: '#007BFF',
    borderColor: '#007BFF',
    shadowColor: '#04468dff',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 4,
  },
  errorText: {
    color: Colors.RED_ERROR,
    fontSize: metrics.fontSize(12),
    marginBottom: metrics.marginBottom(10),
  },
  radioLabel: {
    fontSize: metrics.fontSize(14),
  },
  checkboxContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: metrics.marginBottom(15),
    flexWrap: 'wrap',
  },
  link: {
    color: '#007BFF',
    fontWeight: 'bold',
  },

  signUpButton: {
    backgroundColor: '#007AFF',
    borderRadius: metrics.borderRadius(12),
    paddingVertical: metrics.paddingVertical(16),
    marginTop: metrics.marginTop(20),
    alignItems: 'center',
    shadowColor: '#007AFF',
    shadowOffset: {
      width: 0,
      height: 4,
    },

    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
  },
  signUpText: {
    color: '#fff',
    fontWeight: 'bold',
  },
});
