import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, ActivityIndicator, ScrollView, StyleSheet } from 'react-native';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

const searchBook = async (bookTitle: string) => {
  const response = await axios.get(`http://localhost:8000/search_book?book_title=${encodeURIComponent(bookTitle)}`);
  return response.data;
};

export default function BookSearch() {
  const [searchTerm, setSearchTerm] = useState('');
  const [isSearching, setIsSearching] = useState(false);

  const { data, isLoading, error, refetch } = useQuery({
    queryKey: ['bookSearch', searchTerm],
    queryFn: () => searchBook(searchTerm),
    enabled: false,
  });

  const handleSearch = async () => {
    if (!searchTerm.trim()) return;
    setIsSearching(true);
    try {
      await refetch();
    } finally {
      setIsSearching(false);
    }
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>📚 도서 기반 여행 추천</Text>

      <View style={styles.inputRow}>
        <TextInput
          style={styles.input}
          placeholder="도서 제목을 입력하세요"
          value={searchTerm}
          onChangeText={setSearchTerm}
        />
        <TouchableOpacity
          style={[styles.button, (!searchTerm.trim() || isSearching) && styles.buttonDisabled]}
          onPress={handleSearch}
          disabled={isSearching || !searchTerm.trim()}
        >
          <Text style={styles.buttonText}>{isSearching ? '검색 중...' : '검색'}</Text>
        </TouchableOpacity>
      </View>

      {isLoading && <ActivityIndicator size="large" color="#667eea" style={{ marginTop: 40 }} />}

      {error && (
        <Text style={styles.error}>
          검색 중 오류가 발생했습니다. 다시 시도해주세요.
        </Text>
      )}

      {data && (
        <View style={styles.resultCard}>
          <Text style={styles.bookTitle}>📖 {data.book}</Text>

          {data.location ? (
            <View style={styles.locationBox}>
              <Text style={styles.locationTitle}>📍 관련 장소: {data.location}</Text>
              {data.event && <Text style={styles.event}>{data.event}</Text>}
            </View>
          ) : (
            <Text style={styles.noResult}>❗ 관련 장소 정보가 없습니다.</Text>
          )}

          {data.tour_sites && data.tour_sites.length > 0 && (
            <View style={styles.tourSection}>
              <Text style={styles.tourTitle}>🎯 주변 관광지 추천</Text>
              {data.tour_sites.map((site: any, idx: number) => (
                <View key={idx} style={styles.tourCard}>
                  <Text style={styles.tourName}>{site.title || site.name}</Text>
                  {site.addr1 && <Text style={styles.tourInfo}>📍 {site.addr1}</Text>}
                  {site.tel && <Text style={styles.tourInfo}>📞 {site.tel}</Text>}
                </View>
              ))}
            </View>
          )}
        </View>
      )}
    </ScrollView>
  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#eef2ff',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginVertical: 24,
    textAlign: 'center',
    color: '#4c51bf',
  },
  inputRow: {
    flexDirection: 'row',
    marginBottom: 20,
  },
  input: {
    flex: 1,
    padding: 12,
    borderRadius: 10,
    backgroundColor: '#fff',
    borderColor: '#ccc',
    borderWidth: 1,
    marginRight: 8,
  },
  button: {
    paddingVertical: 12,
    paddingHorizontal: 16,
    backgroundColor: '#667eea',
    borderRadius: 10,
    justifyContent: 'center',
  },
  buttonDisabled: {
    backgroundColor: '#bbb',
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  error: {
    color: '#e74c3c',
    backgroundColor: '#fdf2f2',
    padding: 16,
    borderRadius: 8,
    marginVertical: 20,
    textAlign: 'center',
  },
  resultCard: {
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 16,
    elevation: 4,
    marginBottom: 40,
  },
  bookTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  locationBox: {
    backgroundColor: '#f0f4ff',
    padding: 16,
    borderRadius: 12,
    marginBottom: 16,
  },
  locationTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#5a67d8',
    marginBottom: 8,
  },
  event: {
    color: '#333',
  },
  noResult: {
    textAlign: 'center',
    color: '#888',
    marginTop: 20,
  },
  tourSection: {
    marginTop: 24,
  },
  tourTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 12,
    color: '#333',
  },
  tourCard: {
    padding: 12,
    borderWidth: 1,
    borderColor: '#e1e5e9',
    borderRadius: 10,
    marginBottom: 12,
    backgroundColor: '#fff',
  },
  tourName: {
    fontWeight: 'bold',
    fontSize: 15,
    marginBottom: 4,
  },
  tourInfo: {
    fontSize: 13,
    color: '#555',
  },
});
