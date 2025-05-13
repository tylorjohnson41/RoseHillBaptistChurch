import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TextInput,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';

const BibleScreen = () => {
  const [search, setSearch] = useState('');
  const [selectedBook, setSelectedBook] = useState('');
  const [selectedChapter, setSelectedChapter] = useState('');
  const [verses, setVerses] = useState([]);
  const [loading, setLoading] = useState(false);

  const books = ['Genesis', 'Exodus', 'John', 'Matthew', 'Psalms'];

  useEffect(() => {
    if (selectedBook && selectedChapter) {
      fetchChapter();
    }
  }, [selectedBook, selectedChapter]);

  const fetchChapter = async () => {
    setLoading(true);
    try {
      const response = await fetch(`https://bible-api.com/${selectedBook}+${selectedChapter}`);
      const data = await response.json();
      if (data.verses) {
        setVerses(data.verses);
      } else {
        setVerses([]);
      }
    } catch (error) {
      console.error('Error fetching Bible text:', error);
      setVerses([]);
    }
    setLoading(false);
  };

  const clearSelection = () => {
    setSelectedBook('');
    setSelectedChapter('');
    setVerses([]);
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#0A0F24' }}>
      <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.header}>Bible</Text>

        {!selectedBook && (
          <>
            <Text style={styles.sectionTitle}>Verse of the Day</Text>
            <View style={styles.verseBox}>
              <Text style={styles.verseText}>
                "Your word is a lamp to my feet and a light to my path." - Psalm 119:105
              </Text>
            </View>
          </>
        )}

        <TextInput
          placeholder="Search a verse (e.g. John 3:16)"
          placeholderTextColor="#aaa"
          style={styles.searchBar}
          value={search}
          onChangeText={setSearch}
        />

        {!selectedBook && (
          <>
            <Text style={styles.sectionTitle}>Books of the Bible</Text>
            <ScrollView horizontal showsHorizontalScrollIndicator={false}>
              {books.map((book) => (
                <TouchableOpacity
                  key={book}
                  style={styles.bookButton}
                  onPress={() => setSelectedBook(book)}
                >
                  <Text style={styles.bookText}>{book}</Text>
                </TouchableOpacity>
              ))}
            </ScrollView>
          </>
        )}

        {selectedBook && !selectedChapter && (
          <>
            <View style={styles.clearRow}>
              <Text style={styles.sectionTitle}>Select a Chapter - {selectedBook}</Text>
              <TouchableOpacity onPress={clearSelection}>
                <Ionicons name="close-circle" size={24} color="#fff" />
              </TouchableOpacity>
            </View>
            <View style={styles.chapterList}>
              {[...Array(10).keys()].map((i) => (
                <TouchableOpacity
                  key={i + 1}
                  style={styles.chapterButton}
                  onPress={() => setSelectedChapter(i + 1)}
                >
                  <Text style={styles.chapterText}>{i + 1}</Text>
                </TouchableOpacity>
              ))}
            </View>
          </>
        )}

        {selectedBook && selectedChapter && (
          <>
            <View style={styles.clearRow}>
              <Text style={styles.sectionTitle}>
                {selectedBook} {selectedChapter}
              </Text>
              <TouchableOpacity onPress={clearSelection}>
                <Ionicons name="close-circle" size={24} color="#fff" />
              </TouchableOpacity>
            </View>
            {loading ? (
              <ActivityIndicator color="#fff" size="large" style={{ marginTop: 20 }} />
            ) : (
              <View style={styles.readerBox}>
                {verses.map((verse) => (
                  <Text key={verse.verse} style={styles.readerText}>
                    <Text style={styles.verseNumber}>{verse.verse} </Text>
                    {verse.text.trim()}
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
  container: { padding: 16 },
  header: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 20,
    textAlign: 'center',
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#fff',
    marginBottom: 10,
  },
  searchBar: {
    backgroundColor: '#1C223C',
    padding: 12,
    borderRadius: 10,
    color: '#fff',
    marginBottom: 20,
  },
  verseBox: {
    backgroundColor: '#1C223C',
    padding: 16,
    borderRadius: 10,
    marginBottom: 20,
  },
  verseText: { color: '#ccc', fontStyle: 'italic' },
  bookButton: {
    backgroundColor: '#1C223C',
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 20,
    marginRight: 10,
  },
  bookText: { color: '#fff' },
  chapterList: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
    marginBottom: 20,
  },
  chapterButton: {
    backgroundColor: '#4263EB',
    padding: 10,
    borderRadius: 6,
    margin: 4,
  },
  chapterText: { color: '#fff' },
  clearRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  readerBox: {
    backgroundColor: '#1C223C',
    padding: 16,
    borderRadius: 10,
  },
  readerText: {
    color: '#fff',
    lineHeight: 26,
    marginBottom: 8,
    fontSize: 16,
  },
  verseNumber: {
    fontWeight: 'bold',
    color: '#9baaf7',
  },
});

export default BibleScreen;