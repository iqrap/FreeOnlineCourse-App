import React, { useRef, useEffect } from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  Dimensions,
} from 'react-native';
import { Video } from 'expo-av';
import { useIsFocused } from '@react-navigation/native';
import { MaterialIcons, FontAwesome5, Ionicons } from '@expo/vector-icons';

const screenWidth = Dimensions.get('window').width;
const maxContentWidth = 700;
const contentWidth = screenWidth > maxContentWidth ? maxContentWidth : screenWidth;
const videoHeight = (contentWidth * 9) / 16;

export default function AboutScreen() {
  const video = useRef(null);
  const isFocused = useIsFocused();

  useEffect(() => {
    if (video.current) {
      if (isFocused) {
        video.current.playAsync();
      } else {
        video.current.pauseAsync();
      }
    }
  }, [isFocused]);

  const SectionTitle = ({ icon, text }) => (
    <View style={styles.sectionTitleContainer}>
      {icon}
      <Text style={styles.title}>{text}</Text>
    </View>
  );

  return (
    <ScrollView contentContainerStyle={styles.scrollContainer}>
      <View style={[styles.container, { width: contentWidth }]}>
        {/* Video */}
        <View style={[styles.videoContainer, { height: videoHeight }]}>
          <Video
            ref={video}
            source={require('../assets/AboutUs.mp4')}
            style={styles.video}
            useNativeControls
            resizeMode="cover"
            isLooping
          />
        </View>

        {/* Section 1 */}
        <SectionTitle
          icon={<MaterialIcons name="person" size={22} color="#6A1B9A" />}
          text="Project Director eHunar: Iqra Pervez"
        />
        <Text style={styles.message}>
          We as a nation have to focus on future IT skills required to flourish in this new digitalised, interconnected global marketplace. 
          Our proficiency with such technologies and processes will help us diversify our economy, attract new investments and increase our productivity. 
          This Skills Development Initiative will identify skills most important in the near future, helping students prepare for freelancing, jobs, and entrepreneurship.
        </Text>
        <Text style={styles.signature}>Iqra Pervez{"\n"}Project Director</Text>

        {/* Section 2 */}
        <SectionTitle
          icon={<Ionicons name="school" size={22} color="#6A1B9A" />}
          text="Provincial Minister: Momina Aftab"
        />
        <Text style={styles.message}>
          Dr. Murad Raas emphasized the importance of adapting to technology and providing equal opportunities to women in IT. 
          Self-paced courses allow professionals and students to earn while they learn. This program will help reduce youth unemployment.
        </Text>

        {/* Section 3 */}
        <SectionTitle
          icon={<FontAwesome5 name="laptop-code" size={20} color="#6A1B9A" />}
          text="About eHunar"
        />
        <Text style={styles.message}>
          eHunar is an e-learning platform offering online IT training to creative minds. The platform enables learners to become freelancers, entrepreneurs, and professionals. 
          Pakistan is among the top countries in online freelancing, with an estimated revenue of $500 Million to $1.3 Billion annually.
        </Text>

        {/* Section 4 */}
        <SectionTitle
          icon={<Ionicons name="rocket-outline" size={22} color="#6A1B9A" />}
          text="Mission"
        />
        <Text style={styles.message}>
          To offer one million trainings to Pakistanis to gain marketable digital skills that can transform them into successful freelancers, employees, and entrepreneurs.
        </Text>

        {/* Section 5 */}
        <SectionTitle
          icon={<Ionicons name="eye-outline" size={22} color="#6A1B9A" />}
          text="Vision"
        />
        <Text style={styles.message}>
          To empower Pakistan’s economy by equipping youth, women, and students with IT skills and building a digitally literate population of professionals.
        </Text>

        {/* Section 6 */}
        <SectionTitle
          icon={<MaterialIcons name="library-books" size={22} color="#6A1B9A" />}
          text="Courses Offered"
        />
        <Text style={styles.list}>
          • Flutter (Web, Mobile & Desktop Apps){'\n'}
          • UI / UX Designing{'\n'}
          • Google Ads & YouTube Mastery{'\n'}
          • Adobe After Effects & Motion Graphics{'\n'}
          • Graphic Design{'\n'}
        </Text>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  scrollContainer: {
    flexGrow: 1,
    alignItems: 'center',
    backgroundColor: '#EDE7F6',
    paddingVertical: 20,
  },
  container: {
    paddingHorizontal: 20,
  },
  videoContainer: {
    width: '100%',
    marginBottom: 16,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    overflow: 'hidden',
    backgroundColor: '#000',
  },
  video: {
    width: '100%',
    height: '100%',
  },
  sectionTitleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 18,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#4A148C',
    marginLeft: 8,
  },
  message: {
    fontSize: 16,
    color: '#4E342E',
    lineHeight: 24,
    marginTop: 6,
  },
  signature: {
    fontStyle: 'italic',
    marginTop: 10,
    color: '#827717',
  },
  list: {
    fontSize: 15,
    color: '#37474F',
    marginTop: 10,
    lineHeight: 22,
    paddingLeft: 5,
  },
});
