import React from 'react';
import { View, Text, Image, StyleSheet, ScrollView, Dimensions } from 'react-native';

const { width, height } = Dimensions.get('window');

export default function HomeScreen() {
  return (
    <ScrollView style={styles.container} contentContainerStyle={{ paddingBottom: 80 }}>
      {/* Full Screen Circular Logo Section */}
      <View style={styles.fullScreenLogoContainer}>
        <Image source={require('../assets/logo.jpg')} style={styles.fullScreenLogo} />
        <Text style={styles.fullScreenText}>ehunar Online Course</Text>
      </View>

      {/* Hero Section without logo */}
      <View style={styles.hero}>
        <Text style={styles.urduText}>
          ہنرمند بنیں گے نوجوان، ترقی کرے گا پاکستان {'\n'}
          نئے بیچ میں داخلوں کا آغاز www.ehunar.org
        </Text>
      </View>

      {/* About Us Section */}
      <View style={styles.aboutUs}>
        <Text style={styles.aboutTitle}>About Us</Text>
        <Text style={styles.aboutText}>
          FreeOnlineCourse is a certified platform by the Government of Pakistan under the eHunar program. 
          We aim to empower youth by providing 100% free online training in high-demand fields like app development, 
          UI/UX design, motion graphics, and digital marketing. Our mission is to equip students with practical skills 
          through 3-month certification courses, helping them to become job-ready and contribute to Pakistan’s digital future.
        </Text>
      </View>

      {/* Contact Strip at the Bottom */}
      <View style={styles.contactStrip}>
        <Text style={styles.contactText}>📞 042-37495999 | ✉️ info@ehunar.org</Text>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fafafa',
  },

  fullScreenLogoContainer: {
    width,
    height: height * 0.4,  // 40% of screen height
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#EDE7F6',
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
    elevation: 8,
    shadowColor: '#4A148C',
    shadowOpacity: 0.3,
    shadowOffset: { width: 0, height: 4 },
    shadowRadius: 10,
  },
  fullScreenLogo: {
    width: width * 0.5,     // 50% of screen width
    height: width * 0.5,    // square logo
    borderRadius: (width * 0.5) / 2,
    borderWidth: 3,
    borderColor: '#6A1B9A',
    resizeMode: 'contain',
  },
  fullScreenText: {
    marginTop: 15,
    fontSize: 24,
    fontWeight: 'bold',
    color: '#4A148C',
    letterSpacing: 1,
  },

  hero: {
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#F3E5F5',
    margin: 10,
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 5,
    elevation: 5,
  },
  urduText: {
    fontSize: 18,
    textAlign: 'center',
    color: '#6A1B9A',
    fontWeight: 'bold',
    marginTop: 15,
    lineHeight: 32,
    writingDirection: 'rtl',
    backgroundColor: '#fff',
    padding: 10,
    borderRadius: 10,
  },

  aboutUs: {
    backgroundColor: '#EDE7F6',
    padding: 20,
    margin: 10,
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 4,
    elevation: 3,
  },
  aboutTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#4A148C',
    marginBottom: 12,
    textAlign: 'center',
  },
  aboutText: {
    fontSize: 15,
    color: '#333',
    lineHeight: 24,
    textAlign: 'justify',
  },

  contactStrip: {
    backgroundColor: '#D1C4E9',
    paddingVertical: 15,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 20,
    borderTopLeftRadius: 12,
    borderTopRightRadius: 12,
    elevation: 5,
    shadowColor: '#4A148C',
    shadowOpacity: 0.3,
    shadowOffset: { width: 0, height: -2 },
    shadowRadius: 6,
  },
  contactText: {
    fontSize: 14,
    color: '#4A148C',
    fontWeight: '600',
  },
});
