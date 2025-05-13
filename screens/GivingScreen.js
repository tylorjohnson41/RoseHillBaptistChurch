import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Alert,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const givingOptions = [
  {
    id: 1,
    title: 'Tithes',
    description: 'Honor the Lord with your first fruits.',
  },
  {
    id: 2,
    title: 'Offering',
    description: 'Support ongoing ministry and outreach.',
  },
  {
    id: 3,
    title: 'Building Fund',
    description: 'Help us maintain and grow our church facilities.',
  },
];

const GivingScreen = () => {
  const handleGiveNow = (title) => {
    Alert.alert(
      'Redirecting to Give',
      `You selected "${title}". This would open the church’s giving portal.`,
    );
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.header}>Support the Ministry</Text>
      <Text style={styles.subtext}>
        Your giving helps us spread the Gospel and serve our community.
      </Text>

      {givingOptions.map((option) => (
        <View key={option.id} style={styles.card}>
          <View style={styles.cardHeader}>
            <Ionicons name="heart-outline" size={22} color="#fff" />
            <Text style={styles.title}>{option.title}</Text>
          </View>
          <Text style={styles.description}>{option.description}</Text>
          <TouchableOpacity
            style={styles.button}
            onPress={() => handleGiveNow(option.title)}
          >
            <Text style={styles.buttonText}>Give Now</Text>
          </TouchableOpacity>
        </View>
      ))}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0A0F24',
    padding: 16,
  },
  header: {
    fontSize: 24,
    color: '#fff',
    fontWeight: '700',
    marginBottom: 8,
  },
  subtext: {
    fontSize: 14,
    color: '#ccc',
    marginBottom: 20,
  },
  card: {
    backgroundColor: '#1C223C',
    borderRadius: 10,
    padding: 16,
    marginBottom: 16,
  },
  cardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  title: {
    fontSize: 18,
    color: '#fff',
    fontWeight: '600',
    marginLeft: 8,
  },
  description: {
    color: '#bbb',
    marginBottom: 12,
  },
  button: {
    backgroundColor: '#4263EB',
    paddingVertical: 10,
    borderRadius: 8,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontWeight: '600',
  },
});

export default GivingScreen;