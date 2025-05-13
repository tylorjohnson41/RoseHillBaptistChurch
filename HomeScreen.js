import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  ScrollView,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';

export default function HomeScreen({ navigation }) {
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#0D2B45' }}>
      <ScrollView contentContainerStyle={styles.container}>
        <View style={styles.headerRow}>
          <View>
            <Text style={styles.appName}>Rose Hill Baptist Church</Text>
            <Text style={styles.welcome}>Welcome!</Text>
          </View>
          <TouchableOpacity onPress={() => navigation.navigate('Profile')}>
            <Image
              source={require('../assets/Portrait_Placeholder.png')} // this is a placeholder image
              style={styles.avatar}
            />
          </TouchableOpacity>
        </View>

        <Text style={styles.sectionLabel}>SUNDAY SERVICES</Text>
        <View style={styles.videoBox}>
          <Ionicons name="play-circle-outline" size={64} color="#fff" />
        </View>

        <View style={styles.iconRow}>
          <TouchableOpacity style={styles.iconButton}>
            <Ionicons name="play-circle-outline" size={24} color="#fff" />
            <Text style={styles.iconLabel}>Sermons</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.iconButton}>
            <Ionicons name="calendar-outline" size={24} color="#fff" />
            <Text style={styles.iconLabel}>Events</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.iconButton}>
            <Ionicons name="book-outline" size={24} color="#fff" />
            <Text style={styles.iconLabel}>Bible</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.iconButton}>
            <Ionicons name="heart-outline" size={24} color="#fff" />
            <Text style={styles.iconLabel}>Give</Text>
          </TouchableOpacity>
        </View>

        <Text style={styles.sectionLabel}>Latest Sermon</Text>
        <View style={styles.sermonBox}>
          <Text style={styles.sermonText}>“Faith Over Fear” - Pastor Johnson</Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  appName: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '600',
    marginBottom: 2,
  },
  welcome: {
    color: '#fff',
    fontSize: 28,
    fontWeight: 'bold',
  },
  avatar: {
    width: 42,
    height: 42,
    borderRadius: 21,
    borderWidth: 2,
    borderColor: '#fff',
  },
  sectionLabel: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 10,
  },
  videoBox: {
    height: 160,
    backgroundColor: '#143554',
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
  },
  iconRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  iconButton: {
    alignItems: 'center',
    flex: 1,
  },
  iconLabel: {
    color: '#fff',
    marginTop: 6,
    fontSize: 12,
  },
  sermonBox: {
    backgroundColor: '#143554',
    borderRadius: 10,
    padding: 16,
  },
  sermonText: {
    color: '#fff',
    fontSize: 14,
  },
});
