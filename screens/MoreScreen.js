import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Linking,
  Alert,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';

const MoreScreen = ({ navigation }) => {
  const handlePress = (label) => {
    switch (label) {
      case 'About Us':
        // navigation.navigate('AboutScreen'); // Uncomment if screen exists
        Alert.alert('About Us', 'This would show info about the church.');
        break;
      case 'Prayer Request':
        Alert.prompt('Prayer Request', 'What would you like us to pray for?');
        break;
      case 'Join a Ministry':
        Alert.alert('Join a Ministry', 'This would show a form or list of ministries.');
        break;
      case 'Newsletter':
        Linking.openURL('https://yourchurch.org/newsletter');
        break;
      case 'Facebook':
        Linking.openURL('https://www.facebook.com/share/16TJWrXR1a/?mibextid=wwXIfr');
        break;
      case 'Settings':
        Alert.alert('Settings', 'This could toggle dark mode or app preferences.');
        break;
      default:
        Alert.alert(label, 'Tapped!');
    }
  };

  const items = [
    { label: 'About Us', icon: 'information-circle-outline' },
    { label: 'Prayer Request', icon: 'chatbubble-ellipses-outline' },
    { label: 'Join a Ministry', icon: 'people-outline' },
    { label: 'Newsletter', icon: 'newspaper-outline' },
    { label: 'Facebook', icon: 'logo-facebook' },
    { label: 'Settings', icon: 'settings-outline' },
  ];

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#0A0F24'}}>
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.header}>More</Text>
      {items.map((item, index) => (
        <TouchableOpacity
          key={index}
          style={styles.card}
          onPress={() => handlePress(item.label)}
        >
          <Ionicons name={item.icon} size={22} color="#fff" style={styles.icon} />
          <Text style={styles.label}>{item.label}</Text>
        </TouchableOpacity>
      ))}
    </ScrollView>
    </SafeAreaView>
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
    marginBottom: 16,
  },
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#1C223C',
    borderRadius: 10,
    padding: 14,
    marginBottom: 12,
  },
  icon: {
    marginRight: 12,
  },
  label: {
    fontSize: 16,
    color: '#fff',
    fontWeight: '500',
  },
});

export default MoreScreen;