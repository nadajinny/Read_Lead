import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function Header() {
  return (
    <View style={styles.header}>
      <Text style={styles.title}>📚 문학 지도 앱</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    paddingTop: 40,
    paddingBottom: 10,
    backgroundColor: '#764ba2',
    alignItems: 'center',
  },
  title: {
    fontSize: 20,
    color: 'white',
  },
});
