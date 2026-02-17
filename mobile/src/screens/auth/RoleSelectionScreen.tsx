import React, { useState } from 'react';
import { View, Text, ScrollView, StyleSheet, Alert, LinearGradient } from 'react-native';
import { Colors } from '@/styles/colors';
import { Spacing, FontSizes, BorderRadius } from '@/styles/spacing';
import { Button } from '@/components/Button';
import { Input } from '@/components/Input';
import { Card } from '@/components/Card';
import { useAuth } from '@/hooks/useAuth';

export const RoleSelectionScreen: React.FC<{ navigation: any }> = ({ navigation }) => {
  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>🚨 Disaster Management</Text>
        <Text style={styles.subtitle}>Choose Your Role</Text>
      </View>

      <View style={styles.content}>
        <View style={styles.roleCard}>
          <View style={[styles.cardGradient, { backgroundColor: Colors.primary.main }]}>
            <Text style={styles.roleTitle}>👨‍🏫 Trainer</Text>
            <Text style={styles.roleDescription}>
              Monitor trainees, manage sessions, send alerts, and review reports
            </Text>
            <Button
              title="Login as Trainer"
              onPress={() => navigation.navigate('TrainerLogin')}
              size="large"
              fullWidth
              style={styles.button}
            />
          </View>
        </View>

        <View style={styles.roleCard}>
          <View style={[styles.cardGradient, { backgroundColor: Colors.secondary.main }]}>
            <Text style={styles.roleTitle}>👨‍🎓 Trainee</Text>
            <Text style={styles.roleDescription}>
              Join sessions, track location, handle emergencies, and view profile
            </Text>
            <Button
              title="Login as Trainee"
              onPress={() => navigation.navigate('TraineeLogin')}
              size="large"
              fullWidth
              variant="secondary"
              style={styles.button}
            />
          </View>
        </View>

        <Button
          title="📝 Create New Account"
          onPress={() => navigation.navigate('Signup')}
          variant="outline"
          size="large"
          fullWidth
          style={styles.signupButton}
        />
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
    backgroundColor: Colors.primary.dark,
    paddingTop: Spacing.xl,
    paddingBottom: Spacing.xl,
    paddingHorizontal: Spacing.lg,
  },
  title: {
    fontSize: FontSizes.xxxl,
    fontWeight: '800',
    color: Colors.neutral.white,
    marginBottom: Spacing.sm,
  },
  subtitle: {
    fontSize: FontSizes.lg,
    color: Colors.neutral.white,
    opacity: 0.95,
  },
  content: {
    padding: Spacing.lg,
  },
  roleCard: {
    marginBottom: Spacing.lg,
    borderRadius: BorderRadius.lg,
    overflow: 'hidden',
    shadowColor: Colors.neutral.black,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 12,
    elevation: 8,
  },
  cardGradient: {
    padding: Spacing.lg,
    borderRadius: BorderRadius.lg,
  },
  roleTitle: {
    fontSize: FontSizes.xl,
    fontWeight: '700',
    color: Colors.neutral.white,
    marginBottom: Spacing.md,
  },
  roleDescription: {
    fontSize: FontSizes.base,
    color: Colors.neutral.white,
    opacity: 0.9,
    marginBottom: Spacing.lg,
    lineHeight: 22,
  },
  button: {
    marginTop: Spacing.md,
  },
  signupButton: {
    marginTop: Spacing.xl,
  },
});
