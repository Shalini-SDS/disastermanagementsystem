import React, { useState } from 'react';
import { View, Text, ScrollView, StyleSheet, Alert } from 'react-native';
import { Colors } from '@/styles/colors';
import { Spacing, FontSizes, BorderRadius } from '@/styles/spacing';
import { Button } from '@/components/Button';
import { Input } from '@/components/Input';
import { Card } from '@/components/Card';
import { useAuth } from '@/hooks/useAuth';

export const TraineeLoginScreen: React.FC<{ navigation: any }> = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<any>({});
  const { login } = useAuth();

  const handleLogin = async () => {
    try {
      setLoading(true);
      setErrors({});
      await login(email, password, 'trainee');
      navigation.navigate('TraineeHome');
    } catch (error: any) {
      setErrors({ submit: error.message || 'Login failed' });
      Alert.alert('Error', error.message || 'Login failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>👨‍🎓 Welcome Trainee</Text>
        <Text style={styles.subtitle}>Login to your account</Text>
      </View>

      <View style={styles.content}>
        <Card>
          <Input
            label="Email Address"
            placeholder="your.email@example.com"
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
            error={errors.email}
          />

          <Input
            label="Password"
            placeholder="Enter your password"
            value={password}
            onChangeText={setPassword}
            secureTextEntry
            error={errors.password}
          />

          {errors.submit && (
            <Text style={styles.errorText}>{errors.submit}</Text>
          )}

          <Button
            title="Login"
            onPress={handleLogin}
            loading={loading}
            fullWidth
            size="large"
            style={styles.loginButton}
          />
        </Card>

        <View style={styles.footer}>
          <Text style={styles.footerText}>Don't have an account? </Text>
          <Button
            title="Sign Up"
            onPress={() => navigation.navigate('Signup')}
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
  loginButton: {
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
  errorText: {
    color: Colors.accent.red,
    fontSize: FontSizes.base,
    marginBottom: Spacing.md,
    textAlign: 'center',
  },
});
