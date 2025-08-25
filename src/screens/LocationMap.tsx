import React, { useEffect, useState, useCallback } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Dimensions, ScrollView, Alert } from 'react-native';
import MapView, { Marker, Callout, Region } from 'react-native-maps';
import Geolocation from '@react-native-community/geolocation';
import Icon from 'react-native-vector-icons/FontAwesome';

import bookLocationData from '../data/book_location_event.json';

const { width, height } = Dimensions.get('window');

const defaultCenter = { latitude: 37.5665, longitude: 126.9780 };

const locationCoordinates: Record<string, { latitude: number; longitude: number }> = {
  '서울': { latitude: 37.5665, longitude: 126.9780 },
  '제주도': { latitude: 33.4996, longitude: 126.5312 },
  '포항 구룡포': { latitude: 36.1194, longitude: 129.5519 },
  '대한민국 광주광역시': { latitude: 35.1595, longitude: 126.8526 },
  '전라남도 여수, 순천, 벌교': { latitude: 34.7604, longitude: 127.6622 },
  '경상남도 하동 평사리': { latitude: 35.0671, longitude: 127.7507 },
  '하얼빈': { latitude: 45.8038, longitude: 126.5350 },
  '남한산성': { latitude: 37.4794, longitude: 127.1836 },
  '멕시코 유카탄 반도': { latitude: 20.6843, longitude: -88.5678 },
  '대한민국 서울': { latitude: 37.5665, longitude: 126.9780 },
  // 필요시 추가
};

type MarkerType = {
  id: number;
  latitude: number;
  longitude: number;
  title: string;
  location: string;
  event: string;
};

type BookSearchResult = {
  title: string;
  location: string;
  event: string;
};

const LocationMap = () => {
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [searchResult, setSearchResult] = useState<BookSearchResult | null>(null);
  const [selectedMarker, setSelectedMarker] = useState<MarkerType | null>(null);
  const [mapRegion, setMapRegion] = useState<Region>({
    ...defaultCenter,
    latitudeDelta: 0.05,
    longitudeDelta: 0.05,
  });
  const [userLocation, setUserLocation] = useState<{ latitude: number; longitude: number } | null>(null);
  const [markers, setMarkers] = useState<MarkerType[]>([]);

  useEffect(() => {
    Geolocation.getCurrentPosition(
      pos => {
        const coords = {
          latitude: pos.coords.latitude,
          longitude: pos.coords.longitude,
        };
        setUserLocation(coords);
        setMapRegion({ ...coords, latitudeDelta: 0.05, longitudeDelta: 0.05 });
      },
      error => {
        console.warn('위치 접근 불가:', error);
      },
      { enableHighAccuracy: true, timeout: 15000 }
    );
  }, []);

  const searchBook = useCallback((title: string): BookSearchResult | null => {
    const bookData = (bookLocationData as Record<string, { location: string; event: string }[]>)[title];
    if (bookData && bookData.length > 0) {
      const locationData = bookData[0];
      const coords = locationCoordinates[locationData.location];

      if (coords) {
        const marker: MarkerType = {
          id: 1,
          ...coords,
          title,
          location: locationData.location,
          event: locationData.event,
        };

        setMapRegion({ ...coords, latitudeDelta: 0.05, longitudeDelta: 0.05 });
        setMarkers([marker]);

        return {
          title,
          location: locationData.location,
          event: locationData.event,
        };
      } else {
        Alert.alert('위치 오류', `해당 장소 좌표가 없습니다: ${locationData.location}`);
      }
    } else {
      Alert.alert('검색 결과 없음', '해당 도서의 위치 정보를 찾을 수 없습니다.');
    }

    return null;
  }, []);

  const handleSearch = () => {
    const result = searchBook(searchTerm.trim());
    setSearchResult(result);
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>📚 책으로 찾는 문학 여행지</Text>

      <View style={styles.searchBox}>
        <TextInput
          style={styles.input}
          value={searchTerm}
          onChangeText={setSearchTerm}
          placeholder="도서 제목을 입력하세요"
        />
        <TouchableOpacity style={styles.button} onPress={handleSearch}>
          <Icon name="search" size={20} color="#fff" />
        </TouchableOpacity>
      </View>

      <MapView
        style={styles.map}
        region={mapRegion}
        onPress={() => setSelectedMarker(null)}
      >
        {userLocation && (
          <Marker coordinate={userLocation} title="현재 위치" pinColor="blue" />
        )}

        {markers.map(marker => (
          <Marker
            key={marker.id}
            coordinate={{ latitude: marker.latitude, longitude: marker.longitude }}
            onPress={() => setSelectedMarker(marker)}
          >
            <Callout>
              <Text>{marker.title}</Text>
              <Text>{marker.location}</Text>
              <Text>{marker.event}</Text>
            </Callout>
          </Marker>
        ))}
      </MapView>

      {searchResult && (
        <View style={styles.resultBox}>
          <Text style={styles.resultTitle}>{searchResult.title}</Text>
          <Text>📍 {searchResult.location}</Text>
          <Text>{searchResult.event}</Text>
        </View>
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, backgroundColor: '#fff' },
  title: { fontSize: 22, fontWeight: 'bold', marginBottom: 16, textAlign: 'center' },
  searchBox: { flexDirection: 'row', marginBottom: 16 },
  input: { flex: 1, borderColor: '#ccc', borderWidth: 1, borderRadius: 8, padding: 12 },
  button: { marginLeft: 8, backgroundColor: '#667eea', borderRadius: 8, padding: 12 },
  map: { width: '100%', height: height * 0.4, marginBottom: 16 },
  resultBox: { padding: 16, backgroundColor: '#f1f1f1', borderRadius: 8 },
  resultTitle: { fontSize: 18, fontWeight: 'bold', marginBottom: 8 },
});

export default LocationMap;
