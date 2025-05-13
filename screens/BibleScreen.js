import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  TextInput,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const oldTestament = [
  'Genesis', 'Exodus', 'Leviticus', 'Numbers', 'Deuteronomy',
  'Joshua', 'Judges', 'Ruth', '1 Samuel', '2 Samuel',
  '1 Kings', '2 Kings', '1 Chronicles', '2 Chronicles', 'Ezra',
  'Nehemiah', 'Esther', 'Job', 'Psalms', 'Proverbs',
  'Ecclesiastes', 'Song of Solomon', 'Isaiah', 'Jeremiah', 'Lamentations',
  'Ezekiel', 'Daniel', 'Hosea', 'Joel', 'Amos',
  'Obadiah', 'Jonah', 'Micah', 'Nahum', 'Habakkuk',
  'Zephaniah', 'Haggai', 'Zechariah', 'Malachi'
];

const newTestament = [
  'Matthew', 'Mark', 'Luke', 'John', 'Acts',
  'Romans', '1 Corinthians', '2 Corinthians', 'Galatians', 'Ephesians',
  'Philippians', 'Colossians', '1 Thessalonians', '2 Thessalonians', '1 Timothy',
  '2 Timothy', 'Titus', 'Philemon', 'Hebrews', 'James',
  '1 Peter', '2 Peter', '1 John', '2 John', '3 John',
  'Jude', 'Revelation'
];

const BibleScreen = () => {
  const [search, setSearch] = useState('');

  const renderTiles = (books) => (
    <View style={styles.tileGrid}>
      {books.map((book) => (
        <TouchableOpacity key={book} style={styles.tile}>
          <Text style={styles.tileText}>{book}</Text>
        </TouchableOpacity>
      ))}
    </View>
  );

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#0A0F24' }}>
      <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.header}>Bible</Text>

        {/* Verse of the Day */}
        <View style={styles.verseBox}>
          <Text style={styles.verseLabel}>Verse of the Day</Text>
          <Text style={styles.verseText}>
            "Your word is a lamp to my feet and a light to my path." - Psalm 119:105
          </Text>
        </View>

        {/* Search */}
        <TextInput
          placeholder="Search a verse (e.g. John 3:16)"
          placeholderTextColor="#aaa"
          style={styles.searchBar}
          value={search}
          onChangeText={setSearch}
        />

        {/* Old Testament */}
        <Text style={styles.sectionTitle}>Old Testament</Text>
        {renderTiles(oldTestament)}

        {/* New Testament */}
        <Text style={styles.sectionTitle}>New Testament</Text>
        {renderTiles(newTestament)}

      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
    paddingBottom: 40,
  },
  header: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 20,
    textAlign: 'center',
  },
  verseBox: {
    backgroundColor: '#1C223C',
    padding: 16,
    borderRadius: 12,
    marginBottom: 20,
  },
  verseLabel: {
    color: '#fff',
    fontWeight: '600',
    marginBottom: 6,
  },
  verseText: {
    color: '#ccc',
    fontStyle: 'italic',
  },
  searchBar: {
    backgroundColor: '#1C223C',
    padding: 12,
    borderRadius: 10,
    color: '#fff',
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#fff',
    marginBottom: 12,
    marginTop: 8,
  },
  tileGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    gap: 12,
    marginBottom: 24,
  },
  tile: {
    width: '47%',
    backgroundColor: '#283046',
    paddingVertical: 14,
    borderRadius: 10,
    marginBottom: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  tileText: {
    color: '#fff',
    fontWeight: '500',
    textAlign: 'center',
  },
});

export default BibleScreen;