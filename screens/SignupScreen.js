import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Image,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  TouchableWithoutFeedback,
  Keyboard,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Entypo from 'react-native-vector-icons/Entypo';

export default function LoginScreen({ navigation, onLogin }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [loginSuccess, setLoginSuccess] = useState(false);

  const validateEmail = (email) => {
    const re = /\S+@\S+\.\S+/;
    return re.test(email);
  };

  const handleLogin = () => {
    let isValid = true;

    if (!email) {
      setEmailError('Email is required');
      isValid = false;
    } else if (!validateEmail(email)) {
      setEmailError('Invalid email format');
      isValid = false;
    } else {
      setEmailError('');
    }

    if (!password) {
      setPasswordError('Password is required');
      isValid = false;
    } else if (password.length < 6) {
      setPasswordError('Password must be at least 6 characters');
      isValid = false;
    } else {
      setPasswordError('');
    }

    if (isValid) {
      setLoginSuccess(true);
      onLogin();
      setTimeout(() => setLoginSuccess(false), 2000);
    }
  };

  return (
    // Dismiss keyboard on tap outside inputs
    <KeyboardAvoidingView
      style={{ flex: 1, backgroundColor: '#F3E5F5' }}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      keyboardVerticalOffset={Platform.OS === 'ios' ? 60 : 0}
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <ScrollView
          contentContainerStyle={styles.container}
          keyboardShouldPersistTaps="handled"
        >
          <View style={styles.innerContainer}>
            <View style={styles.welcomeContainer}>
              <Text style={styles.helloText}>Hello!</Text>
              <Text style={styles.welcomeSubText}>Welcome to eHunar</Text>
            </View>

            <Image source={require('../assets/logo.jpg')} style={styles.logo} />
            <Text style={styles.heading}>Login</Text>

            {/* Email Input */}
            <View style={styles.inputContainer}>
              <Ionicons
                name="mail-outline"
                size={20}
                color="#6A0DAD"
                style={styles.icon}
              />
              <TextInput
                placeholder="Email"
                value={email}
                onChangeText={setEmail}
                style={styles.input}
                keyboardType="email-address"
                autoCapitalize="none"
                returnKeyType="next"
                onSubmitEditing={() => {
                  // Focus next input on submit
                  passwordRef.current?.focus();
                }}
                blurOnSubmit={false}
              />
            </View>
            {emailError ? (
              <Text style={styles.errorText}>{emailError}</Text>
            ) : null}

            {/* Password Input */}
            <View style={styles.inputContainer}>
              <Ionicons
                name="lock-closed-outline"
                size={20}
                color="#6A0DAD"
                style={styles.icon}
              />
              <TextInput
                ref={passwordRef}
                placeholder="Password"
                value={password}
                onChangeText={setPassword}
                style={styles.input}
                secureTextEntry
                returnKeyType="done"
                onSubmitEditing={handleLogin}
              />
            </View>
            {passwordError ? (
              <Text style={styles.errorText}>{passwordError}</Text>
            ) : null}

            <TouchableOpacity style={styles.loginButton} onPress={handleLogin}>
              <Text style={styles.loginButtonText}>Login</Text>
            </TouchableOpacity>

            <View style={styles.socialIconsContainer}>
              <TouchableOpacity style={styles.iconWrapper}>
                <FontAwesome name="facebook" size={28} color="#3b5998" />
              </TouchableOpacity>
              <TouchableOpacity style={styles.iconWrapper}>
                <Entypo name="twitter" size={28} color="#1DA1F2" />
              </TouchableOpacity>
              <TouchableOpacity style={styles.iconWrapper}>
                <FontAwesome name="google" size={28} color="#DB4437" />
              </TouchableOpacity>
            </View>

            {loginSuccess && (
              <View style={styles.successBox}>
                <Text style={styles.successText}>Login Successful</Text>
              </View>
            )}

            <TouchableOpacity
              onPress={() => navigation.navigate('Signup')}
              style={{ marginTop: 20 }}
            >
              <Text style={{ color: '#6A0DAD', textAlign: 'center' }}>
                Don't have an account? Sign Up
              </Text>
            </TouchableOpacity>
          </View>

          <View>
            <Text style={styles.footer}>© 2025 eHunar. www.ehunar.com</Text>
          </View>
        </ScrollView>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
}

// Create ref for password input
import { useRef } from 'react';
const passwordRef = React.createRef();

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 40,
  },
  innerContainer: {
    justifyContent: 'center',
    flex: 1,
  },
  welcomeContainer: {
    alignItems: 'flex-start',
    marginBottom: 20,
    paddingLeft: 0,
    paddingTop: 0,
    marginTop: -30,
  },
  helloText: {
    fontSize: 36,
    fontWeight: 'bold',
    color: '#6A0DAD',
    textAlign: 'left',
    marginBottom: 5,
    marginTop: 10,
  },
  welcomeSubText: {
    fontSize: 16,
    color: '#666',
    textAlign: 'left',
    marginBottom: 5,
    fontWeight: '600',
  },
  logo: {
    width: 100,
    height: 100,
    borderRadius: 50,
    alignSelf: 'center',
    marginBottom: 20,
    borderWidth: 2,
    borderColor: '#6A0DAD',
    backgroundColor: '#fff',
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 5,
  },
  heading: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#6A0DAD',
    textAlign: 'center',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#9C27B0',
    borderRadius: 8,
    backgroundColor: '#fff',
    paddingHorizontal: 10,
    marginBottom: 10,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 3,
  },
  icon: {
    marginRight: 8,
  },
  input: {
    flex: 1,
    height: 45,
    color: '#4A148C',
  },
  loginButton: {
    backgroundColor: '#6A0DAD',
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 10,
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowRadius: 5,
    elevation: 4,
  },
  loginButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
  socialIconsContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 20,
    gap: 20,
  },
  iconWrapper: {
    padding: 8,
    backgroundColor: '#fff',
    borderRadius: 50,
    elevation: 2,
    marginHorizontal: 8,
  },
  footer: {
    color: '#6A0DAD',
    fontSize: 17,
    textAlign: 'center',
  },
  errorText: {
    color: 'red',
    fontSize: 13,
    marginBottom: 10,
    marginLeft: 5,
  },
  successBox: {
    position: 'absolute',
    top: 60,
    alignSelf: 'center',
    backgroundColor: '#6A0DAD',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 8,
    shadowColor: '#000',
    shadowOpacity: 0.3,
    shadowRadius: 6,
    elevation: 6,
    zIndex: 999,
  },
  successText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
    textAlign: 'center',
  },
});
