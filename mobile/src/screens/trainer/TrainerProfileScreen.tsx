import React, { useState } from 'react';
import { View, Text, ScrollView, StyleSheet } from 'react-native';
import { Colors } from '@/styles/colors';
import { Spacing, FontSizes, BorderRadius } from '@/styles/spacing';
import { Button } from '@/components/Button';
import { Input } from '@/components/Input';
import { Card } from '@/components/Card';

export const TrainerProfileScreen: React.FC<{ navigation: any }> = ({ navigation }) => {
  const [profile] = useState({
    name: 'Dr. Sarah Williams',
    email: 'sarah@example.com',
    phone: '+1 234 567 8900',
    department: 'Emergency Management',
    experience: '10+ years',
    certifications: ['FEMA Certified', 'First Aid Instructor'],
  });
  const [isEditing, setIsEditing] = useState(false);

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.avatarEmoji}>👨‍🏫</Text>
        <Text style={styles.name}>{profile.name}</Text>
        <Text style={styles.role}>Trainer</Text>
      </View>

      <View style={styles.content}>
        {!isEditing ? (
          <>
            <Card>
              <Text style={styles.sectionTitle}>Professional Info</Text>
              <View style={styles.infoRow}>
                <Text style={styles.label}>Email</Text>
                <Text style={styles.value}>{profile.email}</Text>
              </View>
              <View style={styles.infoRow}>
                <Text style={styles.label}>Phone</Text>
                <Text style={styles.value}>{profile.phone}</Text>
              </View>
              <View style={styles.infoRow}>
                <Text style={styles.label}>Department</Text>
                <Text style={styles.value}>{profile.department}</Text>
              </View>
              <View style={styles.infoRow}>
                <Text style={styles.label}>Experience</Text>
                <Text style={styles.value}>{profile.experience}</Text>
              </View>
            </Card>

            <Card>
              <Text style={styles.sectionTitle}>Certifications</Text>
              {profile.certifications.map((cert, idx) => (
                <View key={idx} style={styles.certItem}>
                  <Text style={styles.certIcon}>✓</Text>
                  <Text style={styles.certName}>{cert}</Text>
                </View>
              ))}
            </Card>

            <Button
              title="Edit Profile"
              onPress={() => setIsEditing(true)}
              variant="primary"
              size="large"
              fullWidth
              style={styles.button}
            />
          </>
        ) : (
          <>
            <Card>
              <Text style={styles.sectionTitle}>Edit Profile</Text>
              <Input
                label="Full Name"
                value={profile.name}
                onChangeText={() => {}}
              />
              <Input
                label="Email"
                value={profile.email}
                onChangeText={() => {}}
              />
              <Input
                label="Phone"
                value={profile.phone}
                onChangeText={() => {}}
              />
              <Input
                label="Department"
                value={profile.department}
                onChangeText={() => {}}
              />
            </Card>

            <Button
              title="Save Changes"
              onPress={() => setIsEditing(false)}
              variant="success"
              size="large"
              fullWidth
              style={styles.button}
            />
            <Button
              title="Cancel"
              onPress={() => setIsEditing(false)}
              variant="outline"
              size="large"
              fullWidth
            />
          </>
        )}

        <Button
          title="Logout"
          onPress={() => navigation.navigate('RoleSelection')}
          variant="danger"
          size="large"
          fullWidth
          style={styles.logoutButton}
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
    backgroundColor: Colors.primary.main,
    paddingVertical: Spacing.xl,
    paddingHorizontal: Spacing.lg,
    alignItems: 'center',
    borderBottomLeftRadius: BorderRadius.lg,
    borderBottomRightRadius: BorderRadius.lg,
  },
  avatarEmoji: {
    fontSize: 64,
    marginBottom: Spacing.md,
  },
  name: {
    fontSize: FontSizes.xxl,
    fontWeight: '800',
    color: Colors.neutral.white,
    marginBottom: Spacing.sm,
  },
  role: {
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
  },
  infoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: Spacing.md,
    paddingBottom: Spacing.md,
    borderBottomWidth: 1,
    borderBottomColor: Colors.primary.lighter,
  },
  label: {
    fontSize: FontSizes.base,
    color: Colors.neutral.gray600,
    fontWeight: '500',
  },
  value: {
    fontSize: FontSizes.base,
    color: Colors.neutral.gray800,
    fontWeight: '600',
  },
  certItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: Spacing.md,
    paddingBottom: Spacing.md,
    borderBottomWidth: 1,
    borderBottomColor: Colors.borderColor.light,
  },
  certIcon: {
    fontSize: FontSizes.lg,
    color: Colors.accent.green,
    marginRight: Spacing.md,
    fontWeight: '700',
  },
  certName: {
    fontSize: FontSizes.base,
    color: Colors.textColor.primary,
    fontWeight: '500',
  },
  button: {
    marginVertical: Spacing.md,
  },
  logoutButton: {
    marginTop: Spacing.xl,
  },
});
