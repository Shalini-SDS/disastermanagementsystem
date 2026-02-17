import React, { useState } from 'react';
import { View, Text, ScrollView, StyleSheet, FlatList } from 'react-native';
import { Colors } from '@/styles/colors';
import { Spacing, FontSizes, BorderRadius } from '@/styles/spacing';
import { Button } from '@/components/Button';
import { Card } from '@/components/Card';

export const TrainerDashboardScreen: React.FC<{ navigation: any }> = ({ navigation }) => {
  const [stats] = useState({
    activeSessions: 4,
    totalTrainees: 28,
    emergencies: 2,
    completedSessions: 15,
  });

  const [recentAlerts] = useState([
    { id: '1', trainee: 'John Doe', alert: 'Location deviation', time: '5 min ago' },
    { id: '2', trainee: 'Jane Smith', alert: 'Emergency triggered', time: '12 min ago' },
  ]);

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.greeting}>Dashboard 📊</Text>
        <Text style={styles.subtitle}>Manage your training sessions</Text>
      </View>

      <View style={styles.content}>
        {/* Stats Grid */}
        <View style={styles.statsGrid}>
          <Card variant="primary" style={styles.statCard}>
            <Text style={styles.statValue}>{stats.activeSessions}</Text>
            <Text style={styles.statLabel}>Active Sessions</Text>
          </Card>
          <Card variant="secondary" style={styles.statCard}>
            <Text style={styles.statValue}>{stats.totalTrainees}</Text>
            <Text style={styles.statLabel}>Total Trainees</Text>
          </Card>
        </View>

        <View style={styles.statsGrid}>
          <Card style={styles.statCard}>
            <Text style={[styles.statValue, { color: Colors.accent.red }]}>
              {stats.emergencies}
            </Text>
            <Text style={styles.statLabel}>Emergencies</Text>
          </Card>
          <Card style={styles.statCard}>
            <Text style={[styles.statValue, { color: Colors.accent.green }]}>
              {stats.completedSessions}
            </Text>
            <Text style={styles.statLabel}>Completed</Text>
          </Card>
        </View>

        {/* Quick Actions */}
        <Text style={styles.sectionTitle}>Quick Actions</Text>
        <Button
          title="+ Create Session"
          onPress={() => navigation.navigate('TrainerSessions')}
          variant="primary"
          size="large"
          fullWidth
          style={styles.button}
        />
        <Button
          title="👁️ Monitor Trainees"
          onPress={() => navigation.navigate('TrainerMonitoring')}
          variant="secondary"
          size="large"
          fullWidth
          style={styles.button}
        />

        {/* Recent Alerts */}
        <Text style={styles.sectionTitle}>Recent Alerts</Text>
        {recentAlerts.map((alert) => (
          <Card key={alert.id} variant="danger">
            <View style={styles.alertHeader}>
              <View>
                <Text style={styles.alertTrainee}>{alert.trainee}</Text>
                <Text style={styles.alertMessage}>{alert.alert}</Text>
              </View>
              <Text style={styles.alertTime}>{alert.time}</Text>
            </View>
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
    backgroundColor: Colors.primary.main,
    paddingVertical: Spacing.xl,
    paddingHorizontal: Spacing.lg,
    borderBottomLeftRadius: BorderRadius.lg,
    borderBottomRightRadius: BorderRadius.lg,
  },
  greeting: {
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
  statsGrid: {
    flexDirection: 'row',
    gap: Spacing.md,
    marginBottom: Spacing.lg,
  },
  statCard: {
    flex: 1,
    alignItems: 'center',
  },
  statValue: {
    fontSize: FontSizes.xxxl,
    fontWeight: '800',
    color: Colors.primary.dark,
    marginBottom: Spacing.sm,
  },
  statLabel: {
    fontSize: FontSizes.sm,
    color: Colors.textColor.secondary,
    textAlign: 'center',
  },
  sectionTitle: {
    fontSize: FontSizes.lg,
    fontWeight: '700',
    color: Colors.neutral.gray800,
    marginBottom: Spacing.md,
    marginTop: Spacing.lg,
  },
  button: {
    marginBottom: Spacing.md,
  },
  alertHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  alertTrainee: {
    fontSize: FontSizes.base,
    fontWeight: '700',
    color: Colors.textColor.primary,
    marginBottom: Spacing.sm,
  },
  alertMessage: {
    fontSize: FontSizes.sm,
    color: Colors.textColor.secondary,
  },
  alertTime: {
    fontSize: FontSizes.sm,
    color: Colors.textColor.secondary,
    fontWeight: '500',
  },
});
