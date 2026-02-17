import React, { useState, useEffect } from 'react';
import { View, Text, ScrollView, StyleSheet, FlatList } from 'react-native';
import { Colors } from '@/styles/colors';
import { Spacing, FontSizes, BorderRadius } from '@/styles/spacing';
import { Button } from '@/components/Button';
import { Card } from '@/components/Card';

export const TraineeHomeScreen: React.FC<{ navigation: any }> = ({ navigation }) => {
  const [sessions, setSessions] = useState([
    {
      id: '1',
      name: 'Fire Evacuation Drill',
      date: '2026-02-15',
      status: 'active',
      duration: '2 hours',
    },
    {
      id: '2',
      name: 'Earthquake Response Training',
      date: '2026-02-10',
      status: 'completed',
      duration: '3 hours',
    },
  ]);

  getStatusColor = (status: string) => {
    switch (status) {
      case 'active':
        return Colors.accent.green;
      case 'completed':
        return Colors.accent.blue;
      default:
        return Colors.neutral.gray600;
    }
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.greeting}>Welcome Back! 👋</Text>
        <Text style={styles.subtitle}>You have 2 active sessions</Text>
      </View>

      <View style={styles.content}>
        {/* Quick Actions */}
        <Text style={styles.sectionTitle}>Quick Actions</Text>
        <View style={styles.actionGrid}>
          <Button
            title="🚨 Emergency"
            onPress={() => navigation.navigate('TraineeEmergency')}
            variant="danger"
            size="large"
            fullWidth
            style={styles.actionButton}
          />
          <Button
            title="📍 Location"
            onPress={() => navigation.navigate('TraineeLocation')}
            variant="secondary"
            size="large"
            fullWidth
            style={styles.actionButton}
          />
        </View>

        {/* Active Sessions */}
        <Text style={styles.sectionTitle}>Your Sessions</Text>
        {sessions.map((session) => (
          <Card key={session.id} variant={session.status === 'active' ? 'primary' : 'default'}>
            <View style={styles.sessionHeader}>
              <View>
                <Text style={styles.sessionName}>{session.name}</Text>
                <Text style={styles.sessionDate}>{session.date}</Text>
              </View>
              <View style={[styles.statusBadge, { backgroundColor: getStatusColor(session.status) }]}>
                <Text style={styles.statusText}>{session.status}</Text>
              </View>
            </View>
            <Text style={styles.duration}>⏱️ {session.duration}</Text>
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
  sectionTitle: {
    fontSize: FontSizes.lg,
    fontWeight: '700',
    color: Colors.neutral.gray800,
    marginBottom: Spacing.md,
    marginTop: Spacing.md,
  },
  actionGrid: {
    gap: Spacing.md,
    marginBottom: Spacing.xl,
  },
  actionButton: {
    marginBottom: Spacing.sm,
  },
  sessionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: Spacing.md,
  },
  sessionName: {
    fontSize: FontSizes.lg,
    fontWeight: '700',
    color: Colors.neutral.gray800,
  },
  sessionDate: {
    fontSize: FontSizes.sm,
    color: Colors.neutral.gray600,
    marginTop: Spacing.sm,
  },
  statusBadge: {
    paddingVertical: Spacing.sm,
    paddingHorizontal: Spacing.md,
    borderRadius: 20,
  },
  statusText: {
    color: Colors.neutral.white,
    fontSize: FontSizes.sm,
    fontWeight: '600',
    textTransform: 'capitalize',
  },
  duration: {
    fontSize: FontSizes.base,
    color: Colors.neutral.gray600,
  },
});
