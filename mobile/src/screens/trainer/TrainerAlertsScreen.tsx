import React, { useState } from 'react';
import { View, Text, ScrollView, StyleSheet } from 'react-native';
import { Colors } from '@/styles/colors';
import { Spacing, FontSizes, BorderRadius } from '@/styles/spacing';
import { Card } from '@/components/Card';
import { Button } from '@/components/Button';

export const TrainerAlertsScreen: React.FC<{ navigation: any }> = ({ navigation }) => {
  const [alerts] = useState([
    {
      id: '1',
      type: 'emergency',
      trainee: 'Jane Smith',
      message: 'Emergency alert triggered - needs immediate assistance',
      timestamp: '2 minutes ago',
      severity: 'critical',
    },
    {
      id: '2',
      type: 'warning',
      trainee: 'Mike Johnson',
      message: 'Trainee location accuracy below threshold',
      timestamp: '8 minutes ago',
      severity: 'warning',
    },
    {
      id: '3',
      type: 'info',
      trainee: 'John Doe',
      message: 'Session checkpoint reached successfully',
      timestamp: '15 minutes ago',
      severity: 'info',
    },
    {
      id: '4',
      type: 'emergency',
      trainee: 'Sarah Wilson',
      message: 'Lost GPS signal - last known location displayed',
      timestamp: '22 minutes ago',
      severity: 'critical',
    },
  ]);

  const getAlertColor = (type: string) => {
    switch (type) {
      case 'emergency':
        return Colors.accent.red;
      case 'warning':
        return Colors.accent.orange;
      case 'info':
        return Colors.accent.blue;
      default:
        return Colors.neutral.gray400;
    }
  };

  const getAlertIcon = (type: string) => {
    switch (type) {
      case 'emergency':
        return '🚨';
      case 'warning':
        return '⚠️';
      case 'info':
        return 'ℹ️';
      default:
        return '📢';
    }
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Alerts & Notifications</Text>
        <Text style={styles.subtitle}>Stay updated with live alerts</Text>
      </View>

      <View style={styles.content}>
        {alerts.map((alert) => (
          <Card
            key={alert.id}
            variant={alert.type === 'emergency' ? 'danger' : 'default'}
            style={styles.alertCard}
          >
            <View style={styles.alertHeader}>
              <Text style={styles.alertIcon}>{getAlertIcon(alert.type)}</Text>
              <View style={styles.alertInfo}>
                <Text style={styles.alertTrainee}>{alert.trainee}</Text>
                <Text style={styles.alertTime}>{alert.timestamp}</Text>
              </View>
            </View>

            <Text style={[styles.alertMessage, { color: getAlertColor(alert.type) }]}>
              {alert.message}
            </Text>

            {alert.type === 'emergency' && (
              <View style={styles.actionButtons}>
                <Button
                  title="Respond"
                  onPress={() => {}}
                  variant="danger"
                  size="small"
                  fullWidth
                  style={styles.button}
                />
                <Button
                  title="Send Help"
                  onPress={() => {}}
                  variant="primary"
                  size="small"
                  fullWidth
                />
              </View>
            )}
          </Card>
        ))}
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
  alertCard: {
    marginBottom: Spacing.lg,
    borderLeftWidth: 4,
  },
  alertHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: Spacing.md,
  },
  alertIcon: {
    fontSize: FontSizes.xl,
    marginRight: Spacing.md,
  },
  alertInfo: {
    flex: 1,
  },
  alertTrainee: {
    fontSize: FontSizes.base,
    fontWeight: '700',
    color: Colors.textColor.primary,
    marginBottom: Spacing.sm,
  },
  alertTime: {
    fontSize: FontSizes.sm,
    color: Colors.textColor.secondary,
  },
  alertMessage: {
    fontSize: FontSizes.base,
    lineHeight: 22,
    marginBottom: Spacing.md,
    fontWeight: '500',
  },
  actionButtons: {
    gap: Spacing.md,
  },
  button: {
    marginBottom: Spacing.md,
  },
});
