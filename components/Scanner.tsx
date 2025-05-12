import {
  BarcodeScanningResult,
  CameraView,
  useCameraPermissions,
} from "expo-camera";
import * as Haptics from "expo-haptics";

import { useState } from "react";
import { Button, StyleSheet, Text, View } from "react-native";

interface ScannerProps {
  onScan: (data: string) => void;
  isScanning: boolean;
}

export default function Scanner({ onScan, isScanning }: ScannerProps) {
  const [scanned, setScanned] = useState(false);
  const [permission, requestPermission] = useCameraPermissions();

  const handleBarcodeScanned = (barcode: BarcodeScanningResult) => {
    setScanned(true);
    Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
    onScan(barcode.data);
  };

  if (!isScanning || !permission) {
    return <View />;
  }

  if (!permission.granted) {
    return (
      <View style={styles.container}>
        <Text style={styles.message}>
          We need your permission to show the camera
        </Text>
        <Button onPress={requestPermission} title="grant permission" />
      </View>
    );
  }

  if (scanned) {
    return <View></View>;
  }

  return (
    <View style={styles.container}>
      <CameraView
        autofocus="on"
        barcodeScannerSettings={{
          barcodeTypes: ["qr"],
        }}
        facing="back"
        onBarcodeScanned={scanned ? undefined : handleBarcodeScanned}
        style={styles.camera}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
  },
  message: {
    textAlign: "center",
    paddingBottom: 10,
  },
  camera: {
    flex: 1,
  },
});
