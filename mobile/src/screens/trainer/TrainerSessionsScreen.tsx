import React, { useState } from 'react';
import { View, Text, ScrollView, StyleSheet, Alert } from 'react-native';
import { Colors } from '@/styles/colors';
import { Spacing, FontSizes, BorderRadius } from '@/styles/spacing';
import { Card } from '@/components/Card';
import { Button } from '@/components/Button';
import { Input } from '@/components/Input';

export const TrainerSessionsScreen: React.FC<{ navigation: any }> = ({ navigation }) => {
  const [sessions] = useState([
    {
      id: '1',
      name: 'Fire Evacuation Drill',
      date: '2026-02-15',
      time: '10:00 AM',
      status: 'active',
      trainees: 8,
      location: 'Building A',
    },
    {
      id: '2',
      name: 'Earthquake Response',
      date: '2026-02-16',
      time: '2:00 PM',
      status: 'scheduled',
      trainees: 12,
      location: 'Training Center',
    },
    {
      id: '3',
      name: 'Flood Management',
      date: '2026-02-10',
      time: '10:00 AM',
      status: 'completed',
      trainees: 10,
      location: 'Field Area',
    },
  ]);
  const [showCreate, setShowCreate] = useState(false);
  const [newSession, setNewSession] = useState({
    name: '',
    date: '',
    time: '',
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active':
        return Colors.accent.green;
      case 'scheduled':
        return Colors.accent.blue;
      case 'completed':
        return Colors.accent.gray;
      default:
        return Colors.neutral.gray400;
    }
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Training Sessions</Text>
        <Text style={styles.subtitle}>Manage and create sessions</Text>
      </View>

      <View style={styles.content}>
        <Button
          title="+ Create New Session"
          onPress={() => setShowCreate(!showCreate)}
          variant="primary"
          size="large"
          fullWidth
          style={styles.createButton}
        />

        {showCreate && (
          <Card>
            <Text style={styles.formTitle}>Create New Session</Text>
            <Input
              label="Session Name"
              placeholder="e.g., Fire Evacuation Drill"
              value={newSession.name}
              onChangeText={(name) => setNewSession({ ...newSession, name })}
            />
            <Input
              label="Date"
              placeholder="YYYY-MM-DD"
              value={newSession.date}
              onChangeText={(date) => setNewSession({ ...newSession, date })}
            />
            <Input
              label="Time"
              placeholder="HH:MM AM/PM"
              value={newSession.time}
              onChangeText={(time) => setNewSession({ ...newSession, time })}
            />
            <Button
              title="Create Session"
              onPress={() => setShowCreate(false)}
              variant="primary"
              size="large"
              fullWidth
            />
          </Card>
        )}

        <Text style={styles.sectionTitle}>All Sessions</Text>
        {sessions.map((session) => (
          <Card key={session.id} variant="default">
            <View style={styles.sessionHeader}>
              <View>
                <Text style={styles.sessionName}>{session.name}</Text>
                <Text style={styles.sessionLocation}>📍 {session.location}</Text>
              </View>
              <View
                style={[styles.statusBadge, { backgroundColor: getStatusColor(session.status) }]}
              >
                <Text style={styles.statusText}>{session.status}</Text>
              </View>
            </View>

            <View style={styles.sessionDetails}>
              <Text style={styles.detail}>📅 {session.date}</Text>
              <Text style={styles.detail}>🕐 {session.time}</Text>
              <Text style={styles.detail}>👥 {session.trainees} trainees</Text>
            </View>

            {session.status === 'active' && (
              <Button
                title="Monitor Session"
                onPress={() => navigation.navigate('TrainerMonitoring')}
                variant="secondary"
                size="small"
                fullWidth
                style={styles.button}
              />
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
  createButton: {
    marginBottom: Spacing.lg,
  },
  formTitle: {
    fontSize: FontSizes.lg,
    fontWeight: '700',
    color: Colors.textColor.primary,
    marginBottom: Spacing.md,
  },
  sectionTitle: {
    fontSize: FontSizes.lg,
    fontWeight: '700',
    color: Colors.textColor.primary,
    marginBottom: Spacing.md,
    marginTop: Spacing.lg,
  },
  sessionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: Spacing.md,
  },
  sessionName: {
    fontSize: FontSizes.lg,
    fontWeight: '700',
    color: Colors.textColor.primary,
    marginBottom: Spacing.sm,
  },
  sessionLocation: {
    fontSize: FontSizes.sm,
    color: Colors.textColor.secondary,
  },
  statusBadge: {
    paddingVertical: Spacing.sm,
    paddingHorizontal: Spacing.md,
    borderRadius: 16,
  },
  statusText: {
    color: Colors.neutral.white,
    fontSize: FontSizes.sm,
    fontWeight: '600',
    textTransform: 'capitalize',
  },
  sessionDetails: {
    marginBottom: Spacing.md,
    paddingBottom: Spacing.md,
    borderBottomWidth: 1,
    borderBottomColor: Colors.borderColor.light,
  },
  detail: {
    fontSize: FontSizes.sm,
    color: Colors.textColor.secondary,
    marginBottom: Spacing.sm,
  },
  button: {
    marginTop: Spacing.md,
  },
});
