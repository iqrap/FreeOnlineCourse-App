import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Image,
} from 'react-native';
import DropDownPicker from 'react-native-dropdown-picker';
import Icon from 'react-native-vector-icons/MaterialIcons';

export default function ApplyNowScreen({ navigation }) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [course, setCourse] = useState(null);
  const [open, setOpen] = useState(false);

  const [items, setItems] = useState([
    { label: 'Flutter', value: 'flutter', description: 'Learn Flutter from basics to advanced.', duration: '10h 30m' },
    { label: 'UI/UX Design', value: 'uiux', description: 'Design stunning apps and websites.', duration: '8h 15m' },
    { label: 'Graphic Design', value: 'graphic', description: 'Master Adobe Photoshop & Illustrator.', duration: '9h 30m' },
    { label: 'Adobe AfterEffects', value: 'adobe', description: 'Master motion graphics and VFX.', duration: '9h 20m' },
  ]);

  // Validation errors state
  const [errors, setErrors] = useState({});

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const nameRegex = /^[A-Za-z ]+$/;

  const validate = () => {
    let valid = true;
    let tempErrors = {};

    if (!name) {
      tempErrors.name = 'Name is required';
      valid = false;
    } else if (!nameRegex.test(name)) {
      tempErrors.name = 'Name can only contain letters and spaces';
      valid = false;
    }

    if (!email) {
      tempErrors.email = 'Email is required';
      valid = false;
    } else if (!emailRegex.test(email)) {
      tempErrors.email = 'Please enter a valid email';
      valid = false;
    }

    if (!phone) {
      tempErrors.phone = 'Phone number is required';
      valid = false;
    } else if (!/^\d+$/.test(phone)) {
      tempErrors.phone = 'Phone number should contain digits only';
      valid = false;
    } else if (phone.length < 10) {
      tempErrors.phone = 'Phone number should be at least 10 digits';
      valid = false;
    }

    if (!course) {
      tempErrors.course = 'Please select a course';
      valid = false;
    }

    setErrors(tempErrors);
    return valid;
  };

  const handleSubmit = () => {
    if (validate()) {
      const selectedCourse = items.find(c => c.value === course);

      alert(`You have successfully applied for ${selectedCourse.label}`);

      setName('');
      setEmail('');
      setPhone('');
      setCourse(null);
      setErrors({});

      navigation.navigate('CourseVideos', {
        courseId: selectedCourse.value,
        title: selectedCourse.label,
        description: selectedCourse.description,
        duration: selectedCourse.duration,
      });
    }
  };

  const selectedCourse = items.find(c => c.value === course);

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.formWrapper}>

        <Image
          source={require('../assets/logo.jpg')}
          style={styles.logo}
        />

        <Text style={styles.heading}>Apply for a Course</Text>

        <View style={styles.inputGroup}>
          <Icon name="person" size={20} color="#6A1B9A" style={styles.icon} />
          <TextInput
            style={styles.input}
            placeholder="Full Name"
            value={name}
            onChangeText={text => {
              setName(text);
              if (errors.name) setErrors({...errors, name: null});
            }}
          />
        </View>
        {errors.name && <Text style={styles.errorText}>{errors.name}</Text>}

        <View style={styles.inputGroup}>
          <Icon name="email" size={20} color="#6A1B9A" style={styles.icon} />
          <TextInput
            style={styles.input}
            placeholder="Email Address"
            keyboardType="email-address"
            value={email}
            onChangeText={text => {
              setEmail(text);
              if (errors.email) setErrors({...errors, email: null});
            }}
          />
        </View>
        {errors.email && <Text style={styles.errorText}>{errors.email}</Text>}

        <View style={styles.inputGroup}>
          <Icon name="phone" size={20} color="#6A1B9A" style={styles.icon} />
          <TextInput
            style={styles.input}
            placeholder="Phone Number"
            keyboardType="phone-pad"
            value={phone}
            maxLength={15}
            onChangeText={text => {
              setPhone(text);
              if (errors.phone) setErrors({...errors, phone: null});
            }}
          />
        </View>
        {errors.phone && <Text style={styles.errorText}>{errors.phone}</Text>}

        <DropDownPicker
          open={open}
          value={course}
          items={items}
          setOpen={setOpen}
          setValue={(value) => {
            setCourse(value());
            if (errors.course) setErrors({...errors, course: null});
          }}
          setItems={setItems}
          placeholder="Select Course"
          style={styles.dropdown}
          dropDownContainerStyle={styles.dropDownContainer}
        />
        {errors.course && <Text style={styles.errorText}>{errors.course}</Text>}

        {course && selectedCourse && (
          <View style={styles.courseInfo}>
            <Text style={styles.infoText}>📝 {selectedCourse.description}</Text>
            <Text style={styles.infoText}>⏱ Duration: {selectedCourse.duration}</Text>
          </View>
        )}

        <TouchableOpacity style={styles.button} onPress={handleSubmit}>
          <Text style={styles.buttonText}>Submit Application</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 40,
    backgroundColor: '#EDE7F6',
    alignItems: 'center',
    justifyContent: 'center',
  },
  formWrapper: {
    width: '100%',
    maxWidth: 700,
    backgroundColor: '#fff',
    padding: 28,
    borderRadius: 16,
    elevation: 4,
  },
  logo: {
    width: 100,
    height: 100,
    borderRadius: 50,
    alignSelf: 'center',
    marginBottom: 20,
    borderWidth: 2,
    borderColor: '#6A1B9A',
    backgroundColor: '#fff',
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 5,
  },
  heading: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#4A148C',
    marginBottom: 24,
    textAlign: 'center',
  },
  inputGroup: {
    flexDirection: 'row',
    alignItems: 'center',
    borderColor: '#D1C4E9',
    borderWidth: 1,
    borderRadius: 8,
    marginBottom: 5,
    paddingHorizontal: 10,
  },
  icon: {
    marginRight: 8,
  },
  input: {
    flex: 1,
    paddingVertical: 12,
    fontSize: 16,
  },
  dropdown: {
    backgroundColor: '#FFF',
    borderColor: '#D1C4E9',
    borderWidth: 1,
    borderRadius: 8,
    marginBottom: 5,
  },
  dropDownContainer: {
    backgroundColor: '#FFF',
    borderColor: '#D1C4E9',
  },
  courseInfo: {
    backgroundColor: '#E8DAEF',
    padding: 12,
    borderRadius: 8,
    marginBottom: 15,
  },
  infoText: {
    fontSize: 16,
    color: '#4A148C',
  },
  button: {
    backgroundColor: '#6A1B9A',
    paddingVertical: 14,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 10,
  },
  buttonText: {
    color: '#FFF',
    fontSize: 18,
    fontWeight: '600',
  },
  errorText: {
    color: 'red',
    marginBottom: 12,
    marginLeft: 4,
  },
});
