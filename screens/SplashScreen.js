import React from 'react';
import {
  View,
  Text,
  Image,
  ActivityIndicator,
  StyleSheet,
  Dimensions,
} from 'react-native';

export default function SplashScreen() {
  return (
    <View style={styles.container}>
      {/* Logo and Title Section */}
      <View style={styles.centerContent}>
        <Image source={require('../assets/logo.jpg')} style={styles.logo} />
        <Text style={styles.title}>eHunar Online Course</Text>
        <ActivityIndicator size="large" color="#6A0DAD" style={{ marginTop: 25 }} />
      </View>

      {/* Footer */}
      <View>
       <Text style={styles.footer}>© 2025 eHunar. www.ehunar.com</Text>
      </View>
    </View>
  );
}

const { width } = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F3E5F5',  // same as LoginScreen bg
    justifyContent: 'space-between',
    paddingVertical: 40,
    paddingHorizontal: 20,
  },
  centerContent: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
    paddingVertical: 50,
    paddingHorizontal: 20,
    // backgroundColor and shadows removed to avoid white box below logo/title
  },
  logo: {
    width: 120,
    height: 120,
    borderRadius: 60,
    marginBottom: 20,
    borderWidth: 3,
    borderColor: '#6A0DAD',
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#6A0DAD',
    textAlign: 'center',
    letterSpacing: 1,
  },
 
  footer: {
    color: '#6A0DAD',
    fontSize: 15,
    textAlign: 'center',
  },
});
