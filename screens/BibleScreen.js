import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  ActivityIndicator,
  TextInput,
  useColorScheme,
  Share,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import * as Clipboard from 'expo-clipboard';
import { Ionicons } from '@expo/vector-icons';

const oldTestament = [...Array(39)].map((_, i) => ['Genesis','Exodus','Leviticus','Numbers','Deuteronomy','Joshua','Judges','Ruth','1 Samuel','2 Samuel','1 Kings','2 Kings','1 Chronicles','2 Chronicles','Ezra','Nehemiah','Esther','Job','Psalms','Proverbs','Ecclesiastes','Song of Solomon','Isaiah','Jeremiah','Lamentations','Ezekiel','Daniel','Hosea','Joel','Amos','Obadiah','Jonah','Micah','Nahum','Habakkuk','Zephaniah','Haggai','Zechariah','Malachi'][i]);
const newTestament = [...Array(27)].map((_, i) => ['Matthew','Mark','Luke','John','Acts','Romans','1 Corinthians','2 Corinthians','Galatians','Ephesians','Philippians','Colossians','1 Thessalonians','2 Thessalonians','1 Timothy','2 Timothy','Titus','Philemon','Hebrews','James','1 Peter','2 Peter','1 John','2 John','3 John','Jude','Revelation'][i]);

