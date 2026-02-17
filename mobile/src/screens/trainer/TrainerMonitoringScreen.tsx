import React, { useState } from 'react';
import { View, Text, ScrollView, StyleSheet, FlatList } from 'react-native';
import { Colors } from '@/styles/colors';
import { Spacing, FontSizes, BorderRadius } from '@/styles/spacing';
import { Card } from '@/components/Card';
import { Button } from '@/components/Button';

export const TrainerMonitoringScreen: React.FC<{ navigation: any }> = ({ navigation }) => {
  const [trainees] = useState([
    {
      id: '1',
      name: 'John Doe',
      status: 'tracking',
      location: '40.7128° N, 74.0060° W',
      accuracy: '5.2m',
      lastUpdate: '30 seconds ago',
    },
    {
      id: '2',
      name: 'Jane Smith',
      status: 'emergency',
      location: '40.7150° N, 74.0100° W',
      accuracy: '3.8m',
      lastUpdate: '2 seconds ago',
    },
    {
      id: '3',
      name: 'Mike Johnson',
      status: 'idle',
      location: 'Unknown',
      accuracy: '-',
      lastUpdate: '5 minutes ago',
    },
  ]);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'tracking':
        return Colors.accent.green;
      case 'emergency':
        return Colors.accent.red;
      case 'idle':
        return Colors.neutral.gray400;
      default:
        return Colors.neutral.gray400;
    }
  };

  const getStatusLabel = (status: string) => {
    switch (status) {
      case 'tracking':
        return '📍 Tracking';
      case 'emergency':
        return '🚨 Emergency';
      case 'idle':
        return '⊘ Idle';
      default:
        return status;
    }
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Real-time Monitoring</Text>
        <Text style={styles.subtitle}>Track all trainees in session</Text>
      </View>

      <View style={styles.content}>
        <Text style={styles.traineeCount}>{trainees.length} Trainees Connected</Text>

        {trainees.map((trainee) => (
          <Card
            key={trainee.id}
            variant={trainee.status === 'emergency' ? 'danger' : 'default'}
          >
            <View style={styles.traineeHeader}>
              <View>
                <Text style={styles.traineeName}>{trainee.name}</Text>
                <View style={[styles.statusBadge, { backgroundColor: getStatusColor(trainee.status) }]}>
                  <Text style={styles.statusLabel}>{getStatusLabel(trainee.status)}</Text>
                </View>
              </View>
            </View>

            <View style={styles.infoRow}>
              <Text style={styles.label}>Location:</Text>
              <Text style={styles.value}>{trainee.location}</Text>
            </View>
            <View style={styles.infoRow}>
              <Text style={styles.label}>Accuracy:</Text>
              <Text style={styles.value}>{trainee.accuracy}</Text>
            </View>
            <View style={styles.infoRow}>
              <Text style={styles.label}>Last Update:</Text>
              <Text style={styles.value}>{trainee.lastUpdate}</Text>
            </View>

            <Button
              title="View Details"
              onPress={() => {}}
              variant="outline"
              size="small"
              fullWidth
              style={styles.detailButton}
            />
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
    backgroundColor: Colors.secondary.main,
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
  traineeCount: {
    fontSize: FontSizes.base,
    color: Colors.textColor.secondary,
    marginBottom: Spacing.lg,
    fontWeight: '600',
  },
  traineeHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: Spacing.md,
  },
  traineeName: {
    fontSize: FontSizes.lg,
    fontWeight: '700',
    color: Colors.textColor.primary,
    marginBottom: Spacing.sm,
  },
  statusBadge: {
    paddingVertical: Spacing.sm,
    paddingHorizontal: Spacing.md,
    borderRadius: 16,
    alignSelf: 'flex-start',
  },
  statusLabel: {
    color: Colors.neutral.white,
    fontSize: FontSizes.sm,
    fontWeight: '600',
  },
  infoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: Spacing.md,
    paddingBottom: Spacing.md,
    borderBottomWidth: 1,
    borderBottomColor: Colors.borderColor.light,
  },
  label: {
    fontSize: FontSizes.sm,
    color: Colors.textColor.secondary,
    fontWeight: '500',
  },
  value: {
    fontSize: FontSizes.sm,
    color: Colors.textColor.primary,
    fontWeight: '600',
    flex: 1,
    textAlign: 'right',
  },
  detailButton: {
    marginTop: Spacing.md,
  },
});
