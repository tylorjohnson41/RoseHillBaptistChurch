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
import { SafeAreaView } from 'react-native-safe-area-context';
import COLORS from './Theme';

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
    <SafeAreaView style={{ flex: 1, backgroundColor: COLORS.background }}>
      <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.header}>Support the Ministry</Text>
        <Text style={styles.subtext}>
          Your giving helps us spread the Gospel and serve our community.
        </Text>

        {givingOptions.map((option) => (
          <View key={option.id} style={styles.card}>
            <View style={styles.cardHeader}>
              <Ionicons name="heart-outline" size={22} color={COLORS.text} />
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
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
    padding: 16,
  },
  header: {
    fontSize: 24,
    color: COLORS.text,
    fontWeight: '700',
    marginBottom: 8,
  },
  subtext: {
    fontSize: 14,
    color: '#666',
    marginBottom: 20,
  },
  card: {
    backgroundColor: COLORS.card,
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
    color: COLORS.text,
    fontWeight: '600',
    marginLeft: 8,
  },
  description: {
    color: COLORS.text,
    marginBottom: 12,
  },
  button: {
    backgroundColor: '#000000',
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