import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  Image,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

const ProfileScreen = () => {
  const navigation = useNavigation();
  const placeholderImage = require('../assets/profile-placeholder.png'); // replace with actual path
  const userName = 'John Doe';
  const userEmail = 'johndoe@example.com';

  const handleAvatarPress = () => {
    // future: open image picker or avatar editor
    alert('Upload profile picture (coming soon)');
  };

  const handleEditProfile = () => {
    navigation.navigate('EditProfile');
  };

  return (
    <LinearGradient colors={['#0D1B2A', '#1B263B']} style={styles.container}>
      <SafeAreaView style={styles.safeArea}>
        <ScrollView contentContainerStyle={styles.scrollContent}>
          {/* Header */}
          <Text style={styles.title}>My Profile</Text>

          {/* Tappable Avatar */}
          <TouchableOpacity style={styles.avatarWrapper} onPress={handleAvatarPress}>
            <Image
              source={placeholderImage}
              style={styles.avatar}
              resizeMode="cover"
            />
          </TouchableOpacity>

          {/* Name & Email */}
          <Text style={styles.name}>{userName}</Text>
          <Text style={styles.email}>{userEmail}</Text>

          {/* Edit Profile Button */}
          <TouchableOpacity style={styles.editButton} onPress={handleEditProfile}>
            <Ionicons name="create-outline" size={18} color="#fff" style={{ marginRight: 8 }} />
            <Text style={styles.editButtonText}>Edit Profile</Text>
          </TouchableOpacity>

          {/* My Events Card */}
          <View style={styles.card}>
            <Ionicons name="calendar-outline" size={24} color="#fff" style={styles.cardIcon} />
            <View>
              <Text style={styles.cardTitle}>My Events</Text>
              <Text style={styles.cardSubtitle}>See what you're signed up for</Text>
            </View>
          </View>

          {/* Settings/More Card */}
          <View style={styles.card}>
            <Ionicons name="settings-outline" size={24} color="#fff" style={styles.cardIcon} />
            <View>
              <Text style={styles.cardTitle}>Settings & More</Text>
              <Text style={styles.cardSubtitle}>Manage your preferences</Text>
            </View>
          </View>
        </ScrollView>
      </SafeAreaView>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  safeArea: {
    flex: 1,
  },
  scrollContent: {
    alignItems: 'center',
    padding: 20,
  },
  title: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 20,
  },
  avatarWrapper: {
    width: 120,
    height: 120,
    borderRadius: 60,
    overflow: 'hidden',
    marginBottom: 16,
    borderWidth: 3,
    borderColor: '#fff',
  },
  avatar: {
    width: '100%',
    height: '100%',
  },
  name: {
    fontSize: 20,
    fontWeight: '600',
    color: '#fff',
  },
  email: {
    fontSize: 14,
    color: '#ccc',
    marginBottom: 12,
  },
  editButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#1E2A38',
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 20,
    marginBottom: 30,
    borderWidth: 1,
    borderColor: '#fff',
  },
  editButtonText: {
    color: '#fff',
    fontWeight: '600',
    fontSize: 14,
  },
  card: {
    flexDirection: 'row',
    backgroundColor: '#1E2A38',
    borderRadius: 16,
    padding: 16,
    width: '100%',
    marginBottom: 20,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 3 },
    elevation: 5,
  },
  cardIcon: {
    marginRight: 16,
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#fff',
  },
  cardSubtitle: {
    fontSize: 13,
    color: '#ccc',
  },
});

export default ProfileScreen;
