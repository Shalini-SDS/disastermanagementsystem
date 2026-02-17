import React, { useState, useEffect } from 'react';
import { View, Text, ScrollView, StyleSheet, Switch } from 'react-native';
import { Colors } from '@/styles/colors';
import { Spacing, FontSizes, BorderRadius } from '@/styles/spacing';
import { Button } from '@/components/Button';
import { Card } from '@/components/Card';
import { useLocationTracking } from '@/hooks/useLocationTracking';

export const TraineeLocationScreen: React.FC<{ navigation: any }> = ({ navigation }) => {
  const [trackingEnabled, setTrackingEnabled] = useState(true);
  const [sessionId, setSessionId] = useState('1');
  const { location, error, isTracking } = useLocationTracking(sessionId, trackingEnabled);

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>📍 Location Tracking</Text>
        <Text style={styles.subtitle}>Share your real-time location</Text>
      </View>

      <View style={styles.content}>
        {/* Tracking Status */}
        <Card variant={isTracking ? 'primary' : 'default'}>
          <View style={styles.statusRow}>
            <Text style={styles.label}>Location Tracking</Text>
            <Switch
              value={trackingEnabled}
              onValueChange={setTrackingEnabled}
              trackColor={{ false: Colors.neutral.gray300, true: Colors.primary.main }}
              thumbColor={trackingEnabled ? Colors.primary.main : Colors.neutral.gray400}
            />
          </View>
          <Text style={styles.statusText}>
            {isTracking ? '✓ Tracking active' : '⊘ Tracking disabled'}
          </Text>
        </Card>

        {/* Current Location */}
        {location && (
          <Card key="location">
            <Text style={styles.cardTitle}>Current Location</Text>
            <View style={styles.locationInfo}>
              <Text style={styles.coordLabel}>Latitude:</Text>
              <Text style={styles.coordValue}>{location.latitude.toFixed(6)}</Text>
            </View>
            <View style={styles.locationInfo}>
              <Text style={styles.coordLabel}>Longitude:</Text>
              <Text style={styles.coordValue}>{location.longitude.toFixed(6)}</Text>
            </View>
            <View style={styles.locationInfo}>
              <Text style={styles.coordLabel}>Accuracy:</Text>
              <Text style={styles.coordValue}>{location.accuracy.toFixed(2)}m</Text>
            </View>
            <View style={styles.locationInfo}>
              <Text style={styles.coordLabel}>Last Updated:</Text>
              <Text style={styles.coordValue}>
                {new Date(location.timestamp).toLocaleTimeString()}
              </Text>
            </View>
          </Card>
        )}

        {error && (
          <Card variant="danger">
            <Text style={styles.errorText}>Error: {error}</Text>
          </Card>
        )}

        <Button
          title="View on Map"
          onPress={() => {}}
          variant="primary"
          size="large"
          fullWidth
          style={styles.button}
        />

        <Button
          title="Stop Sharing"
          onPress={() => setTrackingEnabled(false)}
          variant="danger"
          size="large"
          fullWidth
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
  statusRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: Spacing.md,
  },
  label: {
    fontSize: FontSizes.base,
    fontWeight: '600',
    color: Colors.neutral.gray800,
  },
  statusText: {
    fontSize: FontSizes.base,
    color: Colors.neutral.gray600,
    fontWeight: '500',
  },
  cardTitle: {
    fontSize: FontSizes.lg,
    fontWeight: '700',
    color: Colors.neutral.gray800,
    marginBottom: Spacing.md,
  },
  locationInfo: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: Spacing.md,
    paddingBottom: Spacing.md,
    borderBottomWidth: 1,
    borderBottomColor: Colors.primary.lighter,
  },
  coordLabel: {
    fontSize: FontSizes.base,
    color: Colors.neutral.gray600,
    fontWeight: '500',
  },
  coordValue: {
    fontSize: FontSizes.base,
    color: Colors.neutral.gray800,
    fontWeight: '600',
    flex: 1,
    textAlign: 'right',
  },
  button: {
    marginBottom: Spacing.md,
  },
  errorText: {
    color: Colors.accent.red,
    fontSize: FontSizes.base,
    fontWeight: '500',
  },
});
