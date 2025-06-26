import React, { useRef, useState } from 'react';
import { View, Text, StyleSheet, ScrollView, Dimensions, TouchableOpacity } from 'react-native';
import { Video } from 'expo-av';
import { useNavigation } from '@react-navigation/native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

const { width } = Dimensions.get('window');

export default function CourseVideoScreen({ route }) {
  const { courseId, title, description } = route.params;
  const videoRef = useRef(null);
  const [percentageWatched, setPercentageWatched] = useState(0);
  const navigation = useNavigation();

  const videos = {
    flutter: require('../assets/Flutter.mp4'),
    uiux: require('../assets/UI-UX.mp4'),
    graphic: require('../assets/GraphicDesign.mp4'),
    adobe: require('../assets/Adobe.mp4'),
  };

  const durations = {
    flutter: '2:09',
    uiux: '2:47',
    graphic: '5:56',
    adobe: '2:30',
  };

  const handlePlaybackStatusUpdate = (status) => {
    if (status.isLoaded && status.durationMillis) {
      const watched = (status.positionMillis / status.durationMillis) * 100;
      const watchedRounded = Math.floor(watched);

      // Update state only if changed to reduce re-rendering
      setPercentageWatched((prev) => (prev !== watchedRounded ? watchedRounded : prev));
    } else if (status.error) {
      console.log('Video playback error:', status.error);
    }
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.headerRow}>
        <MaterialCommunityIcons name="school" size={28} color="#6A1B9A" />
        <Text style={styles.heading}> {title}</Text>
      </View>

      <View style={styles.detailsCard}>
        <View style={styles.sectionRow}>
          <MaterialCommunityIcons name="book-open-page-variant" size={22} color="#6A1B9A" />
          <Text style={styles.sectionTitle}>About this Course</Text>
        </View>
        <Text style={styles.infoText}>{description}</Text>
        <View style={styles.sectionRow}>
          <MaterialCommunityIcons name="clock-time-four" size={18} color="#4A148C" />
          <Text style={[styles.infoText, { marginLeft: 6 }]}>Duration: {durations[courseId]}</Text>
        </View>
      </View>

      <View style={styles.videoCard}>
        <View style={styles.sectionRow}>
          <MaterialCommunityIcons name="video" size={20} color="#6A1B9A" />
          <Text style={styles.videoTitle}> {title} Demo Video</Text>
        </View>
        <Video
          ref={videoRef}
          source={videos[courseId]}
          rate={1.0}
          volume={1.0}
          isMuted={false}
          resizeMode="contain"
          shouldPlay={false} // or true to auto play
          useNativeControls
          style={styles.video}
          onPlaybackStatusUpdate={handlePlaybackStatusUpdate}
        />

        <View style={styles.progressWrapper}>
          <View style={[styles.progressBar, { width: `${percentageWatched}%` }]} />
        </View>
        <Text style={styles.progressText}>
          <MaterialCommunityIcons name="progress-clock" size={16} color="#4A148C" /> Watched: {percentageWatched}%
        </Text>

        <View style={styles.infoBox}>
          <Text style={[styles.infoBoxText, styles.boldText]}>
            <MaterialCommunityIcons name="alert-circle-outline" size={18} color="#6A0DAD" /> Important:
          </Text>
          <Text style={styles.infoBoxText}>- After watching 100% of the video, you can take a quiz.</Text>
          <Text style={styles.infoBoxText}>- The quiz has 10 MCQs.</Text>
          <Text style={styles.infoBoxText}>- You must score at least 60% to pass.</Text>
          <Text style={styles.infoBoxText}>- Passing the quiz will earn you a certificate.</Text>
          <Text style={styles.infoBoxText}>- If you don’t pass, please review the course again.</Text>
        </View>
      </View>

      {percentageWatched >= 100 && (
        <TouchableOpacity
          style={styles.button}
          onPress={() =>
            navigation.navigate('Quiz', {
              courseName: courseId,
            })
          }
        >
          <MaterialCommunityIcons name="file-document-edit-outline" size={20} color="#fff" />
          <Text style={styles.buttonText}>  Start Quiz</Text>
        </TouchableOpacity>
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F3E5F5',
    padding: 12,
  },
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 12,
  },
  heading: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#4A148C',
  },
  detailsCard: {
    backgroundColor: '#E1BEE7',
    padding: 16,
    borderRadius: 12,
    marginBottom: 20,
    elevation: 4,
  },
  sectionRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#6A1B9A',
    marginLeft: 8,
  },
  infoText: {
    fontSize: 16,
    color: '#4A148C',
    marginBottom: 6,
  },
  videoCard: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    elevation: 6,
    shadowColor: '#6A0DAD',
    shadowOpacity: 0.25,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 2 },
  },
  videoTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#6A1B9A',
    marginLeft: 8,
  },
  video: {
    width: width - 48,
    height: 220,
    alignSelf: 'center',
    borderRadius: 12,
    backgroundColor: '#000',
    marginVertical: 14,
  },
  progressWrapper: {
    height: 12,
    backgroundColor: '#E0E0E0',
    borderRadius: 6,
    overflow: 'hidden',
  },
  progressBar: {
    height: '100%',
    backgroundColor: '#7B1FA2',
  },
  progressText: {
    marginTop: 8,
    fontSize: 16,
    color: '#4A148C',
    textAlign: 'center',
  },
  infoBox: {
    backgroundColor: '#F3E5F5',
    borderRadius: 10,
    padding: 14,
    marginTop: 20,
    borderWidth: 1,
    borderColor: '#6A0DAD',
  },
  infoBoxText: {
    color: '#4A148C',
    fontSize: 15,
    marginBottom: 6,
  },
  boldText: {
    fontWeight: 'bold',
    marginBottom: 10,
  },
  button: {
    flexDirection: 'row',
    backgroundColor: '#6A0DAD',
    paddingVertical: 14,
    paddingHorizontal: 28,
    borderRadius: 12,
    marginTop: 30,
    alignSelf: 'center',
    alignItems: 'center',
    elevation: 6,
    shadowColor: '#4A148C',
    shadowOpacity: 0.3,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 3 },
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 18,
  },
});
