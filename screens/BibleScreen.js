import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  ActivityIndicator,
  TextInput,
  Share,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import * as Clipboard from 'expo-clipboard';
import { Ionicons } from '@expo/vector-icons';
import COLORS from './Theme';

const oldTestament = ['Genesis','Exodus','Leviticus','Numbers','Deuteronomy','Joshua','Judges','Ruth','1 Samuel','2 Samuel','1 Kings','2 Kings','1 Chronicles','2 Chronicles','Ezra','Nehemiah','Esther','Job','Psalms','Proverbs','Ecclesiastes','Song of Solomon','Isaiah','Jeremiah','Lamentations','Ezekiel','Daniel','Hosea','Joel','Amos','Obadiah','Jonah','Micah','Nahum','Habakkuk','Zephaniah','Haggai','Zechariah','Malachi'];
const newTestament = ['Matthew','Mark','Luke','John','Acts','Romans','1 Corinthians','2 Corinthians','Galatians','Ephesians','Philippians','Colossians','1 Thessalonians','2 Thessalonians','1 Timothy','2 Timothy','Titus','Philemon','Hebrews','James','1 Peter','2 Peter','1 John','2 John','3 John','Jude','Revelation'];

const BibleScreen = () => {
  const [testament, setTestament] = useState('Old');
  const [selectedBook, setSelectedBook] = useState('');
  const [selectedChapter, setSelectedChapter] = useState(null);
  const [verses, setVerses] = useState([]);
  const [loading, setLoading] = useState(false);
  const [fontSize, setFontSize] = useState(16);
  const [search, setSearch] = useState('');

  const books = testament === 'Old' ? oldTestament : newTestament;

  const fetchChapter = async () => {
    if (!selectedBook || !selectedChapter) return;
    setLoading(true);
    try {
      const response = await fetch(`https://bible-api.com/${selectedBook}+${selectedChapter}`);
      const data = await response.json();
      setVerses(data.verses || []);
    } catch {
      setVerses([]);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchChapter();
  }, [selectedBook, selectedChapter]);

  const handleSearch = async () => {
    if (!search.trim()) return;
    setLoading(true);
    try {
      const response = await fetch(`https://bible-api.com/${encodeURIComponent(search)}`);
      const data = await response.json();
      if (data.reference) {
        const [book, chapter] = data.reference.split(' ');
        setSelectedBook(book);
        setSelectedChapter(parseInt(chapter));
        setVerses(data.verses || []);
      }
    } catch {}
    setLoading(false);
  };

  const reset = () => {
    setSelectedBook('');
    setSelectedChapter(null);
    setVerses([]);
    setSearch('');
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: COLORS.background }}>
      <ScrollView contentContainerStyle={{ padding: 16 }}>
        <View style={styles.headerRow}>
          <Text style={styles.header}>Bible</Text>
          <TouchableOpacity onPress={() => alert('Bookmarks coming soon')}>
            <Ionicons name="bookmark-outline" size={24} color={COLORS.text} />
          </TouchableOpacity>
        </View>

        {!selectedBook && (
          <View style={[styles.suggestedBox, { backgroundColor: COLORS.card }]}>
            <Text style={[styles.suggestedLabel, { color: COLORS.text }]}>Today's Suggested Reading</Text>
            <Text style={[styles.suggestedText, { color: COLORS.text }]}>John 1:1 - "In the beginning was the Word..."</Text>
          </View>
        )}

        <View style={[styles.searchContainer, { backgroundColor: COLORS.card }]}>
          <TextInput
            style={[styles.searchBar, { color: COLORS.text }]}
            placeholder="Search (e.g. John 3:16)"
            placeholderTextColor="#999"
            value={search}
            onChangeText={setSearch}
            onSubmitEditing={handleSearch}
          />
          <TouchableOpacity onPress={handleSearch}>
            <Ionicons name="search" size={24} color={COLORS.text} />
          </TouchableOpacity>
        </View>

        <View style={styles.toggleRow}>
          <TouchableOpacity
            style={[styles.toggleButton, testament === 'Old' && styles.toggleActive]}
            onPress={() => setTestament('Old')}
          >
            <Text style={[styles.toggleText, testament === 'Old' && styles.toggleTextActive]}>Old Testament</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.toggleButton, testament === 'New' && styles.toggleActive]}
            onPress={() => setTestament('New')}
          >
            <Text style={[styles.toggleText, testament === 'New' && styles.toggleTextActive]}>New Testament</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.fontControls}>
          <TouchableOpacity onPress={() => setFontSize(f => Math.max(12, f - 2))}>
            <Ionicons name="remove-circle-outline" size={20} color={COLORS.text} />
          </TouchableOpacity>
          <Text style={{ color: COLORS.text }}>Font Size</Text>
          <TouchableOpacity onPress={() => setFontSize(f => f + 2)}>
            <Ionicons name="add-circle-outline" size={20} color={COLORS.text} />
          </TouchableOpacity>
        </View>

        {!selectedBook && (
          <View style={styles.tileGrid}>
            {books.map((book, i) => (
              <TouchableOpacity
                key={i}
                style={[styles.tile, { backgroundColor: COLORS.card }]}
                onPress={() => setSelectedBook(book)}
              >
                <Text style={[styles.tileText, { color: COLORS.text }]}>{book}</Text>
              </TouchableOpacity>
            ))}
          </View>
        )}

        {selectedBook && selectedChapter === null && (
          <>
            <View style={styles.clearRow}>
              <Text style={[styles.sectionTitle, { color: COLORS.text }]}>Select Chapter - {selectedBook}</Text>
              <TouchableOpacity onPress={reset}>
                <Ionicons name="close-circle" size={24} color={COLORS.text} />
              </TouchableOpacity>
            </View>
            <View style={styles.tileGrid}>
              {[...Array(50)].map((_, i) => (
                <TouchableOpacity
                  key={i}
                  style={[styles.tile, { backgroundColor: COLORS.card }]}
                  onPress={() => setSelectedChapter(i + 1)}
                >
                  <Text style={[styles.tileText, { color: COLORS.text }]}>{i + 1}</Text>
                </TouchableOpacity>
              ))}
            </View>
          </>
        )}

        {selectedChapter && (
          <>
            <View style={styles.clearRow}>
              <Text style={[styles.sectionTitle, { color: COLORS.text }]}>{selectedBook} {selectedChapter}</Text>
              <TouchableOpacity onPress={reset}>
                <Ionicons name="close-circle" size={24} color={COLORS.text} />
              </TouchableOpacity>
            </View>
            {loading ? (
              <ActivityIndicator size="large" color={COLORS.text} />
            ) : (
              <View style={[styles.readerBox, { backgroundColor: COLORS.card }]}>
                {verses.map((verse) => (
                  <Text key={verse.verse} style={{ color: COLORS.text, fontSize, marginBottom: 8 }}>
                    <Text style={{ fontWeight: 'bold' }}>{verse.verse} </Text>
                    {verse.text}
                  </Text>
                ))}
              </View>
            )}
          </>
        )}
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  headerRow: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 16 },
  header: { fontSize: 28, fontWeight: 'bold', color: COLORS.text },
  suggestedBox: { padding: 12, borderRadius: 10, marginBottom: 16 },
  suggestedLabel: { fontWeight: '600' },
  suggestedText: { fontStyle: 'italic' },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    borderRadius: 10,
    marginBottom: 16,
  },
  searchBar: { flex: 1, paddingVertical: 10 },
  toggleRow: { flexDirection: 'row', justifyContent: 'center', marginBottom: 16, gap: 10 },
  toggleButton: {
    paddingVertical: 6,
    paddingHorizontal: 16,
    backgroundColor: '#DCD6C8',
    borderRadius: 6,
  },
  toggleActive: { backgroundColor: COLORS.accent },
  toggleText: { color: '#000000' },
  toggleTextActive: { color: '#fff', fontWeight: '600' },
  fontControls: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 16,
    marginBottom: 16,
    alignItems: 'center',
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
    paddingVertical: 12,
    borderRadius: 10,
    alignItems: 'center',
  },
  tileText: {
    fontWeight: '500',
  },
  sectionTitle: { fontSize: 18, fontWeight: '600' },
  clearRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  readerBox: { padding: 16, borderRadius: 10 },
});

export default BibleScreen;