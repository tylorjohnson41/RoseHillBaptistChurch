import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Animated,
  Modal,
  TextInput,
  Alert,
} from 'react-native';
import { Calendar } from 'react-native-calendars';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';

const categories = ['All', 'Youth', 'Bible Study', 'Outreach'];

const allEvents = [
  {
    id: 1,
    title: 'Youth Revival Night',
    date: '2025-05-15',
    time: '6:00 PM',
    location: 'Sanctuary',
    category: 'Youth',
    addedBy: 'me',
  },
  {
    id: 2,
    title: 'Women’s Bible Study',
    date: '2025-05-16',
    time: '7:00 PM',
    location: 'Room B2',
    category: 'Bible Study',
  },
  {
    id: 3,
    title: 'Community Outreach Day',
    date: '2025-05-18',
    time: '10:00 AM',
    location: 'Fellowship Hall',
    category: 'Outreach',
  },
];

const EventsScreen = () => {
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedTab, setSelectedTab] = useState('All');
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [form, setForm] = useState({
    name: '',
    email: '',
    phone: '',
    kids: '',
  });

  const filteredEvents = allEvents.filter((event) => {
    const matchesDate = selectedDate ? event.date === selectedDate : true;
    const matchesCategory =
      selectedCategory === 'All' || event.category === selectedCategory;
    return matchesDate && matchesCategory;
  });

  const eventsToDisplay =
    selectedTab === 'My'
      ? filteredEvents.filter((e) => e.addedBy === 'me')
      : filteredEvents;

  const handleRegister = () => {
    setModalVisible(false);
    Alert.alert('Registered', `You registered for ${selectedEvent?.title}`);
    setForm({ name: '', email: '', phone: '', kids: '' });
  };

  return (
    <SafeAreaView style={{ flex: 1,  backgroundColor: '#0A0F24'}}>
    <ScrollView contentContainerStyle={styles.container}>
  
      <Text style={styles.header}>Church Events</Text>

      {/* Toggle Tabs */}
      <View style={styles.tabToggle}>
        <TouchableOpacity
          style={[styles.tabButton, selectedTab === 'All' && styles.activeTab]}
          onPress={() => setSelectedTab('All')}
        >
          <Text style={[styles.tabText, selectedTab === 'All' && styles.activeTabText]}>
            All Events
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.tabButton, selectedTab === 'My' && styles.activeTab]}
          onPress={() => setSelectedTab('My')}
        >
          <Text style={[styles.tabText, selectedTab === 'My' && styles.activeTabText]}>
            My Events
          </Text>
        </TouchableOpacity>
      </View>

      {/* Calendar */}
      <Calendar
        onDayPress={(day) => setSelectedDate(day.dateString)}
        markedDates={{
          [selectedDate]: {
            selected: true,
            selectedColor: '#4263EB',
          },
        }}
        theme={{
          backgroundColor: '#0A0F24',
          calendarBackground: '#0A0F24',
          dayTextColor: '#ffffff',
          monthTextColor: '#ffffff',
          arrowColor: '#ffffff',
          todayTextColor: '#4263EB',
        }}
        style={styles.calendar}
      />

      {/* Category Filters */}
      <View style={styles.filters}>
        {categories.map((cat) => (
          <TouchableOpacity
            key={cat}
            style={[styles.filterButton, selectedCategory === cat && styles.activeFilter]}
            onPress={() => setSelectedCategory(cat)}
          >
            <Text style={[styles.filterText, selectedCategory === cat && styles.activeFilterText]}>
              {cat}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* Event Cards */}
      {eventsToDisplay.length > 0 ? (
        eventsToDisplay.map((event) => (
          <Animated.View key={event.id} style={styles.card}>
            <View style={styles.cardHeader}>
              <Ionicons name="calendar-outline" size={20} color="#fff" />
              <Text style={styles.title}>{event.title}</Text>
            </View>
            <Text style={styles.detail}>
              {event.date} at {event.time}
            </Text>
            <Text style={styles.detail}>Location: {event.location}</Text>
            <Text style={styles.category}>{event.category}</Text>
            <TouchableOpacity
              style={styles.interestButton}
              onPress={() => {
                setSelectedEvent(event);
                setModalVisible(true);
              }}
            >
              <Text style={styles.interestText}>Interested?</Text>
            </TouchableOpacity>
          </Animated.View>
        ))
      ) : (
        <Text style={styles.noEvents}>No events found on this day.</Text>
      )}

      {/* Clear Selection */}
      {(selectedDate || selectedCategory !== 'All') && (
        <TouchableOpacity
          onPress={() => {
            setSelectedDate('');
            setSelectedCategory('All');
          }}
          style={styles.clearButton}
        >
          <Text style={styles.clearButtonText}>Clear Selection</Text>
        </TouchableOpacity>
      )}

      {/* Modal */}
      <Modal visible={modalVisible} animationType="slide" transparent>
        <View style={styles.modalOverlay}>
          <View style={styles.modalContainer}>
            <Text style={styles.modalHeader}>Register for {selectedEvent?.title}</Text>
            {['name', 'email', 'phone', 'kids'].map((field) => (
              <TextInput
                key={field}
                placeholder={field.charAt(0).toUpperCase() + field.slice(1)}
                placeholderTextColor="#aaa"
                style={styles.input}
                value={form[field]}
                onChangeText={(text) => setForm((prev) => ({ ...prev, [field]: text }))}
              />
            ))}
            <TouchableOpacity style={styles.submitButton} onPress={handleRegister}>
              <Text style={styles.submitText}>Submit</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => setModalVisible(false)}>
              <Text style={{ color: '#fff', marginTop: 12, textAlign: 'center' }}>Cancel</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#0A0F24', padding: 16 },
  header: { fontSize: 24, color: '#fff', fontWeight: '700', marginBottom: 12 },
  tabToggle: {
    flexDirection: 'row',
    alignSelf: 'center',
    backgroundColor: '#1C223C',
    borderRadius: 10,
    marginBottom: 16,
    overflow: 'hidden',
  },
  tabButton: { paddingVertical: 8, paddingHorizontal: 20 },
  tabText: { color: '#aaa', fontWeight: '500' },
  activeTab: { backgroundColor: '#4263EB' },
  activeTabText: { color: '#fff' },
  calendar: { marginBottom: 20, borderRadius: 10, overflow: 'hidden' },
  filters: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: 16,
    gap: 10,
  },
  filterButton: {
    paddingVertical: 6,
    paddingHorizontal: 14,
    borderRadius: 20,
    backgroundColor: '#1C223C',
  },
  activeFilter: { backgroundColor: '#4263EB' },
  filterText: { color: '#ccc', fontWeight: '500' },
  activeFilterText: { color: '#fff' },
  card: {
    backgroundColor: '#1C223C',
    borderRadius: 10,
    padding: 16,
    marginBottom: 16,
  },
  cardHeader: { flexDirection: 'row', alignItems: 'center', marginBottom: 8 },
  title: { fontSize: 18, color: '#fff', fontWeight: '600', marginLeft: 8 },
  detail: { color: '#ccc', marginBottom: 4 },
  category: { color: '#9baaf7', fontStyle: 'italic', marginTop: 4 },
  noEvents: {
    color: '#aaa',
    fontStyle: 'italic',
    textAlign: 'center',
    marginTop: 20,
  },
  interestButton: {
    marginTop: 10,
    backgroundColor: '#4263EB',
    padding: 10,
    borderRadius: 8,
    alignItems: 'center',
  },
  interestText: { color: '#fff', fontWeight: '600' },
  clearButton: {
    marginTop: 16,
    padding: 10,
    backgroundColor: '#444',
    borderRadius: 8,
    alignItems: 'center',
  },
  clearButtonText: { color: '#fff', fontWeight: '600' },
  modalOverlay: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: 'rgba(0,0,0,0.6)',
    padding: 20,
  },
  modalContainer: {
    backgroundColor: '#1C223C',
    borderRadius: 10,
    padding: 20,
  },
  modalHeader: { color: '#fff', fontSize: 18, fontWeight: 'bold', marginBottom: 12 },
  input: {
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 6,
    padding: 10,
    color: '#fff',
    marginBottom: 10,
  },
  submitButton: {
    backgroundColor: '#4263EB',
    paddingVertical: 10,
    borderRadius: 8,
    alignItems: 'center',
  },
  submitText: { color: '#fff', fontWeight: '600' },
});

export default EventsScreen;