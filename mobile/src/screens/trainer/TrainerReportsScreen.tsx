import React, { useState } from 'react';
import { View, Text, ScrollView, StyleSheet } from 'react-native';
import { Colors } from '@/styles/colors';
import { Spacing, FontSizes, BorderRadius } from '@/styles/spacing';
import { Card } from '@/components/Card';
import { Button } from '@/components/Button';

export const TrainerReportsScreen: React.FC<{ navigation: any }> = ({ navigation }) => {
  const [reports] = useState([
    {
      id: '1',
      title: 'Fire Evacuation Drill - Performance Report',
      date: '2026-02-10',
      trainees: 10,
      avgPerformance: '92%',
      type: 'performance',
    },
    {
      id: '2',
      title: 'Earthquake Response - Safety Analysis',
      date: '2026-02-08',
      trainees: 12,
      avgPerformance: '88%',
      type: 'safety',
    },
    {
      id: '3',
      title: 'Flood Management - Compliance Review',
      date: '2026-02-05',
      trainees: 8,
      avgPerformance: '95%',
      type: 'compliance',
    },
  ]);

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Performance Reports</Text>
        <Text style={styles.subtitle}>Session analysis and insights</Text>
      </View>

      <View style={styles.content}>
        <View style={styles.statsContainer}>
          <Card style={styles.statCard} variant="primary">
            <Text style={styles.statValue}>24</Text>
            <Text style={styles.statLabel}>Total Sessions</Text>
          </Card>
          <Card style={styles.statCard} variant="secondary">
            <Text style={styles.statValue}>91%</Text>
            <Text style={styles.statLabel}>Avg Performance</Text>
          </Card>
        </View>

        <Text style={styles.sectionTitle}>Recent Reports</Text>

        {reports.map((report) => (
          <Card key={report.id}>
            <View style={styles.reportHeader}>
              <View>
                <Text style={styles.reportTitle}>{report.title}</Text>
                <Text style={styles.reportDate}>{report.date}</Text>
              </View>
            </View>

            <View style={styles.reportStats}>
              <View style={styles.reportStat}>
                <Text style={styles.reportStatLabel}>Trainees</Text>
                <Text style={styles.reportStatValue}>{report.trainees}</Text>
              </View>
              <View style={styles.reportStat}>
                <Text style={styles.reportStatLabel}>Avg Performance</Text>
                <Text style={styles.reportStatValue}>{report.avgPerformance}</Text>
              </View>
              <View style={styles.reportStat}>
                <Text style={styles.reportStatLabel}>Type</Text>
                <Text style={styles.reportStatValue}>{report.type}</Text>
              </View>
            </View>

            <Button
              title="View Full Report"
              onPress={() => {}}
              variant="outline"
              size="small"
              fullWidth
              style={styles.button}
            />
          </Card>
        ))}

        <Button
          title="📊 Generate Report"
          onPress={() => {}}
          variant="primary"
          size="large"
          fullWidth
          style={styles.generateButton}
        />
      </View>
    </ScrollView>
  );
};

import { useState } from 'react';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.neutral.gray50,
  },
  header: {
    backgroundColor: Colors.accent.green,
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
  statsContainer: {
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
    color: Colors.textColor.primary,
    marginBottom: Spacing.md,
    marginTop: Spacing.lg,
  },
  reportHeader: {
    marginBottom: Spacing.md,
  },
  reportTitle: {
    fontSize: FontSizes.base,
    fontWeight: '700',
    color: Colors.textColor.primary,
    marginBottom: Spacing.sm,
  },
  reportDate: {
    fontSize: FontSizes.sm,
    color: Colors.textColor.secondary,
  },
  reportStats: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: Spacing.md,
    paddingBottom: Spacing.md,
    borderBottomWidth: 1,
    borderBottomColor: Colors.borderColor.light,
  },
  reportStat: {
    alignItems: 'center',
  },
  reportStatLabel: {
    fontSize: FontSizes.xs,
    color: Colors.textColor.secondary,
    marginBottom: Spacing.sm,
  },
  reportStatValue: {
    fontSize: FontSizes.lg,
    fontWeight: '700',
    color: Colors.primary.dark,
  },
  button: {
    marginTop: Spacing.md,
  },
  generateButton: {
    marginTop: Spacing.xl,
  },
});
