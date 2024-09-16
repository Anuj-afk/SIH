import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, SafeAreaView, TouchableOpacity } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import MapView, { Marker } from 'react-native-maps';


// Login Screen Component
function LoginScreen({ navigation }) {
  const [loginId, setLoginId] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = () => {
    // Handle login logic here
    console.log('Login ID:', loginId);
    console.log('Password:', password);

    // Navigate to the Dashboard screen and pass loginId as a parameter
    navigation.navigate('Dashboard', { loginId });
  };

  return (
    <SafeAreaView style={styles.loginContainer}>
      {/* DilliYatra Text */}
      <View style={styles.titleContainer}>
        <Text style={styles.dilliText}>Dilli</Text>
        <Text style={styles.yatraText}>Yatra</Text>
      </View>

      {/* Input Fields and Button */}
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Login ID"
          value={loginId}
          onChangeText={setLoginId}
        />
        <TextInput
          style={styles.input}
          placeholder="Password"
          secureTextEntry
          value={password}
          onChangeText={setPassword}
        />
        <TouchableOpacity style={styles.button} onPress={handleLogin}>
          <Text style={styles.buttonText}>Login</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

// Dashboard Screen Component
function DashboardScreen({ route }) {
  const { loginId } = route.params; // Get loginId from route params

  const handleStartRide = () => {
    console.log('Start Ride button pressed');
  };

  return (
    <SafeAreaView style={styles.dashboardContainer}>
      {/* Profile Overview Container */}
      <View style={styles.profileContainer}>
        <Text style={styles.profileText}>{loginId}</Text>
      </View>

      {/* MapView Component */}
      <View style={styles.mapContainer}>
        <MapView
          style={styles.map}
          initialRegion={{
            latitude: 28.612894,
            longitude: 77.229446,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
          }}
        >
          <Marker
            coordinate={{ latitude: 28.612894, longitude: 77.229446 }}
            title="INDIA GATE"
            description="RAM RAM"
          />
        </MapView>
      </View>

      {/* Start Ride Button */}
      <TouchableOpacity style={styles.startRideButton} onPress={handleStartRide}>
        <Text style={styles.startRideButtonText}>Start Ride</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}

// Create the stack navigator
const Stack = createStackNavigator();

function AppNavigator() {
  return (
    <Stack.Navigator initialRouteName="Login">
      <Stack.Screen
        name="Login"
        component={LoginScreen}
        options={{ headerShown: false }} // Hide the header for the Login screen
      />
      <Stack.Screen
        name="Dashboard"
        component={DashboardScreen}
        options={{
          title: 'Dashboard', // Set the title for the Dashboard screen
          headerShown: false, // Hide the header for the Dashboard screen if not needed
        }}
      />
    </Stack.Navigator>
  );
}

// Styles
const styles = StyleSheet.create({
  // Login Screen Styles
  loginContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  titleContainer: {
    flexDirection: 'row',
    marginBottom: 40,
    padding: 10,
  },
  dilliText: {
    color: 'green',
    fontSize: 40,
    fontWeight: 'bold',
  },
  yatraText: {
    color: 'orange',
    fontSize: 40,
    fontWeight: 'bold',
  },
  inputContainer: {
    width: '80%',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    marginBottom: 15,
    borderRadius: 5,
    backgroundColor: '#f9f9f9',
  },
  button: {
    backgroundColor: 'blue',
    padding: 15,
    borderRadius: 15,
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
  },

  // Dashboard Screen Styles
  dashboardContainer: {
    flex: 1,
    justifyContent: 'space-between', // Space between content and button
    alignItems: 'center',
  },
  profileContainer: {
    width: '45%',
    position: 'absolute',
    top: 20,
    left: 10,
    backgroundColor: '#d3d3d3',
    borderColor: 'gray',
    borderWidth: 2,
    padding: 20,
    borderRadius: 50,
  },
  profileText: {
    color: 'black',
    fontSize: 16,
    alignSelf: 'center',
  },
  dashboardContent: {
    flex: 1,
    justifyContent: 'center', // Center content vertically
    alignItems: 'center',
  },
  dashboardText: {
    fontSize: 0,
    fontWeight: 'bold',
  },
  startRideButton: {
    backgroundColor: 'blue',
    padding: 15,
    borderRadius: 15,
    width: '40%', // Adjust width as needed
    alignItems: 'center',
    marginBottom: 30, // Margin from the bottom
  },
  startRideButtonText: {
    color: 'white',
    fontSize: 16,
  },
  mapContainer: {
    flex: 1,
    width: '100%',
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
});

export default AppNavigator;