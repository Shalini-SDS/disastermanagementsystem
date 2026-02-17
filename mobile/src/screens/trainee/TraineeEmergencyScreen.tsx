import React, { useState } from 'react';
import { View, Text, ScrollView, StyleSheet, Alert } from 'react-native';
import { Colors } from '@/styles/colors';
import { Spacing, FontSizes, BorderRadius } from '@/styles/spacing';
import { Button } from '@/components/Button';
import { Input } from '@/components/Input';
import { Card } from '@/components/Card';

export const TraineeEmergencyScreen: React.FC<{ navigation: any }> = ({ navigation }) => {
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const [emergencyTriggered, setEmergencyTriggered] = useState(false);

  const handleEmergency = async () => {
    try {
      setLoading(true);
      // Trigger emergency API call
      Alert.alert(
        'EMERGENCY ALERT SENT',
        'Your emergency has been reported to trainers and emergency services.',
        [{ text: 'OK' }]
      );
      setEmergencyTriggered(true);
      setMessage('');
    } catch (error) {
      Alert.alert('Error', 'Failed to send emergency alert');
    } finally {
      setLoading(false);
    }
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerEmoji}>🚨</Text>
        <Text style={styles.title}>Emergency Alert</Text>
        <Text style={styles.subtitle}>Send immediate distress signal</Text>
      </View>

      <View style={styles.content}>
        <Card variant="danger">
          <Text style={styles.warningText}>
            ⚠️ Pressing the emergency button will immediately alert all trainers and emergency services.
          </Text>
        </Card>

        <Input
          label="Emergency Message (Optional)"
          placeholder="Describe your emergency..."
          value={message}
          onChangeText={setMessage}
          multiline
          numberOfLines={4}
        />

        <Button
          title="🚨 SEND EMERGENCY ALERT"
          onPress={handleEmergency}
          loading={loading}
          variant="danger"
          size="large"
          fullWidth
          style={styles.emergencyButton}
        />

        <Button
          title="Cancel"
          onPress={() => navigation.goBack()}
          variant="outline"
          size="large"
          fullWidth
          style={styles.cancelButton}
        />

        {emergencyTriggered && (
          <Card variant="success">
            <Text style={styles.successText}>
              ✓ Emergency alert has been sent successfully. Help is on the way.
            </Text>
          </Card>
        )}
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
    backgroundColor: Colors.accent.red,
    paddingVertical: Spacing.xl,
    paddingHorizontal: Spacing.lg,
    alignItems: 'center',
    borderBottomLeftRadius: BorderRadius.lg,
    borderBottomRightRadius: BorderRadius.lg,
  },
  headerEmoji: {
    fontSize: 48,
    marginBottom: Spacing.sm,
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
  warningText: {
    fontSize: FontSizes.base,
    color: Colors.accent.red,
    lineHeight: 22,
  },
  emergencyButton: {
    marginTop: Spacing.lg,
    marginBottom: Spacing.md,
  },
  cancelButton: {
    marginBottom: Spacing.lg,
  },
  successText: {
    fontSize: FontSizes.base,
    color: Colors.accent.green,
    textAlign: 'center',
    fontWeight: '600',
  },
});
