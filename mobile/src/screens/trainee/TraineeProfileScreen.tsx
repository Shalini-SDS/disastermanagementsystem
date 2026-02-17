import React, { useState } from 'react';
import { View, Text, ScrollView, StyleSheet } from 'react-native';
import { Colors } from '@/styles/colors';
import { Spacing, FontSizes, BorderRadius } from '@/styles/spacing';
import { Button } from '@/components/Button';
import { Input } from '@/components/Input';
import { Card } from '@/components/Card';

export const TraineeProfileScreen: React.FC<{ navigation: any }> = ({ navigation }) => {
  const [profile, setProfile] = useState({
    name: 'John Doe',
    email: 'john@example.com',
    phone: '+1 234 567 8900',
    emergencyContact: 'Jane Doe',
    emergencyPhone: '+1 234 567 8901',
  });
  const [isEditing, setIsEditing] = useState(false);

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.avatarEmoji}>👤</Text>
        <Text style={styles.name}>{profile.name}</Text>
        <Text style={styles.role}>Trainee</Text>
      </View>

      <View style={styles.content}>
        {!isEditing ? (
          <>
            {/* Profile Info */}
            <Card>
              <Text style={styles.sectionTitle}>Contact Information</Text>
              <View style={styles.infoRow}>
                <Text style={styles.label}>Email</Text>
                <Text style={styles.value}>{profile.email}</Text>
              </View>
              <View style={styles.infoRow}>
                <Text style={styles.label}>Phone</Text>
                <Text style={styles.value}>{profile.phone}</Text>
              </View>
            </Card>

            <Card>
              <Text style={styles.sectionTitle}>Emergency Contact</Text>
              <View style={styles.infoRow}>
                <Text style={styles.label}>Name</Text>
                <Text style={styles.value}>{profile.emergencyContact}</Text>
              </View>
              <View style={styles.infoRow}>
                <Text style={styles.label}>Phone</Text>
                <Text style={styles.value}>{profile.emergencyPhone}</Text>
              </View>
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
                onChangeText={(name) => setProfile({ ...profile, name })}
              />
              <Input
                label="Email"
                value={profile.email}
                onChangeText={(email) => setProfile({ ...profile, email })}
              />
              <Input
                label="Phone"
                value={profile.phone}
                onChangeText={(phone) => setProfile({ ...profile, phone })}
              />
              <Input
                label="Emergency Contact Name"
                value={profile.emergencyContact}
                onChangeText={(emergencyContact) => setProfile({ ...profile, emergencyContact })}
              />
              <Input
                label="Emergency Contact Phone"
                value={profile.emergencyPhone}
                onChangeText={(emergencyPhone) => setProfile({ ...profile, emergencyPhone })}
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
    backgroundColor: Colors.secondary.main,
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
  button: {
    marginVertical: Spacing.md,
  },
  logoutButton: {
    marginTop: Spacing.xl,
  },
});
