import React, { useEffect, useState, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  Alert,
  ActivityIndicator,
  Linking,
} from 'react-native';
import { CameraView, useCameraPermissions } from 'expo-camera';
import { useNavigation } from '@react-navigation/native';
import { ArrowLeft, Lightbulb } from 'lucide-react-native';
import { Colors } from '@/styles/colors';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

const API_BASE_URL = 'http://127.0.0.1:5000/api';

export function QRScannerScreen() {
  const [permission, requestPermission] = useCameraPermissions();
  const [scanned, setScanned] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [torchOn, setTorchOn] = useState(false);
  const cameraRef = useRef(null);
  const navigation = useNavigation();

  useEffect(() => {
    if (!permission) {
      requestPermission();
    }
  }, []);

  const handleBarCodeScanned = async ({ type, data }) => {
    if (scanned || isProcessing) return;

    setScanned(true);
    setIsProcessing(true);

    try {
      console.log('QR Code data:', data);

      // Validate QR code data
      if (!data || data.trim() === '') {
        throw new Error('Invalid QR code data');
      }

      // Try to parse as JSON (if it's structured data)
      let qrData = data;
      try {
        qrData = JSON.parse(data);
      } catch {
        // If not JSON, treat as plain string (could be session ID, etc.)
      }

      // Process the QR code
      await processQRCode(qrData);
    } catch (error) {
      console.error('Error processing QR code:', error);
      showError(error.message || 'Failed to process QR code');
      setScanned(false);
    } finally {
      setIsProcessing(false);
    }
  };

  const processQRCode = async (qrData) => {
    try {
      // Get user token
      const token = await AsyncStorage.getItem('authToken');
      if (!token) {
        throw new Error('Not authenticated. Please login first.');
      }

      // Example: Verify session or join activity
      // Adjust endpoint based on your backend requirements
      const response = await axios.post(
        `${API_BASE_URL}/sessions/verify-qr`,
        { qrData },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        }
      );

      if (response.data.success) {
        Alert.alert(
          'Success',
          response.data.message || 'QR code verified successfully!',
          [
            {
              text: 'OK',
              onPress: () => navigation.goBack(),
            },
          ]
        );
      } else {
        throw new Error(response.data.message || 'QR verification failed');
      }
    } catch (error) {
      if (error.response?.status === 404) {
        throw new Error('Session not found');
      } else if (error.response?.status === 401) {
        throw new Error('Authentication failed. Please login again.');
      } else if (error.response?.status === 400) {
        throw new Error(error.response.data.message || 'Invalid QR code');
      }
      throw error;
    }
  };

  const showError = (message) => {
    Alert.alert('Error', message, [
      {
        text: 'Try Again',
        onPress: () => setScanned(false),
      },
      {
        text: 'Cancel',
        onPress: () => navigation.goBack(),
      },
    ]);
  };

  if (!permission) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.centerContent}>
          <Text style={styles.errorText}>Requesting camera permission...</Text>
        </View>
      </SafeAreaView>
    );
  }

  if (!permission.granted) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.centerContent}>
          <Text style={styles.errorText}>Camera permission denied</Text>
          <TouchableOpacity
            style={styles.permissionButton}
            onPress={requestPermission}
          >
            <Text style={styles.permissionButtonText}>Grant Permission</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.cancelButton}
            onPress={() => navigation.goBack()}
          >
            <Text style={styles.cancelButtonText}>Cancel</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <CameraView
        ref={cameraRef}
        style={styles.camera}
        onBarcodeScanned={scanned ? undefined : handleBarCodeScanned}
        barcodeScannerSettings={{
          barcodeTypes: ['qr'],
        }}
        enableTorch={torchOn}
      >
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity
            style={styles.headerButton}
            onPress={() => navigation.goBack()}
          >
            <ArrowLeft size={24} color={Colors.primary.light} />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Scan QR Code</Text>
          <TouchableOpacity
            style={styles.torchButton}
            onPress={() => setTorchOn(!torchOn)}
          >
            <Lightbulb
              size={24}
              color={torchOn ? Colors.accent.yellow : Colors.primary.light}
            />
          </TouchableOpacity>
        </View>

        {/* Scanner Overlay */}
        <View style={styles.overlay}>
          <View style={styles.unfocused} />
          <View style={styles.focusRow}>
            <View style={styles.unfocused} />
            <View style={styles.focusBox}>
              <View style={[styles.corner, styles.topLeft]} />
              <View style={[styles.corner, styles.topRight]} />
              <View style={[styles.corner, styles.bottomLeft]} />
              <View style={[styles.corner, styles.bottomRight]} />
            </View>
            <View style={styles.unfocused} />
          </View>
          <View style={styles.unfocused} />
        </View>

        {/* Loading Indicator */}
        {isProcessing && (
          <View style={styles.processingContainer}>
            <ActivityIndicator size="large" color={Colors.accent.cyan} />
            <Text style={styles.processingText}>Verifying QR code...</Text>
          </View>
        )}

        {/* Footer Text */}
        <View style={styles.footer}>
          <Text style={styles.footerText}>
            Position QR code within the frame
          </Text>
        </View>
      </CameraView>

      {/* Retry Button */}
      {scanned && !isProcessing && (
        <TouchableOpacity
          style={styles.retryButton}
          onPress={() => setScanned(false)}
        >
          <Text style={styles.retryButtonText}>Tap to Scan Again</Text>
        </TouchableOpacity>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.primary.darkest,
  },
  camera: {
    flex: 1,
  },
  centerContent: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  errorText: {
    color: Colors.state.error,
    fontSize: 16,
    marginBottom: 16,
    textAlign: 'center',
  },
  permissionButton: {
    backgroundColor: Colors.accent.cyan,
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
    marginBottom: 12,
  },
  permissionButtonText: {
    color: Colors.primary.darkest,
    fontSize: 16,
    fontWeight: '600',
  },
  cancelButton: {
    backgroundColor: Colors.primary.dark,
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: Colors.primary.light,
  },
  cancelButtonText: {
    color: Colors.primary.light,
    fontSize: 16,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: 'rgba(15, 23, 42, 0.8)',
  },
  headerButton: {
    padding: 8,
  },
  headerTitle: {
    color: Colors.primary.light,
    fontSize: 18,
    fontWeight: '600',
  },
  torchButton: {
    padding: 8,
  },
  overlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  unfocused: {
    flex: 1,
  },
  focusRow: {
    flexDirection: 'row',
  },
  focusBox: {
    width: 250,
    height: 250,
    borderColor: Colors.accent.cyan,
    borderWidth: 2,
    position: 'relative',
  },
  corner: {
    position: 'absolute',
    width: 30,
    height: 30,
    borderColor: Colors.accent.cyan,
    borderWidth: 3,
  },
  topLeft: {
    top: -2,
    left: -2,
    borderRightWidth: 0,
    borderBottomWidth: 0,
  },
  topRight: {
    top: -2,
    right: -2,
    borderLeftWidth: 0,
    borderBottomWidth: 0,
  },
  bottomLeft: {
    bottom: -2,
    left: -2,
    borderRightWidth: 0,
    borderTopWidth: 0,
  },
  bottomRight: {
    bottom: -2,
    right: -2,
    borderLeftWidth: 0,
    borderTopWidth: 0,
  },
  processingContainer: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
  },
  processingText: {
    color: Colors.primary.light,
    marginTop: 12,
    fontSize: 14,
  },
  footer: {
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: 'rgba(15, 23, 42, 0.8)',
  },
  footerText: {
    color: Colors.primary.light,
    fontSize: 14,
    textAlign: 'center',
  },
  retryButton: {
    position: 'absolute',
    bottom: 20,
    left: 16,
    right: 16,
    backgroundColor: Colors.accent.cyan,
    paddingVertical: 14,
    borderRadius: 8,
  },
  retryButtonText: {
    color: Colors.primary.darkest,
    fontSize: 16,
    fontWeight: '600',
    textAlign: 'center',
  },
});

export default QRScannerScreen;
