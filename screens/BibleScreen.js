import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TextInput,
  ScrollView,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';

const sampleVerses = [
  {
    reference: 'John 3:16',
    text: 'For God so loved the world that he gave his one and only Son...',
  },
  {
    reference: 'Psalm 23:1',
    text: 'The Lord is my shepherd, I shall not want.',
  },
  {
    reference: 'Philippians 4:13',
    text: 'I can do all things through Christ who strengthens me.',
  },
  {
    reference: 'Romans 8:28',
    text: 'And we know that all things work together for good to those who love God...',
  },
];

const BibleScreen = () => {
  const [searchText, setSearchText] = useState('');

  return (
    <LinearGradient colors={['#0D1B2A', '#1B263B']} style={styles.container}>
      <SafeAreaView style={styles.safeArea}>
        <ScrollView contentContainerStyle={styles.scrollContent}>
          {/* Title */}
          <Text style={styles.title}>Bible</Text>

          {/* Verse of the Day */}
          <View style={styles.card}>
            <Ionicons name="sparkles-outline" size={20} color="#fff" style={styles.cardIcon} />
            <View>
              <Text style={styles.cardTitle}>Verse of the Day</Text>
              <Text style={styles.cardText}>
                "Your word is a lamp to my feet and a light to my path." - Psalm 119:105
              </Text>
            </View>
          </View>

          {/* Search Bar */}
          <View style={styles.searchBar}>
            <Ionicons name="search-outline" size={20} color="#ccc" style={{ marginRight: 8 }} />
            <TextInput
              placeholder="Search a verse (e.g. John 3:16)"
              placeholderTextColor="#aaa"
              value={searchText}
              onChangeText={setSearchText}
              style={styles.searchInput}
            />
          </View>

          {/* Sample Verses */}
          {sampleVerses.map((verse, index) => (
            <View key={index} style={styles.verseCard}>
              <Text style={styles.verseRef}>{verse.reference}</Text>
              <Text style={styles.verseText}>{verse.text}</Text>
            </View>
          ))}
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
    padding: 20,
  },
  title: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 20,
    textAlign: 'center',
  },
  card: {
    backgroundColor: '#1E2A38',
    borderRadius: 16,
    padding: 16,
    marginBottom: 20,
    flexDirection: 'row',
    alignItems: 'flex-start',
    elevation: 4,
  },
  cardIcon: {
    marginRight: 12,
    marginTop: 4,
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#fff',
    marginBottom: 6,
  },
  cardText: {
    fontSize: 14,
    color: '#ccc',
  },
  searchBar: {
    flexDirection: 'row',
    backgroundColor: '#1E2A38',
    borderRadius: 12,
    padding: 12,
    alignItems: 'center',
    marginBottom: 20,
  },
  searchInput: {
    color: '#fff',
    flex: 1,
    fontSize: 14,
  },
  verseCard: {
    backgroundColor: '#1E2A38',
    borderRadius: 14,
    padding: 16,
    marginBottom: 16,
  },
  verseRef: {
    fontSize: 14,
    fontWeight: '600',
    color: '#fff',
    marginBottom: 6,
  },
  verseText: {
    fontSize: 13,
    color: '#ccc',
  },
});

export default BibleScreen;
