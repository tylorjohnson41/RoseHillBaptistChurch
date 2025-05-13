import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';

const books = {
  Genesis: {
    chapters: {
      1: [
        'In the beginning God created the heavens and the earth.',
        'Now the earth was formless and empty, darkness was over the surface of the deep...',
        'And God said, “Let there be light,” and there was light.',
      ],
    },
  },
  Matthew: {
    chapters: {
      1: [
        'This is the genealogy of Jesus the Messiah the son of David, the son of Abraham...',
        'Abraham was the father of Isaac, Isaac the father of Jacob...',
      ],
    },
  },
};

const BibleScreen = () => {
  const [search, setSearch] = useState('');
  const [selectedBook, setSelectedBook] = useState(null);
  const [selectedChapter, setSelectedChapter] = useState(null);
  const [expandedVerses, setExpandedVerses] = useState({});

  const handleVerseToggle = (index) => {
    setExpandedVerses((prev) => ({
      ...prev,
      [index]: !prev[index],
    }));
  };

  const renderVerseOfDay = () => (
    <View style={styles.verseBox}>
      <Text style={styles.verseTitle}>
        <Ionicons name="sparkles" size={16} /> Verse of the Day
      </Text>
      <Text style={styles.verseText}>
        "Your word is a lamp to my feet and a light to my path." - Psalm 119:105
      </Text>
    </View>
  );

  const renderBookSelector = () => (
    <View style={{ marginBottom: 20 }}>
      <Text style={styles.sectionTitle}>Browse by Book</Text>
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        {Object.keys(books).map((book) => (
          <TouchableOpacity
            key={book}
            style={[styles.bookButton, selectedBook === book && styles.bookButtonActive]}
            onPress={() => {
              setSelectedBook(book);
              setSelectedChapter(null);
            }}
          >
            <Text style={[styles.bookText, selectedBook === book && styles.bookTextActive]}>{book}</Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );

  const renderChapterSelector = () => {
    if (!selectedBook) return null;
    const chapters = Object.keys(books[selectedBook].chapters);
    return (
      <View style={{ marginBottom: 20 }}>
        <Text style={styles.sectionTitle}>Chapters in {selectedBook}</Text>
        <View style={styles.chapterRow}>
          {chapters.map((ch) => (
            <TouchableOpacity
              key={ch}
              style={[styles.chapterButton, selectedChapter == ch && styles.chapterButtonActive]}
              onPress={() => setSelectedChapter(ch)}
            >
              <Text style={styles.chapterText}>{ch}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>
    );
  };

  const renderScripture = () => {
    if (!selectedBook || !selectedChapter) return null;
    const verses = books[selectedBook].chapters[selectedChapter];
    return (
      <View style={{ marginBottom: 30 }}>
        <Text style={styles.sectionTitle}>{selectedBook} {selectedChapter}</Text>
        {verses.map((verse, index) => (
          <TouchableOpacity
            key={index}
            style={styles.verseCard}
            onPress={() => handleVerseToggle(index)}
          >
            <Text style={styles.verseNumber}>Verse {index + 1}</Text>
            <Text style={styles.verseContent}>
              {expandedVerses[index] ? verse : verse.slice(0, 60) + '...'}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
    );
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#0A0F24' }}>
      <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.header}>Bible</Text>
        {renderVerseOfDay()}

        <TextInput
          placeholder="Search a verse (e.g. John 3:16)"
          placeholderTextColor="#aaa"
          style={styles.searchBar}
          value={search}
          onChangeText={setSearch}
        />

        {renderBookSelector()}
        {renderChapterSelector()}
        {renderScripture()}
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { padding: 16 },
  header: { fontSize: 28, fontWeight: 'bold', color: '#fff', marginBottom: 20, textAlign: 'center' },
  verseBox: {
    backgroundColor: '#1C223C',
    padding: 16,
    borderRadius: 12,
    marginBottom: 20,
  },
  verseTitle: { fontSize: 16, fontWeight: '600', color: '#fff', marginBottom: 8 },
  verseText: { color: '#ccc', fontStyle: 'italic' },
  searchBar: {
    backgroundColor: '#1C223C',
    padding: 12,
    borderRadius: 10,
    color: '#fff',
    marginBottom: 20,
  },
  sectionTitle: { fontSize: 16, fontWeight: '600', color: '#fff', marginBottom: 10 },
  bookButton: {
    backgroundColor: '#1C223C',
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 20,
    marginRight: 10,
  },
  bookButtonActive: {
    backgroundColor: '#4263EB',
  },
  bookText: { color: '#ccc' },
  bookTextActive: { color: '#fff', fontWeight: '600' },
  chapterRow: { flexDirection: 'row', flexWrap: 'wrap', gap: 8 },
  chapterButton: {
    backgroundColor: '#1C223C',
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 16,
    marginBottom: 8,
  },
  chapterButtonActive: { backgroundColor: '#4263EB' },
  chapterText: { color: '#fff' },
  verseCard: {
    backgroundColor: '#1C223C',
    padding: 12,
    borderRadius: 10,
    marginBottom: 10,
  },
  verseNumber: { color: '#9baaf7', fontWeight: '600', marginBottom: 4 },
  verseContent: { color: '#eee' },
});

export default BibleScreen;