import React, { useState, useRef } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Alert, Image, SafeAreaView, StatusBar } from 'react-native';
import { Camera } from 'expo-camera';
import * as MediaLibrary from 'expo-media-library';
import * as VideoThumbnails from 'expo-video-thumbnails';
import * as DocumentPicker from 'expo-document-picker';
import { Video } from 'expo-av';
import { Ionicons, MaterialIcons, FontAwesome5 } from '@expo/vector-icons';

export default function DoshaAnalyzer() {
  const [currentScreen, setCurrentScreen] = useState('home'); // 'home', 'camera', 'preview'
  const [hasPermissions, setHasPermissions] = useState(null);
  const [recording, setRecording] = useState(false);
  const [video, setVideo] = useState(null);
  const [thumbnail, setThumbnail] = useState(null);
  const [countdown, setCountdown] = useState(null);
  const cameraRef = useRef(null);
  const countdownTimerRef = useRef(null);
  
  // Request camera and audio permissions
  const requestPermissions = async () => {
    const { status: cameraStatus } = await Camera.requestCameraPermissionsAsync();
    const { status: audioStatus } = await Camera.requestMicrophonePermissionsAsync();
    const { status: libraryStatus } = await MediaLibrary.requestPermissionsAsync();
    
    setHasPermissions(
      cameraStatus === 'granted' && 
      audioStatus === 'granted' && 
      libraryStatus === 'granted'
    );
    
    if (cameraStatus === 'granted' && audioStatus === 'granted' && libraryStatus === 'granted') {
      setCurrentScreen('camera');
    } else {
      Alert.alert(
        'Permissions Required',
        'Camera, microphone, and media library access are needed for this feature.',
        [{ text: 'OK' }]
      );
    }
  };
  
  // Start video recording with 10 second limit
  const startRecording = async () => {
    if (cameraRef.current) {
      setRecording(true);
      setCountdown(10);
      
      // Start countdown timer
      countdownTimerRef.current = setInterval(() => {
        setCountdown((prevCount) => {
          if (prevCount <= 1) {
            clearInterval(countdownTimerRef.current);
            stopRecording();
            return 0;
          }
          return prevCount - 1;
        });
      }, 1000);
      
      try {
        const videoRecordPromise = cameraRef.current.recordAsync({
          maxDuration: 10,
          quality: Camera.Constants.VideoQuality['720p'],
        });
        
        const data = await videoRecordPromise;
        setVideo(data.uri);
        
        // Generate thumbnail from recorded video
        try {
          const { uri } = await VideoThumbnails.getThumbnailAsync(data.uri, {
            time: 1000,
          });
          setThumbnail(uri);
          setCurrentScreen('preview');
        } catch (e) {
          console.warn('Thumbnail generation failed:', e);
          setCurrentScreen('preview');
        }
      } catch (error) {
        console.error('Recording error:', error);
        Alert.alert('Error', 'Failed to record video');
      }
    }
  };
  
  // Stop video recording
  const stopRecording = async () => {
    if (cameraRef.current && recording) {
      clearInterval(countdownTimerRef.current);
      setCountdown(null);
      cameraRef.current.stopRecording();
      setRecording(false);
    }
  };
  
  // Select video from device storage
  const pickVideo = async () => {
    try {
      const result = await DocumentPicker.getDocumentAsync({ 
        type: 'video/*',
        copyToCacheDirectory: true
      });
      
      if (result.type === 'success') {
        setVideo(result.uri);
        
        // Generate thumbnail for the selected video
        try {
          const { uri } = await VideoThumbnails.getThumbnailAsync(result.uri, {
            time: 1000,
          });
          setThumbnail(uri);
        } catch (e) {
          console.warn('Thumbnail generation failed:', e);
        }
        
        setCurrentScreen('preview');
      }
    } catch (error) {
      console.error('Document picker error:', error);
      Alert.alert('Error', 'Failed to pick video');
    }
  };
  
  // Send video to API for dosha analysis
  const analyzeDosha = async () => {
    if (!video) {
      Alert.alert('Error', 'No video to analyze');
      return;
    }
    
    // Show loading indicator
    Alert.alert('Processing', 'Analyzing your dosha...');
    
    try {
      // Create form data for the upload
      const formData = new FormData();
      
      // Get the filename from the URI
      const filename = video.split('/').pop();
      
      // Append the video file to the form data
      formData.append('video', {
        uri: video,
        name: filename,
        type: 'video/mp4', // You might need to detect the actual type
      });
      
      // Example API endpoint - replace with your actual endpoint
      const response = await fetch('https://your-dosha-analysis-api.com/analyze', {
        method: 'POST',
        body: formData,
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      
      if (response.ok) {
        const result = await response.json();
        Alert.alert('Analysis Complete', `Your dominant dosha is: ${result.dosha || 'Unknown'}`);
        
        // Reset the state and go back to home
        resetAndGoHome();
      } else {
        throw new Error('Server responded with an error');
      }
    } catch (error) {
      console.error('Analysis error:', error);
      Alert.alert('Error', 'Failed to analyze video. Please try again.');
    }
  };
  
  // Reset and go back to home screen
  const resetAndGoHome = () => {
    setVideo(null);
    setThumbnail(null);
    setCurrentScreen('home');
  };
  
  // Reset and go back to camera
  const resetAndGoToCamera = () => {
    setVideo(null);
    setThumbnail(null);
    setCurrentScreen('camera');
  };
  
  // Cleanup on component unmount
  React.useEffect(() => {
    return () => {
      if (countdownTimerRef.current) {
        clearInterval(countdownTimerRef.current);
      }
    };
  }, []);
  
  // Render Home Screen
  const renderHomeScreen = () => {
    return (
      <SafeAreaView style={styles.homeContainer}>
        <StatusBar barStyle="light-content" />
        <View style={styles.header}>
          <Text style={styles.headerTitle}>Analyze Your Dosha</Text>
          <Text style={styles.headerSubtitle}>
            Discover your Ayurvedic body type through video analysis
          </Text>
        </View>
        
        <View style={styles.imageContainer}>
          <Image 
            source={require('../assets/image-copy.png')} 
            style={styles.doshaImage}
            defaultSource={require('../assets/image.png')}
          />
        </View>
        
        <View style={styles.instructionsContainer}>
          <Text style={styles.instructionsTitle}>How it works:</Text>
          <Text style={styles.instructionsText}>
            1. Record a 10-second video of yourself or upload an existing one{'\n'}
            2. Our AI will analyze your features and movements{'\n'}
            3. Discover whether you're Vata, Pitta, or Kapha dominant
          </Text>
        </View>
        
        <View style={styles.optionsContainer}>
          <TouchableOpacity 
            style={[styles.optionButton, styles.recordOption]} 
            onPress={requestPermissions}>
            <FontAwesome5 name="video" size={24} color="white" />
            <Text style={styles.optionButtonText}>Record New Video</Text>
          </TouchableOpacity>
          
          <TouchableOpacity 
            style={[styles.optionButton, styles.uploadOption]} 
            onPress={pickVideo}>
            <MaterialIcons name="file-upload" size={24} color="white" />
            <Text style={styles.optionButtonText}>Upload Video</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    );
  };
  
  // Render Camera Screen
  const renderCameraScreen = () => {
    if (hasPermissions === false) {
      return (
        <View style={styles.container}>
          <Text style={styles.warningText}>
            Camera and microphone permissions are required.
          </Text>
          <TouchableOpacity 
            style={styles.button} 
            onPress={requestPermissions}>
            <Text style={styles.buttonText}>Grant Permissions</Text>
          </TouchableOpacity>
          <TouchableOpacity 
            style={[styles.button, styles.cancelButton]} 
            onPress={resetAndGoHome}>
            <Text style={styles.buttonText}>Go Back</Text>
          </TouchableOpacity>
        </View>
      );
    }
    
    return (
      <View style={styles.container}>
        <Camera
          ref={cameraRef}
          style={styles.camera}
          type={Camera.Constants.Type.front}
          ratio="16:9"
        />
        
        {countdown !== null && (
          <View style={styles.countdownContainer}>
            <Text style={styles.countdownText}>{countdown}</Text>
          </View>
        )}
        
        <View style={styles.cameraHeader}>
          <TouchableOpacity
            style={styles.backButton}
            onPress={resetAndGoHome}>
            <Ionicons name="arrow-back" size={30} color="white" />
          </TouchableOpacity>
          <Text style={styles.cameraHeaderText}>
            Position yourself in frame
          </Text>
        </View>
        
        <View style={styles.controlsContainer}>
          {!recording ? (
            <TouchableOpacity
              style={styles.recordButton}
              onPress={startRecording}>
              <View style={styles.recordButtonInner}>
                <Text style={styles.recordText}>Record (10s)</Text>
              </View>
            </TouchableOpacity>
          ) : (
            <TouchableOpacity
              style={[styles.recordButton, styles.recordingButton]}
              onPress={stopRecording}>
              <View style={styles.stopButtonInner}>
                <Text style={styles.recordText}>Stop</Text>
              </View>
            </TouchableOpacity>
          )}
        </View>
        
        <View style={styles.instructionOverlay}>
          <Text style={styles.overlayText}>
            Face the camera directly in good lighting
          </Text>
        </View>
      </View>
    );
  };
  
  // Render Preview Screen
  const renderPreviewScreen = () => {
    return (
      <View style={styles.previewContainer}>
        <View style={styles.previewHeader}>
          <TouchableOpacity
            style={styles.backButton}
            onPress={resetAndGoHome}>
            <Ionicons name="arrow-back" size={30} color="white" />
          </TouchableOpacity>
          <Text style={styles.previewHeaderText}>Review Video</Text>
          <View style={styles.spacer} />
        </View>
        
        <Video
          source={{ uri: video }}
          rate={1.0}
          volume={1.0}
          isMuted={false}
          resizeMode="cover"
          shouldPlay
          isLooping
          useNativeControls
          style={styles.videoPreview}
        />
        
        <View style={styles.previewActions}>
          <TouchableOpacity 
            style={styles.previewButton} 
            onPress={resetAndGoToCamera}>
            <Ionicons name="refresh" size={24} color="white" />
            <Text style={styles.previewButtonText}>Retake</Text>
          </TouchableOpacity>
          
          <TouchableOpacity 
            style={[styles.previewButton, styles.analyzeButton]} 
            onPress={analyzeDosha}>
            <MaterialIcons name="insights" size={24} color="white" />
            <Text style={styles.previewButtonText}>Analyze Dosha</Text>
          </TouchableOpacity>
        </View>
        
        <View style={styles.previewNote}>
          <Text style={styles.previewNoteText}>
            Your video will be analyzed to determine your dominant dosha (Vata, Pitta, or Kapha).
          </Text>
        </View>
      </View>
    );
  };
  
  // Main render switch
  switch (currentScreen) {
    case 'home':
      return renderHomeScreen();
    case 'camera':
      return renderCameraScreen();
    case 'preview':
      return renderPreviewScreen();
    default:
      return renderHomeScreen();
  }
}

const styles = StyleSheet.create({
  // Home Screen Styles
  homeContainer: {
    flex: 1,
    backgroundColor: '#121212',
  },
  header: {
    padding: 20,
    alignItems: 'center',
    marginTop: 20,
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#fff',
    textAlign: 'center',
  },
  headerSubtitle: {
    fontSize: 16,
    color: '#ccc',
    textAlign: 'center',
    marginTop: 10,
  },
  imageContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 20,
  },
  doshaImage: {
    width: 250,
    height: 250,
    borderRadius: 125,
  },
  instructionsContainer: {
    padding: 20,
    marginHorizontal: 10,
    backgroundColor: 'rgba(255,255,255,0.1)',
    borderRadius: 10,
  },
  instructionsTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 10,
  },
  instructionsText: {
    fontSize: 14,
    color: '#ddd',
    lineHeight: 22,
  },
  optionsContainer: {
    marginTop: 30,
    paddingHorizontal: 20,
  },
  optionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 16,
    borderRadius: 8,
    marginBottom: 15,
  },
  recordOption: {
    backgroundColor: '#4a148c',
  },
  uploadOption: {
    backgroundColor: '#1976d2',
  },
  optionButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
    marginLeft: 10,
  },
  
  // Camera Screen Styles
  container: {
    flex: 1,
    backgroundColor: '#000',
  },
  camera: {
    flex: 1,
  },
  cameraHeader: {
    position: 'absolute',
    top: 40,
    left: 0,
    right: 0,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  backButton: {
    padding: 10,
  },
  cameraHeaderText: {
    color: 'white',
    fontSize: 18,
    marginLeft: 10,
    fontWeight: '600',
  },
  controlsContainer: {
    position: 'absolute',
    bottom: 40,
    left: 0,
    right: 0,
    alignItems: 'center',
  },
  recordButton: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  recordButtonInner: {
    width: 70,
    height: 70,
    borderRadius: 35,
    backgroundColor: '#f44336',
    justifyContent: 'center',
    alignItems: 'center',
  },
  recordingButton: {
    borderWidth: 3,
    borderColor: '#f44336',
  },
  stopButtonInner: {
    width: 40,
    height: 40,
    backgroundColor: '#f44336',
    justifyContent: 'center',
    alignItems: 'center',
  },
  recordText: {
    color: 'white',
    fontSize: 14,
    fontWeight: 'bold',
  },
  countdownContainer: {
    position: 'absolute',
    top: 100,
    alignSelf: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    padding: 15,
    borderRadius: 40,
    width: 80,
    height: 80,
    justifyContent: 'center',
    alignItems: 'center',
  },
  countdownText: {
    color: 'white',
    fontSize: 36,
    fontWeight: 'bold',
  },
  instructionOverlay: {
    position: 'absolute',
    bottom: 130,
    left: 0,
    right: 0,
    alignItems: 'center',
  },
  overlayText: {
    color: 'white',
    backgroundColor: 'rgba(0,0,0,0.6)',
    padding: 10,
    borderRadius: 20,
    fontSize: 14,
  },
  
  // Preview Screen Styles
  previewContainer: {
    flex: 1,
    backgroundColor: '#000',
  },
  previewHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingTop: 40,
    paddingHorizontal: 20,
    paddingBottom: 15,
    backgroundColor: 'rgba(0,0,0,0.7)',
  },
  previewHeaderText: {
    color: 'white',
    fontSize: 18,
    fontWeight: '600',
  },
  spacer: {
    width: 40,
  },
  videoPreview: {
    flex: 1,
  },
  previewActions: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    padding: 20,
    backgroundColor: 'rgba(0,0,0,0.8)',
  },
  previewButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#424242',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 8,
    minWidth: 140,
  },
  analyzeButton: {
    backgroundColor: '#00796b',
  },
  previewButtonText: {
    color: 'white',
    marginLeft: 8,
    fontSize: 16,
    fontWeight: '500',
  },
  previewNote: {
    padding: 15,
    backgroundColor: 'rgba(0,0,0,0.8)',
  },
  previewNoteText: {
    color: '#ccc',
    fontSize: 14,
    textAlign: 'center',
  },
  
  // Common Styles
  warningText: {
    color: 'white',
    fontSize: 16,
    textAlign: 'center',
    margin: 20,
  },
  button: {
    backgroundColor: '#2196F3',
    padding: 12,
    borderRadius: 8,
    margin: 10,
    alignItems: 'center',
  },
  cancelButton: {
    backgroundColor: '#757575',
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '500',
  },
});