import React from 'react';
import {
  StyleSheet,
  View,
  Text,
} from 'react-native';

export default function Header() {
  return (
    <View style={styles.header}>
      <Text style={styles.title}>ToDo</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  title: {
    paddingTop: 4,
    textAlign: 'left',
    fontSize: 24,
    color: '#fff',
    fontWeight: 'bold',
    paddingLeft: 16
  },
  header: {
    height: 40,
    backgroundColor: '#0037ff'
  }
});

// export default Header;
