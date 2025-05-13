import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Animated,
} from 'react-native';
import { Calendar } from 'react-native-calendars';
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
    addedBy: 'me', // placeholder logic
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

  const filteredEvents = allEvents.filter((event) => {
    const matchesDate = selectedDate ? event.date === selectedDate : true;
    const matchesCategory =
      selectedCategory === 'All' || event.category === selectedCategory;
    return matchesDate && matchesCategory;
  });

  const eventsToDisplay =
    selectedTab === 'My'
      ? filteredEvents.filter((e) => e.addedBy === 'me') // Placeholder for real user logic
      : filteredEvents;

  return (
    <ScrollView style={styles.container}>
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
            style={[
              styles.filterButton,
              selectedCategory === cat && styles.activeFilter,
            ]}
            onPress={() => setSelectedCategory(cat)}
          >
            <Text
              style={[
                styles.filterText,
                selectedCategory === cat && styles.activeFilterText,
              ]}
            >
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
    marginBottom: 12,
  },
  tabToggle: {
    flexDirection: 'row',
    alignSelf: 'center',
    backgroundColor: '#1C223C',
    borderRadius: 10,
    marginBottom: 16,
    overflow: 'hidden',
  },
  tabButton: {
    paddingVertical: 8,
    paddingHorizontal: 20,
  },
  tabText: {
    color: '#aaa',
    fontWeight: '500',
  },
  activeTab: {
    backgroundColor: '#4263EB',
  },
  activeTabText: {
    color: '#fff',
  },
  calendar: {
    marginBottom: 20,
    borderRadius: 10,
    overflow: 'hidden',
  },
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
  activeFilter: {
    backgroundColor: '#4263EB',
  },
  filterText: {
    color: '#ccc',
    fontWeight: '500',
  },
  activeFilterText: {
    color: '#fff',
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
  detail: {
    color: '#ccc',
    marginBottom: 4,
  },
  category: {
    color: '#9baaf7',
    fontStyle: 'italic',
    marginTop: 4,
  },
  noEvents: {
    color: '#aaa',
    fontStyle: 'italic',
    textAlign: 'center',
    marginTop: 20,
  },
  clearButton: {
    marginTop: 16,
    padding: 10,
    backgroundColor: '#444',
    borderRadius: 8,
    alignItems: 'center',
  },
  clearButtonText: {
    color: '#fff',
    fontWeight: '600',
  },
});

export default EventsScreen;