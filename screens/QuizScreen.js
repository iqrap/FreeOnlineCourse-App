import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  FlatList,
  Alert,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';

// Sample quiz data per course
const courseQuizzes = {
  FLUTTER: [
    { question: 'Flutter is developed by?', options: ['Google', 'Apple', 'Facebook', 'Microsoft'], answer: 'Google' },
    { question: 'Which language is used in Flutter?', options: ['Dart', 'Java', 'Kotlin', 'Swift'], answer: 'Dart' },
    { question: 'Flutter apps are compiled to?', options: ['Native code', 'JavaScript', 'Bytecode', 'HTML'], answer: 'Native code' },
    { question: 'Which widget is used for layout in Flutter?', options: ['Container', 'Row', 'Column', 'All of these'], answer: 'All of these' },
    { question: 'What is hot reload in Flutter?', options: ['Instant code update', 'Full app restart', 'Debugging tool', 'Testing feature'], answer: 'Instant code update' },
    { question: 'Which is Flutter’s rendering engine?', options: ['Skia', 'CanvasKit', 'OpenGL', 'Vulkan'], answer: 'Skia' },
    { question: 'How to add external packages in Flutter?', options: ['Using pubspec.yaml', 'npm install', 'gradle', 'maven'], answer: 'Using pubspec.yaml' },
    { question: 'Flutter supports which platforms?', options: ['Android & iOS', 'Web', 'Desktop', 'All of these'], answer: 'All of these' },
    { question: 'Which widget is the root of Flutter app?', options: ['MaterialApp', 'Scaffold', 'Container', 'AppBar'], answer: 'MaterialApp' },
    { question: 'Which command runs Flutter app?', options: ['flutter run', 'npm start', 'react-native start', 'expo start'], answer: 'flutter run' },
  ],
 UIUX: [
    { question: 'What does UX stand for?', options: ['User Experience', 'User Explanation', 'User Example', 'Use Exit'], answer: 'User Experience' },
    { question: 'Which color evokes calmness?', options: ['Blue', 'Red', 'Yellow', 'Black'], answer: 'Blue' },
    { question: 'What is wireframe?', options: ['Blueprint of UI', 'Final Design', 'Code', 'Animation'], answer: 'Blueprint of UI' },
    { question: 'Which principle is NOT part of UX?', options: ['Usability', 'Accessibility', 'Aesthetics', 'Speeding'], answer: 'Speeding' },
    { question: 'What is empathy in UX?', options: ['Understanding user needs', 'Design skill', 'Coding skill', 'Marketing'], answer: 'Understanding user needs' },
    { question: 'Which tool is used for prototyping?', options: ['Figma', 'Git', 'VS Code', 'Postman'], answer: 'Figma' },
    { question: 'What is persona in UX?', options: ['User model', 'Developer', 'Designer', 'Tester'], answer: 'User model' },
    { question: 'Which element affects usability?', options: ['Navigation', 'Fonts', 'Colors', 'All of these'], answer: 'All of these' },
    { question: 'Accessibility means?', options: ['Design for all users', 'Limited users', 'Only disabled', 'None'], answer: 'Design for all users' },
    { question: 'A good UX design is?', options: ['Simple', 'Complex', 'Expensive', 'Slow'], answer: 'Simple' },
  ],
  GRAPHIC: [
    { question: 'What is vector graphics?', options: ['Based on paths', 'Based on pixels', '3D models', 'Animations'], answer: 'Based on paths' },
    { question: 'Raster images are made of?', options: ['Pixels', 'Paths', 'Vectors', 'Shapes'], answer: 'Pixels' },
    { question: 'Which format is vector?', options: ['SVG', 'JPEG', 'PNG', 'GIF'], answer: 'SVG' },
    { question: 'What does DPI stand for?', options: ['Dots per inch', 'Data per image', 'Dots per input', 'Data per inch'], answer: 'Dots per inch' },
    { question: 'CMYK is used for?', options: ['Printing', 'Web', 'Animation', 'Video'], answer: 'Printing' },
    { question: 'Which tool is used for vector editing?', options: ['Adobe Illustrator', 'Photoshop', 'Premiere Pro', 'After Effects'], answer: 'Adobe Illustrator' },
    { question: 'Layer in graphics means?', options: ['Stacked images', 'Code', 'Animation', 'None'], answer: 'Stacked images' },
    { question: 'What is the color model for screens?', options: ['RGB', 'CMYK', 'Grayscale', 'Pantone'], answer: 'RGB' },
    { question: 'Which file format supports transparency?', options: ['PNG', 'JPEG', 'BMP', 'TIFF'], answer: 'PNG' },
    { question: 'Bezier curves are?', options: ['Mathematical curves', 'Straight lines', 'Pixels', 'Animation'], answer: 'Mathematical curves' },
  ],
  ADOBE: [
    { question: 'Which Adobe software is primarily used for photo editing?', options: ['Adobe Photoshop', 'Adobe Illustrator', 'Adobe Premiere Pro', 'Adobe After Effects'], answer: 'Adobe Photoshop' },
    { question: 'Which Adobe software is best for vector graphics?', options: ['Adobe Photoshop', 'Adobe Illustrator', 'Adobe Premiere Pro', 'Adobe After Effects'], answer: 'Adobe Illustrator' },
    { question: 'Adobe Premiere Pro is mainly used for?', options: ['Video Editing', 'Photo Editing', 'Web Design', '3D Modeling'], answer: 'Video Editing' },
    { question: 'Which Adobe software is used for motion graphics and visual effects?', options: ['Adobe Lightroom', 'Adobe After Effects', 'Adobe Dreamweaver', 'Adobe InDesign'], answer: 'Adobe After Effects' },
    { question: 'Adobe Lightroom is mainly for?', options: ['Photo editing', 'Video editing', 'Vector graphics', 'Web design'], answer: 'Photo editing' },
    { question: 'Which Adobe software is used for desktop publishing?', options: ['Adobe InDesign', 'Adobe Photoshop', 'Adobe Illustrator', 'Adobe Premiere Pro'], answer: 'Adobe InDesign' },
    { question: 'Adobe Dreamweaver is used for?', options: ['Web design', 'Photo editing', 'Video editing', 'Animation'], answer: 'Web design' },
    { question: 'Which Adobe software supports layers?', options: ['Photoshop', 'Illustrator', 'Both', 'None'], answer: 'Both' },
    { question: 'Which Adobe software is used for 3D modeling?', options: ['Adobe Dimension', 'Adobe Photoshop', 'Adobe Illustrator', 'Adobe After Effects'], answer: 'Adobe Dimension' },
    { question: 'Which Adobe software is best for video color grading?', options: ['Adobe Premiere Pro', 'Adobe Lightroom', 'Adobe Photoshop', 'Adobe After Effects'], answer: 'Adobe Premiere Pro' },
  ],
};

