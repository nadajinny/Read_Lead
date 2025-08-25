// src/screens/HomeScreen.tsx

import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../types/navigation';

type NavigationProp = NativeStackNavigationProp<RootStackParamList>;

const HomeScreen = () => {
  const navigation = useNavigation<NavigationProp>();

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Read & Lead</Text>
      <Text style={styles.subtitle}>책을 기반으로 한 테마 여행 & 문화 체험 플랫폼</Text>

      <TouchableOpacity
        style={styles.card}
        onPress={() => navigation.navigate('BookSearch')}>
        <Text style={styles.cardText}>📚 도서 기반 AI 여행 큐레이션</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.card}
        onPress={() => navigation.navigate('LocationMap')}>
        <Text style={styles.cardText}>📍 위치 기반 문학 체험</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.card}
        onPress={() => navigation.navigate('TravelDiary')}>
        <Text style={styles.cardText}>🗺️ 책-도시 수집형 지도</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.card}
        onPress={() => navigation.navigate('CulturalEvents')}>
        <Text style={styles.cardText}>🎭 문화행사 연계</Text>
      </TouchableOpacity>
    </View>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1, padding: 24, backgroundColor: '#fff',
  },
  title: {
    fontSize: 32, fontWeight: 'bold', textAlign: 'center', marginBottom: 12,
  },
  subtitle: {
    fontSize: 16, textAlign: 'center', marginBottom: 24,
  },
  card: {
    padding: 20,
    borderRadius: 12,
    backgroundColor: '#f0f0f0',
    marginBottom: 16,
  },
  cardText: {
    fontSize: 16,
  },
});
