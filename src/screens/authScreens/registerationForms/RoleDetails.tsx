import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import Colors from '../../../constants/color';
import { loginStyles } from '../style';
import { useNavigation } from '@react-navigation/native';
import { roles } from '../../../utils/helper';

const RoleDetails = ({ values, errors, touched, handleChange }: any) => {
  const navigation = useNavigation<any>();
  return (
    <View style={styles.container}>
      <Text style={loginStyles.title}>Choose Your Role</Text>

      <View style={styles.roleContainer}>
        {roles.map(role => (
          <TouchableOpacity
            key={role.key}
            style={[
              styles.roleCard,
              values.role === role.key && styles.selectedCard,
            ]}
            onPress={() => handleChange('role')(role.key)}
          >
            <Text
              style={[
                styles.roleTitle,
                values.role === role.key && styles.selectedRoleText,
              ]}
            >
              {role.label}
            </Text>
            {/* <Text
              style={[
                styles.roleDescription,
                values.role === role.key && styles.selectedRoleDescription,
              ]}
            >
              {role.description}
            </Text> */}
          </TouchableOpacity>
        ))}
      </View>

      {errors.role && touched.role && (
        <Text style={styles.errorText}>{errors.role}</Text>
      )}

<View style={loginStyles.footer}>
        <Text style={loginStyles.footerText}>Already have an account? </Text>
        <TouchableOpacity onPress={() => navigation.navigate('Login')}>
          <Text style={loginStyles.signupLink}>Login</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    alignItems: 'center',
    justifyContent: 'center',
    // backgroundColor: Colors.WHITE,
  },
  title: {
    fontSize: 26,
    fontWeight: '700',
    color: '#111827',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: '#6b7280',
    marginBottom: 24,
    textAlign: 'center',
  },
  roleContainer: {
    width: '100%',
    gap: 16,
  },
  roleCard: {
    backgroundColor: '#fff',
    borderRadius: 12,
    paddingVertical: 20,
    paddingHorizontal: 16,
    borderWidth: 1,
    borderColor: '#e5e7eb',
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  selectedCard: {
    borderColor: '#4F46E5',
    backgroundColor: '#eef2ff',
  },
  roleTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#111827',
  },
  selectedRoleText: {
    color: '#4F46E5',
  },
  roleDescription: {
    fontSize: 14,
    color: '#6b7280',
    marginTop: 6,
  },
  selectedRoleDescription: {
    color: '#4F46E5',
  },
  errorText: {
    color: '#EF4444',
    fontSize: 14,
    marginTop: 12,
  },
});

export default RoleDetails;
