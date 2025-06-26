import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';

const CertificateScreen = ({ route }) => {
  const { score, courseName } = route.params;

  return (
    <View style={styles.wrapper}>
      <View style={styles.card}>
        {/* Trophy Icon */}
        <Text style={styles.icon}>🏆</Text>

        {/* Logo Image */}
        <Image source={require('../assets/logo.jpg')} style={styles.logo} />

        {/* Divider Line */}
        <View style={styles.divider} />

        {/* Certificate Title */}
        <Text style={styles.title}>Certificate of Completion</Text>

        {/* Course Name and Score */}
        <Text style={styles.course}>Course: {courseName}</Text>
        <Text style={styles.score}>Your Score: {score.toFixed(2)}%</Text>

        {/* Congratulatory Message */}
        <Text style={styles.message}>
          Congratulations! You’ve successfully passed the {courseName} course.
        </Text>

        {/* Signature Section */}
        <View style={styles.footer}>
          <Image source={require('../assets/signature.jpg')} style={styles.signature} />
          <Text style={styles.signatureName}>Authorized Signature</Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    backgroundColor: '#EEE',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
  },
  card: {
    width: '100%',
    maxWidth: 350,
    backgroundColor: '#FFF',
    borderRadius: 16,
    padding: 24,
    alignItems: 'center',
    borderWidth: 3,
    borderColor: '#6A0DAD', // purple border
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 6,
  },
  icon: {
    fontSize: 48,
    marginBottom: 8,
    color: '#6A0DAD',
  },
  logo: {
    width: 80,
    height: 80,
    borderRadius: 40,
    borderWidth: 2,
    borderColor: '#6A0DAD',
    marginBottom: 16,
  },
  divider: {
    width: '60%',
    height: 2,
    backgroundColor: '#6A0DAD',
    marginVertical: 12,
    borderRadius: 2,
  },
  title: {
    fontSize: 24,
    fontWeight: '700',
    color: '#6A0DAD',
    marginBottom: 12,
    textAlign: 'center',
  },
  course: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
    marginBottom: 4,
  },
  score: {
    fontSize: 16,
    color: '#555',
    marginBottom: 16,
  },
  message: {
    fontSize: 14,
    color: '#666',
    textAlign: 'center',
    lineHeight: 20,
  },
  footer: {
    marginTop: 24,
    alignItems: 'center',
  },
  signature: {
    width: 120,
    height: 50,
    resizeMode: 'contain',
  },
  signatureName: {
    marginTop: 6,
    fontSize: 14,
    color: '#6A0DAD',
    fontWeight: '600',
  },
});

export default CertificateScreen;
