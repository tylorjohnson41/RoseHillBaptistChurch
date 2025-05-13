import React, { use } from 'react';
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
import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';
import COLORS from './Theme';

export default function HomeScreen({ navigation }) {
  const [avatarURL, setAvatarURL] = useState(null);

  useEffect(() => {
    const fetchUser = async () => {
      const {
        data: { user },
        error: authError,
      } = await supabase.auth.getUser();

      if (authError) {
        console.error('Auth error:', authError.message);
        return;
      }

      if (!user) {
        console.warn('No authenticated user found');
        return;
      }

      const { data: profile, error: profileError } = await supabase
        .from('profiles')
        .select('avatar_url')
        .eq('id', user.id)
        .single();

      if (profileError) {
        console.error('Error fetching profile:', profileError.message);
        return;
      }

      if (profile?.avatar_url) {
        setAvatarURL(profile.avatar_url);
      }
    };

    fetchUser();
  }, []);

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: COLORS.background }}>
      <ScrollView contentContainerStyle={styles.container}>
        <View style={styles.headerRow}>
          <View>
            <Text style={styles.appName}>Rose Hill Baptist Church</Text>
            <Text style={styles.welcome}>Welcome!</Text>
          </View>
          <TouchableOpacity onPress={() => navigation.navigate('Profile')}>
            <Image
              source={require('../assets/Portrait_Placeholder.png')}
              style={styles.avatar}
            />
          </TouchableOpacity>
        </View>

        <Text style={styles.sectionLabel}>SUNDAY SERVICES</Text>
        <View style={styles.videoBox}>
          <Ionicons name="play-circle-outline" size={64} color={COLORS.text} />
        </View>

        <View style={styles.iconRow}>
          <TouchableOpacity style={styles.iconButton}>
            <Ionicons name="play-circle-outline" size={24} color={COLORS.text} />
            <Text style={styles.iconLabel}>Sermons</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.iconButton}>
            <Ionicons name="calendar-outline" size={24} color={COLORS.text} />
            <Text style={styles.iconLabel}>Events</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.iconButton}>
            <Ionicons name="book-outline" size={24} color={COLORS.text} />
            <Text style={styles.iconLabel}>Bible</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.iconButton}>
            <Ionicons name="heart-outline" size={24} color={COLORS.text} />
            <Text style={styles.iconLabel}>Give</Text>
          </TouchableOpacity>
        </View>

        <Text style={styles.sectionLabel}>Latest Sermon</Text>
        <View style={styles.sermonBox}>
          <Text style={styles.sermonText}>Faith Over Fear - Pastor Johnson</Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: COLORS.background,
  },
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  appName: {
    color: COLORS.text,
    fontSize: 14,
    fontWeight: '600',
    marginBottom: 2,
  },
  welcome: {
    color: COLORS.text,
    fontSize: 28,
    fontWeight: 'bold',
  },
  avatar: {
    width: 42,
    height: 42,
    borderRadius: 21,
    borderWidth: 2,
    borderColor: COLORS.accent,
  },
  sectionLabel: {
    color: COLORS.text,
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 10,
  },
  videoBox: {
    height: 160,
    backgroundColor: COLORS.card,
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
    color: COLORS.text,
    marginTop: 6,
    fontSize: 12,
  },
  sermonBox: {
    backgroundColor: COLORS.card,
    borderRadius: 10,
    padding: 16,
  },
  sermonText: {
    color: COLORS.text,
    fontSize: 14,
  },
});
