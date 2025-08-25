import React from 'react';
import { View, Text, ScrollView, StyleSheet, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';

export default function CulturalEvents() {
  const events = [
    {
      id: 1,
      title: '한강 작가 북토크',
      date: '2024.01.15',
      location: '부산 해운대',
      description: '동백꽃 필 무렵의 배경지에서 한강 작가와 함께하는 특별한 북토크',
      book: '동백꽃 필 무렵',
      icon: 'book',
    },
    {
      id: 2,
      title: '문학 기행 전시',
      date: '2024.01.20',
      location: '서울 종로',
      description: '한국 현대문학의 배경지를 찾아 떠나는 문학 기행 전시',
      book: '다양한 작품',
      icon: 'theater-masks',
    },
    {
      id: 3,
      title: '건축학개론 촬영지 투어',
      date: '2024.01.25',
      location: '전주 한옥마을',
      description: '건축학개론 촬영지를 돌아보는 특별 투어',
      book: '건축학개론',
      icon: 'map-marked-alt',
    },
    {
      id: 4,
      title: '부산 밤바다 시 낭송회',
      date: '2024.02.01',
      location: '부산 광안리',
      description: '부산의 밤바다를 배경으로 한 시 낭송회',
      book: '부산행',
      icon: 'theater-masks',
    },
    {
      id: 5,
      title: '전주 한옥마을 작가 사인회',
      date: '2024.02.05',
      location: '전주 한옥마을',
      description: '전통 한옥에서 만나는 작가 사인회',
      book: '전주 한옥마을 이야기',
      icon: 'book',
    },
    {
      id: 6,
      title: '여수 밤바다 문학 콘서트',
      date: '2024.02.10',
      location: '여수 돌산공원',
      description: '여수 밤바다를 배경으로 한 문학 콘서트',
      book: '여수 밤바다',
      icon: 'theater-masks',
    },
  ];

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>📅 문화행사 & 이벤트</Text>

      {events.map((event) => (
        <View key={event.id} style={styles.card}>
          <View style={styles.header}>
            <Icon name={event.icon} size={30} color="#667eea" style={styles.headerIcon} />
            <Text style={styles.eventTitle}>{event.title}</Text>
          </View>

          <Text style={styles.info}><Icon name="calendar-alt" /> {event.date}</Text>
          <Text style={styles.info}><Icon name="map-marked-alt" /> {event.location}</Text>
          <Text style={styles.info}><Icon name="book" /> {event.book}</Text>

          <Text style={styles.description}>{event.description}</Text>

          <View style={styles.actions}>
            <TouchableOpacity style={styles.primaryButton}>
              <Icon name="heart" size={14} color="white" />
              <Text style={styles.primaryButtonText}> 관심</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.secondaryButton}>
              <Icon name="share-alt" size={14} color="#667eea" />
              <Text style={styles.secondaryButtonText}> 공유</Text>
            </TouchableOpacity>
          </View>
        </View>
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#eef2ff',
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#4c51bf',
    marginBottom: 20,
    textAlign: 'center',
  },
  card: {
    backgroundColor: 'white',
    borderRadius: 16,
    padding: 20,
    marginBottom: 20,
    elevation: 3,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  headerIcon: {
    marginRight: 10,
  },
  eventTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  info: {
    fontSize: 13,
    color: '#555',
    marginBottom: 4,
  },
  description: {
    fontSize: 14,
    color: '#666',
    marginTop: 10,
  },
  actions: {
    flexDirection: 'row',
    marginTop: 16,
    justifyContent: 'flex-start',
    gap: 12,
  },
  primaryButton: {
    backgroundColor: '#667eea',
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 20,
    flexDirection: 'row',
    alignItems: 'center',
  },
  primaryButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
  secondaryButton: {
    borderWidth: 1,
    borderColor: '#667eea',
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 20,
    flexDirection: 'row',
    alignItems: 'center',
  },
  secondaryButtonText: {
    color: '#667eea',
    fontWeight: 'bold',
  },
});

