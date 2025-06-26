import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  FlatList,
  Dimensions,
  SafeAreaView,
} from 'react-native';

const courses = [
  {
    id: '1',
    title: 'Flutter Apps (Web, Mobile & Desktop Apps)',
    details: [
      'Build apps for Android, iOS, Web, and Desktop.',
      'Use a single codebase across platforms.',
      'Create beautiful UIs with Flutter widgets.',
      'Understand Dart programming language.',
      'Publish and deploy Flutter apps.',
    ],
    image: require('../assets/flutter.jpg'),
  },
  {
    id: '2',
    title: 'UI / UX Designing',
    details: [
      'Understand design principles and color theory.',
      'Use Figma, Adobe XD, and other tools.',
      'Create wireframes and prototypes.',
      'Improve user experience with feedback.',
      'Design responsive and accessible interfaces.',
    ],
    image: require('../assets/ui.jpg'),
  },
  {
    id: '3',
    title: 'The Complete Youtube Mastery',
    details: [
      'Create and grow a YouTube channel.',
      'Learn content planning and SEO.',
      'Use editing software and thumbnails.',
      'Understand monetization strategies.',
      'Build your audience and community.',
    ],
    image: require('../assets/youtube.jpg'),
  },
  {
    id: '4',
    title: 'Adobe AfterEffects (Motion Graphics & Animations)',
    details: [
      'Master animation tools in After Effects.',
      'Create motion graphics for videos.',
      'Use keyframes and effects.',
      'Export projects in different formats.',
      'Apply text and object animations.',
    ],
    image: require('../assets/adope.jpg'),
  },
];

const numColumns = 2;
const { width } = Dimensions.get('window');
const CARD_MARGIN = 10;
const cardWidth = (width - (numColumns + 1) * CARD_MARGIN) / numColumns;

export default function CourseScreen() {
  const [expandedId, setExpandedId] = useState(null);

  const toggleDetails = (id) => {
    setExpandedId((prev) => (prev === id ? null : id));
  };

  const renderItem = ({ item }) => (
    <View style={styles.card}>
      <Image source={item.image} style={styles.image} />
      <Text style={styles.title}>{item.title}</Text>

      {expandedId === item.id && (
        <View style={styles.detailsContainer}>
          {item.details.map((point, index) => (
            <Text key={index} style={styles.detailPoint}>• {point}</Text>
          ))}
        </View>
      )}

      <TouchableOpacity style={styles.button} onPress={() => toggleDetails(item.id)}>
        <Text style={styles.buttonText}>
          {expandedId === item.id ? 'Hide Details' : 'View Details'}
        </Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        ListHeaderComponent={<Text style={styles.pageTitle}>3 Months Certification Courses</Text>}
        data={courses}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        numColumns={numColumns}
        contentContainerStyle={styles.listContainer}
        columnWrapperStyle={{
          justifyContent: 'space-between',
          marginBottom: CARD_MARGIN,
        }}
        showsVerticalScrollIndicator={true}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F3E5F5',
    paddingTop: 10,
  },
  listContainer: {
    paddingBottom: 40,
    paddingHorizontal: CARD_MARGIN,
  },
  pageTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#4A148C',
    marginBottom: 25,
    padding: 15,
    backgroundColor: '#E1BEE7',
    borderRadius: 12,
    marginHorizontal: 10,
    textAlign: 'center',
    elevation: 2,
  },
  card: {
    backgroundColor: '#fff',
    width: cardWidth,
    borderRadius: 12,
    elevation: 4,
    shadowColor: '#6A1B9A',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.2,
    shadowRadius: 6,
    paddingBottom: 15,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: '#E1BEE7',
  },
  image: {
    width: '100%',
    height: cardWidth * 9 / 16,
    resizeMode: 'cover',
    borderTopLeftRadius: 12,
    borderTopRightRadius: 12,
  },
  title: {
    fontWeight: '700',
    fontSize: 15,
    marginHorizontal: 10,
    marginTop: 10,
    textAlign: 'center',
    color: '#4A148C',
  },
  detailsContainer: {
    marginHorizontal: 12,
    marginTop: 8,
    marginBottom: 10,
    backgroundColor: '#F8F5FC',
    padding: 10,
    borderRadius: 8,
  },
  detailPoint: {
    fontSize: 13,
    color: '#333',
    marginBottom: 5,
    lineHeight: 18,
  },
  button: {
    backgroundColor: '#7B1FA2',
    marginHorizontal: 30,
    paddingVertical: 10,
    borderRadius: 25,
    marginTop: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    elevation: 3,
  },
  buttonText: {
    color: '#fff',
    fontWeight: '600',
    textAlign: 'center',
    fontSize: 13,
    letterSpacing: 0.5,
  },
});