const BibleScreen = () => {
  const [testament, setTestament] = useState('Old');
  const [selectedBook, setSelectedBook] = useState('');
  const [selectedChapter, setSelectedChapter] = useState(null);
  const [verses, setVerses] = useState([]);
  const [loading, setLoading] = useState(false);
  const [fontSize, setFontSize] = useState(16);
  const [theme, setTheme] = useState('dark');
  const [search, setSearch] = useState('');

  const isDark = theme === 'dark';
  const books = testament === 'Old' ? oldTestament : newTestament;

  const fetchChapter = async () => {
    if (!selectedBook || !selectedChapter) return;
    setLoading(true);
    try {
      const response = await fetch(`https://bible-api.com/${selectedBook}+${selectedChapter}`);
      const data = await response.json();
      setVerses(data.verses || []);
    } catch (err) {
      console.error('Error:', err);
      setVerses([]);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchChapter();
  }, [selectedBook, selectedChapter]);

  const reset = () => {
    setSelectedBook('');
    setSelectedChapter(null);
    setVerses([]);
    setSearch('');
  };

  const nextChapter = () => setSelectedChapter((prev) => prev + 1);
  const prevChapter = () => setSelectedChapter((prev) => (prev > 1 ? prev - 1 : 1));

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
    } catch (error) {
      console.error('Search failed:', error);
    }
    setLoading(false);
  };

  const handleShare = async (text) => {
    await Share.share({ message: text });
  };

  const bg = isDark ? '#0A0F24' : '#fff';
  const fg = isDark ? '#fff' : '#000';
  const cardBg = isDark ? '#1C223C' : '#f0f0f0';

  const renderTiles = (items, onPress) => (
    <View style={styles.tileGrid}>
      {items.map((item, idx) => (
        <TouchableOpacity key={idx} style={[styles.tile, { backgroundColor: cardBg }]} onPress={() => onPress(item)}>
          <Text style={[styles.tileText, { color: fg }]}>{item}</Text>
        </TouchableOpacity>
      ))}
    </View>
  );

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: bg }}>
      <ScrollView contentContainerStyle={[styles.container]}>
        <View style={styles.headerRow}>
          <Text style={[styles.header, { color: fg }]}>Bible</Text>
          <TouchableOpacity onPress={() => alert('Bookmarks coming soon')}>
            <Ionicons name="bookmark-outline" size={24} color={fg} />
          </TouchableOpacity>
        </View>

        {/* Suggested Reading */}
        {!selectedBook && (
          <View style={[styles.suggestedBox, { backgroundColor: cardBg }]}>
            <Text style={[styles.suggestedLabel, { color: fg }]}>Today's Suggested Reading</Text>
            <Text style={[styles.suggestedText, { color: fg }]}>John 1:1 - "In the beginning was the Word..."</Text>
          </View>
        )}

        {/* Search Bar */}
        <View style={[styles.searchContainer, { backgroundColor: cardBg }]}>
          <TextInput
            style={[styles.searchBar, { color: fg }]}
            placeholder="Search (e.g. John 3:16)"
            placeholderTextColor="#aaa"
            value={search}
            onChangeText={setSearch}
            onSubmitEditing={handleSearch}
          />
          <TouchableOpacity onPress={handleSearch}>
            <Ionicons name="search" size={24} color={fg} />
          </TouchableOpacity>
        </View>

        {/* Controls */}
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
          <TouchableOpacity onPress={() => setTheme(isDark ? 'light' : 'dark')}>
            <Ionicons name={isDark ? 'sunny' : 'moon'} size={22} color={fg} />
          </TouchableOpacity>
        </View>

        {/* Font size */}
        <View style={styles.fontControls}>
          <TouchableOpacity onPress={() => setFontSize((s) => Math.max(12, s - 2))}>
            <Ionicons name="remove-circle-outline" size={22} color={fg} />
          </TouchableOpacity>
          <Text style={{ color: fg }}>Font Size</Text>
          <TouchableOpacity onPress={() => setFontSize((s) => s + 2)}>
            <Ionicons name="add-circle-outline" size={22} color={fg} />
          </TouchableOpacity>
        </View>

        {!selectedBook && renderTiles(books, setSelectedBook)}

        {selectedBook && selectedChapter === null && (
          <>
            <View style={styles.clearRow}>
              <Text style={[styles.sectionTitle, { color: fg }]}>Select Chapter - {selectedBook}</Text>
              <TouchableOpacity onPress={reset}>
                <Ionicons name="close-circle" size={24} color={fg} />
              </TouchableOpacity>
            </View>
            {renderTiles([...Array(50).keys()].map((x) => x + 1), setSelectedChapter)}
          </>
        )}

        {selectedChapter && (
          <>
            <View style={styles.clearRow}>
              <Text style={[styles.sectionTitle, { color: fg }]}>{selectedBook} {selectedChapter}</Text>
              <TouchableOpacity onPress={reset}>
                <Ionicons name="close-circle" size={24} color={fg} />
              </TouchableOpacity>
            </View>

            <View style={styles.chapterNav}>
              <TouchableOpacity onPress={prevChapter}>
                <Text style={{ color: fg }}> Previous</Text>
              </TouchableOpacity>
              <Text style={{ color: fg }}>Chapter {selectedChapter}</Text>
              <TouchableOpacity onPress={nextChapter}>
                <Text style={{ color: fg }}>Next </Text>
              </TouchableOpacity>
            </View>

            {loading ? (
              <ActivityIndicator color={fg} size="large" />
            ) : (
              <View style={[styles.readerBox, { backgroundColor: cardBg }]}>
                {verses.map((verse) => (
                  <View key={verse.verse} style={styles.verseRow}>
                    <Text style={[styles.readerText, { fontSize, color: fg }]}>
                      <Text style={styles.verseNumber}>{verse.verse} </Text>
                      {verse.text.trim()}
                    </Text>
                    <View style={styles.verseIcons}>
                      <TouchableOpacity onPress={() => Clipboard.setStringAsync(verse.text)}>
                        <Ionicons name="copy-outline" size={20} color={fg} />
                      </TouchableOpacity>
                      <TouchableOpacity onPress={() => handleShare(verse.text)}>
                        <Ionicons name="share-social-outline" size={20} color={fg} />
                      </TouchableOpacity>
                    </View>
                  </View>
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
  container: { padding: 16 },
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  header: {
    fontSize: 28,
    fontWeight: 'bold',
  },
  suggestedBox: {
    padding: 12,
    borderRadius: 8,
    marginBottom: 16,
  },
  suggestedLabel: { fontWeight: '600', marginBottom: 4 },
  suggestedText: { fontStyle: 'italic' },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 10,
    paddingHorizontal: 12,
    marginBottom: 16,
  },
  searchBar: { flex: 1, paddingVertical: 10 },
  toggleRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 12,
    alignItems: 'center',
  },
  toggleButton: {
    paddingVertical: 6,
    paddingHorizontal: 12,
    backgroundColor: '#1C223C',
    borderRadius: 8,
  },
  toggleActive: {
    backgroundColor: '#4263EB',
  },
  toggleText: {
    color: '#aaa',
  },
  toggleTextActive: {
    color: '#fff',
    fontWeight: '600',
  },
  fontControls: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 12,
    marginBottom: 12,
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
    paddingVertical: 14,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  tileText: {
    fontWeight: '500',
    textAlign: 'center',
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
  },
  clearRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  readerBox: {
    padding: 16,
    borderRadius: 10,
  },
  readerText: {
    lineHeight: 26,
  },
  verseRow: {
    marginBottom: 12,
  },
  verseIcons: {
    flexDirection: 'row',
    gap: 12,
    marginTop: 4,
  },
  verseNumber: {
    fontWeight: 'bold',
    color: '#9baaf7',
  },
  chapterNav: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
});

export default BibleScreen;