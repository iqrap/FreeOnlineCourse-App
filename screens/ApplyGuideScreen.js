import React, { useState, useEffect } from 'react';
import {
  View, Text, StyleSheet, ScrollView, TouchableOpacity, Linking, TextInput, Button
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Icon from 'react-native-vector-icons/MaterialIcons';
import FAIcon from 'react-native-vector-icons/FontAwesome5';

export default function ApplyGuideScreen() {
  const [userQuestion, setUserQuestion] = useState('');
  const [storedQuestion, setStoredQuestion] = useState(null);

  useEffect(() => {
    // load saved question on mount
    const loadQuestion = async () => {
      const saved = await AsyncStorage.getItem('userFAQ');
      if (saved) setStoredQuestion(saved);
    };
    loadQuestion();
  }, []);

  const handleSaveQuestion = async () => {
    if (userQuestion.trim() === '') return;
    await AsyncStorage.setItem('userFAQ', userQuestion);
    setStoredQuestion(userQuestion);
    setUserQuestion('');
  };

  return (
    <ScrollView contentContainerStyle={{ paddingBottom: 30 }}>
      {/* Application Steps */}
      <View style={styles.container}>
        <Text style={styles.heading}>How to Apply for a Course</Text>
        {[
          { icon: 'person', text: 'Enter your full name.' },
          { icon: 'email', text: 'Provide a valid email address.' },
          { icon: 'phone', text: 'Enter your phone number.' },
          { icon: 'school', text: 'Select your desired course.' },
          { icon: 'send', text: 'Press “Submit Application” to complete.' },
        ].map((item, i) => (
          <View key={i} style={styles.stepContainer}>
            <Icon name={item.icon} size={24} color="#6A1B9A" style={styles.icon} />
            <Text style={styles.stepText}>{item.text}</Text>
          </View>
        ))}
      </View>

      {/* Rating */}
      <View style={styles.ratingContainer}>
        <Text style={styles.ratingTitle}>Course Rating</Text>
        <Text style={styles.stars}>★★★★☆</Text>
        <Text style={styles.ratingNote}>Rated 4.9 out of 5 by 2,000+ students</Text>
      </View>

      {/* FAQs */}
      <View style={styles.faqs}>
        <Text style={styles.sectionTitle}>Frequently Asked Questions</Text>
        {[
          {
            question: 'Is this course actually free?',
            answer: 'Yes! All courses are completely free for students.',
          },
          {
            question: 'Will I get a certificate?',
            answer: 'Definitely! You’ll receive a government-approved certificate.',
          },
          {
            question: 'Can I study anytime?',
            answer: 'Of course! Learn at your own pace.',
          },
        ].map((item, i) => (
          <View key={i} style={styles.faqItem}>
            <Text style={styles.faqQuestion}>Q: {item.question}</Text>
            <Text style={styles.faqAnswer}>A: {item.answer}</Text>
          </View>
        ))}

        {/* User‑added question (if any) */}
        {storedQuestion && (
          <View style={styles.faqItem}>
            <Text style={styles.faqQuestion}>Q: {storedQuestion}</Text>
            <Text style={styles.faqAnswer}>A: Our team will get back to you shortly.</Text>
          </View>
        )}

        {/* Input for new question */}
        <View style={{ marginTop: 20 }}>
          <Text style={styles.faqQuestion}>Have a Question?</Text>
          <TextInput
            style={styles.input}
            placeholder="Type your question here"
            placeholderTextColor="#888"
            value={userQuestion}
            onChangeText={setUserQuestion}
          />
          <Button title="Add My Question" onPress={handleSaveQuestion} />
        </View>
      </View>

      {/* Testimonials */}
      <View style={styles.testimonials}>
        <Text style={styles.sectionTitle}>Student Testimonials</Text>
        {[
          { text: '"Helped me land a job in tech!"', author: 'Ali R.' },
          { text: '"Loved the real-world projects."', author: 'Aisha K.' },
          { text: '"Instructors were very supportive."', author: 'Muhammad S.' },
        ].map((item, i) => (
          <View key={i} style={styles.testimonialItem}>
            <Text style={styles.testimonialText}>{item.text}</Text>
            <Text style={styles.testimonialAuthor}>- {item.author}</Text>
          </View>
        ))}
      </View>

      {/* Social Media */}
      <View style={styles.socialMedia}>
        <Text style={styles.sectionTitle}>Follow Us</Text>
        <View style={styles.socialIcons}>
          <TouchableOpacity onPress={() => Linking.openURL('https://facebook.com/ehunarorg')}>
            <FAIcon name="facebook-f" size={28} color="#3b5998" />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => Linking.openURL('https://instagram.com/ehunarorg')}>
            <FAIcon name="instagram" size={28} color="#C13584" />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => Linking.openURL('https://twitter.com/ehunarorg')}>
            <FAIcon name="twitter" size={28} color="#1DA1F2" />
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20, backgroundColor: '#F3E5F5',
  },
  heading: {
    fontSize: 28, fontWeight: 'bold', color: '#4A148C',
    marginBottom: 20, textAlign: 'center',
  },
  stepContainer: {
    flexDirection: 'row', alignItems: 'center',
    backgroundColor: '#FFF3E0', padding: 15,
    borderRadius: 10, marginBottom: 15,
    borderWidth: 1, borderColor: '#D1C4E9',
  },
  icon: { marginRight: 15 },
  stepText: { fontSize: 16, color: '#4E342E', flexShrink: 1 },

  ratingContainer: {
    backgroundColor: '#F3E5F5', padding: 20,
    margin: 10, borderRadius: 12, alignItems: 'center',
    elevation: 4,
  },
  ratingTitle: { fontSize: 20, fontWeight: 'bold', color: '#4A148C' },
  stars: { fontSize: 26, color: '#FFD700' },
  ratingNote: { fontSize: 14, color: '#555', marginTop: 5, textAlign: 'center' },

  faqs: {
    backgroundColor: '#EDE7F6', margin: 10,
    padding: 20, borderRadius: 12, elevation: 2,
  },
  sectionTitle: {
    fontSize: 20, fontWeight: 'bold',
    color: '#4A148C', marginBottom: 15, textAlign: 'center',
  },
  faqItem: { marginBottom: 15 },
  faqQuestion: {
    fontWeight: 'bold', fontSize: 15,
    color: '#4A148C', marginBottom: 6,
  },
  faqAnswer: {
    fontSize: 14, color: '#333', lineHeight: 20,
  },
  input: {
    borderColor: '#4A148C', borderWidth: 1,
    borderRadius: 8, padding: 10, marginBottom: 10,
    backgroundColor: '#fff', color: '#000',
  },

  testimonials: {
    backgroundColor: '#EDE7F6', margin: 10,
    padding: 20, borderRadius: 12, elevation: 3,
  },
  testimonialItem: { marginBottom: 15 },
  testimonialText: {
    fontSize: 16, fontFamily: 'Georgia',
    color: '#444', lineHeight: 22,
  },
  testimonialAuthor: {
    fontSize: 14, fontWeight: '600',
    color: '#6A1B9A', marginTop: 6, textAlign: 'right',
  },

  socialMedia: {
    margin: 10, padding: 20,
    backgroundColor: '#F3E5F5', borderRadius: 12,
    alignItems: 'center', elevation: 3,
  },
  socialIcons: {
    flexDirection: 'row', justifyContent: 'space-around',
    width: '60%', marginTop: 10,
  },
});
