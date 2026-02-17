import React, { useState } from 'react';
import { View, Text, ScrollView, StyleSheet, Alert, TouchableOpacity } from 'react-native';
import { Colors } from '@/styles/colors';
import { Spacing, FontSizes, BorderRadius } from '@/styles/spacing';
import { Button } from '@/components/Button';
import { Input } from '@/components/Input';
import { Card } from '@/components/Card';

export const SignupScreen: React.FC<{ navigation: any }> = ({ navigation }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    role: 'trainee',
  });
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<any>({});

  const handleSignup = async () => {
    try {
      setLoading(true);
      setErrors({});

      // Validation
      if (!formData.name) setErrors((e: any) => ({ ...e, name: 'Name is required' }));
      if (!formData.email) setErrors((e: any) => ({ ...e, email: 'Email is required' }));
      if (formData.password !== formData.confirmPassword) {
        setErrors((e: any) => ({ ...e, password: 'Passwords do not match' }));
        return;
      }

      // Call signup API
      const response = await fetch(`${process.env.EXPO_PUBLIC_API_URL}/auth/signup`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        Alert.alert('Success', 'Account created! Please login.');
        navigation.navigate('RoleSelection');
      } else {
        const error = await response.json();
        Alert.alert('Error', error.message);
      }
    } catch (error: any) {
      Alert.alert('Error', error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>📝 Create Account</Text>
        <Text style={styles.subtitle}>Join our disaster management platform</Text>
      </View>

      <View style={styles.content}>
        <Card>
          <Input
            label="Full Name"
            placeholder="Enter your full name"
            value={formData.name}
            onChangeText={(name) => setFormData({ ...formData, name })}
            error={errors.name}
          />

          <Input
            label="Email Address"
            placeholder="your.email@example.com"
            value={formData.email}
            onChangeText={(email) => setFormData({ ...formData, email })}
            keyboardType="email-address"
            error={errors.email}
          />

          <Input
            label="Password"
            placeholder="Create a strong password"
            value={formData.password}
            onChangeText={(password) => setFormData({ ...formData, password })}
            secureTextEntry
            error={errors.password}
          />

          <Input
            label="Confirm Password"
            placeholder="Re-enter your password"
            value={formData.confirmPassword}
            onChangeText={(confirmPassword) => setFormData({ ...formData, confirmPassword })}
            secureTextEntry
          />

          <View style={styles.roleSection}>
            <Text style={styles.roleLabel}>Select Your Role:</Text>
            <View style={styles.roleButtons}>
              <TouchableOpacity
                onPress={() => setFormData({ ...formData, role: 'trainee' })}
                style={[
                  styles.roleButton,
                  formData.role === 'trainee' && styles.roleButtonActive,
                ]}
              >
                <Text style={styles.roleButtonText}>Trainee</Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => setFormData({ ...formData, role: 'trainer' })}
                style={[
                  styles.roleButton,
                  formData.role === 'trainer' && styles.roleButtonActive,
                ]}
              >
                <Text style={styles.roleButtonText}>Trainer</Text>
              </TouchableOpacity>
            </View>
          </View>

          <Button
            title="Create Account"
            onPress={handleSignup}
            loading={loading}
            fullWidth
            size="large"
            style={styles.signupButton}
          />
        </Card>

        <View style={styles.footer}>
          <Text style={styles.footerText}>Already have an account? </Text>
          <Button
            title="Login"
            onPress={() => navigation.navigate('RoleSelection')}
            variant="outline"
          />
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.neutral.gray50,
  },
  header: {
    backgroundColor: Colors.secondary.main,
    paddingTop: Spacing.xl,
    paddingBottom: Spacing.xl,
    paddingHorizontal: Spacing.lg,
    borderBottomLeftRadius: BorderRadius.lg,
    borderBottomRightRadius: BorderRadius.lg,
  },
  title: {
    fontSize: FontSizes.xxl,
    fontWeight: '800',
    color: Colors.neutral.white,
    marginBottom: Spacing.sm,
  },
  subtitle: {
    fontSize: FontSizes.base,
    color: Colors.neutral.white,
    opacity: 0.9,
  },
  content: {
    padding: Spacing.lg,
  },
  roleSection: {
    marginBottom: Spacing.lg,
  },
  roleLabel: {
    fontSize: FontSizes.base,
    fontWeight: '600',
    color: Colors.neutral.gray800,
    marginBottom: Spacing.md,
  },
  roleButtons: {
    flexDirection: 'row',
    gap: Spacing.md,
  },
  roleButton: {
    flex: 1,
    paddingVertical: Spacing.md,
    paddingHorizontal: Spacing.md,
    borderRadius: BorderRadius.md,
    borderWidth: 2,
    borderColor: Colors.primary.lighter,
    alignItems: 'center',
    backgroundColor: Colors.neutral.white,
  },
  roleButtonActive: {
    backgroundColor: Colors.primary.main,
    borderColor: Colors.primary.main,
  },
  roleButtonText: {
    fontSize: FontSizes.base,
    fontWeight: '600',
    color: Colors.neutral.white,
  },
  signupButton: {
    marginTop: Spacing.md,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: Spacing.xl,
  },
  footerText: {
    fontSize: FontSizes.base,
    color: Colors.neutral.gray600,
  },
});
