import React from 'react';
import { View, Text, ScrollView, StyleSheet, Dimensions } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';

const { width } = Dimensions.get('window');

const TravelDiary = () => {
  const collections = [
    {
      id: 1,
      title: '포항 구룡포',
      description: '한강 작가의 소설 배경지',
      collected: true,
      icon: 'map-marked-alt',
    },
    {
      id: 2,
      title: '제주도',
      description: '영화 촬영지',
      collected: true,
      icon: 'map-marked-alt',
    },
    {
      id: 3,
      title: '부산 감천문화마을',
      description: '부산의 대표 문화마을',
      collected: false,
      icon: 'map-marked-alt',
    },
    {
      id: 4,
      title: '경주',
      description: '신라 문화의 정수',
      collected: false,
      icon: 'map-marked-alt',
    },
    {
      id: 5,
      title: '전주 한옥마을',
      description: '전통 한옥의 아름다움',
      collected: false,
      icon: 'map-marked-alt',
    },
    {
      id: 6,
      title: '여수 돌산공원',
      description: '아름다운 밤바다',
      collected: false,
      icon: 'map-marked-alt',
    },
  ];

  const collectedCount = collections.filter(c => c.collected).length;
  const totalCount = collections.length;

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>📚 나만의 문학 지도</Text>

      <View style={styles.statsRow}>
        <StatBox label="수집 완료" value={collectedCount.toString()} />
        <StatBox label="전체 장소" value={totalCount.toString()} />
        <StatBox label="달성률" value={`${Math.round((collectedCount / totalCount) * 100)}%`} />
        <StatBox label="연속 방문" value="3" />
      </View>

      <View style={styles.collectionGrid}>
        {collections.map((c) => (
          <View
            key={c.id}
            style={[
              styles.card,
              c.collected && styles.cardCollected
            ]}
          >
            <View style={[styles.badgeIcon, c.collected && styles.badgeCollected]}>
              <Icon name={c.icon} size={24} color="#fff" />
            </View>
            <Text style={styles.cardTitle}>{c.title}</Text>
            <Text style={styles.cardDescription}>{c.description}</Text>
            {c.collected && (
              <Icon name="trophy" size={18} color="#28a745" style={{ marginTop: 8 }} />
            )}
          </View>
        ))}
      </View>
    </ScrollView>
  );
};

const StatBox = ({ label, value }: { label: string; value: string }) => (
  <View style={styles.statBox}>
    <Text style={styles.statValue}>{value}</Text>
    <Text style={styles.statLabel}>{label}</Text>
  </View>
);

const styles = StyleSheet.create({
  container: {
    padding: 16,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 24,
    textAlign: 'center',
  },
  statsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    flexWrap: 'wrap',
    marginBottom: 24,
  },
  statBox: {
    width: width / 2 - 24,
    backgroundColor: '#f1f1f1',
    borderRadius: 12,
    padding: 12,
    alignItems: 'center',
    marginBottom: 12,
  },
  statValue: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#667eea',
  },
  statLabel: {
    fontSize: 13,
    color: '#333',
  },
  collectionGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  card: {
    width: '48%',
    backgroundColor: '#fff',
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    alignItems: 'center',
  },
  cardCollected: {
    borderColor: '#28a745',
    backgroundColor: '#e6f5ec',
  },
  badgeIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: '#667eea',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 12,
  },
  badgeCollected: {
    backgroundColor: '#28a745',
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: '600',
    textAlign: 'center',
  },
  cardDescription: {
    fontSize: 12,
    color: '#666',
    textAlign: 'center',
    marginTop: 4,
  },
});

export default TravelDiary;