const QuizScreen = ({ route }) => {
  const { courseName } = route.params;
  const navigation = useNavigation();
  const questions = courseQuizzes[courseName.toUpperCase()] || [];

  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [correctCount, setCorrectCount] = useState(0);
  const [timeLeft, setTimeLeft] = useState(300); // 5 minutes

  // Answer select
  const handleSelect = (index, option) => {
    if (!submitted) {
      setSelectedAnswers(prev => ({ ...prev, [index]: option }));
    }
  };

  // Submit quiz
  const handleSubmit = () => {
    if (Object.keys(selectedAnswers).length !== questions.length) {
      Alert.alert('Incomplete', 'Please answer all questions before submitting.');
      return;
    }

    let count = 0;
    questions.forEach((q, i) => {
      if (selectedAnswers[i] === q.answer) count++;
    });

    setCorrectCount(count);
    setSubmitted(true);

    const score = (count / questions.length) * 100;

    if (score >= 60) {
      navigation.replace('CertificateScreen', { score, courseName });
    } else {
      Alert.alert('Try Again', `You scored ${score.toFixed(1)}%. Please review the course.`);
    }
  };

  // Timer effect
  useEffect(() => {
    if (submitted) return;

    if (timeLeft === 0) {
      Alert.alert('Time Up', 'Time is over. Auto-submitting your quiz.');
      handleSubmit();
      return;
    }

    const timerId = setInterval(() => setTimeLeft(t => t - 1), 1000);
    return () => clearInterval(timerId);
  }, [timeLeft, submitted]);

  // Format timer to MM:SS
  const formatTime = (secs) => {
    const m = Math.floor(secs / 60).toString().padStart(2, '0');
    const s = (secs % 60).toString().padStart(2, '0');
    return `${m}:${s}`;
  };

  // Show icon after submit
  const renderIcon = (option, selected, correct, wrong) => {
    if (!submitted) return null;
    if (correct) return <Text style={styles.icon}>✅</Text>;
    if (wrong) return <Text style={styles.icon}>❌</Text>;
    return null;
  };

  return (
    <View style={styles.container}>
      <Text style={styles.timer}>Time Left: {formatTime(timeLeft)}</Text>

      <FlatList
        data={questions}
        keyExtractor={(_, i) => i.toString()}
        renderItem={({ item, index }) => {
          const selected = selectedAnswers[index];
          const isCorrect = submitted && selected === item.answer;
          const isWrong = submitted && selected && selected !== item.answer;

          return (
            <View style={styles.questionBox}>
              <Text style={styles.question}>{index + 1}. {item.question}</Text>
              {item.options.map((option, i) => {
                const isSelected = selected === option;
                return (
                  <TouchableOpacity
                    key={i}
                    style={[
                      styles.option,
                      isSelected && styles.selectedOption,
                      submitted && isCorrect && option === item.answer && styles.correctOption,
                      submitted && isWrong && isSelected && styles.wrongOption,
                    ]}
                    disabled={submitted}
                    onPress={() => handleSelect(index, option)}
                  >
                    <Text style={styles.optionText}>{option}</Text>
                    {renderIcon(option, isSelected, option === item.answer, isSelected && option !== item.answer)}
                  </TouchableOpacity>
                );
              })}
            </View>
          );
        }}
      />

      {submitted && (
        <Text style={styles.result}>Correct Answers: {correctCount} / {questions.length}</Text>
      )}

      {!submitted && (
        <TouchableOpacity style={styles.submitBtn} onPress={handleSubmit}>
          <Text style={styles.submitText}>Submit Quiz</Text>
        </TouchableOpacity>
      )}
    </View>
  );
};

export default QuizScreen;

const styles = StyleSheet.create({
  container: { flex: 1, padding: 15, backgroundColor: '#fff' },
  timer: { fontSize: 18, fontWeight: 'bold', color: 'red', textAlign: 'center', marginBottom: 10 },
  questionBox: { marginBottom: 20, borderBottomWidth: 1, borderColor: '#ccc', paddingBottom: 10 },
  question: { fontSize: 17, fontWeight: '600', marginBottom: 10 },
  option: {
    backgroundColor: '#f2f2f2',
    padding: 10,
    borderRadius: 8,
    marginVertical: 5,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  selectedOption: { backgroundColor: '#d0d0ff' },
  correctOption: { backgroundColor: '#b3ffb3' },
  wrongOption: { backgroundColor: '#ffb3b3' },
  optionText: { fontSize: 16 },
  icon: { fontSize: 18 },
  submitBtn: {
    backgroundColor: 'purple',
    paddingVertical: 15,
    borderRadius: 8,
    marginTop: 10,
  },
  submitText: { color: 'white', fontSize: 18, fontWeight: '700', textAlign: 'center' },
  result: { marginTop: 15, fontSize: 18, fontWeight: 'bold', textAlign: 'center', color: 'green' },
});
